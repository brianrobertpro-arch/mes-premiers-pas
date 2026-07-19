/* ═══════════════════════════════════════════════════════════════════════════
   MPP — Diagramme « Journée type » (section-4)

   Deux corrections, SANS toucher au fonctionnement ni au design :
   1. Les écarts angulaires entre rayons étaient inégaux (15,5° · 18,9° · 21,2°
      · 39,4° au milieu · 21,2° · 18,9° · 15,5°). On les répartit également sur
      la même ouverture, en faisant pivoter CHAQUE rayon AVEC son étiquette et
      son illustration — les liaisons restent donc intactes.
   2. Le soleil passait sous le badge MENU (fixe en haut). Le diagramme est
      décalé vers le bas d'un petit espace, et sa hauteur compensée.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  // ⚠ Ne PAS sortir si le diagramme n'existe pas encore : il est construit par
  // le script d'origine. Un `return` au chargement tuait définitivement l'IIFE
  // et aucune relance n'était jamais enregistrée.
  let svg = null;
  const trouver = () => {
    const sec = document.querySelector('.section-4');
    if (!sec) return null;
    return [...sec.querySelectorAll('svg')].find((s) => s.querySelector('circle') && s.querySelectorAll('line').length > 1) || null;
  };

  const appliquer = () => {
    try {
      svg = svg && svg.isConnected ? svg : trouver();
      return svg ? poser() : false;
    } catch (e) { console.error('[mpp-planning]', e); return false; }
  };

  const poser = () => {
    const cercle = svg.querySelector('circle');
    const lignes = [...svg.querySelectorAll('line')];
    if (!cercle || lignes.length < 2) return false;

    const cx = +cercle.getAttribute('cx');
    const cy = +cercle.getAttribute('cy');

    // ─── Angle actuel de chaque rayon ────────────────────────────────────
    const rayons = lignes.map((l) => {
      const x2 = +l.getAttribute('x2'), y2 = +l.getAttribute('y2');
      return { l, x2, y2, angle: Math.atan2(y2 - cy, x2 - cx) };
    }).sort((a, b) => a.angle - b.angle);

    // ─── Répartition ÉGALE sur la même ouverture ─────────────────────────
    const premier = rayons[0].angle;
    const dernier = rayons[rayons.length - 1].angle;
    const pas = (dernier - premier) / (rayons.length - 1);

    // Éléments à faire tourner avec chaque rayon : tout ce qui est proche de
    // son extrémité (étiquette horaire, libellé, illustration).
    // getBBox n'existe que sur les éléments graphiques : clipPath & co l'ignorent.
    const candidats = [...svg.children].filter(
      (e) => e !== cercle && e.tagName !== 'line' && typeof e.getBBox === 'function'
    );
    const boite = (e) => { try { return e.getBBox(); } catch { return null; } };
    const pris = new Set();

    rayons.forEach((r, i) => {
      const vise = premier + pas * i;
      const delta = (vise - r.angle) * 180 / Math.PI;
      if (Math.abs(delta) < 0.05) return;

      // le rayon lui-même
      const rot = `rotate(${delta.toFixed(3)} ${cx} ${cy})`;
      r.l.setAttribute('transform', rot);

      // ce qui gravite autour de son extrémité (rayon de capture : 190 unités)
      candidats.forEach((e) => {
        if (pris.has(e)) return;                          // déjà attribué à un rayon
        const b = boite(e);
        if (!b) return;
        const ex = b.x + b.width / 2, ey = b.y + b.height / 2;
        if (Math.hypot(ex - r.x2, ey - r.y2) > 190) return;
        pris.add(e);
        e.setAttribute('transform', rot);
      });
    });

    svg.dataset.mppAngles = 'egaux';
    return true;
  };

  // Le SVG est (re)construit par le script d'origine APRÈS notre passage : une
  // application unique était écrasée. On teste l'état réel (les rayons sont-ils
  // déjà répartis ?) et on ré-applique tant que ce n'est pas le cas.
  // Le diagramme peut être construit APRÈS ce script, et re-rendu ensuite : on
  // teste l'état réel (les rayons portent-ils leur rotation ?) et on ré-applique.
  const dejaFait = () => {
    if (!svg || !svg.isConnected) return false;
    const l = [...svg.querySelectorAll('line')];
    return l.length > 1 && l.filter((x) => x.getAttribute('transform')).length >= l.length - 1;
  };

  appliquer();
  let n = 0;
  const iv = setInterval(() => {
    if (!dejaFait()) appliquer();
    if (++n > 100) clearInterval(iv);                    // ~10 s puis on cesse
  }, 100);
  new MutationObserver(() => { if (!dejaFait()) appliquer(); })
    .observe(document.body, { childList: true, subtree: true });
  window.addEventListener('load', appliquer, { once: true });
})();
