# JuicyRebels project state

## Current — independent setup, 2026-10-05

Owner approved the fruit/garden action concept and requested a separate Mac/GitHub/VPS project with named Codex lanes. Canonical root `/Users/domininclynch/Desktop/Business/JuicyRebels`; remote `DomLynch/JuicyRebels`; VPS checkout `/srv/dev-projects/JuicyRebels`.

Accepted baseline: independently authored combat18 source `ab135cc977089c0972d724c0e67c53f7a139cd7e`. Existing runtime modules and18 logic tests are seeded; src/garden.js is an initial three-wave90-second mission/local progression scaffold moved from the two new uncommitted Juicy files in the prototype. Juicy scene integration, mission playthrough and seed/garden visual acceptance are pending. No new live release is claimed.

Scope: Blueberry Blaster, Peach Popper, three enemies, short rescue, seed rewards, decorations/outfit and second adventure unlock. Keep left movement/targeting, right FIRE-only, walking6,13% linear stick, rate10 turn smoothing, full-body facing, +50% partial/sticky assist and universal effects. No multiplayer/backend service or Lemon Burst yet.

Ownership: Strategy Dev is the originating chat; Lead Dev is the first playable integration owner. Other lanes start with bounded read-only intake. [Team](docs/TEAM.md) / [plan](docs/JUICY_REBELS_PLAN.md).

Hosting: Degree Choice currently serves the old independent combat prototype. Juicy web root reserved separately under `/var/www/juicyrebels`; setup must not switch the existing vhost or modify main ARMAGEDOM. First release needs frozen hashes, real browser play/capture, reviewer findings resolved and dedicated Deploy activation with rollback.

Next: finish checked workspace/lane bootstrap; Lead Dev implement/test the first playable within this repo, then provide frozen candidate to Auditor/Deploy. Native mobile feel remains owner acceptance.
