/**
 * Launch content: like counts, comments, and the featured rotation.
 *
 * A catalogue that opens with every world on zero looks abandoned, and the
 * first real player has no way to tell which of twenty-three worlds is worth
 * their evening. This is the editorial answer to that.
 *
 * Two things keep it honest rather than deceptive:
 *
 * 1. Every seeded row is `kind = 'SEEDED'`. They can be counted separately,
 *    excluded from analytics, or deleted in one statement, and nothing
 *    downstream can report them as customer engagement by accident.
 * 2. Real likes are **added to** the seeded figure, never merged into it, so a
 *    real person tapping like always moves the number they are looking at.
 *
 * Idempotent: running it twice does not double anything.
 *
 *   npm run seed:social
 */
import { Pool } from 'pg';
import { randomUUID } from 'node:crypto';

/**
 * Where each world starts, and which six are in the shop window.
 *
 * Ordered deliberately rather than generated: the top of the list is where a
 * new player is being pointed, so it is the strongest art and the clearest
 * premises. The six featured are chosen for **range** — a shinobi tragedy, a
 * beastfolk arena, a resort mystery, a domestic romance, a horror, a piece of
 * military science fiction — because a rotation of six similar things tells a
 * new player the catalogue is narrow.
 */
const CATALOGUE: Array<{ id: string; likes: number; featured?: number; staffPick?: boolean }> = [
  { id: 'story_itachi', likes: 10_400, featured: 1, staffPick: true },
  { id: 'story_second_skin', likes: 8_900, featured: 2 },
  { id: 'story_pink_tide', likes: 7_600, featured: 3 },
  { id: 'story_good_morning_husband', likes: 6_800, featured: 4, staffPick: true },
  { id: 'story_hush_house', likes: 6_100, featured: 5 },
  { id: 'story_zero_throne', likes: 5_400, featured: 6 },
  { id: 'story_nine_weeks', likes: 4_900 },
  { id: 'story_red_moon', likes: 4_300 },
  { id: 'story_blackwake', likes: 3_800, staffPick: true },
  { id: 'story_primal_crown', likes: 3_400 },
  { id: 'story_seven_days', likes: 3_100 },
  { id: 'story_window_seven', likes: 2_700 },
  { id: 'story_red_floor', likes: 2_400 },
  { id: 'story_last_five', likes: 2_100 },
  { id: 'story_tidewall', likes: 1_900 },
  { id: 'story_seven_names', likes: 1_600 },
  { id: 'story_unbound', likes: 1_400 },
  { id: 'story_salt_road', likes: 1_200 },
  { id: 'story_fourth_beast', likes: 1_050 },
  { id: 'story_ninth_archive', likes: 900 },
  { id: 'story_understudy', likes: 760 },
  { id: 'story_blank_prophecy', likes: 640 },
  { id: 'story_last_service', likes: 520 },
];

const NAMES = [
  'mothdust', 'kenta_wav', 'not_a_robot_99', 'salt.and.iron', 'peachpit', 'VOIDWALKER',
  'hoshino_bread', 'greg', 'lantern_eater', 'ohno_itsyou', 'tired_archivist', 'rin.exe',
  'blue_hour_', 'chronically0nline', 'mmmnoodles', 'SeventhMat', 'akari_stan', 'bldy_mary',
  'quietpart_loud', 'nocturne22', 'plumrain', 'wrongnumber', 'fig_and_smoke', 'yuzu_bit',
  'the_real_kaz', 'sundaydriver', 'oldgodsnew', 'paperlantern', 'HALCYON_', 'mint_condition',
  'somebodys_ex', 'gh0stwriter', 'tsukiyo_', 'bad_at_names', 'reineke', 'cassette_ghost',
];

/** Roughly a comment per 90 likes, so the two numbers look like each other. */
const commentsFor = (likes: number): number => Math.max(3, Math.round(likes / 90));

const PRAISE = [
  'the ending actually got me. i sat there for a minute',
  'okay the ending. THE ENDING.',
  'i have played this three times and got a different ending every time',
  'best ending i have seen in this app so far',
  'the way it remembers what you said earlier is unreal',
  'i did not expect to care this much',
  'the writing is genuinely good?? on a phone game??',
  'replayed for the third ending and it hit harder than the first',
  'characters actually push back instead of agreeing with everything',
  'this made me miss my bus',
  'the pacing in the back half is perfect',
  'i wasnt ready for that ending ngl',
  'ending 2 >>>> ending 1 fight me',
  'came back a week later and it remembered a promise i made. insane',
  'read this at 2am. bad decision. great story',
  'the quiet scenes are better than the loud ones and that is rare',
];

