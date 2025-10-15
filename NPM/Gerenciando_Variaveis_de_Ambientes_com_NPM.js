// ===================================
// INICIALIZAÇÃO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    initializeHighlightJS();
    initializeTheme();
    initializeCopyButtons();
    initializeTabs();
    initializeProgressBar();
    initializePlayground();
    initializeChecklistPersistence();
    initializeSmoothScroll();
    initializeSearch();
    initializeQuiz();
});

// ===================================
// HIGHLIGHT.JS - Syntax Highlighting
// ===================================
function initializeHighlightJS() {
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
        console.log('✅ Highlight.js inicializado');
    } else {
        console.warn('⚠️ Highlight.js não carregado');
    }
}

// ===================================
// TEMA CLARO/ESCURO
// ===================================
function initializeTheme() {
    const themeToggle = document.getElementById('toggleTheme');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
    // Verificar tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);
    
    // Toggle tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
        
        // Feedback visual
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(icon, theme) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===================================
// BOTÕES DE COPIAR CÓDIGO
// ===================================
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeId = button.getAttribute('data-code');
            const codeElement = document.getElementById(codeId);
            
            if (!codeElement) {
                console.error(`Elemento com ID "${codeId}" não encontrado`);
                return;
            }
            
            const code = codeElement.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                
                // Feedback visual
                const originalText = button.textContent;
                button.textContent = '✅ Copiado!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            } catch (err) {
                console.error('Erro ao copiar:', err);
                button.textContent = '❌ Erro';
                setTimeout(() => {
                    button.textContent = 'Copiar';
                }, 2000);
            }
        });
    });
}

// ===================================
// SISTEMA DE TABS
// ===================================
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            const tabsContainer = button.closest('.tabs');
            
            // Remover active de todos os botões e conteúdos
            tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            tabsContainer.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Adicionar active ao botão clicado e conteúdo correspondente
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Re-highlight código
            if (typeof hljs !== 'undefined') {
                const activeTab = document.getElementById(tabId);
                activeTab.querySelectorAll('pre code').forEach(block => {
                    hljs.highlightElement(block);
                });
            }
        });
    });
}

// ===================================
// BARRA DE PROGRESSO DE LEITURA
// ===================================
function initializeProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = `${Math.min(progress, 100)}%`;
    });
}

// ===================================
// PLAYGROUND INTERATIVO
// ===================================
function initializePlayground() {
    const envInput = document.getElementById('envInput');
    const codeInput = document.getElementById('codeInput');
    const outputElement = document.getElementById('output');
    const loadEnvBtn = document.getElementById('loadEnv');
    const runCodeBtn = document.getElementById('runCode');
    const clearOutputBtn = document.getElementById('clearOutput');
    
    // Objeto process.env simulado
    let simulatedEnv = {};
    
    // Carregar variáveis do .env
    loadEnvBtn.addEventListener('click', () => {
        const envText = envInput.value;
        simulatedEnv = parseEnvFile(envText);
        
        // Mostrar variáveis carregadas
        const varCount = Object.keys(simulatedEnv).length;
        outputElement.textContent = `✅ ${varCount} variável(is) carregada(s):\n\n${JSON.stringify(simulatedEnv, null, 2)}`;
        
        // Feedback visual
        loadEnvBtn.textContent = '✅ Carregado!';
        setTimeout(() => {
            loadEnvBtn.textContent = '🔄 Carregar Variáveis';
        }, 2000);
    });
    
    // Executar código
    runCodeBtn.addEventListener('click', () => {
        const code = codeInput.value;
        
        // Limpar output anterior
        outputElement.textContent = '';
        
        try {
            // Criar contexto seguro
            const logs = [];
            const customConsole = {
                log: (...args) => {
                    logs.push(args.map(arg => 
                        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                    ).join(' '));
                }
            };
            
            // Criar função com process.env simulado
            const sandboxedCode = `
                const process = { env: ${JSON.stringify(simulatedEnv)} };
                ${code}
            `;
            
            // Executar código de forma segura
            const func = new Function('console', sandboxedCode);
            func(customConsole);
            
            // Mostrar logs
            if (logs.length > 0) {
                outputElement.textContent = logs.join('\n');
            } else {
                outputElement.textContent = '// Código executado sem saída no console';
            }
            
            // Feedback visual
            runCodeBtn.textContent = '✅ Executado!';
            setTimeout(() => {
                runCodeBtn.textContent = '▶️ Executar';
            }, 2000);
            
        } catch (error) {
            outputElement.textContent = `❌ Erro:\n${error.message}\n\n${error.stack || ''}`;
            outputElement.style.color = '#ff6b6b';
        }
    });
    
    // Limpar output
    clearOutputBtn.addEventListener('click', () => {
        outputElement.textContent = '// Clique em "Executar" para ver o resultado...';
        outputElement.style.color = '';
    });
    
    // Exemplo inicial
    if (!envInput.value) {
        envInput.value = `# Exemplo de variáveis de ambiente
PORT=3000
DB_HOST=localhost
API_KEY=abc123xyz
NODE_ENV=development`;
    }
    
    if (!codeInput.value) {
        codeInput.value = `// Teste o código aqui!
console.log('Porta:', process.env.PORT);
console.log('Host do DB:', process.env.DB_HOST);
console.log('API Key:', process.env.API_KEY);
console.log('Ambiente:', process.env.NODE_ENV);`;
    }
}

