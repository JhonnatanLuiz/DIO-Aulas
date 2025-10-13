document.addEventListener('DOMContentLoaded', () => {

    // --- Theme, Score, and LocalStorage Initialization ---
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const scoreValueEl = document.getElementById('score-value');
    let userScore = 0;
    let scoredChallenges = new Set();

    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleBtn.textContent = '☀️';
    }

    // Load score and challenges from localStorage
    const savedScore = localStorage.getItem('userScore');
    if (savedScore) {
        userScore = parseInt(savedScore, 10);
        scoreValueEl.textContent = userScore;
    }
    const savedChallenges = localStorage.getItem('scoredChallenges');
    if (savedChallenges) {
        scoredChallenges = new Set(JSON.parse(savedChallenges));
    }

    // Theme toggle event
    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeToggleBtn.textContent = isDarkMode ? '☀️' : '🌙';
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // --- Hamburger Menu Toggle (Responsive) ---
    const hamburgerBtn = document.getElementById('hamburger-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Alterna a classe 'active' no menu
            navMenu.classList.toggle('active');
            
            // Alterna o ícone do hambúrguer
            const isActive = navMenu.classList.contains('active');
            hamburgerBtn.textContent = isActive ? '✕' : '☰';
            hamburgerBtn.setAttribute('aria-expanded', isActive);
            
            // Adiciona animação ao botão
            hamburgerBtn.style.transform = isActive ? 'rotate(90deg)' : 'rotate(0deg)';
        });

        // Fecha o menu ao clicar em um link (mobile)
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navMenu.classList.remove('active');
                    hamburgerBtn.textContent = '☰';
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    hamburgerBtn.style.transform = 'rotate(0deg)';
                }
            });
        });

        // Fecha o menu ao clicar fora dele (mobile)
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const isClickInsideNav = navMenu.contains(e.target);
                const isClickOnHamburger = hamburgerBtn.contains(e.target);
                
                if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburgerBtn.textContent = '☰';
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    hamburgerBtn.style.transform = 'rotate(0deg)';
                }
            }
        });

        // Fecha o menu ao redimensionar para desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerBtn.textContent = '☰';
                hamburgerBtn.setAttribute('aria-expanded', 'false');
                hamburgerBtn.style.transform = 'rotate(0deg)';
            }
        });
    }

    // --- Gamification Logic ---
    function updateScoreDisplay() {
        scoreValueEl.textContent = userScore;
    }

    function addPoints(points, challengeId) {
        if (scoredChallenges.has(challengeId)) {
            return; // Already scored
        }

        userScore += points;
        scoredChallenges.add(challengeId);
        
        // Update UI
        updateScoreDisplay();

        // Save to localStorage
        localStorage.setItem('userScore', userScore);
        localStorage.setItem('scoredChallenges', JSON.stringify(Array.from(scoredChallenges)));

        // Animation to highlight score change
        scoreValueEl.style.transform = 'scale(1.5)';
        scoreValueEl.style.transition = 'transform 0.2s ease';
        setTimeout(() => {
            scoreValueEl.style.transform = 'scale(1)';
        }, 200);
    }

    // --- Tab-switching logic for Playground ---
    const playground = document.getElementById('playground');
    if (playground) {
        const tabButtons = playground.querySelectorAll('.tab-button');
        const tabContents = playground.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                const tabId = button.getAttribute('data-tab');

                tabButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                tabContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === tabId) {
                        content.classList.add('active');
                    }
                });
            });
        });
    }

    // --- Modal Logic for Pillars ---
    const pillarData = {
        decomposicao: {
            title: 'Decomposição em Detalhes',
            text: 'Decompor um problema é como desmontar um motor para entender como ele funciona. Em vez de encarar uma tarefa gigante e intimidadora, você a quebra em subtarefas menores e mais fáceis de resolver. Exemplo: Para criar um aplicativo de chat, você decompõe em: 1. Tela de login de usuário. 2. Lista de contatos. 3. Janela de conversa. 4. Envio e recebimento de mensagens. Cada parte é um problema menor e mais gerenciável.'
        },
        padroes: {
            title: 'Reconhecimento de Padrões em Detalhes',
            text: 'Após decompor um problema, você procura por semelhanças ou repetições. Se você precisa validar três formulários diferentes (contato, login, cadastro) e todos eles precisam de validação de e-mail, você identificou um padrão. Em vez de escrever o código de validação de e-mail três vezes, você cria uma única função reutilizável. Isso economiza tempo e reduz a chance de erros.'
        },
        abstracao: {
            title: 'Abstração em Detalhes',
            text: 'Abstração é a arte de focar no que é importante e ignorar o resto. Quando você dirige um carro, você interage com o volante, pedais e marcha. Você não precisa saber como o motor de combustão interna funciona, como a transmissão troca as marchas ou como o sistema de injeção de combustível opera. Esses detalhes complexos foram abstraídos para uma interface simples. Em programação, usamos funções e classes para abstrair complexidades.'
        },
        'algoritmos-pilar': {
            title: 'Algoritmos em Detalhes',
            text: 'Um algoritmo é a sua receita, o seu plano passo a passo para resolver cada uma das pequenas partes do seu problema. É uma sequência finita e clara de instruções. Por exemplo, o algoritmo para fazer login em um site seria: 1. Peça o e-mail e a senha. 2. Verifique se o e-mail existe no banco de dados. 3. Se existir, verifique se a senha fornecida corresponde à senha armazenada. 4. Se corresponder, libere o acesso. 5. Caso contrário, mostre uma mensagem de erro. Cada passo é preciso e inequívoco.'
        }
    };

    const pillarCards = document.querySelectorAll('#pilares .card');
    const modal = document.getElementById('pillar-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalText = document.getElementById('modal-text');
    const closeModalBtn = document.querySelector('.modal-close');

    if (modal) {
        pillarCards.forEach(card => {
            card.addEventListener('click', () => {
                const pillar = card.getAttribute('data-pillar');
                const data = pillarData[pillar];
                
                if (data) {
                    modalTitle.textContent = data.title;
                    modalText.textContent = data.text;
                    modal.classList.remove('hidden');
                    setTimeout(() => modal.classList.add('visible'), 10);
                }
            });
        });

        function closeModal() {
            modal.classList.remove('visible');
            setTimeout(() => modal.classList.add('hidden'), 300);
        }

        closeModalBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // --- Dynamic Logic Simulators ---
    const notaInput = document.getElementById('notaInput');
    const verificarNotaBtn = document.getElementById('verificarNotaBtn');
    const resultadoNota = document.getElementById('resultadoNota');

    if (verificarNotaBtn) {
        verificarNotaBtn.addEventListener('click', () => {
            const nota = parseFloat(notaInput.value);
            if (isNaN(nota) || nota < 0 || nota > 10) {
                resultadoNota.textContent = 'Por favor, digite uma nota válida entre 0 e 10.';
                resultadoNota.style.color = 'red';
            } else if (nota >= 7) {
                resultadoNota.textContent = `Aprovado! (Nota: ${nota})`;
                resultadoNota.style.color = 'green';
            } else {
                resultadoNota.textContent = `Reprovado. (Nota: ${nota})`;
                resultadoNota.style.color = 'orange';
            }
        });
    }

    const tabuadaInput = document.getElementById('tabuadaInput');
    const gerarTabuadaBtn = document.getElementById('gerarTabuadaBtn');
    const resultadoTabuada = document.getElementById('resultadoTabuada');

    if (gerarTabuadaBtn) {
        gerarTabuadaBtn.addEventListener('click', () => {
            const numero = parseInt(tabuadaInput.value);
            if (isNaN(numero)) {
                resultadoTabuada.innerHTML = '<p style="color: red;">Por favor, digite um número válido.</p>';
                return;
            }

            let tabelaHTML = `<h5>Tabuada do ${numero}:</h5><pre>`;
            for (let i = 1; i <= 10; i++) {
                tabelaHTML += `${numero} x ${i} = ${numero * i}\n`;
            }
            tabelaHTML += '</pre>';
            resultadoTabuada.innerHTML = tabelaHTML;
        });
    }

    // --- Interactive Quiz Logic ---
    const quizForm = document.getElementById('quiz-form');
    const quizResultado = document.getElementById('quiz-resultado');

    if (quizForm) {
        quizForm.addEventListener('submit', (e) => {
            e.preventDefault();

            if (scoredChallenges.has('quiz')) {
                quizResultado.innerHTML = `<p style="color: blue; font-weight: bold;">Você já ganhou pontos neste quiz!</p>`;
                return;
            }

            const correctAnswers = { q1: 'b', q2: 'c', q3: 'a' };
            
            const allOptions = quizForm.querySelectorAll('.quiz-options label');
            allOptions.forEach(label => {
                label.classList.remove('correct-answer', 'incorrect-answer', 'correct-choice');
            });

            const formData = new FormData(quizForm);
            let score = 0;
            let allAnswered = true;

            for (const question of Object.keys(correctAnswers)) {
                if (formData.get(question) === null) {
                    allAnswered = false;
                    break;
                }
            }

            if (!allAnswered) {
                quizResultado.innerHTML = `<p style="color: orange;">Por favor, responda todas as perguntas antes de verificar.</p>`;
                return;
            }

            for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
                const userAnswer = formData.get(question);
                const questionBlock = quizForm.querySelector(`input[name="${question}"]`).closest('.quiz-question');
                const selectedLabel = questionBlock.querySelector(`input[value="${userAnswer}"]`).parentElement;
                const correctLabel = questionBlock.querySelector(`input[value="${correctAnswer}"]`).parentElement;

                if (userAnswer === correctAnswer) {
                    score++;
                    selectedLabel.classList.add('correct-answer');
                } else {
                    selectedLabel.classList.add('incorrect-answer');
                    correctLabel.classList.add('correct-choice');
                }
            }
            
            if (score > 0) {
                addPoints(score * 10, 'quiz');
                // Armazena a pontuação específica do quiz para poder subtrair depois
                localStorage.setItem('quizScore', score * 10);
            } else {
                // Marcar como concluído mesmo com 0 pontos para não repetir
                scoredChallenges.add('quiz');
                localStorage.setItem('quizScore', 0);
            }

            const totalQuestions = Object.keys(correctAnswers).length;
            let message = ``;
            if (score === totalQuestions) {
                message = `Excelente! Você acertou todas as ${totalQuestions} perguntas!`;
                quizResultado.style.backgroundColor = '#d4edda';
                quizResultado.style.color = '#155724';
            } else {
                message = `Você acertou <strong>${score} de ${totalQuestions}</strong>. Continue estudando!`;
                quizResultado.style.backgroundColor = '#f8d7da';
                quizResultado.style.color = '#721c24';
            }
            quizResultado.innerHTML = `<p>${message}</p>`;
        });
    }

    // --- Reset Quiz Score ---
    const resetarPontuacaoBtn = document.getElementById('resetar-pontuacao-btn');
    if (resetarPontuacaoBtn) {
        resetarPontuacaoBtn.addEventListener('click', () => {
            // Recupera a pontuação do quiz que foi salva
            const quizScore = parseInt(localStorage.getItem('quizScore')) || 0;
            
            // Zera a pontuação do quiz
            scoredChallenges.delete('quiz');
            localStorage.setItem('scoredChallenges', JSON.stringify([...scoredChallenges]));
            localStorage.setItem('quizScore', 0);
            
            // Limpa o resultado visual
            if (quizResultado) {
                quizResultado.innerHTML = '';
            }
            
            // Remove classes de feedback visual das respostas
            const allOptions = document.querySelectorAll('.quiz-options label');
            allOptions.forEach(label => {
                label.classList.remove('correct-answer', 'incorrect-answer', 'correct-choice');
            });
            
            // Desmarca todas as respostas
            const allRadios = document.querySelectorAll('#quiz-form input[type="radio"]');
            allRadios.forEach(radio => {
                radio.checked = false;
            });
            
            // Subtrai apenas os pontos que foram ganhos no quiz
            userScore = Math.max(0, userScore - quizScore);
            localStorage.setItem('userScore', userScore);
            updateScoreDisplay();
            
            // Feedback visual
            alert(`✅ Pontuação do quiz resetada! ${quizScore} pontos foram removidos.`);
        });
    }
});

