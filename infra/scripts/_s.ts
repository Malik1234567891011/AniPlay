import { normalizeForSearch, searchCatalog } from '@plotbreak/i18n';
import { LAUNCH_CATALOG } from '@plotbreak/test-fixtures';
import { localizeStory, type StoryVersion } from '@plotbreak/contracts';
console.log('normalizeForSearch("École")   =', JSON.stringify(normalizeForSearch('École')));
console.log('normalizeForSearch("académie")=', JSON.stringify(normalizeForSearch('académie')));
const fr = (LAUNCH_CATALOG as unknown as StoryVersion[]).map((w) => localizeStory(w, 'fr'));
for (const q of ['academie', 'académie', 'école', 'ecole', 'dossier']) {
  console.log(`searchCatalog(fr, ${JSON.stringify(q)}) ->`, searchCatalog(fr, q).length);
}
