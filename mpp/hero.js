/* ═══════════════════════════════════════════════════════════════════════════
   MPP — HERO (Tâche 1) : applique le fond depuis mpp/data.json, et en LOCAL
   seulement, injecte la barre de choix pour que Brian tranche en direct.

   Ordre de priorité du fond :
     1. localStorage (choix en cours de Brian, dev)
     2. data.json → home.hero.bg   ← c'est ici que se posera le choix retenu
     3. 'beige' (repli)
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  const FONDS = [
    { id: 'beige',   hex: '#e1dccc', nom: 'Beige/sable' },
    { id: 'creme',   hex: '#ebe6d4', nom: 'Crème' },
    { id: 'lime',    hex: '#d9dd7e', nom: 'Lime' },
    { id: 'vanille', hex: '#eeefa2', nom: 'Vanille' },
    { id: 'bleu',    hex: '#8195c2', nom: 'Bleu' },
    { id: 'violet',  hex: '#8985d5', nom: 'Violet' },
    { id: 'orange',  hex: '#e8a248', nom: 'Orange' },
    { id: 'rose',    hex: '#c14c7c', nom: 'Rose' },
  ];
  const CLE = 'mpp-hero-bg';
  const html = document.documentElement;
  const estDev = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);

  const applique = (id) => {
    if (!FONDS.some((f) => f.id === id)) id = 'beige';
    html.setAttribute('data-hero-bg', id);
    return id;
  };

  // Pose une valeur tout de suite (évite un flash) puis affine avec data.json.
  let courant = applique(localStorage.getItem(CLE) || 'beige');
  let defautData = 'beige';

  fetch('/mpp/data.json')
    .then((r) => r.json())
    .then((d) => {
      defautData = (d && d.home && d.home.hero && d.home.hero.bg) || 'beige';
      // le choix dev l'emporte sur la donnée, sinon c'est la donnée qui fait foi
      if (!localStorage.getItem(CLE)) courant = applique(defautData);
      majBarre();
    })
    .catch(() => {});

  let barre = null;
  const majBarre = () => {
    if (!barre) return;
    barre.querySelectorAll('.mpp-dev-bar__swatch').forEach((b) => {
      b.setAttribute('aria-pressed', String(b.dataset.bg === courant));
    });
  };

  if (!estDev || !document.querySelector('.hero-section.main')) return;

  // ─── Barre de choix (LOCAL uniquement : absente dès que le site est servi
  //     depuis un autre hôte — c'est l'équivalent du dev-only ici, ce site
  //     statique n'ayant pas d'étape de build). ─────────────────────────────
  barre = document.createElement('div');
  barre.className = 'mpp-dev-bar';
  barre.setAttribute('role', 'group');
  barre.setAttribute('aria-label', 'Choix du fond du hero (dev)');

  const label = document.createElement('span');
  label.className = 'mpp-dev-bar__label';
  label.textContent = 'Fond hero';
  barre.appendChild(label);

  FONDS.forEach((f) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mpp-dev-bar__swatch';
    b.dataset.bg = f.id;
    b.style.background = f.hex;
    b.title = f.nom + ' ' + f.hex;
    b.setAttribute('aria-label', f.nom);
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', () => {
      courant = applique(f.id);
      localStorage.setItem(CLE, courant);
      majBarre();
    });
    barre.appendChild(b);
  });

  const reset = document.createElement('button');
  reset.type = 'button';
  reset.className = 'mpp-dev-bar__reset';
  reset.textContent = 'data.json';
  reset.title = 'Oublier mon choix et revenir à la valeur de data.json';
  reset.addEventListener('click', () => {
    localStorage.removeItem(CLE);
    courant = applique(defautData);
    majBarre();
  });
  barre.appendChild(reset);

  document.body.appendChild(barre);
  majBarre();
})();
