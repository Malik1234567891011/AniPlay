// Monorepo Metro config.
//
// The app consumes @plotbreak/* workspace packages as TypeScript source, so Metro
// has to watch the repo root and resolve modules from both the app's and the
// root's node_modules.
const { getDefaultConfig } = require('expo/metro-config');
const path = require('node:path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// Hierarchical lookup stays ON: npm hoists most packages to the root, but Expo
// keeps some of its own dependencies nested under node_modules/expo/node_modules,
// and disabling the upward walk makes those unresolvable.

// The workspace packages are TypeScript ESM, where a relative import of a .ts
// file is written with a .js extension. Node and tsc understand that; Metro
// does not, so map the compiled-looking specifier back to the source file.
const TS_EXTENSION_MAP = { '.js': '.ts', '.jsx': '.tsx', '.mjs': '.mts', '.cjs': '.cts' };
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName.startsWith('.')) {
    const extension = path.extname(moduleName);
    const mapped = TS_EXTENSION_MAP[extension];
    if (mapped) {
      const candidate = moduleName.slice(0, -extension.length) + mapped;
      try {
        return context.resolveRequest(context, candidate, platform);
      } catch {
        // Fall through: a genuine .js file next to TypeScript sources is legal.
      }
    }
  }
  return (defaultResolveRequest ?? context.resolveRequest)(context, moduleName, platform);
};

module.exports = config;
