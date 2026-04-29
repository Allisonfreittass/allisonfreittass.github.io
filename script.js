// ── Translations ──
const translations = {
    pt: {
        nav: {
            home: 'Início', about: 'Sobre', experience: 'Experiência',
            projects: 'Projetos', contact: 'Contato'
        },
        hero: {
            available: 'Disponível',
            greeting: 'Olá, eu sou',
            roles: ['Desenvolvedor Fullstack', 'Engenheiro Web3', 'AI Engineer', 'Desenvolvedor Backend'],
            description: 'Criando experiências digitais com código limpo, design intuitivo e foco em performance. Apaixonado por transformar ideias em produtos reais.',
            cta_projects: 'Ver Projetos',
            cta_cv: 'Download CV',
            cta_contact: 'Contato'
        },
        about: {
            title: 'Sobre Mim',
            text: 'Sou um desenvolvedor fullstack apaixonado por criar soluções elegantes e eficientes. Atualmente cursando Ciência da Computação e trabalhando na F2 Tecnologia, combino conhecimento técnico com uma abordagem centrada no usuário para desenvolver aplicações que fazem a diferença.',
            skills: { frontend: 'Frontend', backend: 'Backend', database: 'Banco de Dados', devops: 'DevOps & Outros' }
        },
        experience: {
            title: 'Experiência',
            present: 'Presente',
            f2: {
                role: 'Desenvolvedor Fullstack',
                desc: 'Desenvolvimento de aplicações web fullstack com React, Node.js e MongoDB. Responsável por integrações com ERPs externos, autenticação JWT e deploy de aplicações SaaS em produção.'
            },
            edu: {
                name: 'Ciência da Computação',
                institution: 'Concluído',
                desc: 'Bacharelado em Ciência da Computação com foco em desenvolvimento de software, estruturas de dados e fundamentos de computação.'
            }
        },
        projects: {
            title: 'Projetos',
            code: 'Código',
            thoth: { desc: 'Plataforma SaaS completa para treinamento e chat com LLMs. Implementa RAG para respostas baseadas em documentos, fine-tuning assíncrono via microserviço Python, pagamentos recorrentes com Stripe e métricas de uso em tempo real.' },
            myblock_front: { desc: 'Interface da plataforma de gestão de imóveis baseada em blockchain. Inclui autenticação, dashboard, portfólio de propriedades e fluxo completo de contratos de aluguel via smart contracts.' },
            myblock_back: { desc: 'API e smart contracts do MyBlock. Arquitetura híbrida Web2/Web3 com contratos Solidity que automatizam aluguéis, aplicam multas por atraso (10%) e controlam status via blockchain. Inclui agendamento via cron e autenticação JWT.' }
        },
        contact: {
            title: 'Contato',
            text: 'Tem um projeto em mente ou quer trocar uma ideia? Me mande uma mensagem — ficarei feliz em conversar!'
        },
        footer: 'Todos os direitos reservados.'
    },
    en: {
        nav: {
            home: 'Home', about: 'About', experience: 'Experience',
            projects: 'Projects', contact: 'Contact'
        },
        hero: {
            available: 'Open to opportunities',
            greeting: "Hi, I'm",
            roles: ['Fullstack Developer', 'Web3 Engineer', 'AI Engineer', 'Backend Developer'],
            description: 'Building digital experiences with clean code, intuitive design and a focus on performance. Passionate about turning ideas into real products.',
            cta_projects: 'View Projects',
            cta_cv: 'Download CV',
            cta_contact: 'Contact'
        },
        about: {
            title: 'About Me',
            text: "I'm a fullstack developer passionate about creating elegant and efficient solutions. Currently studying Computer Science and working at F2 Tecnologia, I combine technical knowledge with a user-centered approach to build applications that make a difference.",
            skills: { frontend: 'Frontend', backend: 'Backend', database: 'Database', devops: 'DevOps & Others' }
        },
        experience: {
            title: 'Experience',
            present: 'Present',
            f2: {
                role: 'Fullstack Developer',
                desc: 'Fullstack web application development using React, Node.js and MongoDB. Responsible for external ERP integrations, JWT authentication and production deployment of SaaS applications.'
            },
            edu: {
                name: 'Computer Science',
                institution: 'Completed',
                desc: "Bachelor's degree in Computer Science with a focus on software development, data structures and fundamentals of computing."
            }
        },
        projects: {
            title: 'Projects',
            code: 'Code',
            thoth: { desc: 'Complete SaaS platform for LLM training and chat. Implements RAG for document-based responses, asynchronous fine-tuning via Python microservice, recurring payments with Stripe and real-time usage metrics.' },
            myblock_front: { desc: 'Frontend for a blockchain-based property management platform. Includes authentication, dashboard, property portfolio and full rental contract flow via smart contracts.' },
            myblock_back: { desc: 'API and smart contracts for MyBlock. Hybrid Web2/Web3 architecture with Solidity contracts that automate rentals, apply late fees (10%) and track status on the blockchain. Includes cron scheduling and JWT authentication.' }
        },
        contact: {
            title: 'Contact',
            text: "Have a project in mind or want to chat? Send me a message — I'd love to talk!"
        },
        footer: 'All rights reserved.'
    }
};

