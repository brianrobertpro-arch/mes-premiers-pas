/* ═══════════════════════════════════════════════════════════════════════════
   MPP — ICÔNES AQUARELLE

   Remplace les icônes actuelles (SVG exportés par Webflow) par les aquarelles
   hébergées sur R2, SANS toucher au HTML : tout est piloté par mpp/data.json,
   clé « icones ». Chaque entrée cible une image par un fragment UNIQUE de son
   URL actuelle (« cle » = préfixe de hash Webflow), donc indépendamment de sa
   position dans la page ou de la structure du DOM.

   FILET DE SÉCURITÉ : si l'aquarelle ne se charge pas (nom de fichier faux,
   réseau indisponible…), l'icône d'origine est restaurée. Aucune image cassée
   ne peut apparaître. Corriger un nom = une ligne dans data.json.

   Le contenu est parfois (re)construit par les scripts Webflow après nous : on
   ré-applique tant que des cibles restent à traiter, puis on cesse.
   ═══════════════════════════════════════════════════════════════════════════ */
(() => {
  let regles = null;      // [{ cle, url, actif }]
  const traites = new WeakSet();

  const poser = (img, url, classe) => {
    if (traites.has(img)) return;
    traites.add(img);
    // FILET : on précharge l'aquarelle dans une image détachée. On ne remplace
    // l'icône visible QUE si elle se charge vraiment → aucune image cassée, même
    // pour les icônes en `loading="lazy"` situées plus bas dans la page.
    const sonde = new Image();
    sonde.onload = () => {
      img.setAttribute('src', url);
      // srcset de Webflow prendrait le pas sur src : on le neutralise.
      if (img.hasAttribute('srcset')) img.removeAttribute('srcset');
      if (classe) img.classList.add(classe);
      img.dataset.mppIcone = 'aquarelle';
    };
    sonde.onerror = () => {
      // Aquarelle indisponible : on garde l'icône d'origine, on marque « traité ».
      img.dataset.mppIcone = 'origine';
    };
    sonde.src = url;
  };

  // Style des totems du footer : détourés (fond transparent, sans voile ni
  // fondu décoratif) et un peu plus grands que les anciens stickers.
  const injecterStyle = () => {
    if (document.getElementById('mpp-icones-style')) return;
    const st = document.createElement('style');
    st.id = 'mpp-icones-style';
    st.textContent =
      '.mpp-totem{opacity:1 !important;background:transparent !important;' +
      'mix-blend-mode:normal !important;filter:none !important;' +
      'object-fit:contain;transform:scale(1.45);transform-origin:center;}';
    (document.head || document.documentElement).appendChild(st);
  };

  // Masque un élément (sticker retiré) sans le supprimer du DOM.
  const masquer = (img) => {
    if (traites.has(img)) return;
    traites.add(img);
    img.style.display = 'none';
    img.dataset.mppIcone = 'masque';
  };

  const appliquer = () => {
    if (!regles) return 0;
    let restants = 0;
    regles.forEach((r) => {
      if (!r.actif) return;
      const imgs = document.querySelectorAll(`img[src*="${r.cle}"]:not([data-mpp-icone])`);
      if (!imgs.length) restants++;              // pas encore dans le DOM
      imgs.forEach((img) => (r.masquer ? masquer(img) : poser(img, r.url, r.classe)));
    });
    return restants;
  };

  fetch('mpp/data.json')
    .then((r) => r.json())
    .then((d) => {
      const conf = d && d.icones;
      if (!conf || !Array.isArray(conf.remplacements)) return;
      const base = conf.base || '';
      regles = conf.remplacements
        .filter((e) => e && e.cle && (e.fichier || e.masquer))
        .map((e) => ({
          cle: e.cle,
          url: base + (e.fichier || ''),
          masquer: !!e.masquer,
          classe: e.classe || '',
          actif: e.actif !== false,
        }));

      injecterStyle();
      appliquer();
      // Le DOM peut être complété après coup (scripts Webflow, carrousels…) :
      // on ré-applique un court moment, puis on s'arrête.
      let n = 0;
      const iv = setInterval(() => {
        if (appliquer() === 0 || ++n > 60) clearInterval(iv);   // ~12 s max
      }, 200);
      new MutationObserver(() => appliquer())
        .observe(document.body, { childList: true, subtree: true });
    })
    .catch((e) => console.error('[mpp-icones]', e));
})();
