# 🗺️ K-Search — KIIT Campus Graph Search Visualizer

> An interactive, real-map pathfinding visualizer built on top of KIIT University, Bhubaneswar. Watch BFS, DFS, Dijkstra, UCS, and A\* explore the campus graph in real time — side by side.

---

## ✨ Features

### 🧠 Algorithms
| Algorithm | Type | Uses Weights | Optimal Path |
|---|---|---|---|
| **BFS** | Breadth-First Search | ❌ | ✅ (unweighted) |
| **DFS** | Depth-First Search | ❌ | ❌ |
| **Dijkstra** | Shortest Path | ✅ | ✅ |
| **UCS** | Uniform Cost Search | ✅ | ✅ |
| **A\*** | Heuristic Search | ✅ | ✅ |

### 🗺️ Real Map
- Live **Leaflet.js** map centered on KIIT Bhubaneswar
- Three map layers: **Satellite**, **Traffic**, and **Terrain**
- All KIIT campuses placed as interactive graph nodes
- Road connections shown as weighted graph edges

### 🎬 Animation & Visualisation
- Step-by-step animated traversal with color-coded node states:
  - 🟢 **Start** · 🔴 **End** · 🟡 **Visited** · 🟣 **Frontier** · 🔵 **Unvisited**
- Adjustable speed slider (1× → 100×)
- Live **pseudocode panel** that highlights the current line during execution
- Live **Exploration Log** showing each step

### ⚔️ Compare Mode
Run **two algorithms simultaneously** and compare them head-to-head:
- Pick **Algo A** vs **Algo B** from the sidebar
- Both paths rendered on the same map (blue vs orange)
- Side-by-side stats: nodes visited, steps taken, road distance
- Automatic **winner declaration** based on efficiency

### 📊 Statistics Panel
- Nodes Visited
- Steps taken
- Road Distance of the final path

### 🏛️ Campus Legend & Selector
- Sidebar lists all campuses — tap any to set it as start or destination
- Click directly on map markers to select nodes
- Dropdowns for Start and Destination campus selection

### 🌙 UI / UX
- **Day / Night mode** toggle
- **Collapsible sidebar** with mobile-friendly overlay
- Locate Me (📍) button
- Fit All Campuses (⊞) button
- Reset North (⬆) button

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Map Rendering | [Leaflet.js v1.9.4](https://leafletjs.com/) |
| Map Tiles | OpenStreetMap / Satellite / Traffic layers |
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| Styling | Custom CSS with CSS variables (theming) |
| No build tools | Zero dependencies to install — just open in browser |

---

## 🚀 Getting Started

No installation or build step required.

```bash
# Clone the repo
git clone https://github.com/shirshmohan/KIIT-Campus-Search-Algo.git

# Open in browser
cd KIIT-Campus-Search-Algo
open index.html   # macOS
# or just double-click index.html on Windows/Linux
```

That's it. The app loads map tiles from CDN and runs entirely in the browser.

---

## 🎮 How to Use

1. **Select an Algorithm** from the chip buttons in the sidebar (BFS, DFS, Dijkstra, UCS, A\*)
2. **Pick a Start Campus** and a **Destination Campus** from the dropdowns (or click markers on the map)
3. Adjust the **Speed Slider** — slow for learning, fast for results
4. Hit **▶ Run** to start the animation
5. Watch the algorithm explore the graph on the live map
6. Check the **Statistics panel** and **Path Found** section for results
7. Hit **↺ Reset** to clear and try again

### Compare Mode
1. Toggle the **Compare** switch in the header
2. Pick **Algo A** (blue) and **Algo B** (orange)
3. Select start & end, then hit **▶ Run**
4. Both algorithms animate simultaneously — the winner is highlighted

---

## 📁 Project Structure

```
KIIT-Campus-Search-Algo/
├── index.html      # App shell, layout, sidebar, map container
├── script.js       # Graph data, all 5 algorithms, animation engine, Leaflet setup
└── style.css       # Full UI styling, dark/light themes, responsive layout
```

---

## 🏫 Campus Graph

The graph represents real KIIT Bhubaneswar campuses as **nodes** and the actual roads/paths between them as **weighted edges**. Edge weights approximate real walking/road distances.

Campuses covered include (but not limited to):
- Campus 1 – 7 (Academic Blocks)
- Campus 11 (School of Law)
- Campus 14 (Technology Block)
- Campus 15 (KIIT Polytechnic)
- Campus 16 (International Area)
- KIIT Stadium, Hospital, Guest House, and more

---

## 🔬 Algorithm Details

### BFS (Breadth-First Search)
Explores all neighbors level by level. Guarantees the **shortest path in terms of hops** (unweighted). Good for understanding graph traversal basics.

### DFS (Depth-First Search)
Dives deep along one path before backtracking. Does **not** guarantee the shortest path but is memory-efficient.

### Dijkstra's Algorithm
Explores the lowest-cost node first using a priority queue. Guarantees the **shortest weighted path**. The gold standard for road networks.

### UCS (Uniform Cost Search)
Functionally equivalent to Dijkstra — expands nodes in order of cumulative path cost. Optimal and complete.

### A\* Search
Combines Dijkstra's cost-so-far `g(n)` with a **heuristic** `h(n)` (straight-line/haversine distance to the goal). The most efficient algorithm here — visits fewer nodes than Dijkstra while guaranteeing the optimal path.

---

## 🗺️ Color Legend

| Color | Meaning |
|---|---|
| 🟢 Green | Start node |
| 🔴 Red | End / Destination node |
| 🟡 Yellow | Visited node |
| 🟣 Purple | Frontier (queued, not yet visited) |
| 🔵 Cyan | Unvisited node |
| 🔵 Blue | Final path (Algo A) |
| 🟠 Orange | Final path (Algo B, Compare mode) |

---

## 📌 Roadmap / Future Ideas

- [ ] Add Greedy Best-First Search
- [ ] Support custom edge weight editing in-browser
- [ ] Export path as directions (text / shareable link)
- [ ] Mobile PWA support
- [ ] Add real-time pedestrian routing via OSRM API

---

## 🤝 Contributing

Pull requests are welcome! If you spot a wrong campus location or a missing road connection, open an issue or submit a PR with the corrected coordinates in `script.js`.

---

## 📜 License

MIT License — free to use, modify, and distribute.

---

## 👤 Author

**Shirsh Mohan**  **Saurbh Sharma**
KIIT University, Bhubaneswar
[GitHub → @shirshmohan](https://github.com/shirshmohan)

---

> Built as a visual learning tool to understand graph search algorithms using a real-world campus map.
