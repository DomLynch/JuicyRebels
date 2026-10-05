# JuicyRebels

Independent mobile-web fruit and garden adventure, built in Three.js. Working title approved by Dom on 5 October 2026.

First playable: a90-second garden rescue, Blueberry Blaster and Peach Popper, three creature behaviors, seed rewards, garden decorations/outfits and a second adventure unlock. Lemon Burst is planned for later.

The first playable includes a procedural garden, three creature behaviors, Blueberry/Peach fruit blasters, win/loss/retry, earned seeds and saved wildflowers/lantern/outfit. Peach Grove unlocks after two rescues. Publication receipts are recorded in docs/dev/LAUNCH_RECEIPT.md when public verification completes.

- [Project state](PROJECT_STATE.md)
- [Team and ownership](docs/TEAM.md)
- [First playable plan](docs/JUICY_REBELS_PLAN.md)
- [Accepted combat integration guide](docs/COMBAT_HANDOFF.md)
- [Infrastructure](ops/README.md)

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm start
```

Garden preview: http://localhost:4173 . Reference lab: `?lab=1`. Logic checks: `npm test`; rendered checks: `npm run test:juicy`, `npm run test:layout`, `npm run test:browser`. Heavy/browser checks go through the workspace VPS runner.

Baseline provenance: independently authored Test-combat-Armagedom-1 runtime `ab135cc977089c0972d724c0e67c53f7a139cd7e`, accepted combat18. Three.js0.186.1 is vendored with its MIT notice. No ARMAGEDOM game code/assets were imported.
