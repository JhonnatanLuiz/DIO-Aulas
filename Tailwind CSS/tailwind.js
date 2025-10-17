// ========================================
//  TAILWIND CSS GUIA INTERATIVO - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // STATE MANAGEMENT
    // ========================================
    const state = {
        completedTopics: JSON.parse(localStorage.getItem('tailwind-completed')) || [],
        currentSection: 'introducao',
        totalTopics: 0
    };

    // ========================================
    // DOM ELEMENTS
    // ========================================
    const elements = {
        sections: document.querySelectorAll('.content-section'),
        navLinks: document.querySelectorAll('.nav-list a'),
        markCompleteButtons: document.querySelectorAll('.mark-complete'),
        progressFill: document.getElementById('progressFill'),
        progressText: document.getElementById('progressText'),
        sidebar: document.getElementById('sidebar'),
        toggleSidebar: document.getElementById('toggleSidebar'),
        navBtns: document.querySelectorAll('.nav-btn'),
        demoInput: document.getElementById('demoInput'),
        demoOutput: document.getElementById('demoOutput')
    };

    // ========================================
    // INITIALIZATION
    // ========================================
    function init() {
        state.totalTopics = elements.markCompleteButtons.length;
        
        // Load completed topics
        loadCompletedTopics();
        
        // Show first section
        showSection(state.currentSection);
        
        // Setup event listeners
        setupEventListeners();
        
        // Update progress
        updateProgress();
        
        console.log('%c🎨 Tailwind CSS Guia Interativo Carregado!', 'color: #06b6d4; font-size: 20px; font-weight: bold;');
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================
    function setupEventListeners() {
        // Navigation links
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.getAttribute('data-section');
                showSection(section);
                updateActiveNav(link);
                
                // Mobile: close sidebar after click
                if (window.innerWidth <= 968) {
                    elements.sidebar.classList.remove('show');
                }
            });
        });

        // Mark complete buttons
        elements.markCompleteButtons.forEach(button => {
            button.addEventListener('click', () => {
                const topic = button.getAttribute('data-topic');
                toggleTopicCompletion(topic, button);
            });
        });

        // Sidebar toggle
        elements.toggleSidebar?.addEventListener('click', () => {
            elements.sidebar.classList.toggle('show');
        });

        // Navigation buttons
        elements.navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const nextSection = btn.getAttribute('data-next');
                const prevSection = btn.getAttribute('data-prev');
                
                if (nextSection) {
                    showSection(nextSection);
                    scrollToTop();
                } else if (prevSection) {
                    showSection(prevSection);
                    scrollToTop();
                }
            });
        });

        // Interactive Demo
        if (elements.demoInput && elements.demoOutput) {
            elements.demoInput.addEventListener('input', (e) => {
                const classes = e.target.value;
                elements.demoOutput.className = 'demo-output ' + classes;
            });
        }

        // Smooth scroll
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

        // Close sidebar on mobile when clicking outside
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                if (!elements.sidebar.contains(e.target) && !elements.toggleSidebar.contains(e.target)) {
                    elements.sidebar.classList.remove('show');
                }
            }
        });
    }

    // ========================================
    // SECTION NAVIGATION
    // ========================================
    function showSection(sectionId) {
        // Hide all sections
        elements.sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            state.currentSection = sectionId;
            
            // Update URL hash
            window.history.pushState(null, null, `#${sectionId}`);
        }
    }

    function updateActiveNav(activeLink) {
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // ========================================
    // TOPIC COMPLETION
    // ========================================
    function toggleTopicCompletion(topic, button) {
        const index = state.completedTopics.indexOf(topic);
        
        if (index === -1) {
            // Mark as completed
            state.completedTopics.push(topic);
            button.classList.add('completed');
            button.innerHTML = '<span class="btn-icon">✓</span> Concluído';
            
            // Celebration animation
            celebrateCompletion(button);
        } else {
            // Mark as not completed
            state.completedTopics.splice(index, 1);
            button.classList.remove('completed');
            button.innerHTML = '<span class="btn-icon">✓</span> Marcar como Concluído';
        }
        
        // Save to localStorage
        localStorage.setItem('tailwind-completed', JSON.stringify(state.completedTopics));
        
        // Update progress
        updateProgress();
    }

    function loadCompletedTopics() {
        elements.markCompleteButtons.forEach(button => {
            const topic = button.getAttribute('data-topic');
            if (state.completedTopics.includes(topic)) {
                button.classList.add('completed');
                button.innerHTML = '<span class="btn-icon">✓</span> Concluído';
            }
        });
    }

    function celebrateCompletion(button) {
        // Create confetti effect
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        createConfetti(x, y);
        
        // Button pulse animation
        button.style.transform = 'scale(1.1)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 200);
    }

    function createConfetti(x, y) {
        const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
        const particleCount = 15;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '10000';
            particle.style.transition = 'all 0.8s ease-out';
            
            document.body.appendChild(particle);
            
            // Animate particle
            setTimeout(() => {
                const angle = (Math.PI * 2 * i) / particleCount;
                const velocity = 100 + Math.random() * 50;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;
                
                particle.style.transform = `translate(${tx}px, ${ty}px)`;
                particle.style.opacity = '0';
            }, 10);
            
            // Remove particle
            setTimeout(() => {
                particle.remove();
            }, 1000);
        }
    }

    // ========================================
    // PROGRESS TRACKING
    // ========================================
    function updateProgress() {
        const completed = state.completedTopics.length;
        const total = state.totalTopics;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        if (elements.progressFill) {
            elements.progressFill.style.width = percentage + '%';
        }
        
        if (elements.progressText) {
            elements.progressText.textContent = `${percentage}% Completo (${completed}/${total})`;
        }
        
        // Celebration when 100%
        if (percentage === 100 && completed > 0) {
            setTimeout(() => {
                showCompletionMessage();
            }, 500);
        }
    }

    function showCompletionMessage() {
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
            color: white;
            padding: 3rem;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
            z-index: 10001;
            text-align: center;
            animation: scaleIn 0.5s ease;
            max-width: 90%;
        `;
        
        message.innerHTML = `
            <h2 style="font-size: 2.5rem; margin-bottom: 1rem;">🎉 Parabéns!</h2>
            <p style="font-size: 1.3rem; margin-bottom: 1.5rem;">Você completou o Guia de Tailwind CSS!</p>
            <button onclick="this.parentElement.remove()" style="
                background: white;
                color: #06b6d4;
                border: none;
                padding: 0.8rem 2rem;
                border-radius: 10px;
                font-size: 1.1rem;
                font-weight: 700;
                cursor: pointer;
            ">Fechar</button>
        `;
        
        // Add animation keyframes
        if (!document.getElementById('celebration-styles')) {
            const style = document.createElement('style');
            style.id = 'celebration-styles';
            style.textContent = `
                @keyframes scaleIn {
                    from {
                        transform: translate(-50%, -50%) scale(0.5);
                        opacity: 0;
                    }
                    to {
                        transform: translate(-50%, -50%) scale(1);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        // Create big confetti
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                createConfetti(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 50);
        }
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            showSection(hash);
            const navLink = document.querySelector(`[data-section="${hash}"]`);
            if (navLink) {
                updateActiveNav(navLink);
            }
        }
    }

    // Listen to hash changes
    window.addEventListener('hashchange', handleHashChange);

    // ========================================
    // RESPONSIVE HANDLING
    // ========================================
    function handleResize() {
        if (window.innerWidth > 968) {
            elements.sidebar?.classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResize);

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            elements.sidebar?.classList.toggle('show');
        }
        
        // ESC: Close sidebar on mobile
        if (e.key === 'Escape' && window.innerWidth <= 968) {
            elements.sidebar?.classList.remove('show');
        }
    });

    // ========================================
    // INITIALIZE APP
    // ========================================
    init();

    // Handle initial hash
    handleHashChange();

    // ========================================
    // EXPORT FOR CONSOLE DEBUGGING
    // ========================================
    window.TailwindGuide = {
        state,
        showSection,
        resetProgress: () => {
            if (confirm('Deseja resetar todo o progresso?')) {
                state.completedTopics = [];
                localStorage.removeItem('tailwind-completed');
                elements.markCompleteButtons.forEach(button => {
                    button.classList.remove('completed');
                    button.innerHTML = '<span class="btn-icon">✓</span> Marcar como Concluído';
                });
                updateProgress();
                alert('Progresso resetado!');
            }
        },
        getProgress: () => {
            return {
                completed: state.completedTopics.length,
                total: state.totalTopics,
                percentage: Math.round((state.completedTopics.length / state.totalTopics) * 100)
            };
        }
    };

    console.log('%c💡 Dica: Use TailwindGuide.resetProgress() no console para resetar o progresso', 'color: #8b5cf6; font-size: 14px;');
});