// Parser simples de arquivo .env
function parseEnvFile(content) {
    const env = {};
    const lines = content.split('\n');
    
    lines.forEach(line => {
        // Ignorar comentários e linhas vazias
        line = line.trim();
        if (!line || line.startsWith('#')) return;
        
        // Parsear CHAVE=valor
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
            const value = valueParts.join('=').trim();
            // Remover aspas se houver
            const cleanValue = value.replace(/^["']|["']$/g, '');
            env[key.trim()] = cleanValue;
        }
    });
    
    return env;
}

// ===================================
// PERSISTÊNCIA DO CHECKLIST
// ===================================
function initializeChecklistPersistence() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const storageKey = 'dio-env-checklist';
    
    // Carregar estado salvo
    const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    checkboxes.forEach((checkbox, index) => {
        // Restaurar estado
        if (savedState[index]) {
            checkbox.checked = true;
        }
        
        // Salvar mudanças
        checkbox.addEventListener('change', () => {
            savedState[index] = checkbox.checked;
            localStorage.setItem(storageKey, JSON.stringify(savedState));
            
            // Atualizar contador de progresso
            updateChecklistProgress();
        });
    });
    
    updateChecklistProgress();
}

function updateChecklistProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const total = checkboxes.length;
    const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
    const percentage = Math.round((checked / total) * 100);
    
    console.log(`📊 Progresso do checklist: ${checked}/${total} (${percentage}%)`);
}

// ===================================
// SCROLL SUAVE PARA ÂNCORAS
// ===================================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 120; // Altura do header sticky
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Highlight temporário da seção
                targetElement.style.transition = 'background-color 0.5s';
                const originalBg = getComputedStyle(targetElement).backgroundColor;
                targetElement.style.backgroundColor = 'rgba(0, 102, 204, 0.1)';
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = originalBg;
                }, 1500);
            }
        });
    });
}

// ===================================
// DETECÇÃO DE SEÇÃO ATIVA NO SCROLL
// ===================================
function initializeActiveSection() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.toc a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 200) {
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
}

// ===================================
// BUSCA NO CONTEÚDO (OPCIONAL)
// ===================================
function initializeSearch() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length < 3) {
                // Limpar highlights
                document.querySelectorAll('.search-highlight').forEach(el => {
                    el.classList.remove('search-highlight');
                });
                return;
            }
            
            // Buscar em todo o conteúdo
            const contentElements = document.querySelectorAll('#content p, #content li, #content h3, #content h4');
            let found = false;
            
            contentElements.forEach(el => {
                const text = el.textContent.toLowerCase();
                
                if (text.includes(query)) {
                    el.classList.add('search-highlight');
                    
                    if (!found) {
                        // Scroll para primeiro resultado
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        found = true;
                    }
                } else {
                    el.classList.remove('search-highlight');
                }
            });
        }, 300);
    });
}

// ===================================
// EASTER EGG: KONAMI CODE
// ===================================
(function initializeEasterEgg() {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateEasterEgg() {
        console.log('🎉 Easter Egg ativado!');
        
        // Efeito confetti
        const colors = ['#0066cc', '#00aa66', '#ff6b35', '#ffc107'];
        
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                const fallDuration = 3000 + Math.random() * 2000;
                const fallDistance = window.innerHeight + 20;
                
                confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${fallDistance}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
                ], {
                    duration: fallDuration,
                    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                });
                
                setTimeout(() => confetti.remove(), fallDuration);
            }, i * 30);
        }
        
        // Mensagem
        alert('🎊 Parabéns! Você encontrou o Easter Egg do Konami Code!\n\n🎓 Continue estudando e dominando as variáveis de ambiente! 💪');
    }
})();

// ===================================
// CONSOLE ART
// ===================================
console.log('%c🔐 Gerenciando Variáveis de Ambiente com NPM', 'font-size: 20px; font-weight: bold; color: #0066cc;');
console.log('%cTrilha de Aprendizado - DIO', 'font-size: 14px; color: #00aa66;');
console.log('%c\n💡 Dica: Pressione o Konami Code para uma surpresa!\n(↑ ↑ ↓ ↓ ← → ← → B A)', 'color: #6c757d; font-style: italic;');
console.log('\n📚 Recursos úteis:');
console.log('- dotenv: https://www.npmjs.com/package/dotenv');
console.log('- Node.js process.env: https://nodejs.org/api/process.html#process_process_env');
console.log('- 12 Factor App: https://12factor.net/config');

