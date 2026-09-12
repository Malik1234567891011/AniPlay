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
import { readFileSync, readdirSync } from 'node:fs';
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

/**
 * The catalogue rules, which had no samples at all until two of their bugs had
 * already rewritten shipped French. Each pair is [value, should it trip].
 */
const CATALOGUE_SAMPLES: Array<[string, boolean]> = [
  // Title Case is what the rule is for, and it still catches it.
  ['Nouvelle Partie', true],
  ['Voir Tous Les Mondes', true],
  // A second sentence may start with a capital. So may a clause after a colon
  // or a closing guillemet.
  ['Tout est prêt. Choisis un titre.', false],
  ['Tu es prêt ? Alors on y va.', false],
  // A leading glyph is decoration, not a word — the bug that pushed two agents
  // into moving the star to the end of the string.
  ['☆ Épingler', false],
  ['• Reprendre', false],
  ['→ Continuer', false],
  // A known brand, and only that word. The old whole-value test let one
  // `Plotbreak` excuse every other capital in the string.
  ['Nouveautés sur Plotbreak', false],
  ['Plotbreak Nouvelle Partie', true],
  // A placeholder is not a word of French.
  ['Reprendre {title}', false],
  // A name the list cannot know still trips, which is correct: the catalogue
  // says so with a disable comment rather than the rule guessing.
  ['Ex.\u00a0: Malik Sarrow', true],
];

function selfTest(): number {
  let failures = 0;

  for (const [value, shouldTrip] of CATALOGUE_SAMPLES) {
    const tripped = titleCaseOffenders(value).length > 0;
    if (tripped !== shouldTrip) {
      console.log(
        `  ✗ FRC002 ${tripped ? 'fired on' : 'missed'}: ${value}` +
          `  (expected ${shouldTrip ? 'a finding' : 'nothing'})`,
      );
      failures += 1;
    }
  }

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
        `${MUST_PASS.length} native lines all clean, ` +
        `${CATALOGUE_SAMPLES.length} catalogue samples correct.`,
    );
  } else {
    console.log(`\nfr-lint self-test: ${failures} failure(s).`);
  }
  return failures;
}


// --- the catalogue ---------------------------------------------------------

/**
 * Lint the shipped French message catalogue, and report how much of it exists.
 *
 * The 30 rules above were written against prose. A UI catalogue needs four more
 * that only make sense for interface copy, and they are the four that decide
 * whether an app reads as French or as English wearing French words:
 *
 * - **`tu`, always.** `PRODUCT_VOICE.md` rule 2. A settings screen that says
 *   `vous` next to a story that says `tu` is the wobble that must never happen,
 *   and it is invisible until you see two screens side by side.
 * - **Sentence case.** `Nouvelle partie`, never `Nouvelle Partie`. Apple's
 *   French UI is uniformly sentence case; Title Case is an English import.
 * - **No `n === 1` thinking.** An ICU plural with an `=1` branch is the English
 *   rule in disguise and is wrong in French at zero.
 * - **No midpoint.** `arrivé·e` in UI as well as in prose.
 *
 * Coverage is printed rather than enforced, because a partial catalogue falls
 * back to English and that is a correct intermediate state.
 */
/**
 * Words capitalised mid-string — French UI is sentence case, not Title Case.
 *
 * Extracted so it can be tested, which is the whole story of this function.
 * `lintCatalogue` had no self-test while `lint` had thirty-two samples, and two
 * bugs lived in here long enough to *change the French*: a leading `☆` made the
 * first real word look mid-string, and a whole-value proper-noun check was both
 * too lax (one `Plotbreak` exempted the rest of the string) and too strict (no
 * name it did not already know could ever pass). See the catalogue self-test.
 */
export function titleCaseOffenders(value: string): string[] {
  const tokens = value.replace(/\{[^}]*\}/g, '\u0000').split(/\s+/).filter(Boolean);
  const hasLetter = (token: string): boolean => /\p{L}/u.test(token);
  // A bullet, star or arrow is decoration, not the first word.
  while (tokens.length > 0 && !hasLetter(tokens[0] ?? '')) tokens.shift();

  const bare = (token: string): string => token.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, '');
  const isProperNoun = (token: string): boolean =>
    PROPER_NOUNS.some((n) => n === bare(token) || n.split(/\s+/).includes(bare(token)));

  const titled: string[] = [];
  for (let i = 1; i < tokens.length; i += 1) {
    // A sentence ends on the *previous* token — `l'extraordinaire.` — so the
    // punctuation is glued to the word before, not sitting on its own.
    const previous = tokens[i - 1] ?? '';
    if (/[.!?…:»]$/.test(previous)) continue;
    const word = tokens[i] ?? '';
    if (isProperNoun(word)) continue;
    if (/^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]{2,}/.test(word)) titled.push(word);
  }
  return titled;
}

