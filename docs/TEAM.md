# JuicyRebels team and file ownership

Strategy Dev is the originating chat. Lead Dev integrates the first playable. Startup for all other roles is read-only intake; no automatic full-team implementation or deployment.

| Lane | Ownership and outcome |
| --- | --- |
| Strategy Dev | Product scope, priorities, acceptance; docs/strategy; owner-facing decisions |
| Lead Dev | Integration/frame lifecycle, shared runtime interfaces, root package/config/state; first playable candidate |
| Web & UI | Touch adapter, HUD, menus, viewport/zoom/accessibility; index.html, style.css, src/input.js, src/touch.js after allocation |
| Combat | Weapons, hitscan, assist, direction/effect logic; src/combat.js, src/impact.js and combat tests after allocation |
| Deploy | Dedicated Juicy VPS paths, immutable packaging, protected-host guards, activation/rollback; ops and docs/deploy |
| Backend | Save contract and future authoritative state; current local save only, no new services; docs/backend |
| Auditor | Read-only candidate/source/browser/device-evidence review; docs/audit; no integration/deploy writes |
| World & Art | Garden/fruit/creature visual identity, scene assets, lightweight rendering; art and docs/world-art after allocation |
| Economy & Progression | Seed rewards, unlocks, local garden purchases and balance; src/garden.js/tests after allocation, docs/economy |

Lead may implement all first-playable surfaces while other lanes remain read-only; this avoids overlapping startup edits. Subsequent parallel implementation requires an explicit bounded allocation and interfaces. No lane writes another game's repo/live root.

Thread identities and bootstrap receipts will be recorded in docs/lanes/threads.json. Empty art directories have README placeholders so their intended structure is committed. Follow each lane's brief; preserve historical evidence separately from current status.
