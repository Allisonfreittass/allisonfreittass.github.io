// ─────────────────────────────────────────────────────────────────────────
// Conteúdo em PT e EN. Esta é a única fonte de verdade dos textos —
// o HTML carrega o PT como fallback para quando o JS não roda.
// ─────────────────────────────────────────────────────────────────────────
const translations = {
    pt: {
        a11y: { skip: 'Pular para o conteúdo', menu: 'Abrir menu', menuClose: 'Fechar menu' },
        nav: { systems: 'Sistemas', path: 'Percurso', tools: 'Ferramentas', contact: 'Contato' },
        hero: {
            eyebrow: 'Backend, APIs e automação · F2 Tecnologia · Aberto a propostas',
            thesis: 'Eu construo sistemas que continuam rodando quando eu não estou olhando.',
            lede: 'Um assistente que transcreve a chamada sem o áudio sair da máquina, contratos que aplicam a própria multa, crons que fecham o mês. Backend, APIs e automação — com React na frente quando precisa.'
        },
        machine: {
            source: 'MyBlock · contrato de aluguel',
            s0: 'criado', s1: 'ativo', s2: 'vencido', s3: 'multa 10%', s4: 'quitado',
            logs: [
                'contrato publicado on-chain — vigência de 30 dias',
                'pagamento em dia, nada a fazer',
                'cron das 00:00 detecta o atraso',
                'o contrato aplica 10% sobre o valor, sozinho',
                'pagamento liquidado — status encerrado'
            ]
        },
        systems: {
            title: 'Sistemas',
            note: 'Três produtos completos. Cada um resolve alguma coisa que, sem ele, alguém teria que fazer na mão todo dia.',
            autonomous: 'Roda sozinho',
            stack: 'Pilha',
            layers: 'Camadas',
            code: 'Ver código',
            live: 'Ver funcionando',
            auris: {
                kind: 'Desktop · Áudio + LLM',
                desc: 'Uma janelinha que fica por cima da reunião e transforma cada call em resumo, próximos passos e o e-mail de follow-up já escrito. Captura o áudio do sistema e do microfone em canais separados, transcreve na própria máquina com faster-whisper e só então conversa com o modelo. Nenhum bot entra na chamada.',
                auto: [
                    'captura por WASAPI loopback com detecção de voz — ninguém aperta gravar',
                    'a transcrição roda local; o áudio da reunião não sai do computador',
                    'o sidecar Python é supervisionado e volta sozinho, com backoff'
                ],
                aside: 'Electron endurecido: sandbox, isolamento de contexto, CSP estrita e a chave de API cifrada com o safeStorage do Windows.'
            },
            thoth: {
                kind: 'SaaS · LLM',
                desc: 'Treina e conversa com modelos de linguagem sobre os documentos que você sobe. RAG para respostas ancoradas na fonte, fine-tuning assíncrono num microserviço Python, cobrança recorrente e métricas de uso em tempo real.',
                auto: [
                    'fine-tuning entra em fila e devolve o modelo pronto',
                    'webhooks do Stripe renovam e cortam assinaturas',
                    'métricas de uso apuradas em tempo real'
                ]
            },
            myblock: {
                kind: 'Web3 · Imóveis',
                desc: 'Gestão de aluguéis onde o contrato é o sistema. Um contrato Solidity guarda o status, aplica 10% de multa no atraso e encerra o aluguel sem ninguém apertar botão. Arquitetura híbrida: Web2 para o que precisa ser rápido, Web3 para o que precisa ser incontestável.',
                auto: [
                    'cron verifica vencimentos todo dia à meia-noite',
                    'a multa de 10% é aplicada pelo próprio contrato',
                    'o status do aluguel vive na blockchain, não num banco'
                ],
                l0: 'Interface',
                l1: 'Contratos e API'
            }
        },
        path: {
            title: 'Percurso',
            now: 'atual',
            f2: {
                when: 'mar 2025 —',
                role: 'Full-Stack Engineer',
                desc: 'Duas APIs REST em produção, com endpoints públicos e webhooks ligando a plataforma a ERPs de terceiros. Deploy em Cloudflare Workers e Pages. Três fluxos de automação com n8n e LLMs entregues, cortando trabalho manual da operação. Rotina em inglês e revisão de código no GitHub.'
            },
            edu: {
                name: 'Ciência da Computação',
                role: 'UNIS-MG · bacharelado concluído',
                desc: 'Centro Universitário do Sul de Minas. Desenvolvimento de software, estruturas de dados e fundamentos de computação.'
            }
        },
        tools: {
            title: 'Ferramentas',
            langs: 'Linguagens', backend: 'Backend', front: 'Frente',
            ai: 'IA e automação', data: 'Dados', ship: 'Entrega'
        },
        contact: {
            eyebrow: 'Aberto a propostas',
            line: 'Se você tem um sistema que precisa rodar sem supervisão, eu quero ouvir sobre ele.',
            meta: 'Varginha, MG · Aberto a realocação · Português nativo, inglês fluente',
            cv: 'Currículo (PDF)',
            cvFile: 'Allison_Freitas_Engenheiro_Software_CV_PT.pdf'
        },
        footer: { note: 'Escrito à mão em HTML, CSS e JavaScript.' }
    },

    en: {
        a11y: { skip: 'Skip to content', menu: 'Open menu', menuClose: 'Close menu' },
        nav: { systems: 'Systems', path: 'Path', tools: 'Tools', contact: 'Contact' },
        hero: {
            eyebrow: 'Backend, APIs and automation · F2 Tecnologia · Open to offers',
            thesis: 'I build systems that keep running when I am not watching.',
            lede: 'An assistant that transcribes the call without the audio leaving the machine, contracts that charge their own late fee, crons that close the month. Backend, APIs and automation — with React up front when it is needed.'
        },
        machine: {
            source: 'MyBlock · rental contract',
            s0: 'created', s1: 'active', s2: 'overdue', s3: '10% fee', s4: 'settled',
            logs: [
                'contract published on-chain — 30 day term',
                'payment on time, nothing to do',
                'midnight cron detects the delay',
                'the contract applies 10% on its own',
                'payment settled — status closed'
            ]
        },
        systems: {
            title: 'Systems',
            note: 'Three complete products. Each one handles something a person would otherwise do by hand every day.',
            autonomous: 'Runs on its own',
            stack: 'Stack',
            layers: 'Layers',
            code: 'View code',
            live: 'See it running',
            auris: {
                kind: 'Desktop · Audio + LLM',
                desc: 'A small window that sits over the meeting and turns every call into a summary, next steps and a follow-up email already written. It captures system and microphone audio on separate channels, transcribes on the machine itself with faster-whisper, and only then talks to the model. No bot joins the call.',
                auto: [
                    'WASAPI loopback capture with voice detection — nobody presses record',
                    'transcription runs locally; the meeting audio never leaves the computer',
                    'the Python sidecar is supervised and comes back on its own, with backoff'
                ],
                aside: 'Hardened Electron: sandbox, context isolation, strict CSP and the API key encrypted with Windows safeStorage.'
            },
            thoth: {
                kind: 'SaaS · LLM',
                desc: 'Train and chat with language models over the documents you upload. RAG for answers anchored to the source, asynchronous fine-tuning in a Python microservice, recurring billing and usage metrics in real time.',
                auto: [
                    'fine-tuning queues up and returns a finished model',
                    'Stripe webhooks renew and cut off subscriptions',
                    'usage metrics computed in real time'
                ]
            },
            myblock: {
                kind: 'Web3 · Real estate',
                desc: 'Rental management where the contract is the system. A Solidity contract holds the status, applies a 10% late fee and closes the rental with nobody pressing a button. Hybrid architecture: Web2 for what has to be fast, Web3 for what has to be undisputed.',
                auto: [
                    'a cron checks due dates every day at midnight',
                    'the 10% fee is applied by the contract itself',
                    'rental status lives on-chain, not in a database'
                ],
                l0: 'Interface',
                l1: 'Contracts and API'
            }
        },
        path: {
            title: 'Path',
            now: 'current',
            f2: {
                when: 'Mar 2025 —',
                role: 'Full-Stack Engineer',
                desc: 'Two production REST APIs, with public endpoints and webhooks connecting the platform to third-party ERPs. Deployment on Cloudflare Workers and Pages. Three automation flows with n8n and LLMs delivered, cutting manual work out of operations. Daily English and code review on GitHub.'
            },
            edu: {
                name: 'Computer Science',
                role: 'UNIS-MG · B.Sc. completed',
                desc: 'Centro Universitário do Sul de Minas. Software development, data structures and the fundamentals of computing.'
            }
        },
        tools: {
            title: 'Tools',
            langs: 'Languages', backend: 'Backend', front: 'Front',
            ai: 'AI and automation', data: 'Data', ship: 'Ship'
        },
        contact: {
            eyebrow: 'Open to offers',
            line: 'If you have a system that needs to run unattended, I want to hear about it.',
            meta: 'Varginha, Brazil · Open to relocation · Native Portuguese, fluent English',
            cv: 'Résumé (PDF)',
            cvFile: 'Allison_Freitas_Software_Engineer_CV.pdf'
        },
        footer: { note: 'Hand-written in HTML, CSS and JavaScript.' }
    }
};

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const lookup = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);

