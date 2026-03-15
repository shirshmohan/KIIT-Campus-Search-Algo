/* ============================================================
   KIIT Campus Graph Search Visualizer
   Leaflet.js + OpenStreetMap (CARTO dark tiles)
   OSRM for real road routing — no API key required
   Emoji markers per campus type + legend panel
   ============================================================ */

// ── CAMPUS DATA ───────────────────────────────────────────────
const CAMPUSES = {
  "Campus 1":  { lat: 20.346588, lng: 85.823628, emoji: "🏫", desc: "KIIT International School" },
  "Campus 2":  { lat: 20.353611, lng: 85.819231, emoji: "🔧", desc: "Polytechnic" },
  "Campus 3":  { lat: 20.353813, lng: 85.816548, emoji: "🔬", desc: "OAT & Research Innovation" },
  "Campus 4":  { lat: 20.354212, lng: 85.820671, emoji: "💼", desc: "Training & Placement" },
  "Campus 5":  { lat: 20.352994, lng: 85.814337, emoji: "🏥", desc: "School of Medical Sciences" },
  "Campus 6":  { lat: 20.354204, lng: 85.819070, emoji: "❤️", desc: "ILOVEKIIT" },
  "Campus 7":  { lat: 20.350960, lng: 85.819513, emoji: "🌿", desc: "MBA Garden" },
  "Campus 8":  { lat: 20.351564, lng: 85.818995, emoji: "⚙️", desc: "School of Mechanical Engg" },
  "Campus 9":  { lat: 20.353588, lng: 85.811733, emoji: "🏛️", desc: "Campus 9" },
  "Campus 10": { lat: 20.364279, lng: 85.812222, emoji: "👥", desc: "School of Social Sciences" },
  "Campus 11": { lat: 20.359166, lng: 85.822168, emoji: "🧬", desc: "School of Biotechnology" },
  "Campus 12": { lat: 20.355618, lng: 85.820831, emoji: "⚡", desc: "School of Electronics" },
  "Campus 13": { lat: 20.356679, lng: 85.819119, emoji: "🏅", desc: "Sports Complex" },
  "Campus 14": { lat: 20.357038, lng: 85.815250, emoji: "📖", desc: "IGNOU Study Centre" },
  "Campus 15": { lat: 20.349957, lng: 85.815743, emoji: "💻", desc: "Old School of CSE" },
  "Campus 16": { lat: 20.362152, lng: 85.823422, emoji: "⚖️", desc: "School of Law" },
  "Campus 17": { lat: 20.349258, lng: 85.820649, emoji: "🏗️", desc: "Architecture Building" },
  "Campus 18": { lat: 20.356172, lng: 85.824612, emoji: "📡", desc: "School of Mass Comm" },
  "Campus 19": { lat: 20.354017, lng: 85.820317, emoji: "🚗", desc: "Automotive Mechatronics" },
  "Campus 20": { lat: 20.354179, lng: 85.817762, emoji: "📚", desc: "Central Library" },
  "Campus 21": { lat: 20.355500, lng: 85.817277, emoji: "📊", desc: "School of Management" },
  "Campus 22": { lat: 20.354578, lng: 85.815152, emoji: "💡", desc: "Research & Innovation" },
  "Campus 23": { lat: 20.356172, lng: 85.824812, emoji: "📰", desc: "School of Mass Comm Annex" },
  "Campus 24": { lat: 20.354017, lng: 85.820517, emoji: "🔩", desc: "Automotive Mechatronics Annex" },
  "Campus 25": { lat: 20.364674, lng: 85.817519, emoji: "🖥️", desc: "School of CSE" },
};

