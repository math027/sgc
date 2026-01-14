// --- Sidebar Toggle Logic ---
const sidebar = document.getElementById('sidebar');
const sidebarToggleBtn = document.getElementById('sidebarToggle');

sidebarToggleBtn.addEventListener('click', () => {
    // Alterna a classe 'collapsed' no CSS
    sidebar.classList.toggle('collapsed');
    
    // Dispara evento para o gráfico se reajustar
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 300);
});