// ===================================
// BUSCA NO SITE
// ===================================
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    let searchTimeout;

    if (!searchInput || !searchResults) {
        console.warn('⚠️ Elementos de busca não encontrados');
        return;
    }

    // Buscar ao digitar (com debounce)
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();

        if (query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            return;
        }

        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });

    // Fechar resultados ao clicar fora
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });

    // Fechar com ESC
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchResults.innerHTML = '';
            searchResults.style.display = 'none';
            searchInput.value = '';
        }
    });

    function performSearch(query) {
        const sections = document.querySelectorAll('section');
        const results = [];
        const queryLower = query.toLowerCase();

        sections.forEach(section => {
            const sectionTitle = section.querySelector('h2')?.textContent || '';
            const sectionId = section.id || '';
            
            // Buscar em títulos
            const headings = section.querySelectorAll('h2, h3, h4');
            headings.forEach(heading => {
                const text = heading.textContent;
                if (text.toLowerCase().includes(queryLower)) {
                    results.push({
                        title: text,
                        context: `Seção: ${sectionTitle}`,
                        element: heading,
                        sectionId: sectionId
                    });
                }
            });

            // Buscar em parágrafos
            const paragraphs = section.querySelectorAll('p, li');
            paragraphs.forEach(p => {
                const text = p.textContent;
                if (text.toLowerCase().includes(queryLower)) {
                    const contextStart = Math.max(0, text.toLowerCase().indexOf(queryLower) - 40);
                    const contextEnd = Math.min(text.length, text.toLowerCase().indexOf(queryLower) + queryLower.length + 40);
                    const context = '...' + text.substring(contextStart, contextEnd) + '...';
                    
                    results.push({
                        title: sectionTitle,
                        context: context,
                        element: p,
                        sectionId: sectionId
                    });
                }
            });

            // Buscar em código
            const codeBlocks = section.querySelectorAll('code');
            codeBlocks.forEach(code => {
                const text = code.textContent;
                if (text.toLowerCase().includes(queryLower)) {
                    results.push({
                        title: `Código em: ${sectionTitle}`,
                        context: text.substring(0, 60) + '...',
                        element: code,
                        sectionId: sectionId
                    });
                }
            });
        });

        displaySearchResults(results, query);
    }

    function displaySearchResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="search-result-item">Nenhum resultado encontrado</div>';
            searchResults.style.display = 'block';
            return;
        }

        // Limitar a 10 resultados
        const limitedResults = results.slice(0, 10);
        
        searchResults.innerHTML = limitedResults.map(result => {
            const highlightedContext = result.context.replace(
                new RegExp(query, 'gi'),
                match => `<mark>${match}</mark>`
            );

            return `
                <div class="search-result-item" data-section="${result.sectionId}">
                    <div class="search-result-title">${result.title}</div>
                    <div class="search-result-context">${highlightedContext}</div>
                </div>
            `;
        }).join('');

        // Adicionar event listeners aos resultados
        searchResults.querySelectorAll('.search-result-item').forEach((item, index) => {
            item.addEventListener('click', () => {
                const element = limitedResults[index].element;
                
                // Rolar até o elemento
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Adicionar highlight temporário
                element.classList.add('search-highlight');
                setTimeout(() => {
                    element.classList.remove('search-highlight');
                }, 2000);

                // Fechar resultados
                searchResults.style.display = 'none';
                searchInput.value = '';
            });
        });

        searchResults.style.display = 'block';
    }

    console.log('✅ Sistema de busca inicializado');
}

