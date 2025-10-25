// ============================================
// GERENCIAMENTO DE ESTADO DA APLICAÇÃO
// ============================================

// Armazena quais módulos foram completados
let completedModules = JSON.parse(localStorage.getItem('sassModulesCompleted')) || [];

// Tema atual
let currentTheme = localStorage.getItem('sassTheme') || 'light';

// Estado do sidebar
let sidebarVisible = localStorage.getItem('sassSidebarVisible') !== 'false';

// ============================================
// TOGGLE SIDEBAR (OCULTAR/MOSTRAR MENU)
// ============================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    
    sidebar.classList.toggle('hidden');
    sidebar.classList.toggle('active');
    
    // Salvar estado
    sidebarVisible = !sidebar.classList.contains('hidden');
    localStorage.setItem('sassSidebarVisible', sidebarVisible);
    
    // Feedback visual
    const message = sidebarVisible ? '📖 Menu aberto' : '📕 Menu fechado - mais espaço para conteúdo!';
    showNotification(message, 'info');
}

// ============================================
// INICIALIZAÇÃO
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🎨 SASS Guide carregado!');
    
    // Restaurar estado do sidebar
    restoreSidebarState();
    
    // Inicializar tema
    initTheme();
    
    // Inicializar navegação
    initNavigation();
    
    // Carregar progresso salvo
    loadProgress();
    
    // Atualizar barra de progresso
    updateProgressBar();
    
    // Adicionar listeners de eventos
    initEventListeners();
    
    // Smooth scroll para links
    initSmoothScroll();
});

// ============================================
// RESTAURAR ESTADO DO SIDEBAR
// ============================================

function restoreSidebarState() {
    const sidebar = document.getElementById('sidebar');
    
    if (!sidebarVisible) {
        sidebar.classList.add('hidden');
    }
}

// ============================================
// TEMA (MODO CLARO/ESCURO)
// ============================================

function initTheme() {
    const btnTheme = document.getElementById('btnTheme');
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        btnTheme.textContent = '☀️ Modo Claro';
    }
    
    btnTheme.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const btnTheme = document.getElementById('btnTheme');
    
    if (currentTheme === 'light') {
        document.body.classList.add('dark-mode');
        btnTheme.textContent = '☀️ Modo Claro';
        currentTheme = 'dark';
    } else {
        document.body.classList.remove('dark-mode');
        btnTheme.textContent = '🌙 Modo Escuro';
        currentTheme = 'light';
    }
    
    localStorage.setItem('sassTheme', currentTheme);
}

// ============================================
// NAVEGAÇÃO E SCROLL
// ============================================

function initNavigation() {
    const links = document.querySelectorAll('.sidebar__link');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active de todos
            links.forEach(l => l.classList.remove('active'));
            
            // Adiciona active no clicado
            this.classList.add('active');
        });
    });
    
    // Highlight do menu baseado no scroll
    window.addEventListener('scroll', highlightMenuOnScroll);
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
}

