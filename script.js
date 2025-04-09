// Função para inicializar o portfólio
document.addEventListener('DOMContentLoaded', () => {
    // Remover tela de carregamento após 2 segundos
    setTimeout(() => {
        const loadingContainer = document.querySelector('.loading-container');
        if (loadingContainer) {
            loadingContainer.style.display = 'none';
        }
    }, 2000);

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Adicionar classe ativa ao link de navegação atual
    const sections = document.querySelectorAll('section');
    const navigationLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight/3)) {
                current = section.getAttribute('id');
            }
        });

        navigationLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Formulário de contato
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            try {
                // Aqui você pode adicionar a lógica para enviar o formulário
                // Por exemplo, usando fetch para uma API
                console.log('Dados do formulário:', data);
                
                // Mostrar mensagem de sucesso
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            } catch (error) {
                console.error('Erro ao enviar formulário:', error);
                alert('Erro ao enviar mensagem. Por favor, tente novamente.');
            }
        });
    }

    // Animações de entrada
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-title, .skill-card, .project-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Adicionar estilos iniciais para animação
    document.querySelectorAll('.card, .section-title, .skill-card, .project-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Executar animação no scroll
    window.addEventListener('scroll', animateOnScroll);
    // Executar uma vez no carregamento
    animateOnScroll();

    // Menu mobile
    const menuButton = document.querySelector('.menu-button');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    if (menuButton && mobileNavLinks) {
        menuButton.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
}); 