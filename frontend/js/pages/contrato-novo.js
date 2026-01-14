// --- Mock Data: Formulários recebidos (Baseado na imagem enviada) ---
const pendingRequests = [
    {
        id: "REQ-026",
        formType: "PJ Fixo",
        status: "pending",
        data: {
            dataSolicitacao: "14/01/2026",
            dataInicio: "20/01/2026",
            numContratoAdm: "026/20.193/19", // Exemplo da imagem
            contratante: "Empresa Principal S.A.",
            contratada: "Tubomills Indústria Ltda", // Exemplo da imagem
            cnpj: "12.345.678/0001-90",
            endereco: "Rodovia BR 101, Km 200, Viana - ES",
            representante: "Carlos Silva",
            email: "carlos.silva@tubomills.com.br",
            whatsapp: "(27) 99988-7766"
        }
    },
    {
        id: "REQ-027",
        formType: "PJ Fixo",
        status: "pending",
        data: {
            dataSolicitacao: "15/01/2026",
            dataInicio: "01/02/2026",
            numContratoAdm: "194/25",
            contratante: "Empresa Principal S.A.",
            contratada: "Tech Soluções Digitais",
            cnpj: "98.765.432/0001-11",
            endereco: "Av. Vitória, 500, Vitória - ES",
            representante: "Ana Pereira",
            email: "ana@techsolucoes.com",
            whatsapp: "(27) 98888-5555"
        }
    }
];

// --- Elementos do DOM ---
const tableBody = document.getElementById('requestsTableBody');
const detailsModal = document.getElementById('detailsModal');
const templateModal = document.getElementById('templateModal');
const modalClientName = document.getElementById('modalClientName');
const btnGenerateFromDetails = document.getElementById('btnGenerateFromDetails');

let currentRequest = null;

// --- Funções ---

// 1. Renderizar Tabela Principal
function renderTable() {
    tableBody.innerHTML = '';

    pendingRequests.forEach(req => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="cell-primary">#${req.id}</td>
            <td class="cell-title" style="font-weight:600;">
                <div>${req.data.contratada}</div>
                <div>CNPJ: ${req.data.cnpj}</div>
            </td>
            <td>${req.data.dataSolicitacao}</td>
            <td>${req.formType}</td>
            <td><span class="status-badge bg-status-blue">Novo</span></td>
            <td style="text-align: right;">
                <button class="action-btn" onclick="openDetailsModal('${req.id}')" title="Ver Detalhes">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="openTemplateModal('${req.id}')" title="Gerar Minuta" style="color: var(--primary-color);">
                    <i class="fas fa-magic"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

// 2. Abrir Modal de Detalhes (Popula com dados do JSON)
window.openDetailsModal = function(id) {
    const req = pendingRequests.find(r => r.id === id);
    if (!req) return;

    currentRequest = req;

    // Preenche os campos do modal com IDs específicos
    document.getElementById('detailFormType').innerText = `Jurídico > ${req.formType}`;
    
    document.getElementById('d_dataSolicitacao').innerText = req.data.dataSolicitacao;
    document.getElementById('d_dataInicio').innerText = req.data.dataInicio;
    document.getElementById('d_numContrato').innerText = req.data.numContratoAdm;
    document.getElementById('d_contratante').innerText = req.data.contratante;
    document.getElementById('d_contratada').innerText = req.data.contratada;
    document.getElementById('d_cnpj').innerText = req.data.cnpj;
    document.getElementById('d_endereco').innerText = req.data.endereco;
    document.getElementById('d_representante').innerText = req.data.representante;
    document.getElementById('d_email').innerText = req.data.email;
    document.getElementById('d_whatsapp').innerText = req.data.whatsapp;

    // Configura o botão "Gerar" de dentro do modal de detalhes
    btnGenerateFromDetails.onclick = () => {
        closeDetailsModal();
        openTemplateModal(id);
    };

    detailsModal.classList.remove('hidden');
}

window.closeDetailsModal = function() {
    detailsModal.classList.add('hidden');
}

// 3. Abrir Modal de Template
window.openTemplateModal = function(id) {
    const req = pendingRequests.find(r => r.id === id);
    if (!req && !currentRequest) return;
    
    const clientName = req ? req.data.contratada : currentRequest.data.contratada;
    modalClientName.textContent = clientName;
    
    templateModal.classList.remove('hidden');
}

window.closeTemplateModal = function() {
    templateModal.classList.add('hidden');
}

// 4. Selecionar Template
window.selectTemplate = function(templateType) {
    alert(`Gerando minuta [${templateType}] com os dados recebidos...`);
    closeTemplateModal();
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    renderTable();
});

// Fechar modais ao clicar fora
window.onclick = function(event) {
    if (event.target == detailsModal) closeDetailsModal();
    if (event.target == templateModal) closeTemplateModal();
}