#!/usr/bin/env node
/*
 * build.js — assembles data/<part>.json into the single-file index.html.
 * Replaces the `/​*__LESSONS__*​/[]` marker with the full lesson array,
 * applying canonical part order + numbering and prepending a cover.
 */
const fs = require('fs');
const path = require('path');
const ROOT = __dirname;
const HTML = path.join(ROOT, 'index.html');
const DATA = path.join(ROOT, 'data');

const ORDER = [
  ['p0',  '00 · Foundations', 0],
  ['p1',  '01 · Components', 1],
  ['p2',  '02 · Building', 2],
  ['p3',  '03 · Firmware & Software', 3],
  ['p4',  '04 · Radio & Control', 4],
  ['p5',  '05 · Piloting', 5],
  ['p6',  '06 · Cinematography', 6],
  ['p7',  '07 · Autonomy & Code', 7],
  ['p8',  '08 · Long-Range & HD', 8],
  ['p9',  '09 · Laws & Safety', 9],
  ['p10', '10 · Uses & Money', 10],
  ['p11', '11 · Maintenance', 11],
];

const cover = {
  id: 'cover', part: 'START', nav: 'Welcome', cover: true, html: `
<div class="cover">
<span class="lesson-kicker">link established · zero → pilot &amp; builder</span>
<h2 class="lesson-title">fly<br>everything.</h2>
<p class="lede">The complete path from "I've never touched a drone" to building, flying, filming, automating, and earning with them. Twelve parts: foundations, every component, building from parts, firmware &amp; software, radio &amp; control, piloting, aerial cinematography, autonomy &amp; code, long-range &amp; HD, the law, the markets, and maintenance. Every lesson ends with a hands-on task you actually do.</p>
<div class="grid2">
  <div class="card"><div class="ct">▸ Hands-on every step</div><p>Each lesson ends with a "Hands-On" — solder a joint, flash Betaflight, fly the sim, plan a mission, check airspace. You learn drones by doing, not just reading.</p></div>
  <div class="card"><div class="ct">🔧 Build it yourself</div><p>Know every part — motors, ESCs, flight controller, VTX, LiPo — then assemble and tune a real FPV quad from scratch.</p></div>
  <div class="card"><div class="ct">§ Legal &amp; safe by default</div><p>Registration, Part 107, TRUST, Remote ID, airspace/LAANC, and LiPo &amp; flight safety — taught accurately, with a reminder to verify current rules.</p></div>
  <div class="card"><div class="ct">💸 Fly for fun or for money</div><p>Racing, freestyle, cinematography, mapping, inspection, light shows — plus how to actually make money with a drone.</p></div>
</div>
<h3>How this course is structured</h3>
<p>Twelve parts that build on each other — start with Foundations, then follow the path from parts to building to flying to filming to automating to shipping a service. Mark lessons complete as you go; your progress bar lives in the sidebar.</p>
<div class="box danger"><div class="bt">Safety first, always.</div> LiPo batteries can catch fire and spinning props cut — every build and flight lesson includes the safety step. Never skip it, and never fly outside the law.</div>
</div>
` };

function main() {
  const all = [cover];
  let total = 0;
  for (const [id, label, n] of ORDER) {
    const file = path.join(DATA, id + '.json');
    if (!fs.existsSync(file)) { console.error('MISSING data/' + id + '.json'); process.exit(1); }
    let arr;
    try { arr = JSON.parse(fs.readFileSync(file, 'utf8')); }
    catch (e) { console.error('BAD JSON in data/' + id + '.json: ' + e.message); process.exit(1); }
    arr.forEach((les, i) => {
      les.part = label;
      les.num = n + '.' + (i + 1);
      les.kicker = 'Part ' + String(n).padStart(2, '0') + ' · Lesson ' + (i + 1);
      all.push(les);
    });
    total += arr.length;
    console.log('  ' + label.padEnd(26) + arr.length + ' lessons');
  }
  let html = fs.readFileSync(HTML, 'utf8');
  const MARK = '/*__LESSONS__*/[]';
  if (!html.includes(MARK)) { console.error('marker not found'); process.exit(1); }
  let json = JSON.stringify(all).replace(/<\/script/gi, '<\\/script');
  html = html.replace(MARK, () => json);
  fs.writeFileSync(HTML, html);
  console.log('\nInjected ' + total + ' lessons (+cover) across ' + ORDER.length + ' parts → index.html (' + Math.round(html.length / 1024) + ' KB)');
}
main();
