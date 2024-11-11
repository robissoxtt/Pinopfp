// Seleciona os elementos principais
const generateBtn = document.getElementById('generate-btn');
const defaultBtn = document.getElementById('default-btn');
const downloadBtn = document.getElementById('download-btn');
const avatarDisplay = document.getElementById('avatar-display');
const avatarImage = document.getElementById('avatar-image');
avatarImage.onerror = function() {
    console.error("Erro ao carregar a imagem:", avatarImage.src);
    avatarImage.src = 'images/default/fallback_image.png';
};

// Inicializa as opções de acessórios
const accessories = {
  front: ['front (1).png', 'front (2).png', 'front (3).png'],
  hats: ['hat (1).png', 'hat (2).png', 'hat (3).png', 'hat (4).png', 'hat (5).png', 'hat (6).png', 'hat (7).png','hat (8).png', 'hat (9).png'],
  glasses: ['glasses (1).png', 'glasses (2).png', 'glasses (3).png', 'glasses (4).png', 'glasses (5).png', 'glasses (6).png', 'glasses (7).png', 'glasses (8).png'],
  clothes: ['clothes (1).png', 'clothes (2).png', 'clothes (3).png', 'clothes (4).png', 'clothes (5).png', 'clothes (6).png', 'clothes (7).png', 'clothes (8).png', 'clothes (9).png'],
  mouth: ['mouth (1).png', 'mouth (2).png'],
  cores: ['base (1).png', 'base (2).png', 'base (3).png', 'base (4).png', 'base (5).png', 'base (6).png', 'base (7).png', 'base (8).png'],
  based: ['aesthetic (1).png', 'aesthetic (2).png', 'aesthetic (3).png', 'aesthetic (4).png']
};

// Carrega o avatar e background padrão
function setDefaultAvatar() {
  // Define o avatar padrão e remove todas as camadas de acessórios
  document.getElementById('avatar-image').src = "images/default/default_pino.png";
  document.querySelectorAll('.layer').forEach(layer => layer.remove());
  
  // Adiciona o fundo padrão
  addOrReplaceCategoryImage('background-layer', "images/default/default_background.png", 0);
}

// Carregar o avatar padrão ao iniciar a página
window.onload = setDefaultAvatar;

// Função para adicionar ou substituir uma imagem em uma camada
function addOrReplaceCategoryImage(category, imgSrc, zIndex = 1) {
  let existingImg = document.getElementById(category);
  
  if (!existingImg) {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.id = category;
    img.classList.add('layer');
    img.style.zIndex = zIndex;
    avatarDisplay.appendChild(img);
  } else {
    existingImg.src = imgSrc;
  }
}

// Função para configurar a funcionalidade dos sliders
function setupSlider(slider, options) {
  const prevButton = slider.querySelector('.prev');
  const nextButton = slider.querySelector('.next');
  const optionsContainer = slider.querySelector('.options');
  
  let currentIndex = 0;

  function showOptions() {
    const allOptions = optionsContainer.children;
    for (let i = 0; i < allOptions.length; i++) {
      allOptions[i].style.display = (i >= currentIndex && i < currentIndex + 4) ? 'inline-block' : 'none';
    }
  }

  prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      showOptions();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentIndex < options.length - 4) {
      currentIndex += 1;
      showOptions();
    }
  });

  showOptions(); // Chamada inicial para mostrar as opções
}

// Configura os sliders para cada categoria
document.querySelectorAll('.slider').forEach(slider => {
  const options = slider.querySelector('.options').children;
  setupSlider(slider, options);
});

// Adiciona eventos de clique para cada opção
document.querySelectorAll('.front-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('front-layer', `images/front/${option.getAttribute('data-img')}`, 3);
  });
});

document.querySelectorAll('.hats-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('hat-layer', `images/hats/${option.getAttribute('data-img')}`, 4);
  });
});

document.querySelectorAll('.glasses-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('eye-layer', `images/glasses/${option.getAttribute('data-img')}`, 3);
  });
});

document.querySelectorAll('.clothes-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('clothes-layer', `images/clothes/${option.getAttribute('data-img')}`, 2);
  });
});

document.querySelectorAll('.mouth-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('mouth-layer', `images/mouth/${option.getAttribute('data-img')}`, 6);
  });
});

// Adiciona eventos para as seleções de cores
document.querySelectorAll('.cores-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('cores-layer', `images/cores/${option.getAttribute('data-img')}`, 0);
  });
});

// Adiciona eventos para as seleções estéticas
document.querySelectorAll('.based-option').forEach(option => {
  option.addEventListener('click', () => {
    addOrReplaceCategoryImage('based-layer', `images/based/${option.getAttribute('data-img')}`, 0);
  });
});

// Evento para o botão de ação do randomizador
generateBtn.addEventListener('click', () => {
  const randomFront = accessories.front[Math.floor(Math.random() * accessories.front.length)];
  const randomHat = accessories.hats[Math.floor(Math.random() * accessories.hats.length)];
  const randomGlasses = accessories.glasses[Math.floor(Math.random() * accessories.glasses.length)];
  const randomClothes = accessories.clothes[Math.floor(Math.random() * accessories.clothes.length)];
  const randomMouth = accessories.mouth[Math.floor(Math.random() * accessories.mouth.length)];
  const randomCores = accessories.cores[Math.floor(Math.random() * accessories.cores.length)];
  const randomBased = accessories.based[Math.floor(Math.random() * accessories.based.length)];

  // Aplica as seleções aleatórias
  addOrReplaceCategoryImage('front-layer', `images/front/${randomFront}`, 7);
  addOrReplaceCategoryImage('hat-layer', `images/hats/${randomHat}`, 4);
  addOrReplaceCategoryImage('eye-layer', `images/glasses/${randomGlasses}`, 3);
  addOrReplaceCategoryImage('clothes-layer', `images/clothes/${randomClothes}`, 2);
  addOrReplaceCategoryImage('mouth-layer', `images/mouth/${randomMouth}`, 6);
  addOrReplaceCategoryImage('cores-layer', `images/cores/${randomCores}`, 0);
  addOrReplaceCategoryImage('based-layer', `images/based/${randomBased}`, 0);
});

// Evento para o botão de reset
defaultBtn.addEventListener('click', setDefaultAvatar);

// Função de download
downloadBtn.addEventListener('click', async () => {
    try {
        const canvas = document.createElement('canvas');
        canvas.width = 1000;
        canvas.height = 1000;

        const ctx = canvas.getContext('2d');
        const avatarClone = await html2canvas(avatarDisplay, { useCORS: true });
        ctx.drawImage(avatarClone, 0, 0, canvas.width, canvas.height);

        const imageUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'PinoPFP.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Error capturing and downloading the image:", error);
    }
});
