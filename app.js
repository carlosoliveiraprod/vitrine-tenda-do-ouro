/**
 * Vitrine Suprema - Atenda do Ouro
 * Vanilla JS dynamic injector
 */

const API_URL = 'http://n8n.atendadoouro.com.br/webhook/vitrine-forja'; // Endpoint fictício n8n
const FALLBACK_MESSAGE = 'As energias estão a ser realinhadas. Volte em instantes.';

async function fetchStoreData() {
    console.log('--- CHAMANDO TORRE DE COMANDO ---');
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Falha na conexão mística');
        
        const data = await response.json();
        renderGrid('products-grid', data.products || []);
        renderGrid('services-grid', data.services || []);
        
    } catch (error) {
        console.error('Erro de Sincronia:', error);
        showFallback();
    }
}

function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (items.length === 0) {
        container.innerHTML = '<div class="loading">Nenhum tesouro encontrado nesta era.</div>';
        return;
    }
    
    items.forEach(item => {
        const card = document.createElement('article');
        card.className = 'card fade-in';
        card.innerHTML = `
            <img src="${item.image || 'https://via.placeholder.com/300'}" alt="${item.title}">
            <h3>${item.title}</h3>
            <p class="description">${item.description || ''}</p>
            <p class="price">${item.price || 'Sob consulta'}</p>
            <a href="#" class="btn-primary" style="margin-top: 1rem; padding: 0.5rem 1rem; font-size: 0.8rem;">Adquirir</a>
        `;
        container.appendChild(card);
    });
}

function showFallback() {
    const grids = ['products-grid', 'services-grid'];
    grids.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = `<div class="error">${FALLBACK_MESSAGE}</div>`;
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Simulação para efeito visual instantâneo (remover na produção real com n8n ativo)
    // fetchStoreData(); 
    
    // MOCK DATA PARA DEMONSTRAÇÃO IMEDIATA
    const mockData = {
        products: [
            { title: 'Tábua de Abundância', price: 'R$ 147,00', image: 'https://images.unsplash.com/photo-1515516089376-88db1e26e9c0?auto=format&fit=crop&w=300&q=80' },
            { title: 'Incenso de Lótus Dourado', price: 'R$ 35,00', image: 'https://images.unsplash.com/photo-1602166549270-1375b341f9aa?auto=format&fit=crop&w=300&q=80' }
        ],
        services: [
            { title: 'Consultoria Áurea', price: 'R$ 250,00', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=300&q=80' },
            { title: 'Ilustração Arcana', price: 'R$ 490,00', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80' }
        ]
    };
    
    setTimeout(() => {
        renderGrid('products-grid', mockData.products);
        renderGrid('services-grid', mockData.services);
    }, 1500);
});
