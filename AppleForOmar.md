# Apple account tasks — handoff

Everything that needs the **paid Apple Developer account**, which Malik does not
have. Malik and Claude do everything on the code and Supabase side; the items
below can only be done by whoever owns the Apple org.

Live document — appended to as more is found. Last updated 2026-09-11.

**App:** PLOTBREAK · **Bundle ID:** `com.plotbreak.app` · **Team:** `Q7ZLXMG4SB`

---

## 1. Sign in with Apple — one Apple-side step remains

Supabase is already configured and enabled (done 2026-09-11):
provider `apple` on, **Client IDs** = `com.plotbreak.app`.

**What Omar needs to do:** in *Certificates, Identifiers & Profiles → Identifiers
→ `com.plotbreak.app`*, make sure the **Sign in with Apple** capability is
ticked and saved.

Why it is separate: the app already carries the
`com.apple.developer.applesignin` entitlement in
`apps/mobile/ios/Plotbreak/Plotbreak.entitlements`, but an entitlement is only a
request. The App ID must grant it or the native call fails at runtime with a
signing error rather than a useful message.

**Not needed:** the Apple *Secret Key (for OAuth)* in Supabase. That is only for
web sign-in. This app signs in natively and sends Apple's identity token
straight to Supabase, so there is no OAuth round trip and no six-month key
rotation to worry about.

---

## 2. In-App Purchase products — none of these exist yet

The app sells credit packs. Every one needs a **Consumable** in App Store
Connect with the **exact** product ID below, or that row fails at purchase.

| Product ID | Credits | Bonus | Reference price (USD) |
|---|---|---|---|
| `crd_2000` | 2,000 | — | $2.89 |
| `crd_10000` | 10,000 | +300 | $14.49 |
| `crd_20000` | 20,000 | +1,000 | $28.49 |
| `crd_50000` | 50,000 | +3,500 | $71.00 |
| `crd_100000` | 100,000 | +10,000 | $142.99 |
| `crd_first_21000` | 21,000 | — | $19.99 (first purchase only) |

Notes:

- The prices above are **reference prices only**. They are what the app shows
  before StoreKit answers; the real price and currency come from App Store
  Connect and are what the player is charged. Pick the nearest Apple price
  point — `$2.89` and `$71.00` are copied from a competitor that does not
  appear to bill through Apple, so they may not be selectable.
- `crd_first_21000` is a normal consumable. "First purchase only" is enforced by
  our server, not by Apple.
- Once created, the price shown in the app comes from Apple automatically. No
  code change is needed to adjust prices later.

**Also needed:** the **Paid Applications agreement** must be active (App Store
Connect → Business), with banking and tax forms complete. Until it is, StoreKit
returns no products at all and the whole credit screen looks broken.

---

## 3. Things deliberately NOT built, which are Apple policy decisions

The competitor app being used as a design reference has two features we did not
copy, because both charge outside Apple's IAP:

- **Auto-Reload** ("credits purchased automatically when your balance falls
  below X", via "our payment provider's secure page")
- **"Save 20% on web"**

Both are App Store Review Guideline **3.1.1** violations for digital content
unless the app holds the **External Purchase Link Entitlement**, which is
region-limited and has strict disclosure requirements. If we want either, it is
an entitlement application, not a UI port. Flagging so nobody adds them
casually.

---

## 4. Submission checklist (Apple side)

- [ ] App Store Connect app record for `com.plotbreak.app`
- [ ] Distribution certificate + App Store provisioning profile
- [ ] **App Privacy** questionnaire — the app collects email (sign-in),
      purchases, and usage. Supabase and the model provider are third parties.
- [ ] **Age rating** — this is interactive fiction with mature themes;
      `CONTENT_DESCRIPTORS` in the code lists FANTASY_VIOLENCE, ROMANCE,
      SUGGESTIVE_THEMES, HORROR, PSYCHOLOGICAL_THEMES, ALCOHOL_REFERENCES,
      LANGUAGE, PERMANENT_DEATH, MORAL_AMBIGUITY. Rate honestly; a rating
      appeal is slower than rating correctly.
- [ ] **Export compliance** (uses HTTPS only — standard exemption)
- [ ] Privacy policy URL and Terms URL, both publicly reachable
- [ ] TestFlight build for internal testing before submission

---

## 5. Open questions for Omar

- Which Apple org owns the app long term? The build is currently signed with
  team `Q7ZLXMG4SB` from Malik's machine.
- Is there an existing App Store Connect record, or does one need creating?