// This function is called by inline HTML onclick, so it must remain in the global scope.
function showTab(tabId) {
    const playground = document.getElementById('playground');
    const tabButtons = playground.querySelectorAll('.tab-button');
    const tabContents = playground.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => btn.classList.remove('active'));
    // Find the button by its data-tab attribute and activate it
    const buttonToActivate = playground.querySelector(`[data-tab=${tabId}]`);
    if(buttonToActivate) buttonToActivate.classList.add('active');

    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// --- Mind Map Pan & Zoom Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('mindmap-viewer');
    const scene = document.getElementById('mindmap-scene');
    const image = document.getElementById('mindmap-image');
    const zoomInBtn = document.getElementById('zoom-in-mini-btn');
    const zoomOutBtn = document.getElementById('zoom-out-mini-btn');
    const resetBtn = document.getElementById('reset-view-btn');
    const fullscreenBtn = document.getElementById('fullscreen-btn');

    if (!viewer || !scene || !image) return;

    let scale = 1.2; // Começa com zoom próximo
    let translateX = 0;
    let translateY = 0;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let isFullscreen = false;

    const MIN_SCALE = 0.3;
    const MAX_SCALE = 5;
    const ZOOM_STEP = 0.2;

    // Aplicar transformação
    function applyTransform() {
        image.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    // Resetar visualização
    function resetView() {
        scale = isFullscreen ? 1.5 : 1.2;
        translateX = 0;
        translateY = 0;
        applyTransform();
    }

    // Zoom
    function zoom(delta) {
        const newScale = scale + delta;
        if (newScale >= MIN_SCALE && newScale <= MAX_SCALE) {
            scale = newScale;
            applyTransform();
        }
    }

    // Mouse down - iniciar arraste
    viewer.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Botão esquerdo
            isDragging = true;
            startX = e.clientX - translateX;
            startY = e.clientY - translateY;
            viewer.style.cursor = 'grabbing';
        }
    });

    // Mouse move - arrastar
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            translateX = e.clientX - startX;
            translateY = e.clientY - startY;
            applyTransform();
        }
    });

    // Mouse up - parar arraste
    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            viewer.style.cursor = 'grab';
        }
    });

    // Touch events para mobile
    let touchStartX = 0;
    let touchStartY = 0;

    viewer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDragging = true;
            touchStartX = e.touches[0].clientX - translateX;
            touchStartY = e.touches[0].clientY - translateY;
        }
    });

    viewer.addEventListener('touchmove', (e) => {
        if (isDragging && e.touches.length === 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - touchStartX;
            translateY = e.touches[0].clientY - touchStartY;
            applyTransform();
        }
    });

    viewer.addEventListener('touchend', () => {
        isDragging = false;
    });

    // Scroll do mouse para zoom
    viewer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
        zoom(delta);
    });

    // Botões de controle
    if (zoomInBtn) {
        zoomInBtn.addEventListener('click', () => zoom(ZOOM_STEP));
    }

    if (zoomOutBtn) {
        zoomOutBtn.addEventListener('click', () => zoom(-ZOOM_STEP));
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', resetView);
    }

    // Fullscreen
    const closeFullscreenBtn = document.getElementById('close-fullscreen-btn');
    
    function exitFullscreen() {
        viewer.classList.remove('fullscreen');
        const enterIcon = fullscreenBtn.querySelector('.fullscreen-enter');
        const exitIcon = fullscreenBtn.querySelector('.fullscreen-exit');
        enterIcon.style.display = 'block';
        exitIcon.style.display = 'none';
        isFullscreen = false;
        
        // Esconder botão fechar
        if (closeFullscreenBtn) closeFullscreenBtn.style.display = 'none';
        
        // Restaurar posição dos controles
        const controlsLeft = document.querySelector('.mindmap-controls-left');
        const controlsRight = document.querySelector('.mindmap-controls-right');
        if (controlsLeft) controlsLeft.style.top = '80px';
        if (controlsRight) controlsRight.style.top = '80px';
        
        // Resetar view para zoom inicial
        resetView();
        
        // Sair do fullscreen nativo
        if (document.exitFullscreen) {
            document.exitFullscreen().catch(() => {});
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
    
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', () => {
            const enterIcon = fullscreenBtn.querySelector('.fullscreen-enter');
            const exitIcon = fullscreenBtn.querySelector('.fullscreen-exit');
            
            if (!isFullscreen) {
                // Entrar em fullscreen
                viewer.classList.add('fullscreen');
                enterIcon.style.display = 'none';
                exitIcon.style.display = 'block';
                isFullscreen = true;
                
                // Mostrar botão fechar
                if (closeFullscreenBtn) {
                    closeFullscreenBtn.style.cssText = 'display: flex !important;';
                }
                
                // Ajustar controles para fullscreen
                const controlsLeft = document.querySelector('.mindmap-controls-left');
                const controlsRight = document.querySelector('.mindmap-controls-right');
                if (controlsLeft) controlsLeft.style.top = '20px';
                if (controlsRight) controlsRight.style.top = '20px';
                
                // Resetar view com zoom próximo
                scale = 1.5;
                translateX = 0;
                translateY = 0;
                applyTransform();
                
                // Tentar fullscreen nativo (opcional)
                if (viewer.requestFullscreen) {
                    viewer.requestFullscreen().catch(() => {});
                } else if (viewer.webkitRequestFullscreen) {
                    viewer.webkitRequestFullscreen();
                } else if (viewer.msRequestFullscreen) {
                    viewer.msRequestFullscreen();
                }
            } else {
                exitFullscreen();
            }
        });
    }
    
    // Botão fechar fullscreen
    if (closeFullscreenBtn) {
        closeFullscreenBtn.addEventListener('click', exitFullscreen);
    }

    // Detectar saída de fullscreen nativo (ESC)
    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && isFullscreen) {
            exitFullscreen();
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (!document.webkitFullscreenElement && isFullscreen) {
            exitFullscreen();
        }
    });

    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (viewer.matches(':hover') || isFullscreen) {
            if (e.key === '+' || e.key === '=') {
                e.preventDefault();
                zoom(ZOOM_STEP);
            } else if (e.key === '-') {
                e.preventDefault();
                zoom(-ZOOM_STEP);
            } else if (e.key === '0') {
                e.preventDefault();
                resetView();
            } else if (e.key === 'f' || e.key === 'F') {
                e.preventDefault();
                fullscreenBtn.click();
            }
        }
    });

    // Inicializar em miniatura
    resetView();
});

