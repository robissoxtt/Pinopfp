
// Select main elements
const generateBtn = document.getElementById('generate-btn');
const defaultBtn = document.getElementById('default-btn');
const downloadBtn = document.getElementById('download-btn');
const avatarDisplay = document.getElementById('avatar-display');

// Initialize accessory options
const accessories = {
  front: ['front (1).png', 'front (2).png', 'front (3).png'],
  hats: ['hat (1).png', 'hat (2).png', 'hat (3).png', 'hat (4).png', 'hat (5).png', 'hat (6).png', 'hat (7).png'],
  glasses: ['glasses (1).png', 'glasses (2).png', 'glasses (3).png', 'glasses (4).png', 'glasses (5).png', 'glasses (6).png', 'glasses (7).png'],
  clothes: ['clothes (1).png', 'clothes (2).png', 'clothes (3).png', 'clothes (4).png', 'clothes (5).png', 'clothes (6).png', 'clothes (7).png', 'clothes (8).png', 'clothes (9).png'],
  mouth: ['mouth (1).png', 'mouth (2).png', 'mouth (3).png'],
  cores: ['base (1).png', 'base (2).png', 'base (3).png', 'base (4).png', 'base (5).png', 'base (6).png', 'base (7).png', 'base (8).png', 'base (9).png', 'base (10).png'],
  based: ['aesthetic (1).png', 'aesthetic (2).png', 'aesthetic (3).png', 'aesthetic (4).png', 'aesthetic (5).png', 'aesthetic (6).png']
};

// Function to load the default avatar
function setDefaultAvatar() {
  document.getElementById('avatar-image').src = "images/default/default_pino.png";
  document.querySelectorAll('.layer').forEach(layer => layer.remove());
}

// Load the default avatar on page load
window.onload = setDefaultAvatar;

// Function to toggle a category image
function toggleCategoryImage(category, imgSrc, zIndex = 1) {
  let existingImg = document.getElementById(category);
  
  if (existingImg) {
    existingImg.remove();
  }
  
  const img = document.createElement('img');
  img.src = imgSrc;
  img.id = category;
  img.classList.add('layer');
  img.style.zIndex = zIndex; // Set the zIndex
  avatarDisplay.appendChild(img);
}

// Add event listeners for each option
document.querySelectorAll('.front-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('front-layer', `images/front/${option.getAttribute('data-img')}`, 3);
  });
});

document.querySelectorAll('.hats-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('hat-layer', `images/hats/${option.getAttribute('data-img')}`, 4);
  });
});

document.querySelectorAll('.glasses-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('eye-layer', `images/glasses/${option.getAttribute('data-img')}`, 5);
  });
});

document.querySelectorAll('.clothes-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('clothes-layer', `images/clothes/${option.getAttribute('data-img')}`, 2);
  });
});

document.querySelectorAll('.mouth-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('mouth-layer', `images/mouth/${option.getAttribute('data-img')}`, 6);
  });
});

// Add event listeners for cores selections
document.querySelectorAll('.cores-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('cores-layer', `images/cores/${option.getAttribute('data-img')}`, 0); // Set zIndex to 0
  });
});

// Add event listeners for based selections
document.querySelectorAll('.based-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('based-layer', `images/based/${option.getAttribute('data-img')}`, 0); // Set zIndex to 0
  });
});

// Action button events
defaultBtn.addEventListener('click', setDefaultAvatar);

generateBtn.addEventListener('click', () => {
  const randomFront = accessories.front[Math.floor(Math.random() * accessories.front.length)];
  const randomHat = accessories.hats[Math.floor(Math.random() * accessories.hats.length)];
  const randomGlasses = accessories.glasses[Math.floor(Math.random() * accessories.glasses.length)];
  const randomClothes = accessories.clothes[Math.floor(Math.random() * accessories.clothes.length)];
  const randomMouth = accessories.mouth[Math.floor(Math.random() * accessories.mouth.length)];
  const randomCores = accessories.cores[Math.floor(Math.random() * accessories.cores.length)];
  const randomBased = accessories.based[Math.floor(Math.random() * accessories.based.length)];

  // Apply random selections
  toggleCategoryImage('front-layer', `images/front/${randomFront}`, 3);
  toggleCategoryImage('hat-layer', `images/hats/${randomHat}`, 4);
  toggleCategoryImage('eye-layer', `images/glasses/${randomGlasses}`, 5);
  toggleCategoryImage('clothes-layer', `images/clothes/${randomClothes}`, 2);
  toggleCategoryImage('mouth-layer', `images/mouth/${randomMouth}`, 6);
  
  // Set random cores and based together with zIndex 0 to keep them behind
  toggleCategoryImage('cores-layer', `images/cores/${randomCores}`, 0);
  toggleCategoryImage('based-layer', `images/based/${randomBased}`, 0);
});
// Função para baixar o avatar
document.getElementById('download-btn').addEventListener('click', () => {
    const avatarDisplay = document.getElementById('avatar-image'); // Pega a imagem do avatar atual
    const link = document.createElement('a'); // Cria um link de download
    link.href = avatarImage.src; // Define o link para a imagem do avatar
    link.download = 'avatar.png'; // Nome do arquivo para o download
    document.body.appendChild(link); // Adiciona o link ao corpo
    link.click(); // Aciona o clique no link para iniciar o download
    document.body.removeChild(link); // Remove o link após o download
}); 
