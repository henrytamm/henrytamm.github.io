// Typewriter effect
const phrases = [
    'clear docs.',
    'developer guides.',
    'release notes.',
    '"oh, that makes sense."',
    'automation scripts.',
    'things that ship.',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriter = document.getElementById('typewriter');

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let speed = isDeleting ? 30 : 60;

    if (!isDeleting && charIndex === currentPhrase.length) {
        speed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        speed = 300;
    }

    setTimeout(type, speed);
}

// Start typewriter
setTimeout(type, 1000);

// Active nav link on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fade-in on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .work-item, .sample-card, .project-card, .contact-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Interactive terminal
const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

const commands = {
    help: [
        'Available commands:',
        '  whoami        — about me',
        '  ls projects/  — see my work',
        '  cat resume.txt— quick summary',
        '  skills        — tech stack',
        '  contact       — reach me',
        '  coffee        — ☕',
        '  clear         — reset terminal',
    ],
    whoami: [
        'henry.tam — technical writer, ex-SWE',
        'Psychology grad → App Academy → Salesforce',
        'I make complex things make sense.',
    ],
    'ls projects/': [
        'tea-time/       — Discord clone (Flask + React)',
        'yell/           — Yelp clone (Flask + React)',
        'tech-writing-tools/ — Doc automation toolkit',
    ],
    'cat resume.txt': [
        '┌─────────────────────────────────────┐',
        '│  Henry Tam                          │',
        '│  Technical Writer @ Salesforce      │',
        '│  Data 360 · Connectors · SDKs      │',
        '│                                     │',
        '│  Previously: App Academy (SWE)      │',
        '│  Education: UC Davis (Psychology)   │',
        '│                                     │',
        '│  henry.tam@proton.me                │',
        '└─────────────────────────────────────┘',
    ],
    skills: [
        'DITA XML ████████████ expert',
        'Python   ██████████░ advanced',
        'React    █████████░░ advanced',
        'MCP      ████████░░░ proficient',
        'Perforce ████████████ expert',
    ],
    contact: [
        'LinkedIn: linkedin.com/in/henryktam',
        'GitHub:   github.com/henrytamm',
        'Email:    henrytam95@gmail.com',
    ],
    coffee: [
        '         .',
        '        .',
        '    .',
        '   ┌───┐',
        '   │   │▏',
        '   └───┘',
        '   ═════',
        'Here you go ☕ — now get back to reading my portfolio.',
    ],
    sudo: ['Nice try. 🙃'],
    'sudo rm -rf /': ['Nice try. 🙃'],
    vim: ['You\'re stuck now. Just kidding — there is no vim here.'],
    exit: ['You can check out any time you like, but you can never leave. 🎶'],
};

if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim().toLowerCase();
            terminalInput.value = '';

            if (!cmd) return;

            // Add the command line
            const cmdLine = document.createElement('p');
            cmdLine.classList.add('terminal-cmd-new');
            cmdLine.innerHTML = `<span class="prompt">$</span> ${cmd}`;
            terminalBody.insertBefore(cmdLine, terminalInput.closest('.terminal-input-line'));

            if (cmd === 'clear') {
                // Remove all lines except the input
                const inputLine = terminalInput.closest('.terminal-input-line');
                while (terminalBody.firstChild !== inputLine) {
                    terminalBody.removeChild(terminalBody.firstChild);
                }
                terminalBody.removeChild(cmdLine);
                return;
            }

            const output = commands[cmd] || [`command not found: ${cmd}. Try 'help'`];
            output.forEach(line => {
                const p = document.createElement('p');
                p.classList.add('terminal-output-new');
                p.textContent = line;
                terminalBody.insertBefore(p, terminalInput.closest('.terminal-input-line'));
            });

            // Scroll terminal to bottom
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}