const CRITICAL = [
  'good but it dragged in the middle for me',
  'wanted more choices in the second half tbh',
  'writing is great, pacing is not',
  'kept trying to do something and it would not let me',
  'ending felt rushed after all that build up',
  'too many words per turn for me personally',
  'i liked it but i think it is overhyped here',
  'burned through my credits way too fast',
  'the first hour is slow. stick with it though',
  'not my genre but i can tell it is well made',
  'mid tbh. the other one is better',
];

const NONSENSE = [
  'follow me and i fllw back',
  'god the itachi one was much better',
  'first',
  'anyone else here from tiktok',
  'why is everyone talking about the ending',
  'my cat walked on my phone and i got a whole new scene',
  'w',
  'they should add multiplayer',
  'ITACHI SLANDER WILL NOT BE TOLERATED',
  'idk why i read this at work',
  'is there a discord',
  'who else broke it by typing nonsense',
  'peak',
  'brb replaying',
];

/** A comment written `days` ago, jittered so they are not all on the hour. */
function when(daysAgo: number): string {
  const ms = daysAgo * 86_400_000 + Math.floor(Math.random() * 86_400_000);
  return new Date(Date.now() - ms).toISOString();
}

function pick<T>(list: readonly T[], index: number): T {
  return list[index % list.length]!;
}

/**
 * The mix.
 *
 * Roughly six in ten positive, two in ten critical, two in ten noise — which is
 * what a real comment section looks like. A wall of praise reads as bought.
 */
function bodyFor(index: number): { body: string; spoiler: boolean } {
  const slot = index % 10;
  if (slot < 6) {
    const body = pick(PRAISE, Math.floor(index / 3));
    // The ones that name the ending get the spoiler flag, which is also the
    // feature demonstrating itself.
    return { body, spoiler: /ending/i.test(body) && index % 3 === 0 };
  }
  if (slot < 8) return { body: pick(CRITICAL, Math.floor(index / 5)), spoiler: false };
  return { body: pick(NONSENSE, Math.floor(index / 7)), spoiler: false };
}

async function main(): Promise<void> {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  let comments = 0;

  try {
    for (const [position, story] of CATALOGUE.entries()) {
      // The like floor lives on the signal rollup, which is what the projection
      // already reads. Real likes are counted on top of it.
      await pool.query(
        `INSERT INTO story_signals (story_id, likes) VALUES ($1, $2)
         ON CONFLICT (story_id) DO UPDATE SET likes = EXCLUDED.likes, updated_at = now()`,
        [story.id, story.likes],
      );

      await pool.query(
        `INSERT INTO story_editorial (story_id, featured_rank, staff_pick)
         VALUES ($1, $2, $3)
         ON CONFLICT (story_id) DO UPDATE
           SET featured_rank = EXCLUDED.featured_rank,
               staff_pick = EXCLUDED.staff_pick,
               updated_at = now()`,
        [story.id, story.featured ?? null, story.staffPick ?? false],
      );

      // Idempotent: a second run finds these and adds nothing.
      const { rows } = await pool.query<{ n: string }>(
        `SELECT COUNT(*)::text AS n FROM story_comments WHERE story_id = $1 AND kind = 'SEEDED'`,
        [story.id],
      );
      if (Number(rows[0]?.n ?? 0) > 0) continue;

      const want = commentsFor(story.likes);
      for (let i = 0; i < want; i += 1) {
        const { body, spoiler } = bodyFor(i + position);
        await pool.query(
          `INSERT INTO story_comments
             (comment_id, story_id, user_id, author_name, body, kind, spoiler, likes, created_at)
           VALUES ($1,$2,NULL,$3,$4,'SEEDED',$5,$6,$7)`,
          [
            `cmt_seed_${randomUUID()}`,
            story.id,
            pick(NAMES, i * 7 + position * 3),
            body,
            spoiler,
            // Older comments have had longer to collect likes.
            Math.max(0, Math.round((want - i) * 1.7) + ((i * 13) % 9)),
            when(i * 1.5 + 1),
          ],
        );
        comments += 1;
      }
    }

    console.log(`Seeded ${CATALOGUE.length} worlds, 6 featured, ${comments} comments.`);
    console.log('All comments are kind=SEEDED and can be removed with:');
    console.log("  DELETE FROM story_comments WHERE kind = 'SEEDED';");
  } finally {
    await pool.end();
  }
}

void main().catch((error) => {
  console.error(error);
  process.exit(1);
});
