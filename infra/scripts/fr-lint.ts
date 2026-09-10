/**
 * The fr-FR style linter.
 *
 * The rules are specified in `docs/localization/fr-FR/QA_PLAN.md` §2 and every
 * one of them exists because a real French translation shipped it. The ids are
 * stable so a line can be suppressed with a reason:
 *
 *     // fr-lint-disable-next-line FR002 — quoting the calque in order to ban it
 *
 * This runs over French *content*: the message catalogue, French world data,
 * captured model output, and the store metadata — which is the most public
 * French in the product and the least likely to be checked.
 *
 * It does **not** lint the bible itself. Those are English documents full of
 * deliberate counter-examples, and an English document trips an English-drift
 * rule on every line. What it *does* lint in Markdown is a fenced block tagged
 * ```fr — shippable French, marked as such by its author.
 *
 * Usage:
 *   npm run fr:lint -- --self-test           # prove the rules work
 *   npm run fr:lint -- --fenced docs/localization/fr-FR/APP_STORE_FRANCE.md
 *   npm run fr:lint -- locales/fr/*.json
 *   npm run fr:lint -- --json <files...>
 */
import { readFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = new URL('../..', import.meta.url).pathname.replace(/\/$/, '');

const NBSP = ' ';
const NNBSP = ' ';

type Severity = 'error' | 'warn';
/** Which block a rule applies to. French dialogue and French narration are not the same language. */
type Where = 'any' | 'narration' | 'dialogue';

interface Rule {
  readonly id: string;
  readonly severity: Severity;
  readonly where: Where;
  readonly why: string;
  readonly pattern: RegExp;
  /** Optional second gate, for rules a regex alone gets wrong. */
  readonly unless?: (line: string, match: RegExpMatchArray) => boolean;
}

const RULES: Rule[] = [
  // ---- 2.1 instant tells ------------------------------------------------
  {
    id: 'FR002',
    severity: 'error',
    where: 'any',
    why: 'The dubbing tell. Write `Oh putain`, `La vache`, `Sérieux ?`',
    pattern: /\boh\s+mon\s+dieu\b/iu,
  },
  {
    id: 'FR003',
    severity: 'error',
    where: 'any',
    why: 'Dead French that survives only as the anglophone stereotype of a Frenchman',
    pattern: /\b(sacrebleu|morbleu|parbleu|palsambleu|ventrebleu|corbleu|saperlipopette|sapristi|nom d.une pipe)\b/iu,
  },
  {
    id: 'FR004',
    severity: 'error',
    where: 'any',
    why: 'Québécisme. The target is fr-FR metropolitan',
    pattern: /\b(courriels?|divulgâcher|baladodiffusions?|clavardage|débreffage|magasiner|présentement|traversiers?)\b/iu,
  },
  {
    id: 'FR005',
    severity: 'error',
    where: 'any',
    why: "Straight apostrophe inside a word. Author U+2019 ’, never U+0027",
    pattern: /[a-zà-öø-ÿ]'[a-zà-öø-ÿ]/iu,
  },
  {
    id: 'FR006',
    severity: 'error',
    where: 'any',
    why: 'French needs a non-breaking space before ? ! ; :',
    pattern: new RegExp(`[^\\s${NBSP}${NNBSP}?!;:0-9][?!;]|[^\\s${NBSP}${NNBSP}0-9]:(?!//)`, 'u'),
    unless: (line) => /https?:|\d{1,2}:\d{2}|`|\{|\}/.test(line),
  },
  {
    id: 'FR001',
    severity: 'error',
    where: 'any',
    why: 'English Title Case. French capitalises the first word and proper nouns only',
    // The tell is a capitalised French function word that is neither sentence-initial
    // nor followed by lowercase: `Le Mur De Glace`, never `. La fenêtre est ouverte`.
    pattern:
      /[^.!?…:—«"\n\s]\s+(De|Du|Des|Le|La|Les|Un|Une|Et|Ou|Au|Aux|Dans|Pour|Sur|Avec|Sans)\s+\p{Lu}/u,
  },
  {
    id: 'FR017',
    severity: 'error',
    where: 'any',
    why: 'Midpoint inclusive writing is an administrative register and cannot be read aloud',
    pattern: /\p{L}·\p{L}|\p{L}\(e\)s?\b/u,
  },
  {
    id: 'FR019',
    severity: 'error',
    where: 'any',
    why: 'US number, currency or clock format',
    pattern: /\$\s?\d|\b\d{1,3},\d{3}\b|\b\d{1,2}:\d{2}\s?(AM|PM)\b|\b\d+\.\d{2}\s?€/u,
  },
  {
    id: 'FR020',
    severity: 'error',
    where: 'any',
    why: '`&` is not a French word. Write `et`',
    pattern: /\s&\s/u,
  },
  {
    id: 'FR027',
    severity: 'error',
    where: 'any',
    why: 'Accented capitals are mandatory in French, including À and É',
    pattern: /\b(A SUIVRE|ECOLE|EVENEMENT|EVENEMENTS|ETAT|ELEVE|DEJA|CREER|REPONSE|DECOUVRIR|REGLES|DEBUT|PREMIERE|DERNIERE)\b/u,
  },
  {
    id: 'FR029',
    severity: 'error',
    where: 'any',
    why: '№ U+2116 is Russian. French writes n°',
    pattern: /№/u,
  },
  {
    id: 'FR028',
    severity: 'error',
    where: 'any',
    why: '`etc.` and `…` never combine',
    pattern: /etc\s*(…|\.\.\.)/u,
  },

  // ---- 2.2 prose discipline --------------------------------------------
  {
    id: 'FR008',
    severity: 'error',
    where: 'narration',
    why: 'French editors class `du coup` as a faute de langue. Fine in dialogue, never in narration',
    pattern: /\bdu coup\b/iu,
  },
  {
    id: 'FR011',
    severity: 'warn',
    where: 'narration',
    why: 'The connector reflex. Three short sentences must stay three short sentences',
    pattern: /\b(car|en effet|tandis que|alors que|puisque|de sorte que|cela dit|effectivement|manifestement)\b/iu,
  },
  {
    id: 'FR009',
    severity: 'warn',
    where: 'narration',
    why: 'Adding an exclamation mark the source did not have is a documented translation failure',
    pattern: /!/u,
  },
  {
    id: 'FR012',
    severity: 'error',
    where: 'any',
    why: 'Cliché blocklist — reads as stock, generic, from nowhere',
    pattern:
      /\b(un frisson (lui )?parcour\w+ (son |l.)échine|horreur indicible|paralysé\w* d.effroi|silence pesant|silence abyssal|les ténèbres (t|vous|l')\w*envelopp\w+|sueur froide|bat\w+ la chamade|bain de sang|abîmes insondables|plaies béantes|peur au ventre|froid dans le dos)\b/iu,
  },
  {
    id: 'FR013',
    severity: 'error',
    where: 'any',
    why: 'An empty consequence — describes a consequence without containing one. Name what changed',
    pattern:
      /\b(quelque chose (a )?chang\w+ entre vous|l.air (a )?chang\w+|tu sens le poids|rien ne sera plus jamais pareil|l.atmosphère devient pesante|tout a basculé|quelque chose s.est brisé)\b/iu,
  },
  {
    id: 'FR014',
    severity: 'error',
    where: 'any',
    why: 'Spelled onomatopoeia is comic-book-coded in French. Name the sound with a precise noun',
    pattern: /\b(CRAC|BOUM|PAF|VLAN|BADABOUM|BANG|SPLASH)\s*!?/u,
  },
  {
    id: 'FR024',
    severity: 'error',
    where: 'narration',
    why: 'Passé simple in a real-time beat. Présent de narration is the default',
    pattern:
      /\b(\w+èrent|\w{2,}irent|\w{2,}urent|fut|furent|eut|eurent|firent|dirent|vinrent|prirent|mirent|purent|voulurent|surent|virent|parurent)\b/u,
  },
  {
    id: 'FR025',
    severity: 'error',
    where: 'narration',
    why: 'The suddenness is in the verb. `La porte claque.` is sudden',
    pattern: /(^|[.!?…]\s+|^\s*)(Soudain|Tout à coup|Soudainement)\b/u,
  },
  {
    id: 'FR010',
    severity: 'warn',
    where: 'narration',
    why: '-ment adverbs are French machine translation’s fingerprint. At most one per beat',
    pattern: /\b\w{4,}ment\b(?=[\s\S]*\b\w{4,}ment\b)/u,
    unless: (_line, match) =>
      /^(vraiment|comment|moment|document|bâtiment|gouvernement|logement|mouvement|sentiment|équipement|appartement|changement|règlement|renseignement|cloisonnement)$/i.test(
        match[0] ?? '',
      ),
  },

  // ---- 2.3 dialogue discipline -----------------------------------------
  {
    id: 'FR021',
    severity: 'error',
    where: 'dialogue',
    why: '`ceci` / `cela` in speech is an instant tell. Say `ça`',
    pattern: /\b(ceci|cela)\b/iu,
  },
  {
    id: 'FR022',
    severity: 'warn',
    where: 'dialogue',
    why: 'Inversion in a young character’s mouth is a textbook, not a person',
    pattern: /\b(que|où|quand|comment|pourquoi)\s+\w+(-tu|-vous)\b/iu,
  },
  {
    id: 'FR023',
    severity: 'error',
    where: 'any',
    why: 'Dated or kikoolol. See research/texting.md',
    pattern: /\b(lol|xd|oklm|dtc|qqn|2m1|koi29|a12c4|bi1|jtm|@\+)\b/iu,
  },
  {
    id: 'FR031',
    severity: 'error',
    where: 'any',
    why: 'Out of bounds for a 13+ product',
    pattern: /\b(encul\w+|salopes?|nique\b|putes?)\b/iu,
  },
  {
    id: 'FR032',
    severity: 'error',
    where: 'any',
    why: 'Ableist slur. Never, in any context',
    pattern: /\bmgl\b/iu,
  },

  // ---- 2.5 drift and false friends -------------------------------------
  {
    id: 'FR015',
    severity: 'error',
    where: 'any',
    why: 'English leaked into French output. Lowercase function words only, so proper nouns are safe',
    // Case-sensitive and lowercase-only: `The Ninth Archive` is a proper noun, `the` is drift.
    pattern: /\b(the|and|you|with|she|they|from|about|your|were|have|that|this)\b/u,
  },
  {
    id: 'FR030',
    severity: 'error',
    where: 'any',
    why: 'Product false friend. See ENGLISH_CALQUE_BLACKLIST.md §5',
    pattern:
      /\b(cinématique|résolution|sauver l|tirer une image|détective|supporter (la|le|les)|actuellement,|éventuellement,|compléter (la|le|les) (tâche|quête|étape)|initier (la|le|les)|digital\w*|opportunité)\b/iu,
  },
  {
    id: 'FR035',
    severity: 'warn',
    where: 'any',
    why: 'Québécisme unless it is literally nautical. Check the hit',
    pattern: /\b(embarqu\w+|débarqu\w+|virer de bord|bordée|coul\w+ (un|son) examen)\b/iu,
  },
  {
    id: 'FR016',
    severity: 'warn',
    where: 'dialogue',
    why: 'tu and vous to the same addressee. Skip when more than one person is being addressed',
    pattern: /\b(tu|te|toi|ton|ta|tes)\b(?=[\s\S]*\b(vous|votre|vos)\b)|\b(vous|votre|vos)\b(?=[\s\S]*\b(tu|te|toi|ton|ta|tes)\b)/iu,
  },
];

interface Finding {
  readonly file: string;
  readonly line: number;
  readonly rule: Rule;
  readonly text: string;
}

/**
 * The French inside an English document.
 *
 * Only a fence explicitly tagged ```fr is shippable French. Everything else in
 * these files is English prose, English examples, or French quoted in order to
 * be banned — and linting any of it produces noise, not findings.
 */
function frenchFences(source: string): string {
  const lines = source.split('\n');
  const out: string[] = new Array<string>(lines.length).fill('');
  let open = false;
  lines.forEach((line, index) => {
    if (/^\s*```\s*fr\s*$/.test(line)) { open = true; return; }
    if (open && /^\s*```/.test(line)) { open = false; return; }
    if (open) out[index] = line;
  });
  return out.join('\n');
}

function lint(file: string, source: string, where: Where): Finding[] {
  const findings: Finding[] = [];
  const lines = source.split('\n');
  let suppressed: Set<string> = new Set();

  lines.forEach((line, index) => {
    const nextSuppressed = new Set<string>();
    const disable = line.match(/fr-lint-disable-next-line\s+([A-Z0-9, ]+)/);
    if (disable?.[1]) for (const id of disable[1].split(/[, ]+/).filter(Boolean)) nextSuppressed.add(id);

    if (line.trim().length > 0) {
      for (const rule of RULES) {
        if (rule.where !== 'any' && rule.where !== where) continue;
        if (suppressed.has(rule.id)) continue;
        const match = line.match(rule.pattern);
        if (!match) continue;
        if (rule.unless?.(line, match)) continue;
        findings.push({ file, line: index + 1, rule, text: (match[0] ?? '').trim() });
      }
    }

    suppressed = nextSuppressed;
  });

  return findings;
}

// --- self-test -------------------------------------------------------------

/** Each rule must fire on its own bad sample. A rule nobody proved is a rule nobody has. */
const MUST_TRIP: Array<[string, string, Where]> = [
  ['FR002', 'Oh mon Dieu, elle est là.', 'any'],
  ['FR003', 'Sacrebleu ! Le navire coule.', 'any'],
  ['FR004', 'Envoie-moi un courriel demain.', 'any'],
  ['FR005', "Tu ouvres la porte de l'atelier.", 'any'],
  ['FR006', 'Tu fais quoi?', 'any'],
  ['FR001', 'Le Mur De Glace se dresse.', 'any'],
  ['FR017', 'Tu es arrivé·e le premier.', 'any'],
  ['FR019', 'Le pack coûte $2.99 aujourd’hui.', 'any'],
  ['FR020', 'Portefeuille & achats', 'any'],
  ['FR027', 'A SUIVRE', 'any'],
  ['FR029', 'Chambre № 4', 'any'],
  ['FR028', 'des cordages, des voiles, etc…', 'any'],
  ['FR008', 'Du coup elle repart vers le pont.', 'narration'],
  ['FR011', 'Elle ne bouge pas, car la porte est ouverte.', 'narration'],
  ['FR009', 'La porte claque !', 'narration'],
  ['FR012', 'Un frisson parcourut son échine.', 'any'],
  ['FR013', 'Quelque chose change entre vous.', 'any'],
  ['FR014', 'Le plancher cède. CRAC !', 'any'],
  ['FR024', 'Ils ouvrirent la porte et regardèrent le pont.', 'narration'],
  ['FR025', 'Soudain, la porte claque.', 'narration'],
  ['FR010', 'Elle avance lentement, puis referme doucement la porte.', 'narration'],
  ['FR021', 'Tu comprends cela, non ?', 'dialogue'],
  ['FR022', 'Que fais-tu ici ?', 'dialogue'],
  ['FR023', 'mdr lol jtm', 'any'],
  ['FR031', 'espèce de salope', 'any'],
  ['FR032', 'arrête mgl', 'any'],
  ['FR015', 'Elle regarde the door.', 'any'],
  ['FR030', 'Qualité cinématique', 'any'],
  ['FR035', 'Il embarque dans la voiture.', 'any'],
  ['FR016', 'Tu viens ? Vous venez ?', 'dialogue'],
];

/** Native French that must survive every rule untouched. */
const MUST_PASS: Array<[string, Where]> = [
  ['Tu reposes les jumelles. La fenêtre d’en face est toujours allumée.', 'narration'],
  ['L’ampoule du couloir ne s’allume plus. Tu comptes les portes en avançant.', 'narration'],
  ['Mara ne lève pas les yeux.', 'narration'],
  ['Le plancher craque.', 'narration'],
  ['Tu pars en un-contre-un. Jun te suit d’un demi-pas.', 'narration'],
  ['Ça va ?', 'dialogue'],
  ['T’es sérieux, là ?', 'dialogue'],
  ['Faut qu’on parle.', 'dialogue'],
  ['On y va.', 'dialogue'],
  ['Vous n’avez pas le besoin d’en connaître.', 'dialogue'],
  ['Impossible de charger les mondes.', 'any'],
  ['Restaurer mes achats', 'any'],
  ['Nouveautés sur Plotbreak', 'any'],
  ['Qu’est-ce que tu fais ?', 'any'],
  ['Jour 3 · 16:15', 'any'],
  ['1er janvier 2026', 'any'],
  ['0 partie', 'any'],
];

function selfTest(): number {
  let failures = 0;

  for (const [id, sample, where] of MUST_TRIP) {
    const hit = lint('<sample>', sample, where).some((f) => f.rule.id === id);
    if (!hit) {
      console.log(`  ✗ ${id} did NOT fire on: ${sample}`);
      failures += 1;
    }
  }

  for (const [sample, where] of MUST_PASS) {
    const found = lint('<native>', sample, where);
    if (found.length > 0) {
      console.log(
        `  ✗ native French tripped ${found.map((f) => f.rule.id).join(',')}: ${sample}`,
      );
      failures += 1;
    }
  }

  const covered = new Set(MUST_TRIP.map(([id]) => id));
  const uncovered = RULES.filter((r) => !covered.has(r.id)).map((r) => r.id);
  if (uncovered.length > 0) console.log(`  ! no sample for: ${uncovered.join(', ')}`);

  if (failures === 0) {
    console.log(
      `fr-lint self-test: ${RULES.length} rules, ` +
        `${MUST_TRIP.length} bad samples all caught, ` +
        `${MUST_PASS.length} native lines all clean.`,
    );
  } else {
    console.log(`\nfr-lint self-test: ${failures} failure(s).`);
  }
  return failures;
}

// --- main ------------------------------------------------------------------

function main(): void {
  const argv = process.argv.slice(2);
  const json = argv.includes('--json');
  const fenced = argv.includes('--fenced');
  const files = argv.filter((a) => !a.startsWith('--'));

  if (argv.includes('--self-test') || files.length === 0) {
    const failures = selfTest();
    if (files.length === 0 && !argv.includes('--self-test')) {
      console.log(
        '\nNo files given. There is no fr catalogue yet — this ran the self-test instead.\n' +
          'Once locales/fr exists:  npm run fr:lint -- locales/fr/*.json\n' +
          'French inside a doc:     npm run fr:lint -- --fenced <file.md>',
      );
    }
    process.exitCode = failures > 0 ? 1 : 0;
    return;
  }

  const targets = files.map((f) => (f.startsWith('/') ? f : join(ROOT, f)));
  const findings = targets.flatMap((file) => {
    const raw = readFileSync(file, 'utf8');
    return lint(relative(ROOT, file), fenced ? frenchFences(raw) : raw, 'any');
  });

  if (json) {
    console.log(
      JSON.stringify(
        findings.map((f) => ({ ...f, rule: f.rule.id, severity: f.rule.severity, why: f.rule.why })),
        null,
        2,
      ),
    );
  } else {
    for (const f of findings) {
      const mark = f.rule.severity === 'error' ? 'error' : 'warn ';
      console.log(`${mark} ${f.rule.id}  ${f.file}:${f.line}  «${f.text}»  — ${f.rule.why}`);
    }
    const errors = findings.filter((f) => f.rule.severity === 'error').length;
    console.log(
      `\n${targets.length} file(s), ${findings.length} finding(s), ${errors} error(s).`,
    );
  }

  process.exitCode = findings.some((f) => f.rule.severity === 'error') ? 1 : 0;
}

main();
