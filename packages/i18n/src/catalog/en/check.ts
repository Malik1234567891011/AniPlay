/**
 * What the dice are being rolled for, as the player sees it.
 *
 * These are produced by `packages/engine/src/resolve.ts`, which had them as
 * English literals — so a French session rolled "Strike Sasuke" and carried a
 * status called "Shaken". The engine already takes the session locale (see
 * `beyondName`) and already depends on this package, so the words live here
 * and the engine looks them up.
 *
 * English values are exactly what the engine emitted before, so nothing in
 * English changes.
 */
export const check = {
  'check.persuade': 'Persuade {name}',
  'check.deceive': 'Deceive {name}',
  'check.threaten': 'Intimidate {name}',
  'check.oppose_character': 'Stand up to {name}',
  'check.help_character': 'Side with {name}',
  'check.strike': 'Strike {name}',
  'check.take': 'Take {name}',
  /** The fallback when the item could not be named. */
  'check.take_it': 'it',
  'check.inspect': 'Investigate',
  'check.hide': 'Stealth',
  'check.steal': 'Sleight of hand',
  'check.interact': 'Interact',
  'check.defend': 'Brace',
  'check.help': 'Assist',
  'check.oppose': 'Resist',
  'check.custom': 'Attempt',
  'check.move': 'Move',
  'status.shaken': 'Shaken',
  'status.shaken_description': 'That took more out of you than it should have.',
} as const;
