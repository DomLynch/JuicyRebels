# Lead Dev — Juicy Rebels first live demo

Owner instruction, 2026-10-05: brief Lead Dev to get the demo live on https://degree-choice.com; archive the current shooting test, then replace it with our new branding/gameplay and playful fruit designs.

This is an implementation and launch assignment, replacing read-only intake. Lead owns all first-playable integration surfaces plus Deploy responsibilities for this first release. Build, verify, archive, publish and report the served result; publication is already authorized once the checks pass. Other lanes remain read-only unless allocated. This brief does not authorize messaging other chats on the owner's behalf.

## Small playable scope

- Replace combat-lab presentation with Juicy Rebels: page title/description/social metadata, manifest, icon, menu and HUD. Use a playful garden/island palette, original readable gardener, fruit weapons and distinct mischievous creatures. Keep the isometric Three.js camera and efficient mobile rendering.
- Blueberry Blaster adapts the rifle; Peach Popper adapts the pistol. Make their fruit projectiles/impacts and silhouettes visibly different. Preserve accepted combat cadence, reload, whole-body facing, partial sticky targeting and strong universal impact effects.
- Left thumb controls movement/facing/targeting; right button only fires. Preserve walking speed 6, 13% linear stick deadzone, steering rate 10, assist gain 0.4125 (+50% over original), acquire 6 degrees / retain 9 degrees, range 6 with distance fade. Do not introduce hard lock or right-button movement. Retain multi-touch and Safari zoom prevention.
- Integrate the existing garden mission scaffold: 90-second rescue, three enemy behaviors and three waves, health/timer/objective, win/loss/retry. Earn seeds once per victory, buy visible plants/lantern/outfit with local save, unlock the next adventure after two wins. Storage failure must not prevent play.
- Lemon Burst, multiplayer, accounts and a server economy remain later work. Prefer simple procedural meshes; use CPU Blender only where it materially improves this small demo. No large art batch is needed for launch.

## Archive and hosting

1. Inspect the current Degree Choice served release before mutation; do not assume the historical combat18 receipt is still current. Preserve exact served files, source/release identity and hashes in an immutable archive plus rollback backup.
2. Provide a stable playable archive, preferably https://degree-choice.com/archive/combat-18/ if that is still the current version; otherwise use its actual release ID. Confirm relative assets/modules and touch controls work under that route. The copied `?lab=1` regression route does not replace an exact archive of the old served payload.
3. Keep development at `/srv/dev-projects/JuicyRebels`; stage a frozen package under `/var/www/juicyrebels/releases` with backup under `/var/backups/juicyrebels`. Change only Degree Choice's domain configuration/current pointer after checks. Do not build inside live web roots.
4. Protect playarmagedom.com: record fresh main-game config/snippet hashes and served revision immediately before activation, verify after, and stop/rollback on an attributable change. Do not edit ARMAGEDOM source, assets, symlinks, releases, backend or vhost. Keep Test-combat Git source untouched.
5. Validate nginx before reload, retain the exact previous Degree Choice config/root, and prepare a concrete rollback command before the switch. Confirm public Juicy content and archived test both match their frozen hashes; no redirect to the main game.

Historical reference only: prototype repo `/Users/domininclynch/Desktop/Business/Test-combat-Armagedom-1`; combat18 source `ab135cc977089c0972d724c0e67c53f7a139cd7e`; release `combat-18-ab135cc9-d6a9e9`; prior root `/var/www/test-combat-armagedom-1/current`; Degree Choice vhost `/etc/nginx/sites-available/degree-choice-armagedom.conf`. Read-only inspection is allowed. Hosting guards can be adapted into Juicy ops without modifying the donor repo.

## Evidence and delivery

Read the actual repo/state/TEAM and installed relevant skills. Run substantial tests, Chromium captures and CPU Blender through the VPS shared queue. Existing 23-test bootstrap evidence covers unchanged baseline inputs only. Any HF job needs actual flavor/rate/auth/persistence verification, an estimated bounded cost, timeout and recovered outputs; no GPU authorization.

Verify meaningful mission/save tests and actual rendered desktop/two-finger play: both weapons/reload, movement/targeting while firing, mission success/failure/retry, once-only seeds, purchases and visible appearance after reload, next-adventure unlock, High versus Off effects, phone/tablet layout, zero console errors and bounded entities. Inspect captures for fruit/garden identity and readability. Review the frozen candidate and resolve actionable findings before activation. Report physical Safari/Android testing separately from Chromium emulation.

Deliver pushed source SHA, frozen package/release hashes, live URL, playable archive URL, rollback details, relevant test/playthrough/capture receipts and protected-main checks. Update PROJECT_STATE.md and the Juicy management handover with actual served status. Do not call the game live until the public verification passes.
