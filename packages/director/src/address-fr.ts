/**
 * `tu` or `vous`, per ordered pair. Step 9.
 *
 * The single loudest signal that a French text was written in French. English
 * has no second person to get wrong, so nothing here has an English half and
 * nothing here runs in an English session — but in French, every line of
 * dialogue picks one, and picking the wrong one is the difference between a
 * character who knows you and a character who is reading from a form.
 *
 * Two things had to be true for this to be worth building:
 *
 * 1. It must not drift between the two model stages. So it is projected in
 *    `speaker-brief.ts`, which exists for exactly that reason, and both the
 *    streaming writer and the structured one read it from there.
 * 2. It must be *authorable*. A rule cannot know that Nine Weeks is a summer
 *    job where everybody is nineteen and Window Seven is a professional pairing
 *    where the switch is the whole arc. `CharacterDef.addressMode` is how a
 *    world says so; this file is what happens when it does not.
 *
 * See `DIALOGUE_AND_REGISTER.md` §2.2–2.4.
 */
import type { AddressMode, AddressPair, CharacterDef, RelationshipState } from '@aniplay/contracts';

/**
 * Roles that start on `vous` to the player, in French.
 *
 * Matched on the authored `role` string, which is free text, so this is a
 * heuristic and is meant to be. The cost of being wrong is one register too
 * formal on turn one, which reads as a character being correct rather than as
 * a bug — and a world that cares says so in `addressMode` instead.
 */
const FORMAL_ROLE =
  /\b(?:capitaine|captain|commandant|commander|directeur|director|dr|docteur|doctor|professeur|professor|ma[îi]tre|officer|officier|warden|inspector|inspecteur|lieutenant|sergent|sergeant|general|général|ambassad|minist|patron|employer|landlord|propriétaire|handler|traitant|client)\b/i;

/**
 * Roles the player is written as addressing formally even when they are
 * addressed as `tu` — the asymmetry that *is* the power relation.
 */
const AUTHORITY_OVER_PLAYER =
  /\b(?:drillmaster|instructeur|instructor|coach|entra[îi]neur|teacher|enseignant|warden|superior|supérieur|commandant|commander|handler|traitant)\b/i;

/** Children, animals, gods and the dead. French tutoies all four. */
const ALWAYS_TU = /\b(?:enfant|child|kid|petit|petite|chien|chat|animal|dieu|god|déesse|esprit|spirit|fant[ôo]me|ghost|mort|dead)\b/i;

/**
 * Where a pair starts when the world did not say.
 *
 * Deliberately conservative in one direction: when nothing suggests formality,
 * the answer is `TU`. Most casts in this catalogue are peers of roughly the
 * player's age — crews, classmates, teammates — and among French people under
 * about twenty-five `tu` is instant and unremarkable. Defaulting to `vous`
 * would make every world sound like a legal deposition.
 *
 * Hostility does **not** restore formality. A peer who despises the player
 * stays on `tu`, because `tu` plus contempt is far more aggressive in French
 * than `vous` — reaching for `vous` in a fight is a specific, cold move and
 * belongs to `pendingShift`, not to a starting value.
 */
export function derivedAddress(def: Pick<CharacterDef, 'role' | 'addressMode'>): AddressPair {
  if (def.addressMode) {
    return { toPlayer: def.addressMode.toPlayer, fromPlayer: def.addressMode.fromPlayer, pendingShift: null };
  }

  const role = def.role ?? '';
  if (ALWAYS_TU.test(role)) return { toPlayer: 'TU', fromPlayer: 'TU', pendingShift: null };

  // An authority figure is addressed as `vous` and often answers with `tu`.
  // The asymmetry is the point and must not be flattened.
  if (AUTHORITY_OVER_PLAYER.test(role)) {
    return { toPlayer: 'TU', fromPlayer: 'VOUS', pendingShift: null };
  }
  if (FORMAL_ROLE.test(role)) {
    return { toPlayer: 'VOUS', fromPlayer: 'VOUS', pendingShift: null };
  }
  return { toPlayer: 'TU', fromPlayer: 'TU', pendingShift: null };
}

/**
 * The live value: what the run has moved it to, or where it started.
 *
 * Always read through this. `RelationshipState.address` is `.optional()` so
 * that no fixture or spec had to change, which means "absent" is the common
 * case and means *nothing has moved it yet*, not *unknown*.
 */
export function addressState(
  def: Pick<CharacterDef, 'role' | 'addressMode'>,
  relationship: Pick<RelationshipState, 'address'> | undefined,
): AddressPair {
  return relationship?.address ?? derivedAddress(def);
}

/** The French words, for a prompt a French model reads. */
export function addressWord(mode: AddressMode): string {
  return mode === 'TU' ? 'tu' : 'vous';
}

/**
 * One line of instruction per speaker, in French.
 *
 * Written as an instruction rather than a data field because this is the form
 * the writer actually obeys — a bare `toPlayer: "VOUS"` in a JSON blob gets
 * ignored roughly half the time, and the failure is silent and invisible in
 * review.
 */
export function addressInstruction(name: string, pair: AddressPair): string {
  const parts = [
    `${name} dit « ${addressWord(pair.toPlayer)} » au joueur`,
    `le joueur dit « ${addressWord(pair.fromPlayer)} » à ${name}`,
  ];
  if (pair.pendingShift) {
    parts.push(
      `ce beat joue le passage à « ${addressWord(pair.pendingShift.to)} » : ${pair.pendingShift.because}. ` +
        'Le passage se joue une fois, il se remarque, et ensuite il tient.',
    );
  }
  return parts.join(' ; ') + '.';
}
