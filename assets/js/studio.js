export const projects = [
  {
    name: "Galería MV",
    kind: "EXPERIENCIA WEB 3D",
    category: "3d",
    description:
      "Una galería fotográfica convertida en un espacio que se puede recorrer. Colecciones, imágenes y navegación dentro de un museo virtual.",
    href: "https://mv.integratechconsulting.es",
    action: "Explorar demo",
    tone: "#dedccc",
    image: "assets/projects/mv.jpg",
    mark: "MV",
  },
  {
    name: "VFL Arena",
    kind: "EXPERIENCIA WEB 3D",
    category: "3d",
    description:
      "Una jaula de MMA como punto de encuentro. Un entorno interactivo para descubrir el evento y sus secciones.",
    href: "https://vfl.integratechconsulting.es",
    action: "Entrar en la arena",
    tone: "#cfddcd",
    image: "assets/projects/vfl.jpg",
    mark: "VFL",
  },
  {
    name: "Interfaces naturales",
    kind: "PROTOTIPO ACADÉMICO · JAVASCRIPT",
    category: "software",
    description:
      "Exploración de voz, gestos y realidad aumentada aplicada a un centro de incidencias. Cámara y micrófono bajo control del usuario.",
    href: "https://github.com/MTNRS/ra2-interfaces-naturales-itc",
    action: "Ver proyecto",
    tone: "#d9dfef",
    mark: "↗",
  },
  {
    name: "Generador Windows",
    kind: "HERRAMIENTA · WINDOWS X64",
    category: "software",
    description:
      "Adaptación a Windows del generador de informes de proyectos de Jocarsa. Con versión descargable y código público.",
    href: "https://github.com/MTNRS/generador-windows",
    action: "Código y descargas",
    tone: "#edc8ad",
    mark: "{ }",
  },
  {
    name: "Acceso a datos",
    kind: "PROYECTO ACADÉMICO · PYTHON",
    category: "software",
    description:
      "Trabajo de acceso a datos con ficheros CSV y JSON, aplicado a un caso de gestión de Integra Tech.",
    href: "https://github.com/MTNRS/AD-RA1-integratech-basededatos",
    action: "Explorar código",
    tone: "#dbe5bd",
    mark: "[ ]",
  },
  {
    name: "Estudio ERP & CRM",
    kind: "TRABAJO ACADÉMICO · GESTIÓN",
    category: "software",
    description:
      "Análisis de sistemas de gestión empresarial aplicado a Integra Tech Consulting: organización, procesos y herramientas.",
    href: "https://github.com/MTNRS/SGE-RA1-integratech-crimson",
    action: "Ver estudio",
    tone: "#e6d8d9",
    mark: "≡",
  },
];
const grid = document.querySelector("#project-grid");
grid.innerHTML = projects
  .map(
    (p, i) =>
      `<article class="project-card" data-category="${p.category}"><a class="project-visual" style="--tone:${p.tone}" href="${p.href}" target="_blank" rel="noopener noreferrer" aria-label="${p.action}: ${p.name}">${p.image ? `<img src="${p.image}" alt="Vista de la demo ${p.name}" width="720" height="480" loading="lazy">` : `<span class="visual-mark" aria-hidden="true">${p.mark}</span>`}<span class="card-number">0${i + 1}</span><span class="card-open" aria-hidden="true">↗</span></a><div class="project-meta">${p.kind}</div><h3>${p.name}</h3><p>${p.description}</p><a class="project-link" href="${p.href}" target="_blank" rel="noopener noreferrer">${p.action} ↗</a></article>`,
  )
  .join("");