// ── GRAPH ─────────────────────────────────────────────────────
const GRAPH = {
  "Campus 1":  { "Campus 7": 1, "Campus 17": 1 },
  "Campus 2":  { "Campus 4": 1, "Campus 6": 1, "Campus 8": 1 },
  "Campus 3":  { "Campus 5": 1, "Campus 20": 1, "Campus 22": 1 },
  "Campus 4":  { "Campus 2": 1, "Campus 6": 1, "Campus 12": 1, "Campus 19": 1 },
  "Campus 5":  { "Campus 3": 1, "Campus 9": 1, "Campus 15": 1, "Campus 22": 1 },
  "Campus 6":  { "Campus 2": 1, "Campus 4": 1, "Campus 19": 1, "Campus 20": 1 },
  "Campus 7":  { "Campus 1": 1, "Campus 8": 1, "Campus 17": 1 },
  "Campus 8":  { "Campus 2": 1, "Campus 7": 1, "Campus 17": 1 },
  "Campus 9":  { "Campus 5": 1, "Campus 14": 1, "Campus 22": 1 },
  "Campus 10": { "Campus 25": 1, "Campus 14": 1 },
  "Campus 11": { "Campus 13": 1, "Campus 16": 1, "Campus 18": 1 },
  "Campus 12": { "Campus 4": 1, "Campus 13": 1, "Campus 19": 1 },
  "Campus 13": { "Campus 11": 1, "Campus 12": 1, "Campus 14": 1, "Campus 21": 1 },
  "Campus 14": { "Campus 9": 1, "Campus 10": 1, "Campus 13": 1, "Campus 22": 1 },
  "Campus 15": { "Campus 5": 1, "Campus 17": 1, "Campus 22": 1 },
  "Campus 16": { "Campus 11": 1, "Campus 18": 1, "Campus 25": 1 },
  "Campus 17": { "Campus 1": 1, "Campus 7": 1, "Campus 8": 1, "Campus 15": 1 },
  "Campus 18": { "Campus 11": 1, "Campus 16": 1, "Campus 23": 1 },
  "Campus 19": { "Campus 4": 1, "Campus 6": 1, "Campus 12": 1, "Campus 24": 1 },
  "Campus 20": { "Campus 3": 1, "Campus 6": 1, "Campus 21": 1 },
  "Campus 21": { "Campus 13": 1, "Campus 20": 1, "Campus 22": 1 },
  "Campus 22": { "Campus 3": 1, "Campus 5": 1, "Campus 9": 1, "Campus 14": 1, "Campus 15": 1, "Campus 21": 1 },
  "Campus 23": { "Campus 18": 1, "Campus 16": 1 },
  "Campus 24": { "Campus 19": 1, "Campus 4": 1 },
  "Campus 25": { "Campus 10": 1, "Campus 14": 1, "Campus 16": 1 },
};

// ── PSEUDOCODE ────────────────────────────────────────────────
const PSEUDOCODES = {
  BFS: [
    '<span class="pk">function</span> <span class="pf">BFS</span>(start, goal):',
    '<span class="i1">queue ← [start]</span>',
    '<span class="i1">visited ← {start}</span>',
    '<span class="i1"><span class="pk">while</span> queue not empty:</span>',
    '<span class="i2">node ← queue.dequeue()</span>',
    '<span class="i2"><span class="pk">if</span> node == goal: <span class="pk">return</span> path</span>',
    '<span class="i2"><span class="pk">for</span> each neighbour:</span>',
    '<span class="i2">  <span class="pk">if</span> not visited:</span>',
    '<span class="i2">    queue.enqueue(nb)</span>',
    '<span class="i2">    visited.add(nb)</span>',
  ],
  DFS: [
    '<span class="pk">function</span> <span class="pf">DFS</span>(start, goal):',
    '<span class="i1">stack ← [start]</span>',
    '<span class="i1">visited ← {}</span>',
    '<span class="i1"><span class="pk">while</span> stack not empty:</span>',
    '<span class="i2">node ← stack.pop()</span>',
    '<span class="i2"><span class="pk">if</span> node == goal: <span class="pk">return</span> path</span>',
    '<span class="i2"><span class="pk">if</span> node not visited:</span>',
    '<span class="i2">  visited.add(node)</span>',
    '<span class="i2">  <span class="pk">for</span> each neighbour:</span>',
    '<span class="i2">    stack.push(nb)</span>',
  ],
  Dijkstra: [
    '<span class="pk">function</span> <span class="pf">Dijkstra</span>(start, goal):',
    '<span class="i1">dist[start] ← 0, dist[*] ← ∞</span>',
    '<span class="i1">pq ← MinPriorityQueue()</span>',
    '<span class="i1">pq.insert(start, 0)</span>',
    '<span class="i1"><span class="pk">while</span> pq not empty:</span>',
    '<span class="i2">u ← pq.extractMin()</span>',
    '<span class="i2"><span class="pk">if</span> u == goal: <span class="pk">return</span></span>',
    '<span class="i2"><span class="pk">for</span> (v, w) in adj[u]:</span>',
    '<span class="i2">  <span class="pk">if</span> dist[u]+w &lt; dist[v]:</span>',
    '<span class="i2">    dist[v] ← dist[u]+w</span>',
  ],
  AStar: [
    '<span class="pk">function</span> <span class="pf">A*</span>(start, goal):',
    '<span class="i1">open ← {start}, g[start] ← 0</span>',
    '<span class="i1">f[start] ← h(start, goal)</span>',
    '<span class="i1"><span class="pk">while</span> open not empty:</span>',
    '<span class="i2">u ← node in open with min f</span>',
    '<span class="i2"><span class="pk">if</span> u == goal: <span class="pk">return</span></span>',
    '<span class="i2"><span class="pk">for</span> (v, w) in adj[u]:</span>',
    '<span class="i2">  tentG ← g[u] + w</span>',
    '<span class="i2">  <span class="pk">if</span> tentG &lt; g[v]:</span>',
    '<span class="i2">    f[v] ← tentG + h(v, goal)</span>',
  ],
};

