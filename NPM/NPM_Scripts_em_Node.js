// ===================================
// NPM SCRIPTS EM NODE.JS - JAVASCRIPT
// ===================================

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    initializeHighlightJS();
    initializeTheme();
    initializeCopyButtons();
    initializeChecklistPersistence();
    initializeSmoothScroll();
    initializeQuiz();
    console.log('✅ NPM Scripts - Página inicializada');
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
    const savedTheme = localStorage.getItem('npmScriptsTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(themeIcon, savedTheme);
    
    // Toggle tema
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('npmScriptsTheme', newTheme);
        updateThemeIcon(themeIcon, newTheme);
        
        // Feedback visual
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
    
    console.log('✅ Tema inicializado:', savedTheme);
}

function updateThemeIcon(icon, theme) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ===================================
// BOTÕES DE COPIAR CÓDIGO
// ===================================
function initializeCopyButtons() {
    const copyButtons = document.querySelectorAll('.btn-copy');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeId = button.getAttribute('data-code');
            const codeElement = document.getElementById(codeId);
            
            if (codeElement) {
                const code = codeElement.textContent;
                
                try {
                    await navigator.clipboard.writeText(code);
                    
                    // Feedback visual
                    const originalText = button.textContent;
                    button.textContent = '✅ Copiado!';
                    button.style.background = 'rgba(40, 167, 69, 0.3)';
                    
                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.background = '';
                    }, 2000);
                    
                } catch (err) {
                    console.error('Erro ao copiar:', err);
                    button.textContent = '❌ Erro';
                    setTimeout(() => {
                        button.textContent = 'Copiar';
                    }, 2000);
                }
            }
        });
    });
    
    console.log(`✅ ${copyButtons.length} botões de copiar inicializados`);
}

// ===================================
// PERSISTÊNCIA DO CHECKLIST
// ===================================
function initializeChecklistPersistence() {
    const checkboxes = document.querySelectorAll('.checklist-checkbox');
    const storageKey = 'npmScriptsChecklist';
    
    // Carregar estado salvo
    const savedState = JSON.parse(localStorage.getItem(storageKey) || '{}');
    
    checkboxes.forEach((checkbox, index) => {
        const key = `check_${index}`;
        
        // Restaurar estado
        if (savedState[key]) {
            checkbox.checked = true;
        }
        
        // Salvar quando mudar
        checkbox.addEventListener('change', () => {
            savedState[key] = checkbox.checked;
            localStorage.setItem(storageKey, JSON.stringify(savedState));
        });
    });
    
    console.log('✅ Checklist com persistência inicializado');
}

// ===================================
// SCROLL SUAVE
// ===================================
function initializeSmoothScroll() {
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
    
    console.log('✅ Scroll suave inicializado');
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
        'q1': 'a',  // package.json campo "scripts"
        'q2': 'b',  // npm run dev
        'q3': 'a',  // start, test, stop, restart
        'q4': 'b',  // Executa próximo apenas se anterior sucesso
        'q5': 'a',  // Scripts que executam automaticamente
        'q6': 'b',  // Simplicidade, menos dependências
        'q7': 'b',  // npm run script -- argumentos
        'q8': 'a'   // Antes do script "build"
    };

    // Pontuação por questão
    const questionPoints = {
        'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 
        'q5': 1, 'q6': 2, 'q7': 2, 'q8': 2
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
            message = '🏆 Excelente! Você domina NPM Scripts!';
            messageClass = 'excellent';
        } else if (percentage >= 70) {
            message = '👍 Muito bom! Continue praticando!';
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
        localStorage.setItem('npmScriptsQuizResult', JSON.stringify(quizResult));
        
        console.log('📊 Quiz finalizado:', quizResult);
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
            
            console.log('🔄 Quiz resetado');
        });
    }

    console.log('✅ Questionário inicializado');
}

// ===================================
// CONSOLE ART
// ===================================
console.log('%c📦 NPM Scripts em Node.js', 'font-size: 20px; font-weight: bold; color: #0066cc;');
console.log('%cTrilha de Aprendizado - DIO', 'font-size: 14px; color: #00aa66;');
console.log('\n📚 Recursos úteis:');
console.log('- NPM Scripts Docs: https://docs.npmjs.com/cli/v9/using-npm/scripts');
console.log('- package.json: https://docs.npmjs.com/cli/v9/configuring-npm/package-json');

// ===================================
// FEEDBACK DE PERFORMANCE
// ===================================
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(loadTime)}ms`);
});