function highlightMenuOnScroll() {
    const sections = document.querySelectorAll('.module');
    const navLinks = document.querySelectorAll('.sidebar__link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SISTEMA DE PROGRESSO
// ============================================

function completeModule(moduleNumber) {
    if (!completedModules.includes(moduleNumber)) {
        completedModules.push(moduleNumber);
        localStorage.setItem('sassModulesCompleted', JSON.stringify(completedModules));
        
        // Feedback visual
        showNotification(`✅ Módulo ${moduleNumber} completo!`, 'success');
        
        // Atualizar barra de progresso
        updateProgressBar();
        
        // Animação de confete (simples)
        celebrateCompletion();
    } else {
        showNotification(`ℹ️ Módulo ${moduleNumber} já foi completado`, 'info');
    }
}

function loadProgress() {
    completedModules.forEach(moduleNumber => {
        const btn = document.querySelector(`[onclick="completeModule(${moduleNumber})"]`);
        if (btn) {
            btn.textContent = '✓ Módulo Completo';
            btn.style.background = 'linear-gradient(135deg, #27ae60, #229954)';
            btn.disabled = true;
            btn.style.cursor = 'default';
        }
    });
}

function updateProgressBar() {
    const totalModules = 6;
    const percentage = (completedModules.length / totalModules) * 100;
    
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    if (progressBar) {
        progressBar.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `${Math.round(percentage)}% Completo (${completedModules.length}/${totalModules})`;
    }
}

function celebrateCompletion() {
    // Efeito de confete simples com emojis
    const emojis = ['🎉', '✨', '🌟', '💫', '⭐'];
    const container = document.body;
    
    for (let i = 0; i < 15; i++) {
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = Math.random() * 100 + '%';
        emoji.style.top = '0';
        emoji.style.fontSize = '2rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '9999';
        emoji.style.animation = 'fall 2s linear forwards';
        
        container.appendChild(emoji);
        
        setTimeout(() => emoji.remove(), 2000);
    }
}

// Adicionar animação de queda
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SISTEMA DE NOTIFICAÇÕES
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#2ecc71' : '#3498db'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Adicionar animações de notificação
const notifStyle = document.createElement('style');
notifStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notifStyle);

// ============================================
// SISTEMA DE TABS
// ============================================

function showTab(tabId) {
    // Esconder todas as tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remover active dos botões
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar tab selecionada
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }
    
    // Ativar botão correspondente
    event.target.classList.add('active');
}

// ============================================
// SISTEMA DE CODE EXAMPLES
// ============================================

function showCode(codeId) {
    const parent = event.target.closest('.code-example');
    if (!parent) return;
    
    // Esconder todos os códigos
    parent.querySelectorAll('.code-example__content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Remover active dos botões
    parent.querySelectorAll('.code-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mostrar código selecionado
    const selectedCode = document.getElementById(codeId);
    if (selectedCode) {
        selectedCode.classList.add('active');
    }
    
    // Ativar botão correspondente
    event.target.classList.add('active');
}

// ============================================
// DEMO INTERATIVO: SIMULAÇÃO DE COMPILAÇÃO
// ============================================

function simulateCompile() {
    const output = document.getElementById('compileOutput');
    output.innerHTML = '';
    
    const steps = [
        '📁 Lendo arquivo styles.scss...',
        '🔍 Analisando sintaxe...',
        '⚙️ Processando variáveis...',
        '🔄 Compilando nesting...',
        '🎨 Aplicando mixins...',
        '💾 Gerando CSS...',
        '✅ Compilação concluída com sucesso!',
        '',
        '📄 Arquivo gerado: styles.css',
        '📊 Tamanho: 45.2 KB',
        '⏱️ Tempo: 0.234s'
    ];
    
    let i = 0;
    const interval = setInterval(() => {
        if (i < steps.length) {
            const line = document.createElement('div');
            line.textContent = steps[i];
            line.style.marginBottom = '8px';
            
            if (steps[i].includes('✅')) {
                line.style.color = '#2ecc71';
                line.style.fontWeight = 'bold';
            }
            
            output.appendChild(line);
            output.scrollTop = output.scrollHeight;
            i++;
        } else {
            clearInterval(interval);
        }
    }, 300);
}

// ============================================
// CARREGAR MAIS MÓDULOS
// ============================================

function loadMoreModules() {
    showNotification('🚧 Módulos 4, 5 e 6 em desenvolvimento!', 'info');
    
    // Simular carregamento
    const btn = event.target;
    btn.textContent = '⏳ Carregando...';
    btn.disabled = true;
    
    setTimeout(() => {
        showNotification('📚 Conteúdo adicional será adicionado em breve!', 'success');
        btn.textContent = '📥 Carregar Próximos Módulos';
        btn.disabled = false;
    }, 2000);
}

// ============================================
// LISTENERS ADICIONAIS
// ============================================

function initEventListeners() {
    // Detectar cliques em códigos para copiar
    document.querySelectorAll('.code').forEach(codeBlock => {
        codeBlock.addEventListener('click', function() {
            const code = this.textContent;
            navigator.clipboard.writeText(code).then(() => {
                showNotification('📋 Código copiado!', 'success');
            });
        });
        
        // Adicionar tooltip visual
        codeBlock.style.cursor = 'pointer';
        codeBlock.title = 'Clique para copiar';
    });
    
    // Atalho de teclado: Ctrl/Cmd + B para toggle do menu
    document.addEventListener('keydown', function(e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
            e.preventDefault();
            toggleSidebar();
        }
    });
    
    // Fechar sidebar ao clicar em um link (mobile)
    if (window.innerWidth <= 968) {
        document.querySelectorAll('.sidebar__link').forEach(link => {
            link.addEventListener('click', function() {
                const sidebar = document.getElementById('sidebar');
                if (sidebar.classList.contains('active')) {
                    toggleSidebar();
                }
            });
        });
    }
}

// ============================================
// UTILITÁRIOS
// ============================================

function resetProgress() {
    if (confirm('⚠️ Tem certeza que deseja resetar todo o progresso?')) {
        localStorage.removeItem('sassModulesCompleted');
        completedModules = [];
        updateProgressBar();
        location.reload();
    }
}

// Disponibilizar função globalmente para debug
window.resetProgress = resetProgress;

// ============================================
// EASTER EGG
// ============================================

let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    showNotification('🎮 Código Konami ativado! Você desbloqueou o modo SASS Master! 🏆', 'success');
    
    // Efeito arco-íris nas variáveis
    document.documentElement.style.setProperty('--cor-primaria', '#ff0080');
    document.documentElement.style.setProperty('--cor-secundaria', '#7928ca');
    
    setTimeout(() => {
        document.documentElement.style.setProperty('--cor-primaria', '#3498db');
        document.documentElement.style.setProperty('--cor-secundaria', '#2ecc71');
    }, 5000);
}