// ── COLOURS ───────────────────────────────────────────────────
const COL = {
  default:  '#00d4ff',
  start:    '#00e87a',
  end:      '#ff2d55',
  visited:  '#ffd200',
  frontier: '#a855f7',
  path:     '#ff2d55',
};

// ── STATE ─────────────────────────────────────────────────────
let map, markers = {}, edgeRoadLayers = [], pathLayer = null;
let timers = [], isRunning = false;
let vcnt = 0, scnt = 0, curAlgo = 'BFS';
const roadDistCache = {};
// Track which campus is selected as start/end for legend highlighting
let selectedStart = '', selectedEnd = '';

// ── HAVERSINE ─────────────────────────────────────────────────
function haversine(n1, n2) {
  const R = 6371000, r = d => d * Math.PI / 180;
  const { lat: la1, lng: ln1 } = CAMPUSES[n1];
  const { lat: la2, lng: ln2 } = CAMPUSES[n2];
  const dLat = r(la2 - la1), dLng = r(ln2 - ln1);
  const a = Math.sin(dLat/2)**2 + Math.cos(r(la1))*Math.cos(r(la2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── OSRM ──────────────────────────────────────────────────────
async function getRoadDistance(n1, n2) {
  const key = [n1, n2].sort().join('|');
  if (roadDistCache[key] !== undefined) return roadDistCache[key];
  const { lat: la1, lng: ln1 } = CAMPUSES[n1];
  const { lat: la2, lng: ln2 } = CAMPUSES[n2];
  try {
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${ln1},${la1};${ln2},${la2}?overview=false`);
    const data = await res.json();
    const dist = (data.routes && data.routes[0]) ? Math.round(data.routes[0].distance) : Math.round(haversine(n1, n2));
    roadDistCache[key] = dist;
    return dist;
  } catch {
    const dist = Math.round(haversine(n1, n2));
    roadDistCache[key] = dist;
    return dist;
  }
}

async function getRoadPolyline(n1, n2) {
  const { lat: la1, lng: ln1 } = CAMPUSES[n1];
  const { lat: la2, lng: ln2 } = CAMPUSES[n2];
  try {
    const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${ln1},${la1};${ln2},${la2}?overview=full&geometries=geojson`);
    const data = await res.json();
    if (data.routes && data.routes[0]) {
      return data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
    }
  } catch {}
  return [[la1, ln1], [la2, ln2]];
}

async function preloadEdgeDistances() {
  setRouteStatus('Fetching road distances…', '');
  const pairs = [];
  const seen = new Set();
  Object.entries(GRAPH).forEach(([from, nb]) => {
    Object.keys(nb).forEach(to => {
      const key = [from, to].sort().join('|');
      if (!seen.has(key)) { seen.add(key); pairs.push([from, to]); }
    });
  });
  const BATCH = 4;
  for (let i = 0; i < pairs.length; i += BATCH) {
    await Promise.all(pairs.slice(i, i + BATCH).map(([a, b]) => getRoadDistance(a, b)));
    setRouteStatus(`Loading road data… ${Math.min(i + BATCH, pairs.length)}/${pairs.length}`, '');
  }
  // Update graph weights
  seen.clear();
  Object.entries(GRAPH).forEach(([from, nb]) => {
    Object.keys(nb).forEach(to => {
      const key = [from, to].sort().join('|');
      const dist = roadDistCache[key];
      if (dist) { GRAPH[from][to] = dist; GRAPH[to][from] = dist; }
    });
  });
  setRouteStatus('Road data ready ✓', 'ok');
}

async function drawEdges() {
  const seen = new Set();
  const pairs = [];
  Object.entries(GRAPH).forEach(([from, nb]) => {
    Object.keys(nb).forEach(to => {
      const key = [from, to].sort().join('|');
      if (!seen.has(key)) { seen.add(key); pairs.push([from, to]); }
    });
  });
  const BATCH = 4;
  for (let i = 0; i < pairs.length; i += BATCH) {
    await Promise.all(pairs.slice(i, i + BATCH).map(async ([a, b]) => {
      const coords = await getRoadPolyline(a, b);
      const pl = L.polyline(coords, { color: '#1e3a5c', weight: 3, opacity: 0.8 }).addTo(map);
      edgeRoadLayers.push(pl);
    }));
  }
}

// ── MARKER ICON ───────────────────────────────────────────────
function makeEmojiIcon(name, borderColor, size) {
  const sz = size || 38;
  const fs = Math.round(sz * 0.45);
  const data = CAMPUSES[name];
  return L.divIcon({
    className: '',
    html: `<div class="emark" style="width:${sz}px;height:${sz}px;border-color:${borderColor};background:${borderColor}18;font-size:${fs}px" title="${name}">${data.emoji}</div>`,
    iconSize:   [sz, sz],
    iconAnchor: [sz/2, sz/2],
    popupAnchor:[0, -(sz/2 + 4)],
  });
}

function setMarkerColor(name, type) {
  const col = COL[type] || COL.default;
  const sz  = (type === 'start' || type === 'end') ? 46 : 38;
  markers[name].setIcon(makeEmojiIcon(name, col, sz));
}

// ── CAMPUS LEGEND ─────────────────────────────────────────────
function buildCampusLegend() {
  const container = document.getElementById('campus-legend');
  container.innerHTML = '';
  Object.entries(CAMPUSES).forEach(([name, data]) => {
    const item = document.createElement('div');
    item.className = 'cl-item';
    item.dataset.campus = name;
    item.innerHTML = `
      <div class="cl-symbol">${data.emoji}</div>
      <div class="cl-info">
        <div class="cl-name">${name}</div>
        <div class="cl-desc">${data.desc}</div>
      </div>`;
    item.addEventListener('click', () => selectCampusFromLegend(name));
    container.appendChild(item);
  });
}

function selectCampusFromLegend(name) {
  const ss = document.getElementById('sel-start');
  const se = document.getElementById('sel-end');
  if (!ss.value) {
    ss.value = name;
    selectedStart = name;
  } else if (!se.value && name !== ss.value) {
    se.value = name;
    selectedEnd = name;
  } else {
    // Cycle: if both filled, clicking resets start
    ss.value = name;
    se.value = '';
    selectedStart = name;
    selectedEnd = '';
  }
  updateLegendHighlights();
  // Pan map to campus
  map.setView([CAMPUSES[name].lat, CAMPUSES[name].lng], 16, { animate: true });
  markers[name].openPopup();
}

function updateLegendHighlights() {
  selectedStart = document.getElementById('sel-start').value;
  selectedEnd   = document.getElementById('sel-end').value;
  document.querySelectorAll('.cl-item').forEach(el => {
    const n = el.dataset.campus;
    el.classList.remove('selected-start', 'selected-end');
    if (n === selectedStart) el.classList.add('selected-start');
    if (n === selectedEnd)   el.classList.add('selected-end');
  });
}

// ── UI HELPERS ────────────────────────────────────────────────
function addLog(msg, cls) {
  const box = document.getElementById('nlog');
  const d = document.createElement('div');
  d.className = cls; d.textContent = msg;
  box.appendChild(d); box.scrollTop = box.scrollHeight;
}

function hlPC(idx) {
  document.querySelectorAll('#pbox .pl').forEach((el, i) => el.classList.toggle('on', i === idx));
}

function setStatus(cls, txt) {
  const b = document.getElementById('status-badge');
  b.className = cls; b.querySelector('span').textContent = txt;
}

function setRouteStatus(msg, cls) {
  const el = document.getElementById('route-status');
  el.textContent = msg; el.className = cls;
}

function updatePathDisplay(path) {
  const pd = document.getElementById('path-display');
  if (path && path.length) {
    pd.innerHTML = path.map(n =>
      `<span title="${CAMPUSES[n].desc}" style="color:var(--txt)">${CAMPUSES[n].emoji} ${n.replace('Campus ','C')}</span>`
    ).join('<span class="ar">→</span>');
  } else {
    pd.textContent = 'No path found yet…';
  }
}

// ── RECONSTRUCT PATH ─────────────────────────────────────────
function reconstructPath(prev, start, end) {
  const path = []; let cur = end;
  while (cur !== null && cur !== undefined) { path.unshift(cur); cur = prev[cur]; }
  return path[0] === start ? path : [];
}

// ── ALGORITHMS ───────────────────────────────────────────────
function algoBFS(start, end) {
  const steps = [], queue = [start], visited = new Set([start]), prev = { [start]: null };
  steps.push({ t: 'f', n: start, pc: 1 });
  while (queue.length) {
    const node = queue.shift();
    steps.push({ t: 'v', n: node, pc: 4 });
    if (node === end) { steps.push({ t: 'p', path: reconstructPath(prev, start, end), pc: 5 }); return steps; }
    Object.keys(GRAPH[node] || {}).forEach(nb => {
      if (!visited.has(nb)) {
        visited.add(nb); prev[nb] = node; queue.push(nb);
        steps.push({ t: 'f', n: nb, pc: 8 });
      }
    });
  }
  steps.push({ t: 'none' }); return steps;
}

function algoDFS(start, end) {
  const steps = [], stack = [start], visited = new Set(), prev = { [start]: null };
  steps.push({ t: 'f', n: start, pc: 1 });
  while (stack.length) {
    const node = stack.pop();
    steps.push({ t: 'v', n: node, pc: 4 });
    if (node === end) { steps.push({ t: 'p', path: reconstructPath(prev, start, end), pc: 5 }); return steps; }
    if (!visited.has(node)) {
      visited.add(node); steps.push({ t: 'v', n: node, pc: 7 });
      [...Object.keys(GRAPH[node] || {})].reverse().forEach(nb => {
        if (!visited.has(nb)) {
          if (!Object.prototype.hasOwnProperty.call(prev, nb)) prev[nb] = node;
          stack.push(nb); steps.push({ t: 'f', n: nb, pc: 9 });
        }
      });
    }
  }
  steps.push({ t: 'none' }); return steps;
}

function algoDijkstra(start, end) {
  const steps = [], dist = {}, prev = {}, visited = new Set();
  Object.keys(CAMPUSES).forEach(n => { dist[n] = Infinity; prev[n] = null; });
  dist[start] = 0;
  const pq = [{ n: start, d: 0 }];
  steps.push({ t: 'f', n: start, pc: 3 });
  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const { n: node } = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node); steps.push({ t: 'v', n: node, pc: 5 });
    if (node === end) { steps.push({ t: 'p', path: reconstructPath(prev, start, end), pc: 6 }); return steps; }
    Object.entries(GRAPH[node] || {}).forEach(([nb, w]) => {
      const nd = dist[node] + w;
      if (nd < dist[nb]) { dist[nb] = nd; prev[nb] = node; pq.push({ n: nb, d: nd }); steps.push({ t: 'f', n: nb, pc: 9 }); }
    });
  }
  steps.push({ t: 'none' }); return steps;
}