// ─────────────────────────────────────────────────────────────────────────
// Máquina de estados do hero
// O HTML já vem no estado final, então sem JS a figura continua legível.
// ─────────────────────────────────────────────────────────────────────────
const STEP_DELAYS = [700, 900, 1000, 900, 1600];
let machineTimer = null;

function renderMachine(lang, animate) {
    const rail = document.getElementById('machine-rail');
    const logEl = document.getElementById('machine-log');
    if (!rail || !logEl) return;

    const nodes = Array.from(rail.querySelectorAll('.node'));
    const logs = translations[lang].machine.logs;
    clearTimeout(machineTimer);

    const settle = () => {
        nodes.forEach(node => node.classList.add('is-done'));
        rail.style.setProperty('--progress', '1');
        logEl.textContent = logs[logs.length - 1];
    };

    if (!animate || prefersReducedMotion.matches) {
        settle();
        return;
    }

    nodes.forEach(node => node.classList.remove('is-done'));
    rail.style.setProperty('--progress', '0');
    logEl.textContent = '';

    let i = 0;
    const step = () => {
        nodes[i].classList.add('is-done');
        logEl.textContent = logs[i];
        rail.style.setProperty('--progress', String(i / (nodes.length - 1)));
        i += 1;
        if (i < nodes.length) machineTimer = setTimeout(step, STEP_DELAYS[i]);
    };

    machineTimer = setTimeout(step, STEP_DELAYS[0]);
}

