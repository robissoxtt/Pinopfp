// Função para randomizar acessórios e aplicar ao avatar
window.onload = () => {
    randomizeAvatar();
}

// Função para randomizar o avatar
function randomizeAvatar() {
    const categories = ["front", "hats", "glasses", "clothes", "mouths", "cores", "based"];
    categories.forEach(category => {
        const items = document.querySelectorAll(`[data-category="${category}"]`);
        if (items.length > 0) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            setAvatarLayer(category, randomItem.getAttribute('data-image'));
        }
    });
}

// Função para resetar o avatar para o padrão
function resetAvatar() {
    document.getElementById('avatar-image').src = 'images/default/default_pino.png';
    clearLayers();
}

// Função para baixar o avatar
function downloadAvatar() {
    const link = document.createElement('a');
    link.href = document.getElementById('avatar-image').src;
    link.download = 'avatar.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Função para definir um acessório no avatar
function setAvatarLayer(category, image) {
    const existingLayer = document.querySelector(`.layer[data-category="${category}"]`);
    if (existingLayer) {
        existingLayer.remove();
    }

    const layer = document.createElement('img');
    layer.src = `images/${category}/${image}`;
    layer.classList.add('layer');
    layer.setAttribute('data-category', category);
    document.getElementById('avatar-display').appendChild(layer);
}

// Função para limpar as camadas do avatar
function clearLayers() {
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => layer.remove());
}