function algoAStar(start, end) {
  const steps = [], g = {}, prev = {}, open = new Set([start]);
  Object.keys(CAMPUSES).forEach(n => { g[n] = Infinity; prev[n] = null; });
  g[start] = 0;
  const f = n => g[n] + haversine(n, end);
  steps.push({ t: 'f', n: start, pc: 1 });
  while (open.size) {
    const u = [...open].sort((a, b) => f(a) - f(b))[0];
    open.delete(u); steps.push({ t: 'v', n: u, pc: 4 });
    if (u === end) { steps.push({ t: 'p', path: reconstructPath(prev, start, end), pc: 5 }); return steps; }
    Object.entries(GRAPH[u] || {}).forEach(([v, w]) => {
      const tg = g[u] + w;
      if (tg < g[v]) { g[v] = tg; prev[v] = u; open.add(v); steps.push({ t: 'f', n: v, pc: 9 }); }
    });
  }
  steps.push({ t: 'none' }); return steps;
}

// ── DRAW FINAL ROAD PATH ──────────────────────────────────────
async function drawRoadPath(path) {
  if (pathLayer) { map.removeLayer(pathLayer); pathLayer = null; }
  if (!path || path.length < 2) return 0;
  const segments = await Promise.all(path.slice(0, -1).map((n, i) => getRoadPolyline(n, path[i+1])));
  const allCoords = segments.reduce((acc, seg) => acc.length ? acc.concat(seg.slice(1)) : seg, []);
  pathLayer = L.polyline(allCoords, { color: '#ff2d55', weight: 6, opacity: 0.9, dashArray: '12 5' }).addTo(map);
  map.fitBounds(pathLayer.getBounds(), { padding: [40, 40] });
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) total += await getRoadDistance(path[i], path[i+1]);
  return total;
}

