# JuicyRebels infrastructure

- Mac source: `/Users/domininclynch/Desktop/Business/JuicyRebels`
- GitHub origin: `https://github.com/DomLynch/JuicyRebels.git`
- VPS development checkout: `/srv/dev-projects/JuicyRebels`
- VPS queued jobs: `/srv/dev-jobs/juicyrebels-<unique-id>` through the shared runner
- Immutable releases: `/var/www/juicyrebels/releases/<release-id>`
- Current pointer: `/var/www/juicyrebels/current` (activated after verified first launch)
- Dedicated rollback: `/var/backups/juicyrebels/<release-id>`

VPS key/routes and queue policy are inherited from Business and installed skills, not copied into credentials files. Source checkout is separate from live release storage. The authorized first launch changed only Degree Choice hosting to Juicy release `juicy-1-d8f015e1-fbfa10c2`. Exact old payload: `/var/www/juicyrebels/archives/combat-18`. Backup/config/rollback: `/var/backups/juicyrebels/first-launch-20261005`. Public payload/archive checks and protected-main guards passed. See [launch receipt](../docs/dev/LAUNCH_RECEIPT.md). No new service/port/DNS or paid compute was needed.

## CPU art resources

Owner authorized Blender and bounded HF Pro32GB CPU work (owner-described$0.03/hour), in addition to the32GB VPS. Live flavor/pricing/access must be confirmed before a paid job; no HF machine is started by setup. Use project-owned artifact namespaces, persistence and timeout/cost receipts; stop only owned jobs/resources. GPU work is outside this authorization. Relevant skills and queue rules are in AGENTS.md.
