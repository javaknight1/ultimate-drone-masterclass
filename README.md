# The Ultimate Drone Masterclass

A self-contained drone & FPV course — single HTML file, no server required. FPV cockpit / OSD-HUD theme, sidebar navigation, progress tracking, and a hands-on lab at the end of every lesson.

**13 parts · 111 lessons · zero → builder, pilot & operator:**

- **00 · Foundations** — types, flight physics, terminology, choosing your path
- **01 · Components** — frame, motors, ESCs, flight controller, props, LiPo, VTX, GPS
- **02 · Building** — soldering & full FPV-quad assembly from parts
- **03 · Firmware & Software** — Betaflight/INAV/ArduPilot/PX4, flashing, tuning
- **04 · Radio & Control** — ELRS/Crossfire, binding, failsafe, modes, goggles, sims
- **05 · Piloting** — LOS & FPV/acro progression, freestyle, cinematic, recovery
- **06 · Cinematography** — camera settings, ND filters, gimbals, shot types, grading
- **07 · Autonomy & Code** — mission planning, MAVLink, DroneKit/MAVSDK, companion-computer CV
- **08 · Long-Range & HD** — link budget, antennas, ELRS LR, DJI/Walksnail/HDZero
- **09 · Laws & Safety** — registration, Part 107, TRUST, Remote ID, LAANC, LiPo safety
- **10 · Part 107 Exam Prep** — TRUST vs Part 107, airspace classes, reading sectional charts, LAANC, weather, operating rules, test domains & quizzes
- **11 · Uses & Money** — racing, aerial work, mapping, inspection, light shows, and making money
- **12 · Maintenance** — crash diagnosis, repairs, LiPo care, upgrades

Built for **legal, safe** flying — every build/flight lesson includes the safety step, and the regulations part teaches the real current landscape with a reminder to verify FAA/local rules.

## Build

Content lives in `data/<part>.json`. Assemble the single-file app with:

```bash
node build.js
```

No runtime dependencies. Deploys to Cloudflare via `wrangler.jsonc` (Workers Static Assets, directory `.`).
