# Juicy Rebels first live demo — 2026-10-05

Live: https://degree-choice.com/ . Exact shooting-test archive: https://degree-choice.com/archive/combat-18/ . Reference lab: https://degree-choice.com/?lab=1 . Public two-finger playthrough passed on 5 October 2026; physical iPhone/Android acceptance remains open.

## Frozen identities

- Pushed runtime source: `d8f015e16053bef684d507d05430445d10f69c21` ([GitHub](https://github.com/DomLynch/JuicyRebels/commit/d8f015e16053bef684d507d05430445d10f69c21)). Later documentation commits do not change the delivered runtime.
- Release: `juicy-1-d8f015e1-fbfa10c2`.
- Runtime payload manifest SHA256: `fbfa10c27b4864df8f3e629fca0f416dc37b6093fca804ad84761aaebcc437c3`.
- Package TAR SHA256: `0bc0213adfb251182f4123c081403ede11d1056f21243c367041eeb74c8ca886`.
- Release JSON SHA256: `fd902d97ed60b480e11cd644cee6f8615db447e7a0e79c5ac8ef72ef6fb1acf6`.
- Package: `artifacts/release/juicy-1-d8f015e1-fbfa10c2/payload.tar`; full file fingerprints: adjacent `package-receipt.json` and public `/release.json`.
- VPS immutable release: `/var/www/juicyrebels/releases/juicy-1-d8f015e1-fbfa10c2`; current pointer resolves there. No builds ran in this root.

## Checks and review

- 23/23 logic tests passed (`npm test`) in queued job `juicyrebels-2d254efab005`. Its later browser-launch stage failed because the expected Chromium binary was absent; the logic stage itself passed. Pure combat/garden/input/effect/touch/audio/test inputs remain identical. Subsequent browser jobs explicitly use the installed Chromium 1234 path.
- Final candidate rendered checks: queued job `juicyrebels-150d8a06c8de`, exit 0. Desktop and simultaneous two-finger wins, both weapons/reload, three waves/12 creatures, once-only rewards, flowers purchase/reload, second unlock, tougher Peach Grove, earned lantern/outfit and saved appearance, real contact loss/retry, High/Off effects, layouts/cancellation, unavailable storage and no console errors. All 17 package runtime files match this job's staged input hashes exactly.
- Focused menu/layout checks: `juicyrebels-285ef13bd7c8`, exit 0. Actual finger swipe scrolls the short landscape menu; portrait/landscape/tablet/desktop controls fit and gameplay retains touch guards. Captures inspected.
- Exact public archive combat regression: `juicyrebels-2dd20162e5ed`, exit 0, all 12 rendered acceptance scenarios including 6-unit walking, full-body facing, left assist, right FIRE-only, independent releases, both reloads and High/Low/Off.
- Public Juicy play: `juicyrebels-d37f4b1ff942`, exit 0. Exact live release loaded; actual two-finger three-wave victory; earned flowers purchase survives public reload; lab and original archive reopen; no console errors.
- VPS and Mac HTTPS verification: 18/18 Juicy files (17 runtime plus release metadata) and 13/13 archive files match. Mac verifies no-store and SVG MIME. nginx configuration valid; pre-existing unrelated vhost warnings were preserved.
- Distinct Lead source/capture review: [review](../audit/FIRST_LAUNCH_REVIEW.md). Independent Auditor chat was not contacted. Source/input parity, save/rewards, fixed pools, package closure and hosting guards reviewed. Harness observer/numerical-tolerance findings and menu-scroll defect resolved; no accepted combat tuning changed.
- Observed maximum camera amplitude `8.000000000000002` (8-unit bound within rounding), maximum 32 active particles of 48 capacity, maximum 172 total renderer calls including shadows. These are Chromium receipts, not physical-device frame pacing.

Recovered local receipts/logs/captures/video: `artifacts/evidence/{juicy,layout,archive-browser,public-browser}`; original request input digests and job results are included. `artifacts/evidence/activation.json`, `archive.json`, `public-mac.json` and `archive-mac-public.json` hold raw hosting/public identity receipts. Remote job receipts remain under `/srv/dev-jobs/<job>/result.json`.

## Archive, rollback and protected games

Original release `combat-18-ab135cc9-d6a9e9`, source `ab135cc977089c0972d724c0e67c53f7a139cd7e`, archived as exact files under `/var/www/juicyrebels/archives/combat-18`; original release/current pointer untouched. Archive file-manifest SHA256 `8fe80ae65141e39b0ef2371c574e390eff3de9b83da38815558ae4460bf97128`. Backup exact files and original/archived-route Degree Choice configs under `/var/backups/juicyrebels/first-launch-20261005`.

Concrete rollback on the VPS:

```sh
bash /var/backups/juicyrebels/first-launch-20261005/rollback.sh
```

This restores Degree Choice's previous shooting-test root with the playable archive route retained, validates nginx and reloads it. The saved rollback configuration was itself served/checked successfully before Juicy activation. Original pre-archive configuration is also retained. No rollback was needed after successful activation.

Fresh pre/post activation guard: all 86 protected nginx file hashes unchanged; main served URL `https://playarmagedom.com/armagedom/preview/three-20261005-042/` and main index SHA256 `b2ec308f7dad9e1d33286853c618cf21561d7d33c78a1b9bb68d33ca1b5d3fb8` unchanged. Test-combat local Git source is clean. No main ARMAGEDOM/FRONTIERDOM/Frankendom source, assets, pointers or configuration was modified. No paid/HF/Blender job or new service was started.