// ── ANIMATION ENGINE ─────────────────────────────────────────
function animate(steps, start, end, speed) {
  timers.forEach(clearTimeout); timers = [];
  setStatus('run', 'Running…');
  document.getElementById('btn-run').disabled = true;
  let delay = 0;
  const base = Math.max(60, 1000 - speed * 9);

  steps.forEach(step => {
    const t = setTimeout(async () => {
      scnt++;
      document.getElementById('stat-s').textContent = scnt;
      if (step.pc !== undefined) hlPC(step.pc);

      if (step.t === 'v') {
        vcnt++;
        document.getElementById('stat-v').textContent = vcnt;
        setMarkerColor(step.n, 'visited');
        addLog('▶ Visited: ' + step.n + ' ' + CAMPUSES[step.n].emoji, 'lv');

      } else if (step.t === 'f') {
        setMarkerColor(step.n, 'frontier');
        addLog('◉ Frontier: ' + step.n + ' ' + CAMPUSES[step.n].emoji, 'lf');

      } else if (step.t === 'p') {
        setRouteStatus('Drawing road path…', '');
        const dist = await drawRoadPath(step.path);
        document.getElementById('stat-d').textContent = dist + ' m';
        updatePathDisplay(step.path);
        step.path.forEach(n => setMarkerColor(n, 'path'));
        setMarkerColor(start, 'start');
        setMarkerColor(end, 'end');
        addLog('✓ Path found! ' + dist + 'm', 'lp');
        setStatus('done', 'Done');
        setRouteStatus('Road path drawn ✓', 'ok');
        document.getElementById('btn-run').disabled = false;
        isRunning = false;

      } else if (step.t === 'none') {
        addLog('✗ No path found.', 'li2');
        setStatus('done', 'No path');
        setRouteStatus('', '');
        document.getElementById('btn-run').disabled = false;
        isRunning = false;
      }
    }, delay);
    timers.push(t);
    delay += base;
  });
}

