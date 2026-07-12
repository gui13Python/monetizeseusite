// =========================================================
// MonetizeCerto — interações do site
// =========================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Menu mobile ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link (bom para navegação mobile)
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Botão flutuante de CTA (aparece após rolar a hero) ---------- */
  const floatingCta = document.getElementById('floatingCta');
  const hero = document.querySelector('.hero');

  if (floatingCta && hero) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Mostra o CTA flutuante quando a hero sai da tela
          floatingCta.classList.toggle('visible', !entry.isIntersecting);
        });
      },
      { threshold: 0 }
    );
    observer.observe(hero);
  }

  /* ---------- Animação leve de entrada para cartões e seções ---------- */
  const revealTargets = document.querySelectorAll(
    '.feature-card, .story-card, .seo-card, .faq-item, .timeline li'
  );

  if ('IntersectionObserver' in window && revealTargets.length) {
    revealTargets.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
    });

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(el => revealObserver.observe(el));
  }

  /* ---------- Animação das barras do gráfico da hero ---------- */
  const bars = document.querySelectorAll('.ledger-chart .bars rect');
  bars.forEach((bar, i) => {
    const originalHeight = bar.getAttribute('height');
    const originalY = bar.getAttribute('y');
    bar.setAttribute('height', '0');
    bar.setAttribute('y', '300');
    setTimeout(() => {
      bar.style.transition = 'height .6s ease, y .6s ease';
      bar.setAttribute('height', originalHeight);
      bar.setAttribute('y', originalY);
    }, 150 * i);
  });

  /* ---------- Log de cliques no CTA (Pronto para integrar pixels de anúncios) ---------- */
  document.querySelectorAll('a[href*="adcash.myadcash.com"]').forEach(link => {
    link.addEventListener('click', () => {
      console.log('[monetizeseusite.pytksolutions.com.br] Redirecionando usuário para o registro oficial Adcash.');
    });
  });

});