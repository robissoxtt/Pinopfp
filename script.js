// Seleciona os elementos principais
const generateBtn = document.getElementById('generate-btn');
const defaultBtn = document.getElementById('default-btn');
const downloadBtn = document.getElementById('download-btn');
const avatarDisplay = document.getElementById('avatar-display');

// Definição das opções de personalização para cada categoria
const glassesOptions = document.querySelectorAll('.glasses-option');
const hatsOptions = document.querySelectorAll('.hats-option');
const clothesOptions = document.querySelectorAll('.clothes-option');
const backgroundOptions = document.querySelectorAll('.background-option');

// Caminho para o background padrão
const defaultBackgroundSrc = "images/backgrounds/default_background.png";

// Função para definir o avatar padrão
function setDefaultAvatar() {
  document.getElementById('avatar-image').src = "images/default/default_pino.png";
  document.querySelectorAll('.layer').forEach(layer => layer.remove());
  setBackgroundLayer(defaultBackgroundSrc); // Define o background padrão
}

// Carregar o avatar padrão ao iniciar a página
window.onload = setDefaultAvatar;

// Função para atualizar a ordem das camadas
function updateLayerOrder() {
  const background = document.getElementById('background-layer');
  const layers = {
    avatar: document.getElementById('avatar-image'),
    clothes: document.getElementById('clothes'),
    glasses: document.getElementById('glasses'),
    hats: document.getElementById('hats')
  };
  
  if (background) avatarDisplay.prepend(background); // Background fica no início
  Object.values(layers).forEach(layer => layer && avatarDisplay.appendChild(layer));
}

// Função para definir ou remover uma imagem como camada
function toggleCategoryImage(category, imgSrc) {
  let existingImg = document.getElementById(category);
  
  if (existingImg) {
    // Remove o acessório se ele já estiver presente
    existingImg.remove();
  } else {
    // Adiciona o acessório como uma nova camada se ele não estiver presente
    const img = document.createElement('img');
    img.src = imgSrc;
    img.id = category;
    img.classList.add('layer');
    avatarDisplay.appendChild(img);
  }
  updateLayerOrder();
}

// Função para adicionar uma camada sem alternar (usada pelo randomizador)
function addCategoryImage(category, imgSrc) {
  let existingImg = document.getElementById(category);
  
  if (!existingImg) {
    // Adiciona o acessório como uma nova camada se ele não estiver presente
    const img = document.createElement('img');
    img.src = imgSrc;
    img.id = category;
    img.classList.add('layer');
    avatarDisplay.appendChild(img);
  } else {
    existingImg.src = imgSrc; // Atualiza a imagem se já existir
  }
  updateLayerOrder();
}

// Função para definir a camada de fundo
function setBackgroundLayer(bgSrc) {
  addCategoryImage('background-layer', bgSrc);
}

// Adiciona os eventos de clique para cada opção
glassesOptions.forEach(option => option.addEventListener('click', () => {
  toggleCategoryImage('glasses', `images/glasses/${option.getAttribute('data-img')}`);
}));

hatsOptions.forEach(option => option.addEventListener('click', () => {
  toggleCategoryImage('hats', `images/hats/${option.getAttribute('data-img')}`);
}));

clothesOptions.forEach(option => option.addEventListener('click', () => {
  toggleCategoryImage('clothes', `images/clothes/${option.getAttribute('data-img')}`);
}));

backgroundOptions.forEach(option => option.addEventListener('click', () => {
  setBackgroundLayer(`images/backgrounds/${option.getAttribute('data-img')}`);
}));

// Eventos para botões de ação
defaultBtn.addEventListener('click', setDefaultAvatar);

generateBtn.addEventListener('click', () => {
  const randomGlasses = glassesOptions[Math.floor(Math.random() * glassesOptions.length)];
  const randomHats = hatsOptions[Math.floor(Math.random() * hatsOptions.length)];
  const randomClothes = clothesOptions[Math.floor(Math.random() * clothesOptions.length)];
  const randomBackground = backgroundOptions[Math.floor(Math.random() * backgroundOptions.length)];

  addCategoryImage('glasses', `images/glasses/${randomGlasses.getAttribute('data-img')}`);
  addCategoryImage('hats', `images/hats/${randomHats.getAttribute('data-img')}`);
  addCategoryImage('clothes', `images/clothes/${randomClothes.getAttribute('data-img')}`);
  setBackgroundLayer(`images/backgrounds/${randomBackground.getAttribute('data-img')}`);
});

downloadBtn.addEventListener('click', async () => {
  try {
    const canvas = await html2canvas(avatarDisplay, { useCORS: true });
    
    // Convert the canvas to an image URL
    const imageUrl = canvas.toDataURL('image/png');

    // Create the popup container
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100vw';
    popup.style.height = '100vh';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.display = 'flex';
    popup.style.alignItems = 'center';
    popup.style.justifyContent = 'center';
    popup.style.zIndex = '1000';

    // Create a clickable link to allow "press and hold" save options on mobile
    const imageLink = document.createElement('a');
    imageLink.href = imageUrl;
    imageLink.target = '_blank'; // Opens in a new tab if clicked
    imageLink.download = 'avatar.png'; // Allows downloading the image on click

    // Create the image element
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = "Avatar";
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.border = '2px solid #fff';
    img.style.borderRadius = '8px';

    // Append the image to the link, and then the link to the popup
    imageLink.appendChild(img);
    popup.appendChild(imageLink);

    // Create the close button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'Close';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.padding = '10px 20px';
    closeButton.style.backgroundColor = '#f00';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.borderRadius = '5px';
    closeButton.style.cursor = 'pointer';
    closeButton.onclick = () => document.body.removeChild(popup);

    // Add the close button to the popup
    popup.appendChild(closeButton);

    // Add the popup to the document body
    document.body.appendChild(popup);
  } catch (error) {
    console.error("Error capturing and displaying the image:", error);
  }
});