// ============================================
// LOG DE INICIALIZAÇÃO
// ============================================

console.log('%c🎨 SASS Guide Loaded! ', 'background: linear-gradient(135deg, #3498db, #2ecc71); color: white; padding: 10px; font-size: 16px; font-weight: bold;');
console.log('%cDicas úteis:', 'font-weight: bold; font-size: 14px;');
console.log('- Digite resetProgress() no console para resetar o progresso');
console.log('- Clique nos blocos de código para copiar');
console.log('- Use Ctrl+B (Cmd+B no Mac) para ocultar/mostrar o menu lateral');
console.log('- Use as setas do teclado para navegar... ou tente o código Konami 😉');
console.log('%cBons estudos! 📚', 'color: #2ecc71; font-weight: bold;');

// ============================================
// MÓDULO 4 - DEMO DE CONDICIONAIS
// ============================================

function demonstrateConditional() {
    const selector = document.getElementById('themeSelector');
    const output = document.getElementById('conditionalOutput');
    const tema = selector.value;
    
    let cssGerado = '';
    
    if (tema === 'claro') {
        cssGerado = `.site {
  background: #ffffff;
  color: #333;
}`;
    } else if (tema === 'escuro') {
        cssGerado = `.site {
  background: #1a1a1a;
  color: #fff;
}`;
    } else {
        cssGerado = `.site {
  background: #f5f5f5;
  color: #666;
}`;
    }
    
    output.innerHTML = `<strong>CSS Gerado:</strong><br><pre>${cssGerado}</pre>`;
}

// ============================================
// MÓDULO 6 - SISTEMA DE QUIZ
// ============================================

let currentQuestion = 1;
const totalQuestions = 5;
const correctAnswers = {
    q1: 'b', // SCSS usa chaves e ponto-e-vírgula
    q2: 'b', // $cor: #3498db;
    q3: 'b', // Referência ao seletor pai
    q4: 'c', // @error
    q5: 'a'  // @import 'variables';
};