document.querySelectorAll("[data-filter]").forEach((button) =>
  button.addEventListener("click", () => {
    document
      .querySelectorAll("[data-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    grid
      .querySelectorAll("article")
      .forEach(
        (card) =>
          (card.hidden =
            button.dataset.filter !== "all" &&
            card.dataset.category !== button.dataset.filter),
      );
  }),
);
document.querySelector("#year").textContent = new Date().getFullYear();
let selectScene = () => {};
function selectProject(index) {
  const p = projects[index];
  document.querySelector("#selected-name").textContent = p.name;
  document.querySelector("#selected-type").textContent =
    `0${index + 1} / ${p.kind}`;
  document.querySelector("#selected-project").href = p.href;
  document
    .querySelectorAll("[data-project]")
    .forEach((b) =>
      b.setAttribute(
        "aria-pressed",
        String(Number(b.dataset.project) === index),
      ),
    );
  document.querySelector("#scene-announcement").textContent =
    `Proyecto seleccionado: ${p.name}`;
  selectScene(index);
}
document
  .querySelectorAll("[data-project]")
  .forEach((b) =>
    b.addEventListener("click", () => selectProject(Number(b.dataset.project))),
  );
const host = document.querySelector("#studio");
function fallback() {
  host.classList.remove("has-webgl");
  document.querySelector("#scene-help").textContent =
    "Selecciona un proyecto con los botones";
  document.querySelector("#rotate").disabled = true;
  document.querySelector("#reset").disabled = true;
}
async function initScene() {
  const T = await import("../vendor/three.module.js");
  const renderer = new T.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.7));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = T.PCFSoftShadowMap;
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;
  host.appendChild(renderer.domElement);
  host.classList.add("has-webgl");
  renderer.domElement.setAttribute("aria-hidden", "true");
  const scene = new T.Scene(),
    camera = new T.PerspectiveCamera(35, 1, 0.1, 80);
  camera.position.set(9, 10, 12);
  camera.lookAt(0, 0.6, 0);
  const world = new T.Group();
  scene.add(world);
  world.rotation.y = -0.15;
  scene.add(new T.HemisphereLight(0xffffff, 0x7d9672, 2.8));
  const sun = new T.DirectionalLight(0xfff6dd, 4);
  sun.position.set(-5, 12, 7);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8 });
  sun.shadow.normalBias = 0.04;
  scene.add(sun);
  const fill = new T.DirectionalLight(0xd6efff, 2);
  fill.position.set(7, 5, -5);
  scene.add(fill);
  const mat = (color, metalness = 0) =>
    new T.MeshStandardMaterial({ color, roughness: 0.65, metalness });
  const cream = mat("#f1ebd9"),
    green = mat("#405f4d"),
    mint = mat("#aaca94"),
    dark = mat("#203c35"),
    orange = mat("#dc7950"),
    lilac = mat("#aaaecf"),
    pink = mat("#d9b4af");
  function mesh(geo, material, parent, x = 0, y = 0, z = 0) {
    const m = new T.Mesh(geo, material);
    m.position.set(x, y, z);
    m.castShadow = true;
    m.receiveShadow = true;
    parent.add(m);
    return m;
  }
  const box = (w, h, d, m, p, x = 0, y = 0, z = 0) =>
    mesh(new T.BoxGeometry(w, h, d), m, p, x, y, z);
  const cyl = (r, h, m, p, x = 0, y = 0, z = 0, n = 48) =>
    mesh(new T.CylinderGeometry(r, r, h, n), m, p, x, y, z);
  cyl(4.35, 0.25, cream, world, 0, -0.25, 0, 96);
  cyl(4.15, 0.12, mint, world, 0, -0.07, 0, 96);
  const ring = mesh(
    new T.TorusGeometry(4.22, 0.018, 6, 96),
    dark,
    world,
    0,
    -0.12,
    0,
  );
  ring.rotation.x = Math.PI / 2;
  const gridPoints = [];
  for (let offset = -3.6; offset <= 3.6; offset += 0.4) {
    const edge = Math.sqrt(3.95 ** 2 - offset ** 2);
    gridPoints.push(-edge, 0.005, offset, edge, 0.005, offset);
    gridPoints.push(offset, 0.005, -edge, offset, 0.005, edge);
  }
  const gridLines = new T.LineSegments(
    new T.BufferGeometry().setAttribute(
      "position",
      new T.Float32BufferAttribute(gridPoints, 3),
    ),
    new T.LineBasicMaterial({ color: 0xa7b697 }),
  );
  world.add(gridLines);
  // An architectural arch anchors the miniature studio without hiding project objects.
  const arch = new T.Group();
  world.add(arch);
  arch.position.set(-1.5, 0, -1.7);
  box(0.36, 2.6, 0.38, cream, arch, -0.9, 1.3);
  box(0.36, 2.6, 0.38, cream, arch, 0.9, 1.3);
  const archTop = mesh(
    new T.TorusGeometry(0.9, 0.19, 12, 36, Math.PI),
    cream,
    arch,
    0,
    2.6,
  );
  archTop.rotation.z = 0;
  const items = [];
  const positions = [
    [-2.4, 0, 0.45],
    [2.05, 0, -0.9],
    [0.0, 0, -1.9],
    [1.9, 0, 1.55],
    [-0.25, 0, 2.25],
    [-0.5, 0, 0.1],
  ];
  function label(text) {
    const c = document.createElement("canvas");
    c.width = 128;
    c.height = 64;
    const ctx = c.getContext("2d");
    ctx.fillStyle = "#edf0e4";
    ctx.fillRect(0, 0, 128, 64);
    ctx.fillStyle = "#203c35";
    ctx.font = "bold 30px monospace";
    ctx.textAlign = "center";
    ctx.fillText(text, 64, 43);
    const tex = new T.CanvasTexture(c);
    tex.colorSpace = T.SRGBColorSpace;
    return new T.MeshBasicMaterial({ map: tex });
  }
  positions.forEach((pos, i) => {
    const g = new T.Group();
    g.position.set(...pos);
    g.userData.project = i;
    world.add(g);
    items.push(g);
    cyl(0.77, 0.18, i === 0 ? orange : cream, g, 0, 0.12, 0);
    const tag = mesh(
      new T.PlaneGeometry(0.42, 0.21),
      label(`0${i + 1}`),
      g,
      0,
      0.24,
      0.63,
    );
    tag.rotation.x = -Math.PI / 3;
  });
  // 01: picture wall, 02: octagonal arena, 03: gesture interface,
  // 04: desktop tool, 05: database, 06: connected business blocks.
  const photo = items[0];
  box(1.1, 1.4, 0.12, green, photo, 0, 1.02);
  box(0.9, 1.17, 0.04, cream, photo, 0, 1.02, 0.08);
  mesh(new T.CircleGeometry(0.25, 32), orange, photo, 0.15, 1.23, 0.11);
  const mountain = mesh(
    new T.ConeGeometry(0.48, 0.64, 3),
    mint,
    photo,
    -0.07,
    0.78,
    0.13,
  );
  mountain.scale.z = 0.08;
  const arena = items[1];
  cyl(0.64, 0.17, dark, arena, 0, 0.32, 0, 8);
  const cageTop = mesh(
    new T.TorusGeometry(0.62, 0.035, 6, 8),
    orange,
    arena,
    0,
    1.03,
    0,
  );
  cageTop.rotation.x = Math.PI / 2;
  for (let i = 0; i < 8; i++) {
    const a = (i * Math.PI) / 4;
    cyl(
      0.025,
      0.65,
      dark,
      arena,
      Math.cos(a) * 0.62,
      0.68,
      Math.sin(a) * 0.62,
      8,
    );
    const next = a + Math.PI / 4;
    const panel = mesh(
      new T.PlaneGeometry(0.47, 0.58),
      new T.MeshStandardMaterial({
        color: 0x849489,
        wireframe: true,
        side: T.DoubleSide,
      }),
      arena,
      Math.cos(a + Math.PI / 8) * 0.575,
      0.67,
      Math.sin(a + Math.PI / 8) * 0.575,
    );
    panel.rotation.y = -a - Math.PI / 8 + Math.PI / 2;
  }
  const gesture = items[2];
  box(0.95, 1.25, 0.14, lilac, gesture, 0, 1);
  box(0.78, 1.05, 0.04, dark, gesture, 0, 1, 0.09);
  for (let i = 0; i < 4; i++)
    cyl(
      0.045,
      0.3 + i * 0.06,
      mint,
      gesture,
      -0.21 + i * 0.14,
      1.03 + i * 0.03,
      0.17,
      12,
    );
  mesh(
    new T.SphereGeometry(0.18, 16, 12),
    mint,
    gesture,
    0,
    0.85,
    0.16,
  ).scale.set(1, 1, 0.3);
  const desktop = items[3];
  box(1.15, 0.09, 0.7, orange, desktop, 0, 0.63);
  for (const x of [-0.43, 0.43]) box(0.07, 0.45, 0.48, green, desktop, x, 0.36);
  box(0.78, 0.56, 0.08, dark, desktop, 0, 1.01, -0.13);
  box(0.66, 0.43, 0.025, mint, desktop, 0, 1.01, -0.08);
  box(0.07, 0.15, 0.08, dark, desktop, 0, 0.75, -0.13);
  box(0.5, 0.035, 0.2, cream, desktop, 0, 0.7, 0.15);
  for (let i = 0; i < 3; i++)
    box(
      0.36 - i * 0.07,
      0.018,
      0.01,
      green,
      desktop,
      -0.04,
      1.13 - i * 0.08,
      -0.06,
    );
  const data = items[4];
  for (let i = 0; i < 3; i++) {
    cyl(0.43, 0.25, i % 2 ? green : mint, data, 0, 0.43 + i * 0.3);
    cyl(0.435, 0.035, cream, data, 0, 0.57 + i * 0.3);
  }
  const biz = items[5];
  box(0.45, 0.6, 0.45, green, biz, -0.28, 0.53, 0.1);
  box(0.45, 1, 0.45, orange, biz, 0.24, 0.72, -0.12);
  box(0.4, 0.38, 0.4, pink, biz, 0.32, 0.43, 0.42);
  // Small botanical accents give the studio a human scale.
  for (const [x, z] of [
    [-2.5, -1.65],
    [2.75, 0.3],
  ]) {
    cyl(0.23, 0.38, orange, world, x, 0.2, z, 16);
    for (let i = 0; i < 3; i++) {
      const leaf = mesh(
        new T.SphereGeometry(0.22, 12, 8),
        green,
        world,
        x + (i - 1) * 0.13,
        0.6 + i * 0.12,
        z,
      );
      leaf.scale.set(0.7, 1.8, 0.6);
      leaf.rotation.z = (i - 1) * 0.5;
    }
  }
  let selected = 0,
    auto = false,
    dragging = false,
    lastX = 0,
    startX = 0,
    startY = 0,
    active = true,
    lost = false,
    raf = 0,
    previous = 0;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  let dirty = true;
  selectScene = (i) => {
    selected = i;
    dirty = true;
    draw();
  };
  function resize() {
    const w = host.clientWidth,
      h = host.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.set(
      w / h < 1.15 ? 10 : 8,
      w / h < 1.15 ? 11 : 9,
      w / h < 1.15 ? 13 : 11,
    );
    camera.lookAt(0, 0.7, 0);
    camera.updateProjectionMatrix();
    dirty = true;
    draw();
  }
  new ResizeObserver(resize).observe(host);
  function frame(time) {
    raf = 0;
    if (!active || lost) return;
    const dt = Math.min((time - previous) / 1000, 0.05) || 0.016;
    previous = time;
    let settling = false;
    items.forEach((g, i) => {
      const target = i === selected ? 0.35 : 0;
      g.position.y = reduced.matches
        ? target
        : T.MathUtils.damp(g.position.y, target, 9, dt);
      if (Math.abs(g.position.y - target) > 0.001) settling = true;
    });
    if (auto && !reduced.matches) {
      world.rotation.y += dt * 0.16;
      dirty = true;
    }
    if (dirty || settling) {
      renderer.render(scene, camera);
      dirty = false;
    }
    if (settling || (auto && !reduced.matches))
      raf = requestAnimationFrame(frame);
  }
  function draw() {
    if (!raf && active && !lost) raf = requestAnimationFrame(frame);
  }
  const rotate = document.querySelector("#rotate");
  rotate.addEventListener("click", () => {
    auto = !auto;
    rotate.setAttribute("aria-pressed", String(auto));
    rotate.setAttribute(
      "aria-label",
      auto ? "Pausar giro automático" : "Activar giro automático",
    );
    rotate.textContent = auto ? "Pausar Ⅱ" : "Girar ↻";
    if (auto && reduced.matches) {
      world.rotation.y += Math.PI / 6;
      dirty = true;
    }
    draw();
  });
  document.querySelector("#reset").addEventListener("click", () => {
    world.rotation.y = -0.15;
    auto = false;
    rotate.setAttribute("aria-pressed", "false");
    rotate.setAttribute("aria-label", "Activar giro automático");
    rotate.textContent = "Girar ↻";
    selectProject(0);
    dirty = true;
    draw();
  });
  const canvas = renderer.domElement;
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = startX = e.clientX;
    startY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    world.rotation.y += dx * 0.008;
    lastX = e.clientX;
    dirty = true;
    draw();
  });
  canvas.addEventListener("pointercancel", () => (dragging = false));
  canvas.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    if (Math.hypot(e.clientX - startX, e.clientY - startY) > 8) return;
    const rect = canvas.getBoundingClientRect();
    const ray = new T.Raycaster();
    ray.setFromCamera(
      new T.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        (-(e.clientY - rect.top) / rect.height) * 2 + 1,
      ),
      camera,
    );
    const hits = ray.intersectObjects(items, true);
    if (hits.length) {
      let o = hits[0].object;
      while (o && o.userData.project === undefined) o = o.parent;
      if (o) selectProject(o.userData.project);
    }
  });
  let visible = true;
  function activity() {
    active = visible && !document.hidden;
    if (active) {
      dirty = true;
      draw();
    } else {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      activity();
    },
    { rootMargin: "100px" },
  ).observe(host);
  document.addEventListener("visibilitychange", activity);
  reduced.addEventListener("change", () => {
    dirty = true;
    draw();
  });
  canvas.addEventListener("webglcontextlost", (e) => {
    e.preventDefault();
    lost = true;
    cancelAnimationFrame(raf);
    fallback();
  });
  resize();
}
initScene().catch(fallback);
