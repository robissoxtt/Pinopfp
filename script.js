// Função para randomizar acessórios
document.getElementById('generate-btn').addEventListener('click', () => {
    const categories = ["front", "hats", "glasses", "clothes", "mouths", "cores", "based"];
    categories.forEach(category => {
        const items = document.querySelectorAll(`[data-category="${category}"]`);
        if (items.length > 0) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            setAvatarLayer(category, randomItem.getAttribute('data-image'));
        }
    });
});

// Função para resetar o avatar para o padrão
document.getElementById('default-btn').addEventListener('click', () => {
    document.getElementById('avatar-image').src = 'images/default/default_pino.png';
    clearLayers(); // Função auxiliar para remover os acessórios selecionados
});

// Função para baixar o avatar
document.getElementById('download-btn').addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = document.getElementById('avatar-image').src;
    link.download = 'avatar.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Função para definir um acessório no avatar
function setAvatarLayer(category, image) {
    // Verifica se a camada já existe, e remove para evitar duplicados
    const existingLayer = document.querySelector(`.layer[data-category="${category}"]`);
    if (existingLayer) {
        existingLayer.remove();
    }

    // Cria uma nova camada com a imagem do acessório
    const layer = document.createElement('img');
    layer.src = `images/${category}/${image}`;
    layer.classList.add('layer');
    layer.setAttribute('data-category', category);
    document.getElementById('avatar-display').appendChild(layer);
}

// Função auxiliar para limpar as camadas do avatar
function clearLayers() {
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => layer.remove());
}

// Evento para aplicar o acessório clicado no avatar
document.querySelectorAll('.accessory-button').forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        const image = button.getAttribute('data-image');
        setAvatarLayer(category, image);
    });
});