// ===================================
// QUESTIONÁRIO
// ===================================
function initializeQuiz() {
    const checkButton = document.getElementById('checkAnswers');
    const resetButton = document.getElementById('resetQuiz');
    const resultsDiv = document.getElementById('quizResults');

    if (!checkButton) {
        console.warn('⚠️ Elementos do questionário não encontrados');
        return;
    }

    // Respostas corretas
    const correctAnswers = {
        'q1': 'a',  // Variáveis que armazenam configurações do ambiente
        'q2': 'b',  // Dificulta manutenção e compromete segurança
        'q3': 'b',  // dotenv
        'q4': 'c',  // process.env.VARIAVEL
        'q5': 'c',  // .env
        'q6': 'b',  // Permite configurações diferentes por ambiente
        'q7': 'b',  // Template seguro para versionar sem valores sensíveis
        'q8': 'b',  // cross-env para compatibilidade cross-platform
        'q9': 'b',  // No início do arquivo, antes de usar process.env
        'q10': 'c' // Credenciais expostas no histórico Git permanentemente
    };

    // Pontuação por questão
    const questionPoints = {
        'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1,
        'q6': 1, 'q7': 1, 'q8': 2, 'q9': 2, 'q10': 2
    };

    checkButton.addEventListener('click', () => {
        let score = 0;
        let totalPoints = 0;
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        // Calcular total de pontos possíveis
        Object.values(questionPoints).forEach(points => {
            totalPoints += points;
        });

        // Verificar cada questão
        Object.keys(correctAnswers).forEach(questionId => {
            const card = document.querySelector(`[data-question="${questionId}"]`);
            const selectedOption = document.querySelector(`input[name="${questionId}"]:checked`);
            
            if (!selectedOption) {
                unanswered++;
                return;
            }

            const answer = selectedOption.value;
            const isCorrect = answer === correctAnswers[questionId];
            
            // Marcar visualmente
            const allOptions = card.querySelectorAll('.quiz-option');
            allOptions.forEach(option => {
                option.classList.remove('correct', 'incorrect');
                const radio = option.querySelector('input[type="radio"]');
                
                if (radio.value === correctAnswers[questionId]) {
                    option.classList.add('correct');
                }
                
                if (radio.checked && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });

            card.classList.add('answered');

            // Adicionar feedback
            let feedbackDiv = card.querySelector('.quiz-feedback');
            if (!feedbackDiv) {
                feedbackDiv = document.createElement('div');
                feedbackDiv.className = 'quiz-feedback';
                card.appendChild(feedbackDiv);
            }
            
            feedbackDiv.classList.remove('hidden');
            
            if (isCorrect) {
                correct++;
                score += questionPoints[questionId];
                feedbackDiv.className = 'quiz-feedback correct-feedback';
                feedbackDiv.textContent = `✅ Correto! (+${questionPoints[questionId]} ${questionPoints[questionId] === 1 ? 'ponto' : 'pontos'})`;
            } else {
                incorrect++;
                feedbackDiv.className = 'quiz-feedback incorrect-feedback';
                feedbackDiv.textContent = '❌ Incorreto. Revise o conteúdo!';
            }
        });

        // Mostrar resultados
        const percentage = Math.round((score / totalPoints) * 100);
        let message = '';
        let messageClass = '';

        if (percentage >= 90) {
            message = '🏆 Excelente! Você domina o assunto!';
            messageClass = 'excellent';
        } else if (percentage >= 70) {
            message = '👍 Muito bom! Continue estudando!';
            messageClass = 'good';
        } else if (percentage >= 50) {
            message = '📖 Bom começo! Revise alguns conceitos.';
            messageClass = 'needs-improvement';
        } else {
            message = '📚 Continue estudando! Revise o material.';
            messageClass = 'poor';
        }

        resultsDiv.innerHTML = `
            <h3>📊 Resultados do Questionário</h3>
            <div class="result-stats">
                <div class="stat-item">
                    <div class="stat-number">${score}</div>
                    <div class="stat-label">Pontos</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${percentage}%</div>
                    <div class="stat-label">Aproveitamento</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${correct}</div>
                    <div class="stat-label">Corretas</div>
                </div>
                <div class="stat-item">
                    <div class="stat-number">${incorrect}</div>
                    <div class="stat-label">Incorretas</div>
                </div>
            </div>
            <div class="result-message ${messageClass}">
                ${message}
            </div>
        `;

        resultsDiv.classList.remove('hidden');

        // Rolar até resultados
        resultsDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        // Salvar resultado no localStorage
        const quizResult = {
            score,
            totalPoints,
            percentage,
            correct,
            incorrect,
            unanswered,
            date: new Date().toISOString()
        };
        localStorage.setItem('quizResult', JSON.stringify(quizResult));
    });

    // Resetar quiz
    if (resetButton) {
        resetButton.addEventListener('click', () => {
            // Limpar seleções
            document.querySelectorAll('input[type="radio"]').forEach(radio => {
                radio.checked = false;
            });

            // Limpar classes visuais
            document.querySelectorAll('.quiz-card').forEach(card => {
                card.classList.remove('answered');
                card.querySelectorAll('.quiz-option').forEach(option => {
                    option.classList.remove('correct', 'incorrect');
                });
                
                const feedback = card.querySelector('.quiz-feedback');
                if (feedback) {
                    feedback.classList.add('hidden');
                }
            });

            // Esconder resultados
            resultsDiv.classList.add('hidden');

            // Rolar para o início do questionário
            document.getElementById('questionario').scrollIntoView({ behavior: 'smooth' });
        });
    }

    console.log('✅ Questionário inicializado');
}

// ===================================
// FEEDBACK DE PERFORMANCE
// ===================================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);
});