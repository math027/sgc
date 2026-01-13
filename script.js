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
    updateChartTheme(); 
});


// --- Chart Configuration ---
const ctx = document.getElementById('userContractsChart').getContext('2d');
let myChart;

function initChart() {
    const isDark = htmlElement.classList.contains('dark');
    const textColor = isDark ? '#94a3b8' : '#9ca3af'; // Slate-400 vs Gray-400
    const gridColor = isDark ? '#334155' : '#f3f4f6'; // Slate-700 vs Gray-100

    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.5)'); 
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            datasets: [
                {
                    label: 'Matheus Souza',
                    data: [12, 19, 15, 25, 22, 30, 45],
                    borderColor: '#3b82f6',
                    backgroundColor: gradient,
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: isDark ? '#1e293b' : '#ffffff',
                    pointBorderColor: '#3b82f6',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6
                },
                {
                    label: 'João Silva',
                    data: [8, 12, 10, 18, 16, 20, 28],
                    borderColor: '#f97316',
                    backgroundColor: 'transparent',
                    borderDash: [5, 5],
                    tension: 0.4,
                    pointRadius: 0,
                    pointHoverRadius: 4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    align: 'end',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        font: { size: 11 },
                        color: textColor
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: { size: 11 },
                        color: textColor
                    }
                }
            }
        }
    });
}

function updateChartTheme() {
    initChart();
}

// Inicializa o gráfico
initChart();

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