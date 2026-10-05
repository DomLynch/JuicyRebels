# JuicyRebels infrastructure

- Mac source: `/Users/domininclynch/Desktop/Business/JuicyRebels`
- GitHub origin: `https://github.com/DomLynch/JuicyRebels.git`
- VPS development checkout: `/srv/dev-projects/JuicyRebels`
- VPS queued jobs: `/srv/dev-jobs/juicyrebels-<unique-id>` through the shared runner
- Dedicated future releases: `/var/www/juicyrebels/releases/<release-id>`
- Future current pointer: `/var/www/juicyrebels/current` (absent until validated activation)
- Dedicated rollback: `/var/backups/juicyrebels/<release-id>`

VPS key/routes and queue policy are inherited from Business and installed skills, not copied into credentials files. Source checkout is separate from live release storage. No service, port, DNS/vhost or live symlink is changed by this bootstrap. Degree Choice remains assigned to the combat prototype until the Juicy release passes its activation gates. Deploy must inspect current serving state and protected main-game hashes before switching only the approved domain.

## CPU art resources

Owner authorized Blender and bounded HF Pro32GB CPU work (owner-described$0.03/hour), in addition to the32GB VPS. Live flavor/pricing/access must be confirmed before a paid job; no HF machine is started by setup. Use project-owned artifact namespaces, persistence and timeout/cost receipts; stop only owned jobs/resources. GPU work is outside this authorization. Relevant skills and queue rules are in AGENTS.md.