interface CatalogueEntry {
  readonly file: string;
  readonly line: number;
  readonly value: string;
  /** Rules switched off for this key by a `fr-lint-disable-next-line` above it. */
  readonly disabled: ReadonlySet<string>;
}

function lintCatalogue(json: boolean): boolean {
  const enDir = join(ROOT, 'packages/i18n/src/catalog/en');
  const frDir = join(ROOT, 'packages/i18n/src/catalog/fr');

  const keysIn = (dir: string): Map<string, CatalogueEntry> => {
    const found = new Map<string, CatalogueEntry>();
    for (const name of readdirSync(dir)) {
      if (!name.endsWith('.ts') || name === 'index.ts') continue;
      const source = readFileSync(join(dir, name), 'utf8');

      // Read the escape hatches off the *unblanked* source, because they live
      // in the comments the next step is about to erase.
      //
      // `lint()` has had `fr-lint-disable-next-line` since the first commit and
      // the catalogue had nothing, which left no way to say "this really is a
      // proper noun" — so the rule won every argument and the copy moved to
      // suit it. `setup.name_placeholder` read `Ex. : Sarrow`, a surname with
      // no first name, purely because FRC002 cannot tell a person's name from
      // Title Case.
      const disabled = new Map<number, Set<string>>();
      source.split('\n').forEach((text, index) => {
        const match = text.match(/fr-lint-disable-next-line\s+([A-Z0-9, ]+)/);
        if (!match?.[1]) return;
        // Line numbers are 1-based, and the directive covers the line after it
        // — which is the line the key sits on.
        disabled.set(index + 2, new Set(match[1].split(/[\s,]+/).filter(Boolean)));
      });

      // Comments next: a localizer note is prose *about* the string and would
      // otherwise be linted as if it were the string. Blanked rather than
      // deleted so every line number above still points at the same line.
      const raw = source
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '))
        .replace(/\/\/[^\n]*/g, (m) => ' '.repeat(m.length));

      // Matched over the whole file rather than line by line, because a long
      // value legitimately wraps onto the line after its key.
      //
      // The trailing group takes the `+ '…'` continuations with it. Without it
      // the pattern stopped at the first literal, so a value written as a
      // concatenation was only ever *partly* linted — a calque in the second
      // half was invisible, and the halves are usually split mid-sentence,
      // which is exactly where a capitalised word looks like a new one.
      const pattern =
        /'([a-z0-9_.]+)':\s*(['"])((?:\\.|(?!\2)[^\\])*)\2((?:\s*\+\s*(['"])(?:\\.|(?!\5)[^\\])*\5)*)/g;
      for (const match of raw.matchAll(pattern)) {
        const key = match[1];
        if (!key || match[3] === undefined) continue;
        const continued = (match[4] ?? '').replace(/\s*\+\s*(['"])((?:\\.|(?!\1)[^\\])*)\1/g, '$2');
        const value = match[3] + continued;
        const line = raw.slice(0, match.index ?? 0).split('\n').length;
        found.set(key, {
          file: `${dir.endsWith('/fr') ? 'fr' : 'en'}/${name}`,
          line,
          value,
          disabled: disabled.get(line) ?? new Set<string>(),
        });
      }
    }
    return found;
  };

  const en = keysIn(enDir);
  const fr = keysIn(frDir);

  interface CatalogueFinding {
    readonly key: string;
    readonly file: string;
    readonly line: number;
    readonly value: string;
    readonly rule: string;
    readonly why: string;
  }
  const findings: CatalogueFinding[] = [];
  const add = (key: string, meta: CatalogueEntry, rule: string, why: string): void => {
    if (meta.disabled.has(rule)) return;
    findings.push({ key, file: meta.file, line: meta.line, value: meta.value, rule, why });
  };

  for (const [key, meta] of fr) {
    const value = meta.value;

    if (!en.has(key)) {
      add(key, meta, 'FRC005', 'key does not exist in the English catalogue — stale or misspelled');
    }

    // `vous` addressing the player. `PRODUCT_VOICE.md` rule 2.
    if (/\b(vous|votre|vos)\b/i.test(value)) {
      add(key, meta, 'FRC001', 'the product speaks tu, always — never vous, and never mixed between screens');
    }

    // French Title Case.
    //
    // Only fires on a capitalised word that does **not** start a sentence — a
    // string can legitimately contain two sentences, and `Choisis` after a full
    // stop is correct. Placeholders and known proper nouns are skipped, since
    // `{name}` and `Plotbreak` are capitalised for reasons of their own.
    //
    // Two bugs lived here, and both of them *moved the French* rather than
    // reporting on it, which is the worst thing a lint rule can do.
    //
    // The first: a leading token with no letters in it — `☆`, `→`, `•` — was
    // counted as a word, so the genuinely first French word was read as
    // mid-string and flagged. `☆ Épingler` is correct and failed, and two
    // separate agents worked around it by moving the glyph to the end of the
    // string. The fix is to drop leading tokens that contain no letter, so the
    // first *word* is the first word.
    //
    // The second: `PROPER_NOUNS.some((n) => value.includes(n))` tested the
    // whole value, so it was simultaneously too lax and too strict. Too lax
    // because one mention of `Plotbreak` exempted every other capitalised word
    // in the string; too strict because a name the list does not know — which
    // is every name a player might be called — had no way through at all.
    // Matching per word fixes the lax half; `fr-lint-disable-next-line FRC002`
    // fixes the strict half, and is the honest answer: no rule can tell
    // `Malik Sarrow` from `Nouvelle Partie` by looking at it.
    const titled = titleCaseOffenders(value);
    if (titled.length > 0) {
      add(
        key,
        meta,
        'FRC002',
        `sentence case: «${titled[0]}» is capitalised mid-string — French UI is not Title Case. ` +
          'If it is a proper noun, say so with `// fr-lint-disable-next-line FRC002` above the key.',
      );
    }

    // An ICU plural that special-cases 1 is the English rule wearing ICU.
    if (/\{[^}]*plural[^}]*=1\s*\{/.test(value)) {
      add(key, meta, 'FRC003', 'an =1 branch is the English plural rule — French is singular at zero too');
    }

    // Midpoint, in UI as well as in prose. PLAYER_GRAMMAR rule 4.
    if (/\p{L}·\p{L}/u.test(value)) {
      add(key, meta, 'FRC004', 'no midpoint in the interface: administrative register, and it breaks read-aloud');
    }
  }

  const missing = [...en.keys()].filter((k) => !fr.has(k));

  if (json) {
    console.log(JSON.stringify({ findings, coverage: { translated: fr.size, total: en.size, missing } }, null, 2));
    return findings.length === 0;
  }

  for (const f of findings) {
    console.log(`error ${f.rule}  ${f.file}:${f.line}  ${f.key}  «${f.value}»\n        — ${f.why}`);
  }

  const pct = en.size === 0 ? 0 : Math.round((fr.size / en.size) * 100);
  console.log(
    `\nfr catalogue: ${fr.size}/${en.size} keys (${pct}%), ${findings.length} rule violation(s).`,
  );
  if (missing.length > 0) {
    const byArea = new Map<string, number>();
    for (const key of missing) {
      const area = key.split('.')[0] ?? '?';
      byArea.set(area, (byArea.get(area) ?? 0) + 1);
    }
    const worst = [...byArea].sort((a, b) => b[1] - a[1]);
    console.log(
      'still English: ' + worst.map(([area, n]) => `${area} ${n}`).join(', '),
    );
    console.log('A missing key falls back to English, which is correct while the catalogue is partial.');
  }
  return findings.length === 0;
}

/** Names that are capitalised because they are names. `TERMINOLOGY.md` §1. */
const PROPER_NOUNS = [
  'Plotbreak',
  'Plotbreak',
  'Apple',
  'App Store',
  'Google',
  'VoiceOver',
  'Face ID',
  'Touch ID',
];

// --- main ------------------------------------------------------------------

function main(): void {
  const argv = process.argv.slice(2);
  const json = argv.includes('--json');
  const fenced = argv.includes('--fenced');
  const files = argv.filter((a) => !a.startsWith('--'));

  if (argv.includes('--self-test')) {
    process.exitCode = selfTest() > 0 ? 1 : 0;
    return;
  }

  // A bare `npm run fr:lint` used to print usage and exit 0. That is the worst
  // possible behaviour for something people reach for as a gate: it reads as
  // green while checking nothing — and it did. "fr:lint is clean" went into
  // this repo's own notes on the strength of a run that linted no files.
  // The bare form now does what it is almost always meant to do.
  if (argv.includes('--catalog') || files.length === 0) {
    if (files.length === 0 && !argv.includes('--catalog')) {
      console.log('No files given — checking the fr catalogue.');
    }
    process.exitCode = lintCatalogue(json) ? 0 : 1;
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