function navigateQuiz(direction) {
    const questions = document.querySelectorAll('.quiz-question');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressText = document.getElementById('quizProgress');
    
    // Esconder questão atual
    questions[currentQuestion - 1].classList.remove('active');
    
    // Atualizar número da questão
    currentQuestion += direction;
    
    // Mostrar nova questão
    questions[currentQuestion - 1].classList.add('active');
    
    // Atualizar progresso
    progressText.textContent = `${currentQuestion}/${totalQuestions}`;
    
    // Controlar botões
    prevBtn.disabled = currentQuestion === 1;
    
    if (currentQuestion === totalQuestions) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

function submitQuiz() {
    let score = 0;
    const totalQuestions = 5;
    
    // Verificar respostas
    for (let i = 1; i <= totalQuestions; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === correctAnswers[`q${i}`]) {
            score++;
        }
    }
    
    // Calcular porcentagem
    const percentage = (score / totalQuestions) * 100;
    
    // Esconder quiz
    document.getElementById('sassQuiz').style.display = 'none';
    
    // Mostrar resultado
    const resultDiv = document.getElementById('quizResult');
    resultDiv.style.display = 'block';
    
    let message = '';
    let emoji = '';
    
    if (percentage === 100) {
        message = 'Perfeito! Você domina SASS! 🏆';
        emoji = '🎉';
    } else if (percentage >= 80) {
        message = 'Excelente! Você está quase lá! 👏';
        emoji = '⭐';
    } else if (percentage >= 60) {
        message = 'Bom trabalho! Continue estudando! 📚';
        emoji = '👍';
    } else {
        message = 'Continue praticando! Revise o conteúdo! 💪';
        emoji = '📖';
    }
    
    resultDiv.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 20px;">${emoji}</div>
        <h3>${message}</h3>
        <div class="quiz-score">${score}/${totalQuestions}</div>
        <p style="font-size: 1.5rem; font-weight: 600;">${percentage}% de acerto</p>
        <p style="margin-top: 20px;">
            ${score === totalQuestions 
                ? 'Você respondeu todas corretamente! 🎯' 
                : `Você acertou ${score} de ${totalQuestions} questões.`}
        </p>
        <button class="btn-demo" onclick="resetQuiz()" style="margin-top: 20px;">
            🔄 Refazer Quiz
        </button>
    `;
    
    // Mostrar notificação
    showNotification(`Quiz concluído! ${percentage}% de acerto`, 'success');
    
    // Celebrar se acertou tudo
    if (score === totalQuestions) {
        celebrateCompletion();
    }
}

function resetQuiz() {
    // Resetar seleções
    document.querySelectorAll('.quiz-question input[type="radio"]').forEach(input => {
        input.checked = false;
    });
    
    // Voltar para primeira questão
    currentQuestion = 1;
    document.querySelectorAll('.quiz-question').forEach((q, index) => {
        q.classList.remove('active');
        if (index === 0) q.classList.add('active');
    });
    
    // Resetar botões
    document.getElementById('prevBtn').disabled = true;
    document.getElementById('nextBtn').style.display = 'block';
    document.getElementById('submitBtn').style.display = 'none';
    document.getElementById('quizProgress').textContent = '1/5';
    
    // Esconder resultado e mostrar quiz
    document.getElementById('quizResult').style.display = 'none';
    document.getElementById('sassQuiz').style.display = 'block';
}

// ============================================
// COMPLETAR TODOS OS MÓDULOS
// ============================================

function completeAllModules() {
    if (confirm('🎓 Marcar todos os módulos como completos?')) {
        for (let i = 1; i <= 6; i++) {
            if (!completedModules.includes(i)) {
                completedModules.push(i);
            }
        }
        localStorage.setItem('sassModulesCompleted', JSON.stringify(completedModules));
        updateProgressBar();
        loadProgress();
        showNotification('🎉 Parabéns! Todos os módulos completos!', 'success');
        celebrateCompletion();
    }
}

// Disponibilizar função globalmente
window.completeAllModules = completeAllModules;