// ── RESET ─────────────────────────────────────────────────────
function doReset() {
  timers.forEach(clearTimeout); timers = []; isRunning = false;
  if (pathLayer) { map.removeLayer(pathLayer); pathLayer = null; }
  Object.keys(CAMPUSES).forEach(n => setMarkerColor(n, 'default'));
  vcnt = scnt = 0;
  document.getElementById('stat-v').textContent = '0';
  document.getElementById('stat-s').textContent = '0';
  document.getElementById('stat-d').textContent = '—';
  document.getElementById('path-display').textContent = 'Select start & end, then run…';
  document.getElementById('nlog').innerHTML = '';
  hlPC(-1);
  setStatus('idle', 'Idle');
  setRouteStatus('Road data ready ✓', 'ok');
  document.getElementById('btn-run').disabled = false;
}

// ── PSEUDOCODE RENDER ─────────────────────────────────────────
function renderPC(algo) {
  document.getElementById('pbox').innerHTML =
    (PSEUDOCODES[algo] || PSEUDOCODES.BFS)
      .map((l, i) => `<div class="pl" data-i="${i}">${l}</div>`).join('');
}

// ── MAP INIT ─────────────────────────────────────────────────
async function initMap() {
  map = L.map('map', { center: [20.354, 85.819], zoom: 15, zoomControl: true, attributionControl: true });

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com">CARTO</a>',
    subdomains: 'abcd', maxZoom: 19,
  }).addTo(map);

  // Create markers
  Object.entries(CAMPUSES).forEach(([name, data]) => {
    const marker = L.marker([data.lat, data.lng], { icon: makeEmojiIcon(name, COL.default, 38) }).addTo(map);
    marker.bindPopup(`
      <div style="font-family:'JetBrains Mono',monospace;padding:10px 13px;min-width:170px">
        <div style="font-size:20px;margin-bottom:4px">${data.emoji}</div>
        <div style="font-size:13px;font-weight:700;color:#00d4ff;margin-bottom:2px">${name}</div>
        <div style="font-size:11px;color:#7aa0be;margin-bottom:3px">${data.desc}</div>
        <div style="font-size:10px;color:#4a7090">${data.lat.toFixed(5)}°N, ${data.lng.toFixed(5)}°E</div>
      </div>`, { closeButton: false });

    marker.on('click', () => {
      const ss = document.getElementById('sel-start');
      const se = document.getElementById('sel-end');
      if (!ss.value) { ss.value = name; }
      else if (!se.value && name !== ss.value) { se.value = name; }
      updateLegendHighlights();
    });
    markers[name] = marker;
  });

  // Dropdowns
  ['sel-start', 'sel-end'].forEach(id => {
    const sel = document.getElementById(id);
    Object.entries(CAMPUSES).forEach(([name, data]) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = `${data.emoji} ${name} — ${data.desc}`;
      sel.appendChild(opt);
    });
  });

  // Load road data
  setRouteStatus('Loading road edges…', '');
  await drawEdges();
  await preloadEdgeDistances();
}

