/* ============================================================
   KIIT Campus Graph Search Visualizer
   Leaflet.js + Google Maps Satellite + OSM Traffic/Terrain
   OSRM for real road routing — no API key required
   Dual algorithm comparison mode
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
  UCS: [
    '<span class="pk">function</span> <span class="pf">UCS</span>(start, goal):',
    '<span class="i1">cost[start] ← 0, cost[*] ← ∞</span>',
    '<span class="i1">pq ← MinPriorityQueue()</span>',
    '<span class="i1">pq.insert(start, 0)</span>',
    '<span class="i1"><span class="pk">while</span> pq not empty:</span>',
    '<span class="i2">u ← pq.extractMin()</span>',
    '<span class="i2"><span class="pk">if</span> u == goal: <span class="pk">return</span></span>',
    '<span class="i2"><span class="pk">for</span> (v, w) in adj[u]:</span>',
    '<span class="i2">  <span class="pk">if</span> cost[u]+w &lt; cost[v]:</span>',
    '<span class="i2">    cost[v] ← cost[u]+w</span>',
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
  default:  '#14c2be',
  start:    '#00c17a',
  end:      '#ff4b6e',
  visited:  '#ffd200',
  frontier: '#7c3aed',
  path:     '#0b84ff',   // Algo A path (blue)
  pathB:    '#ff6b35',   // Algo B path (orange)
};

// ── STATE ─────────────────────────────────────────────────────
let map, markers = {}, edgeRoadLayers = [], pathLayer = null, pathLayerB = null;
let timers = [], timersB = [], isRunning = false;
let vcnt = 0, scnt = 0;
let curAlgo = 'BFS';
let curAlgoA = 'BFS', curAlgoB = 'Dijkstra';
let compareMode = false;
const roadDistCache = {};
const polylineCache = {};        // key → [[lat,lng]…]  populated during drawEdges
let traversalLayers = [];        // live edge-traversal highlight layers
let selectedStart = '', selectedEnd = '';
let tileLayers = {};
let currentBaseLayer = null;
let currentView = 'satellite';

// ── HOME VIEW ─────────────────────────────────────────────────
const HOME_CENTER = [20.354, 85.819];
const HOME_ZOOM   = 15;

// ── HAVERSINE ─────────────────────────────────────────────────
function haversine(n1, n2) {
  const R = 6371000, r = d => d * Math.PI / 180;
  const { lat: la1, lng: ln1 } = CAMPUSES[n1];
  const { lat: la2, lng: ln2 } = CAMPUSES[n2];
  const dLat = r(la2 - la1), dLng = r(ln2 - ln1);
  const a = Math.sin(dLat/2)**2 + Math.cos(r(la1))*Math.cos(r(la2))*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

// ── TILE LAYER SETUP ──────────────────────────────────────────
function buildTileLayers() {
  // ─ Satellite (Google Maps hybrid) ─
  // Uses Google's publicly accessible tile endpoint
  tileLayers.satelliteDay = L.tileLayer(
    'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    {
      subdomains: ['0','1','2','3'],
      attribution: '© Google Maps',
      maxZoom: 20,
    }
  );
  tileLayers.satelliteNight = L.tileLayer(
    'https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    {
      subdomains: ['0','1','2','3'],
      attribution: '© Google Maps',
      maxZoom: 20,
    }
  );

  // ─ Traffic — white/light road map (OSM Carto) for both day AND night ─
  // White traffic map in both modes as requested
  tileLayers.trafficDay = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      subdomains: 'abc',
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }
  );
  tileLayers.trafficNight = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      subdomains: 'abc',
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }
  );

  // ─ Terrain ─
  tileLayers.terrainDay = L.tileLayer(
    'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    { attribution: '© Esri', maxZoom: 18 }
  );
  tileLayers.terrainNight = L.tileLayer(
    'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    { attribution: '© OpenStreetMap © CARTO', subdomains: 'abcd', maxZoom: 19 }
  );
}

function getLayerFor(view, mode) {
  const suffix = mode === 'day' ? 'Day' : 'Night';
  return tileLayers[view + suffix] || tileLayers.satelliteNight;
}

function switchBase(view) {
  if (!map) return;
  const mode = document.body.classList.contains('day') ? 'day' : 'night';
  const layer = getLayerFor(view, mode);
  if (currentBaseLayer === layer) { currentView = view; return; }
  if (currentBaseLayer) try { map.removeLayer(currentBaseLayer); } catch (e) {}
  currentBaseLayer = layer.addTo(map);
  // Make sure base layer is behind markers (bring to back)
  currentBaseLayer.bringToBack();
  currentView = view;

  // update active vt-btn
  document.querySelectorAll('.vt-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.view === view);
  });
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
      // cache for traversal animation
      const key = [a, b].sort().join('|');
      polylineCache[key] = coords;
      const pl = L.polyline(coords, { color: COL.default, weight: 3.5, opacity: 0.9 }).addTo(map);
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
    ss.value = name; selectedStart = name;
  } else if (!se.value && name !== ss.value) {
    se.value = name; selectedEnd = name;
  } else {
    ss.value = name; se.value = '';
    selectedStart = name; selectedEnd = '';
  }
  updateLegendHighlights();
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

function updatePathDisplay(path, label, elId) {
  const pd = document.getElementById(elId || 'path-display');
  if (path && path.length) {
    let html = label ? `<div class="path-label">${label}</div>` : '';
    html += path.map(n =>
      `<span title="${CAMPUSES[n].desc}" style="color:var(--txt)">${CAMPUSES[n].emoji} ${n.replace('Campus ','C')}</span>`
    ).join('<span class="ar">→</span>');
    pd.innerHTML = html;
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
      steps.push({ t: 'e', from: node, to: nb });   // ← edge traversal
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
        steps.push({ t: 'e', from: node, to: nb });   // ← edge traversal
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
      steps.push({ t: 'e', from: node, to: nb });   // ← edge traversal
      const nd = dist[node] + w;
      if (nd < dist[nb]) { dist[nb] = nd; prev[nb] = node; pq.push({ n: nb, d: nd }); steps.push({ t: 'f', n: nb, pc: 9 }); }
    });
  }
  steps.push({ t: 'none' }); return steps;
}

function algoUCS(start, end) {
  const steps = [], cost = {}, prev = {}, visited = new Set();
  Object.keys(CAMPUSES).forEach(n => { cost[n] = Infinity; prev[n] = null; });
  cost[start] = 0;
  const pq = [{ n: start, d: 0 }];
  steps.push({ t: 'f', n: start, pc: 3 });
  while (pq.length) {
    pq.sort((a, b) => a.d - b.d);
    const { n: node } = pq.shift();
    if (visited.has(node)) continue;
    visited.add(node); steps.push({ t: 'v', n: node, pc: 5 });
    if (node === end) { steps.push({ t: 'p', path: reconstructPath(prev, start, end), pc: 6 }); return steps; }
    Object.entries(GRAPH[node] || {}).forEach(([nb, w]) => {
      steps.push({ t: 'e', from: node, to: nb });   // ← edge traversal
      const nd = cost[node] + w;
      if (nd < cost[nb]) { cost[nb] = nd; prev[nb] = node; pq.push({ n: nb, d: nd }); steps.push({ t: 'f', n: nb, pc: 9 }); }
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
      steps.push({ t: 'e', from: u, to: v });       // ← edge traversal
      const tg = g[u] + w;
      if (tg < g[v]) { g[v] = tg; prev[v] = u; open.add(v); steps.push({ t: 'f', n: v, pc: 9 }); }
    });
  }
  steps.push({ t: 'none' }); return steps;
}

function runAlgo(name, start, end) {
  if      (name === 'BFS')      return algoBFS(start, end);
  else if (name === 'DFS')      return algoDFS(start, end);
  else if (name === 'Dijkstra') return algoDijkstra(start, end);
  else if (name === 'UCS')      return algoUCS(start, end);
  else                          return algoAStar(start, end);
}

// ── TRAVERSAL EDGE FLASH ──────────────────────────────────────
// Called during exploration animation — flashes a road segment
// from→to in the frontier colour, then fades it out.
function drawTraversalEdge(from, to, isB) {
  const key = [from, to].sort().join('|');
  const coords = polylineCache[key];
  if (!coords || coords.length < 2) return;

  const color = isB ? COL.pathB : COL.frontier;

  const pl = L.polyline(coords, {
    color,
    weight: 5,
    opacity: 0.9,
    className: 'traversal-edge',
  }).addTo(map);

  traversalLayers.push(pl);

  // Fade out after a short time (keep last ~8 visible for context)
  const MAX_LIVE = 8;
  if (traversalLayers.length > MAX_LIVE) {
    const old = traversalLayers.shift();
    // Fade old layer to dim instead of hard remove
    try {
      old.setStyle({ opacity: 0.18, weight: 2.5, color: COL.visited });
    } catch (e) {}
  }
}

// ── DRAW FINAL ROAD PATH (animated, segment-by-segment) ───────
async function drawRoadPath(path, colorKey, layerRef) {
  if (layerRef.val) { map.removeLayer(layerRef.val); layerRef.val = null; }
  if (!path || path.length < 2) return 0;

  // Clear traversal highlights since we're drawing the real path
  traversalLayers.forEach(pl => { try { map.removeLayer(pl); } catch(e){} });
  traversalLayers = [];

  const color = COL[colorKey] || COL.path;

  // Collect all segment coords (already cached from drawEdges)
  const segCoords = [];
  for (let i = 0; i < path.length - 1; i++) {
    const key = [path[i], path[i+1]].sort().join('|');
    const coords = polylineCache[key] || await getRoadPolyline(path[i], path[i+1]);
    if (!polylineCache[key]) polylineCache[key] = coords;
    segCoords.push(coords);
  }

  // Build a single empty polyline we'll grow point-by-point
  const allPoints = [];
  layerRef.val = L.polyline([], { color, weight: 7, opacity: 0.95, dashArray: '14 6' }).addTo(map);

  // Animate each segment in turn
  const POINT_DELAY = 18; // ms per polyline point
  for (let s = 0; s < segCoords.length; s++) {
    const seg = segCoords[s];
    for (let p = 0; p < seg.length; p++) {
      allPoints.push(seg[p]);
      layerRef.val.setLatLngs([...allPoints]);
      await sleep(POINT_DELAY);
    }
  }

  // Fit map to the final path
  if (layerRef.val.getBounds().isValid()) {
    map.fitBounds(layerRef.val.getBounds(), { padding: [40, 40] });
  }

  // Compute total road distance
  let total = 0;
  for (let i = 0; i < path.length - 1; i++) total += await getRoadDistance(path[i], path[i+1]);
  return total;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ── ANIMATION ENGINE ─────────────────────────────────────────
function animate(steps, start, end, speed, opts = {}) {
  const {
    isB = false,
    onDone = null,
  } = opts;
  const timerArr = isB ? timersB : timers;
  timerArr.forEach(clearTimeout); if (isB) timersB = []; else timers = [];

  if (!isB) { setStatus('run', 'Running…'); document.getElementById('btn-run').disabled = true; }

  let delay = 0;
  const base = Math.max(60, 1000 - speed * 9);
  const pathRef = isB ? { val: pathLayerB } : { val: pathLayer };

  steps.forEach(step => {
    const t = setTimeout(async () => {
      if (!isB) {
        scnt++;
        document.getElementById('stat-s').textContent = scnt;
      }
      if (step.pc !== undefined && !isB) hlPC(step.pc);

      if (step.t === 'v') {
        if (!isB) {
          vcnt++;
          document.getElementById('stat-v').textContent = vcnt;
        }
        setMarkerColor(step.n, 'visited');
        if (!isB) addLog('▶ Visited: ' + step.n + ' ' + CAMPUSES[step.n].emoji, 'lv');

      } else if (step.t === 'e') {
        // Live edge traversal — flash road segment from→to
        drawTraversalEdge(step.from, step.to, isB);

      } else if (step.t === 'f') {
        setMarkerColor(step.n, 'frontier');
        if (!isB) addLog('◉ Frontier: ' + step.n + ' ' + CAMPUSES[step.n].emoji, 'lf');

      } else if (step.t === 'p') {
        setRouteStatus('Drawing road path…', '');
        const colorKey = isB ? 'pathB' : 'path';
        const dist = await drawRoadPath(step.path, colorKey, pathRef);

        if (isB) {
          pathLayerB = pathRef.val;
        } else {
          pathLayer = pathRef.val;
        }

        if (!isB) {
          document.getElementById('stat-d').textContent = dist + ' m';
          updatePathDisplay(step.path, null, 'path-display');
        }

        step.path.forEach(n => setMarkerColor(n, isB ? 'frontier' : 'path'));
        setMarkerColor(start, 'start');
        setMarkerColor(end, 'end');

        if (!isB) {
          addLog('✓ Path found! ' + dist + 'm', 'lp');
          setStatus('done', 'Done');
          setRouteStatus('Road path drawn ✓', 'ok');
          document.getElementById('btn-run').disabled = false;
          isRunning = false;
        }

        if (onDone) onDone({ path: step.path, dist, vcnt: 0 });

      } else if (step.t === 'none') {
        if (!isB) {
          addLog('✗ No path found.', 'li2');
          setStatus('done', 'No path');
          setRouteStatus('', '');
          document.getElementById('btn-run').disabled = false;
          isRunning = false;
        }
        if (onDone) onDone({ path: [], dist: 0, vcnt: 0 });
      }
    }, delay);
    timerArr.push(t);
    delay += base;
  });
}

// ── COMPARE MODE ANIMATION ────────────────────────────────────
function runCompare(start, end, speed) {
  const stepsA = runAlgo(curAlgoA, start, end);
  const stepsB = runAlgo(curAlgoB, start, end);

  let resultA = null, resultB = null;

  // Count visited per algo
  const countVisited = steps => steps.filter(s => s.t === 'v').length;
  const vA = countVisited(stepsA);
  const vB = countVisited(stepsB);

  document.getElementById('cmp-v-a').textContent = vA;
  document.getElementById('cmp-s-a').textContent = stepsA.length;
  document.getElementById('cmp-v-b').textContent = vB;
  document.getElementById('cmp-s-b').textContent = stepsB.length;

  setStatus('run', 'Comparing…');
  document.getElementById('btn-run').disabled = true;

  const checkWinner = () => {
    if (resultA === null || resultB === null) return;
    document.getElementById('cmp-d-a').textContent = resultA.dist ? resultA.dist + 'm' : '—';
    document.getElementById('cmp-d-b').textContent = resultB.dist ? resultB.dist + 'm' : '—';

    let winner = '';
    if (resultA.dist && resultB.dist) {
      if (resultA.dist < resultB.dist) {
        winner = `🏆 ${curAlgoA} finds shorter path! (${resultA.dist}m vs ${resultB.dist}m)`;
      } else if (resultB.dist < resultA.dist) {
        winner = `🏆 ${curAlgoB} finds shorter path! (${resultB.dist}m vs ${resultA.dist}m)`;
      } else {
        winner = `🤝 Both find same distance! (${resultA.dist}m)`;
      }
    } else if (resultA.dist && !resultB.dist) {
      winner = `✓ Only ${curAlgoA} found a path`;
    } else if (!resultA.dist && resultB.dist) {
      winner = `✓ Only ${curAlgoB} found a path`;
    } else {
      winner = '✗ Neither algorithm found a path';
    }

    document.getElementById('cmp-winner').textContent = winner;

    if (resultA.path.length) updatePathDisplay(resultA.path, `● ${curAlgoA}:`, 'path-display');
    if (resultB.path.length) {
      const pdB = document.getElementById('path-display-b');
      pdB.classList.remove('hidden');
      updatePathDisplay(resultB.path, `● ${curAlgoB}:`, 'path-display-b');
    }

    setStatus('done', 'Done');
    setRouteStatus('Comparison complete ✓', 'ok');
    document.getElementById('btn-run').disabled = false;
    isRunning = false;
  };

  // Run Algo A
  animate(stepsA, start, end, speed, {
    isB: false,
    onDone: (r) => {
      resultA = r;
      checkWinner();
    }
  });

  // Run Algo B with slight offset so visual updates interleave
  animate(stepsB, start, end, Math.max(1, speed - 15), {
    isB: true,
    onDone: (r) => {
      resultB = r;
      checkWinner();
    }
  });
}

// ── RESET ─────────────────────────────────────────────────────
function doReset() {
  timers.forEach(clearTimeout); timers = [];
  timersB.forEach(clearTimeout); timersB = [];
  isRunning = false;
  if (pathLayer)  { map.removeLayer(pathLayer);  pathLayer  = null; }
  if (pathLayerB) { map.removeLayer(pathLayerB); pathLayerB = null; }
  // Clear traversal edge highlights
  traversalLayers.forEach(pl => { try { map.removeLayer(pl); } catch(e){} });
  traversalLayers = [];
  Object.keys(CAMPUSES).forEach(n => setMarkerColor(n, 'default'));
  vcnt = scnt = 0;
  document.getElementById('stat-v').textContent = '0';
  document.getElementById('stat-s').textContent = '0';
  document.getElementById('stat-d').textContent = '—';
  document.getElementById('path-display').textContent = 'Select start & end, then run…';
  const pdB = document.getElementById('path-display-b');
  pdB.classList.add('hidden'); pdB.innerHTML = '';
  document.getElementById('nlog').innerHTML = '';
  hlPC(-1);
  setStatus('idle', 'Idle');
  setRouteStatus('Road data ready ✓', 'ok');
  document.getElementById('btn-run').disabled = false;
  // Reset compare stats
  ['a','b'].forEach(x => {
    document.getElementById(`cmp-v-${x}`).textContent = '—';
    document.getElementById(`cmp-s-${x}`).textContent = '—';
    document.getElementById(`cmp-d-${x}`).textContent = '—';
  });
  document.getElementById('cmp-winner').textContent = '';
}

// ── PSEUDOCODE RENDER ─────────────────────────────────────────
function renderPC(algo) {
  document.getElementById('pbox').innerHTML =
    (PSEUDOCODES[algo] || PSEUDOCODES.BFS)
      .map((l, i) => `<div class="pl" data-i="${i}">${l}</div>`).join('');
}

// ── MAP INIT ─────────────────────────────────────────────────
async function initMap() {
  map = L.map('map', {
    center: HOME_CENTER,
    zoom: HOME_ZOOM,
    zoomControl: true,
    attributionControl: true,
  });

  buildTileLayers();

  // Apply saved mode, then switch base
  const savedMode = localStorage.getItem('kiit_mode') || 'night';
  document.body.classList.toggle('day', savedMode === 'day');
  switchBase('satellite');
  currentView = 'satellite';

  // Create markers
  Object.entries(CAMPUSES).forEach(([name, data]) => {
    const marker = L.marker([data.lat, data.lng], { icon: makeEmojiIcon(name, COL.default, 38) }).addTo(map);

    marker.bindPopup(`
      <div style="font-family:'JetBrains Mono',monospace;padding:12px 15px;min-width:180px">
        <div style="font-size:22px;margin-bottom:5px">${data.emoji}</div>
        <div style="font-size:13px;font-weight:700;color:#00d4ff;margin-bottom:3px">${name}</div>
        <div style="font-size:11px;color:#7aa0be;margin-bottom:4px">${data.desc}</div>
        <div style="font-size:9px;color:#4a7090">📍 ${data.lat.toFixed(5)}°N, ${data.lng.toFixed(5)}°E</div>
      </div>`, { closeButton: false });

    marker.on('click', () => {
      const ss = document.getElementById('sel-start');
      const se = document.getElementById('sel-end');
      if (!ss.value) { ss.value = name; }
      else if (!se.value && name !== ss.value) { se.value = name; }
      updateLegendHighlights();
    });

    const initial = `<div class="campus-tip"><div class="ct-name">${name}</div><div class="ct-desc">${data.desc}</div></div>`;
    marker.bindTooltip(initial, { direction: 'top', offset: [0, -14], className: 'campus-tooltip', sticky: false, opacity: 0.97 });

    marker.on('mouseover', () => marker.openTooltip());
    marker.on('mouseout', () => marker.closeTooltip());
    markers[name] = marker;
  });

  // Populate dropdowns
  ['sel-start', 'sel-end'].forEach(id => {
    const sel = document.getElementById(id);
    Object.entries(CAMPUSES).forEach(([name, data]) => {
      const opt = document.createElement('option');
      opt.value = name;
      opt.textContent = `${data.emoji} ${name} — ${data.desc}`;
      sel.appendChild(opt);
    });
  });

  setRouteStatus('Loading road edges…', '');
  await drawEdges();
  await preloadEdgeDistances();
}

// ── UI EVENTS ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildCampusLegend();
  initMap();
  renderPC('BFS');

  // ── Single algo chips ──
  document.querySelectorAll('#single-algo-sec .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#single-algo-sec .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      curAlgo = chip.dataset.algo;
      renderPC(curAlgo);
    });
  });

  // ── Compare algo chips ──
  document.querySelectorAll('.chips-a .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chips-a .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      curAlgoA = chip.dataset.algo;
    });
  });

  document.querySelectorAll('.chips-b .chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.chips-b .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      curAlgoB = chip.dataset.algo;
    });
  });

  // ── Compare mode toggle ──
  const compareChk = document.getElementById('compare-mode-chk');
  compareChk.addEventListener('change', () => {
    compareMode = compareChk.checked;
    document.getElementById('single-algo-sec').classList.toggle('hidden', compareMode);
    document.getElementById('compare-algo-sec').classList.toggle('hidden', !compareMode);
    document.getElementById('stats-single').classList.toggle('hidden', compareMode);
    document.getElementById('stats-compare').classList.toggle('hidden', !compareMode);
    document.getElementById('btn-run').textContent = compareMode ? '⚡ Compare Algorithms' : '▶ Run Algorithm';
    doReset();
  });

  // ── Speed slider ──
  document.getElementById('spd-slider').addEventListener('input', function () {
    document.getElementById('spd-val').textContent = this.value + 'x';
  });

  // ── Sync legend highlights on dropdown change ──
  ['sel-start', 'sel-end'].forEach(id => {
    document.getElementById(id).addEventListener('change', updateLegendHighlights);
  });

  // ── Run button ──
  document.getElementById('btn-run').addEventListener('click', () => {
    const start = document.getElementById('sel-start').value;
    const end   = document.getElementById('sel-end').value;
    if (!start || !end) { alert('Please select both start and end campuses.'); return; }
    if (start === end)  { alert('Start and end must be different.'); return; }
    doReset();
    setMarkerColor(start, 'start');
    setMarkerColor(end, 'end');
    const speed = parseInt(document.getElementById('spd-slider').value);
    isRunning = true;

    if (compareMode) {
      addLog(`Compare ${curAlgoA} vs ${curAlgoB}: ${start} → ${end}`, 'li2');
      runCompare(start, end, speed);
    } else {
      addLog(curAlgo + ': ' + start + ' → ' + end, 'li2');
      const steps = runAlgo(curAlgo, start, end);
      animate(steps, start, end, speed, {
        isB: false,
        onDone: ({ path, dist }) => {
          // already handled inside animate
        }
      });
    }
  });

  // ── Reset button ──
  document.getElementById('btn-reset').addEventListener('click', () => {
    doReset();
    document.getElementById('sel-start').value = '';
    document.getElementById('sel-end').value = '';
    updateLegendHighlights();
  });

  // ── Mode toggle (day/night) ──
  const modeToggle = document.getElementById('mode-toggle');
  function applyMode(mode) {
    document.body.classList.toggle('day', mode === 'day');
    modeToggle.textContent = mode === 'day' ? '☀️' : '🌙';
    localStorage.setItem('kiit_mode', mode);
    switchBase(currentView);
  }
  const savedMode = localStorage.getItem('kiit_mode') || 'night';
  applyMode(savedMode === 'day' ? 'day' : 'night');
  modeToggle.addEventListener('click', () => {
    applyMode(document.body.classList.contains('day') ? 'night' : 'day');
  });

  // ── View toggle buttons ──
  document.querySelectorAll('.vt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = btn.dataset.view || 'satellite';
      switchBase(view);
    });
  });

  // ── North button ──
  document.getElementById('north-btn').addEventListener('click', () => {
    if (!map) return;
    map.setView(HOME_CENTER, HOME_ZOOM, { animate: true });
    // Animate the arrow icon spinning back
    const arrow = document.getElementById('north-arrow');
    arrow.style.transform = 'rotate(360deg)';
    setTimeout(() => { arrow.style.transform = 'rotate(0deg)'; }, 450);
  });

  // ── Zoom to fit all campuses ──
  document.getElementById('zoom-campus-btn').addEventListener('click', () => {
    if (!map) return;
    const lats = Object.values(CAMPUSES).map(c => c.lat);
    const lngs = Object.values(CAMPUSES).map(c => c.lng);
    const bounds = L.latLngBounds(
      [Math.min(...lats) - 0.002, Math.min(...lngs) - 0.002],
      [Math.max(...lats) + 0.002, Math.max(...lngs) + 0.002]
    );
    map.fitBounds(bounds, { padding: [30, 30], animate: true });
  });

  // ── Locate me button ──
  document.getElementById('locate-btn').addEventListener('click', () => {
    if (!navigator.geolocation) { setRouteStatus('Geolocation not supported', 'err'); return; }
    setRouteStatus('Locating…', '');
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude, lng = pos.coords.longitude;
      map.setView([lat, lng], 17, { animate: true });
      const lm = L.circleMarker([lat, lng], {
        radius: 10, color: COL.start, fillColor: COL.start,
        fillOpacity: 0.9, weight: 3,
      }).addTo(map);
      lm.bindPopup('<b style="color:#00c17a">📍 You are here</b>').openPopup();
      setTimeout(() => { try { map.removeLayer(lm); } catch(e){}; }, 8000);
      setRouteStatus('Location found ✓', 'ok');
      setTimeout(() => setRouteStatus('Road data ready ✓', 'ok'), 3000);
    }, err => {
      setRouteStatus('Unable to get location', 'err');
    }, { timeout: 10000 });
  });

  // ── Resize handler ──
  window.addEventListener('resize', () => {
    if (map) map.invalidateSize();
    // On resize to desktop, ensure sidebar is reset to normal flow
    if (window.innerWidth > 900) {
      sidebar.classList.remove('open');
      backdrop.classList.remove('visible');
      document.body.style.overflow = '';
    }
  });

  // ── Sidebar toggle (mobile drawer) ──
  const sidebar   = document.getElementById('sidebar');
  const backdrop  = document.getElementById('sidebar-backdrop');
  const toggleBtn = document.getElementById('sidebar-toggle');

  function openSidebar() {
    sidebar.classList.add('open');
    backdrop.classList.add('visible');
    toggleBtn.textContent = '✕';
    if (map) map.invalidateSize();
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    backdrop.classList.remove('visible');
    toggleBtn.textContent = '☰';
    if (map) map.invalidateSize();
  }

  function isMobile() { return window.innerWidth <= 900; }

  toggleBtn.addEventListener('click', () => {
    if (!isMobile()) return;
    sidebar.classList.contains('open') ? closeSidebar() : openSidebar();
  });

  backdrop.addEventListener('click', closeSidebar);

  // Close sidebar when user taps a campus in the legend (mobile UX)
  document.getElementById('campus-legend').addEventListener('click', () => {
    if (isMobile()) closeSidebar();
  });

  // Close sidebar when Run/Reset pressed on mobile so map is visible
  document.getElementById('btn-run').addEventListener('click', () => {
    if (isMobile()) closeSidebar();
  }, { capture: false });

  document.getElementById('btn-reset').addEventListener('click', () => {
    if (isMobile()) closeSidebar();
  }, { capture: false });

  // Swipe-to-close: drag handle
  let touchStartY = 0;
  const handle = document.getElementById('sidebar-handle');
  handle.addEventListener('touchstart', e => { touchStartY = e.touches[0].clientY; }, { passive: true });
  handle.addEventListener('touchend', e => {
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dy) > 40) closeSidebar();
  }, { passive: true });
});