// ── Helpers ──
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? '';
}

// ── Typewriter ──
let typewriterTimeout = null;
let twState = { index: 0, char: 0, deleting: false };

function startTypewriter(roles) {
    clearTimeout(typewriterTimeout);
    twState = { index: 0, char: 0, deleting: false };
    const el = document.querySelector('.typewriter');
    if (!el) return;

    function tick() {
        const current = roles[twState.index];
        twState.char += twState.deleting ? -1 : 1;
        el.textContent = current.substring(0, twState.char);

        let delay = twState.deleting ? 40 : 80;

        if (!twState.deleting && twState.char === current.length) {
            delay = 2200;
            twState.deleting = true;
        } else if (twState.deleting && twState.char === 0) {
            twState.deleting = false;
            twState.index = (twState.index + 1) % roles.length;
            delay = 300;
        }

        typewriterTimeout = setTimeout(tick, delay);
    }

    tick();
}

// ── i18n ──
let currentLang = localStorage.getItem('lang') || 'pt';

function applyTranslations(lang) {
    const data = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = getNestedValue(data, el.getAttribute('data-i18n'));
        if (typeof value === 'string') el.textContent = value;
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.getElementById('lang-label').textContent = lang === 'pt' ? 'EN' : 'PT';

    startTypewriter(data.hero.roles);
    localStorage.setItem('lang', lang);
}

// ── Main ──
document.addEventListener('DOMContentLoaded', () => {

    // Copyright year
    const yearEl = document.getElementById('copyright-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Loading screen
    const loadingContainer = document.querySelector('.loading-container');
    const hideLoader = () => {
        loadingContainer.classList.add('fade-out');
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            document.body.classList.add('loaded');
        }, 500);
    };

    if (document.readyState === 'complete') {
        setTimeout(hideLoader, 300);
    } else {
        window.addEventListener('load', () => setTimeout(hideLoader, 300));
    }

    // Initialize language
    applyTranslations(currentLang);

    // Language toggle
    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        applyTranslations(currentLang);
    });

    // Smooth scroll — offset by navbar
    const navbar = document.querySelector('.navbar');
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - navbar.offsetHeight;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // Active nav on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - navbar.offsetHeight - 80) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    // Mobile menu
    const menuButton = document.querySelector('.menu-button');
    const navLinksList = document.querySelector('.nav-links');

    if (menuButton && navLinksList) {
        menuButton.addEventListener('click', () => {
            const isOpen = navLinksList.classList.toggle('open');
            menuButton.classList.toggle('open', isOpen);
            menuButton.setAttribute('aria-expanded', String(isOpen));
        });

        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('open');
                menuButton.classList.remove('open');
                menuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
            setTimeout(() => entry.target.classList.remove('js-animate'), 700);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.section-title, .skill-card, .card, .about-text, .contact-card, .timeline-item').forEach(el => {
        el.classList.add('js-animate');
        observer.observe(el);
    });

});
