# JuicyRebels

Independent mobile-web fruit and garden adventure, built in Three.js. Working title approved by Dom on 5 October 2026.

First playable: a90-second garden rescue, Blueberry Blaster and Peach Popper, three creature behaviors, seed rewards, garden decorations/outfits and a second adventure unlock. Lemon Burst is planned for later.

The repository currently contains the accepted combat18 foundation plus an initial mission/progression module. **The Juicy game scene is not yet implemented or published.** The existing Degree Choice page remains the separate combat prototype until a validated Juicy release is activated.

- [Project state](PROJECT_STATE.md)
- [Team and ownership](docs/TEAM.md)
- [First playable plan](docs/JUICY_REBELS_PLAN.md)
- [Accepted combat integration guide](docs/COMBAT_HANDOFF.md)
- [Infrastructure](ops/README.md)

```sh
npm ci --ignore-scripts --no-audit --no-fund
npm start
```

Current inherited scene: http://localhost:4173 . Logic checks: `npm test`. Heavy/browser checks go through the workspace VPS runner.

Baseline provenance: independently authored Test-combat-Armagedom-1 runtime `ab135cc977089c0972d724c0e67c53f7a139cd7e`, accepted combat18. Three.js0.186.1 is vendored with its MIT notice. No ARMAGEDOM game code/assets were imported.