// ─────────────────────────────────────────────────────────────────────────
// Idioma
// ─────────────────────────────────────────────────────────────────────────
let currentLang = localStorage.getItem('lang') === 'en' ? 'en' : 'pt';

function applyTranslations(lang) {
    const data = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const value = lookup(data, el.getAttribute('data-i18n'));
        if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-label]').forEach(el => {
        const value = lookup(data, el.getAttribute('data-i18n-label'));
        if (typeof value === 'string') el.setAttribute('aria-label', value);
    });

    // O curriculo segue o idioma do site: PT no site em portugues, EN no ingles.
    document.querySelectorAll('[data-i18n-href]').forEach(el => {
        const value = lookup(data, el.getAttribute('data-i18n-href'));
        if (typeof value === 'string') el.setAttribute('href', value);
    });

    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.getElementById('lang-label').textContent = lang === 'pt' ? 'EN' : 'PT';

    localStorage.setItem('lang', lang);
}

// ─────────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    applyTranslations(currentLang);
    renderMachine(currentLang, true);

    document.getElementById('lang-toggle').addEventListener('click', () => {
        currentLang = currentLang === 'pt' ? 'en' : 'pt';
        applyTranslations(currentLang);
        // Sem reanimar: só troca o texto do log para o idioma novo.
        renderMachine(currentLang, false);
    });

    // ── Seção corrente na navegação ──
    const topbar = document.querySelector('.topbar');
    const nav = document.getElementById('nav');
    const navLinks = Array.from(nav.querySelectorAll('a'));
    const sections = navLinks
        .map(link => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    let ticking = false;

    const updateCurrent = () => {
        ticking = false;
        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - topbar.offsetHeight - 100) {
                current = section.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.toggle('is-current', link.getAttribute('href') === `#${current}`);
        });
    };

    // Lê offsetTop no máximo uma vez por frame, em vez de a cada evento.
    window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(updateCurrent);
    }, { passive: true });

    updateCurrent();

    // ── Menu no mobile ──
    const menuButton = document.getElementById('menu-button');

    const setMenu = (open) => {
        nav.classList.toggle('is-open', open);
        menuButton.classList.toggle('is-open', open);
        menuButton.setAttribute('aria-expanded', String(open));
        const labels = translations[currentLang].a11y;
        menuButton.setAttribute('aria-label', open ? labels.menuClose : labels.menu);
    };

    menuButton.addEventListener('click', (e) => {
        e.stopPropagation();
        setMenu(!nav.classList.contains('is-open'));
    });

    navLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));

    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape' || !nav.classList.contains('is-open')) return;
        setMenu(false);
        menuButton.focus();
    });

    document.addEventListener('click', (e) => {
        if (!nav.classList.contains('is-open')) return;
        if (nav.contains(e.target) || menuButton.contains(e.target)) return;
        setMenu(false);
    });
});
