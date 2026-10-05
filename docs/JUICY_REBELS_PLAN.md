# Juicy Rebels first playable — 2026-10-05

Owner approved fruit/garden adventure based on the accepted combat18 prototype. Build in the independent JuicyRebels repository. Owner explicitly authorized replacing Degree Choice with the verified Juicy demo on 2026-10-05, after archiving the currently served test. Lead owns integration and is allocated Deploy responsibilities for this first launch. Main ARMAGEDOM remains outside scope.

Outcome: a short garden-rescue mission with Blueberry Blaster and Peach Popper, three readable enemy behaviors, win/loss/replay, seed rewards, purchasable garden decorations/outfits and a second adventure unlock. Lemon area attack and multiplayer are later work.

Approach: shared accepted input/math/weapon/effects modules; separate Juicy scene and pure mission/progression module. Keep the old combat lab under `?lab=1` for regression checks and the frozen developer handoff. Prefer this to replacing combat18 or adding a game engine/backend. Use low-poly procedural fruit/garden art and bounded creature slots. Local device save only; no accounts or real-money economy.

Steps: implement pure mission/progression and meaningful tests; build scene/HUD/reward garden; run local syntax checks and queued VPS logic + actual-browser play/capture; inspect visuals and fix defects; freeze/hash package; activate independent prototype symlink with protected main-game guard; verify public play/hashes; record receipts.

Success checks: real mouse/two-thumb play, both weapons and reload; three enemy patterns; successful mission grants seeds once, failure/replay works; purchase and appearance survive page reload; second mission unlock works; original combat lab controls/assist/effects still pass; landscape/portrait fit; zero console errors; bounded entities/effects. Actual iPhone/Android feel is owner acceptance after the served revision is verified.

Constraints: walking6,13% linear stick, rate10 steering, whole-body smoothing, +50% partial/sticky assist, FIRE-only and universal effects retained. Physical hit-stop remains presentation-only. No changes to ARMAGEDOM or unrelated hosting/services. Only Degree Choice hosting may change for this authorized launch; CPU resources remain bounded by AGENTS.md. Preserve combat18 release as rollback. Device storage can be unavailable: gameplay must still work and tell the player their garden cannot persist.
