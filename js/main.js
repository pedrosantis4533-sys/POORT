document.addEventListener('DOMContentLoaded', () => {
  
  /* ════════════════════════════════════════════════
     1. MENU FLUTUANTE (ILHA DE VIDRO)
     ════════════════════════════════════════════════ */
  const nav = document.getElementById('idealNav');
  const trigger = document.getElementById('idealNavTrigger');
  const backdrop = document.getElementById('idealNavBackdrop');
  
  if (nav && trigger) {
    const openMenu = () => {
      nav.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };
    
    const closeMenu = () => {
      nav.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    
    const toggleMenu = () => {
      nav.classList.contains('is-open') ? closeMenu() : openMenu();
    };
    
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
    
    if (backdrop) {
      backdrop.addEventListener('click', closeMenu);
    }
    
    // Fechar ao apertar Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
    
    // Fechar ao clicar em algum link interno
    const navLinks = nav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeMenu, 150);
      });
    });
    
    // Marcar link ativo com base na URL/Seção
    const normalizePath = (p) => p.replace(/\/+$/, '') || '/';
    const currentPath = normalizePath(window.location.pathname);
    
    navLinks.forEach(link => {
      try {
        const hrefAttr = link.getAttribute('href');
        if (hrefAttr.startsWith('#')) {
          // Se for âncora, ignorar na verificação de rota absoluta
          return;
        }
        const linkPath = normalizePath(new URL(hrefAttr, window.location.origin).pathname);
        if (linkPath === currentPath) {
          link.classList.add('is-active');
        }
      } catch (err) {}
    });
  }

  /* ════════════════════════════════════════════════
     2. REVEAL SCROLL ANIMATION (INTERSECTION OBSERVER)
     ════════════════════════════════════════════════ */
  const revealElements = document.querySelectorAll(
    '.ps-hero__headline, .ps-hero__desc, .ps-hero__cta-group, ' +
    '.portfolio-card, .service-card, .price-card, ' +
    '.contact-info, .contact-form-card, .ds-tagline, .ds-headline, .ds-desc'
  );
  
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target); // Animou uma vez, não precisa reanimar
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });
    
    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  } else {
    // Fallback caso não suporte observer
    revealElements.forEach(el => el.classList.add('is-visible'));
  }


  /* ════════════════════════════════════════════════
     4. FORMULÁRIO DE CONTATO → WHATSAPP INTEGRATION
     ════════════════════════════════════════════════ */
  const contactForm = document.getElementById('psContactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const nome = document.getElementById('formNome').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const tel = document.getElementById('formTel').value.trim();
      const servico = document.getElementById('formServico').value;
      const msg = document.getElementById('formMsg').value.trim();
      
      if (!nome || !email || !tel) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
      }
      
      // Montando mensagem estruturada em português
      const textoWhatsApp = `Olá Pedro, gostaria de fazer um orçamento. Me chamo ${nome} e tenho interesse em ${servico}.`;
        
      const url = `https://wa.me/5566992098255?text=${encodeURIComponent(textoWhatsApp)}`;
      
      // Redireciona para o WhatsApp em nova janela
      window.open(url, '_blank');
      
      // Opcional: resetar form
      contactForm.reset();
    });
  }
});
