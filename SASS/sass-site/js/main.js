document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    setupTheme();
});

async function loadComponents() {
    const isAulaPage = window.location.pathname.includes('/aulas/');
    const basePath = isAulaPage ? '..' : '.';

    // Load Header
    await loadComponent('header-container', `${basePath}/components/header.html`);

    // Load Sidebar
    await loadComponent('sidebar-container', `${basePath}/components/sidebar.html`);
    
    // Load Footer
    await loadComponent('footer-container', `${basePath}/components/footer.html`);

    // Post-load adjustments
    updateLinks(basePath);
    highlightActiveLink();
    setupMobileMenu();
    setupCodeCopyButtons(); // Add this
}

async function loadComponent(containerId, path) {
    const container = document.getElementById(containerId);
    if (!container) return;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);
        const html = await response.text();
        container.innerHTML = html;
    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="text-red-500">Erro ao carregar componente: ${path}</div>`;
    }
}

function updateLinks(basePath) {
    // Fix links in sidebar and header to be relative to current page
    const links = document.querySelectorAll('a[data-href]');
    links.forEach(link => {
        const path = link.getAttribute('data-href');
        link.href = `${basePath}/${path}`;
    });
}

function highlightActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.sidebar-link');
    
    links.forEach(link => {
        // Simple check: if the link's href ends with the current filename
        const href = link.getAttribute('href');
        if (href && currentPath.endsWith(href.replace(/^\.\//, '').replace(/^\.\.\//, ''))) {
            link.classList.add('bg-blue-100', 'text-blue-700', 'border-r-4', 'border-blue-600');
            link.classList.remove('text-gray-600', 'hover:bg-gray-50');
        }
    });
}

function setupMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (btn && sidebar && overlay) {
        const toggleMenu = () => {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        };

        btn.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }
}

function setupCodeCopyButtons() {
    document.querySelectorAll('pre').forEach(pre => {
        // Create wrapper if not exists
        if (pre.parentNode.classList.contains('relative')) return;
        
        const wrapper = document.createElement('div');
        wrapper.className = 'relative group';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        const btn = document.createElement('button');
        btn.className = 'absolute top-2 right-2 bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity';
        btn.textContent = 'Copiar';
        
        btn.addEventListener('click', async () => {
            const code = pre.innerText;
            try {
                await navigator.clipboard.writeText(code);
                btn.textContent = 'Copiado!';
                setTimeout(() => btn.textContent = 'Copiar', 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        });

        wrapper.appendChild(btn);
    });
}

function setupTheme() {
    // Check for saved theme preference, otherwise use system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
}

// Inject custom styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
        animation: fadeIn 0.5s ease-out forwards;
    }
`;
document.head.appendChild(style);
