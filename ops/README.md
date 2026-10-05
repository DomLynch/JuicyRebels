# JuicyRebels infrastructure

- Mac source: `/Users/domininclynch/Desktop/Business/JuicyRebels`
- GitHub origin: `https://github.com/DomLynch/JuicyRebels.git`
- VPS development checkout: `/srv/dev-projects/JuicyRebels`
- VPS queued jobs: `/srv/dev-jobs/juicyrebels-<unique-id>` through the shared runner
- Dedicated future releases: `/var/www/juicyrebels/releases/<release-id>`
- Future current pointer: `/var/www/juicyrebels/current` (absent until validated activation)
- Dedicated rollback: `/var/backups/juicyrebels/<release-id>`

VPS key/routes and queue policy are inherited from Business and installed skills, not copied into credentials files. Source checkout is separate from live release storage. No service, port, DNS/vhost or live symlink is changed by this bootstrap. Degree Choice remains assigned to the combat prototype until the Juicy release passes its activation gates. Deploy must inspect current serving state and protected main-game hashes before switching only the approved domain.
