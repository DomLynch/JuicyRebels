# First playable integration

Lead owns all first-launch implementation and Degree Choice activation surfaces under docs/TEAM.md. Other lanes have no write allocation for this launch.

`src/main.js` adapts the accepted frame lifecycle to the Juicy garden. `src/garden.js` owns pure mission/progression; render slots mirror its mobs. Garden/win/loss menus call start/home; once-only completion saves seeds/wins. Purchase buttons save and update visible wildflowers, peach lantern and jacket. Blueberry/Peach names and models are presentation adaptations of the unchanged rifle/pistol contracts.

`src/lab.js`, `lab.html` and `lab.css` preserve the donor reference. `?lab=1` opens the lab. The separate public combat archive preserves the actual original served bytes and is the rollback payload.

Checks: `npm test`, `npm run test:juicy`, `npm run test:layout`, `npm run test:browser`. Substantial runs use queued VPS with the installed Chromium path. The static runtime needs no build step. `ops/package.py` freezes committed runtime; `ops/launch.py` archives/activates only Degree Choice with public hashes and protected-host guards. Credentials stay outside source/package.
