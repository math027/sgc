// --- Dark Mode Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const htmlElement = document.documentElement;

// Verifica preferência salva ou do sistema
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
} else {
    htmlElement.classList.remove('dark');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

// Toggle function
themeToggleBtn.addEventListener('click', (e) => {
    // Evita comportamento padrão se for tag <a>
    e.preventDefault(); 
    
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.theme = 'light';
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        htmlElement.classList.add('dark');
        localStorage.theme = 'dark';
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    // Atualiza o gráfico se necessário (recarga simples para pegar novas cores se implementado)
    if (typeof updateChartTheme === 'function') {
        updateChartTheme(); 
    }
});