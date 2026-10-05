# JuicyRebels project state

## Current — live demo verified, 2026-10-05

Juicy Rebels is live at https://degree-choice.com/ . Exact previous combat18 test remains playable at https://degree-choice.com/archive/combat-18/ . Lead completed the owner-authorized first integration and Degree Choice deployment; other lanes remain read-only until allocated.

Frozen release `juicy-1-d8f015e1-fbfa10c2`, pushed runtime source `d8f015e16053bef684d507d05430445d10f69c21`. New title/menu/HUD/icon, procedural garden/gardener/fruit blasters, three creature behaviors, 90-second rescue, health/win/loss/retry, once-only seeds, visible saved wildflowers/peach lantern/berry jacket and Peach Grove unlock. Accepted combat/input/assist/effects remain unchanged; `?lab=1` opens the reference lab.

Evidence: 23/23 logic tests; queued rendered desktop/two-finger victories, reload, save/purchase/reload, unlock, loss/retry, effects and layouts; actual short-screen menu swipe; public two-finger victory/purchase/reload and lab/archive reopening. All 18 public Juicy and 13 archive hashes match from VPS and Mac. nginx valid, rollback prepared, 86 protected config hashes and main served identity unchanged. No paid job/new service. See [full launch receipt](docs/dev/LAUNCH_RECEIPT.md) and [review](docs/audit/FIRST_LAUNCH_REVIEW.md).

Next dependency: owner play/physical iPhone Safari and Android feel, zoom/safe-area and frame pacing. Chromium emulation is not device acceptance. Local save is prototype progression; multiplayer/accounts/Lemon Burst remain later. No speculative follow-on implementation is active.

[Pre-launch/bootstrap history](docs/dev/history/2026-10-05-pre-launch-state.md). Canonical repo `/Users/domininclynch/Desktop/Business/JuicyRebels`; VPS development checkout `/srv/dev-projects/JuicyRebels`; GitHub `DomLynch/JuicyRebels`.