// ── UI EVENTS ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCampusLegend();
  initMap();
  renderPC('BFS');

  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      curAlgo = chip.dataset.algo;
      renderPC(curAlgo);
    });
  });

  document.getElementById('spd-slider').addEventListener('input', function () {
    document.getElementById('spd-val').textContent = this.value + 'x';
  });

  // Sync legend highlights when dropdowns change manually
  ['sel-start', 'sel-end'].forEach(id => {
    document.getElementById(id).addEventListener('change', updateLegendHighlights);
  });

  document.getElementById('btn-run').addEventListener('click', () => {
    const start = document.getElementById('sel-start').value;
    const end   = document.getElementById('sel-end').value;
    if (!start || !end) { alert('Please select both start and end campuses.'); return; }
    if (start === end)  { alert('Start and end must be different.'); return; }
    doReset();
    setMarkerColor(start, 'start');
    setMarkerColor(end, 'end');
    addLog(curAlgo + ': ' + start + ' → ' + end, 'li2');
    const speed = parseInt(document.getElementById('spd-slider').value);
    let steps;
    if      (curAlgo === 'BFS')      steps = algoBFS(start, end);
    else if (curAlgo === 'DFS')      steps = algoDFS(start, end);
    else if (curAlgo === 'Dijkstra') steps = algoDijkstra(start, end);
    else                             steps = algoAStar(start, end);
    isRunning = true;
    animate(steps, start, end, speed);
  });

  document.getElementById('btn-reset').addEventListener('click', () => {
    doReset();
    document.getElementById('sel-start').value = '';
    document.getElementById('sel-end').value = '';
    updateLegendHighlights();
  });
});
