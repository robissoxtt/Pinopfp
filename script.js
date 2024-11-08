// Select main elements
const generateBtn = document.getElementById('generate-btn');
const defaultBtn = document.getElementById('default-btn');
const downloadBtn = document.getElementById('download-btn');
const avatarDisplay = document.getElementById('avatar-display');
const avatarImage = document.getElementById('avatar-image');
avatarImage.onerror = function() {
    console.error("Erro ao carregar a imagem:", avatarImage.src); // Exibe o caminho da imagem com erro
    avatarImage.src = 'images/default/fallback_image.png'; // Substitui por uma imagem alternativa
};

// Initialize accessory options
const accessories = {
  front: ['front (1).png', 'front (2).png', 'front (3).png'],
  hats: ['hat (1).png', 'hat (2).png', 'hat (3).png', 'hat (4).png', 'hat (5).png', 'hat (6).png', 'hat (7).png'],
  glasses: ['glasses (1).png', 'glasses (2).png', 'glasses (3).png', 'glasses (4).png', 'glasses (5).png', 'glasses (6).png', 'glasses (7).png'],
  clothes: ['clothes (1).png', 'clothes (2).png', 'clothes (3).png', 'clothes (4).png', 'clothes (5).png', 'clothes (6).png', 'clothes (7).png', 'clothes (8).png', 'clothes (9).png'],
  mouth: ['mouth (1).png', 'mouth (2).png',],
  cores: ['base (1).png', 'base (2).png', 'base (3).png', 'base (4).png', 'base (5).png', 'base (6).png', 'base (7).png', 'base (8).png',],
  based: ['aesthetic (1).png', 'aesthetic (2).png', 'aesthetic (3).png', 'aesthetic (4).png', 'aesthetic (5).png', 'aesthetic (6).png']
};

// Function to load the default avatar and background
function setDefaultAvatar() {
  document.getElementById('avatar-image').src = "images/default/default_pino.png";
  document.querySelectorAll('.layer').forEach(layer => layer.remove());
  toggleCategoryImage('background-layer', "images/default/default_background.png", 0); // Set default background
}

// Load the default avatar on page load
window.onload = setDefaultAvatar;

// Function to toggle a category image
function toggleCategoryImage(category, imgSrc, zIndex = 1) {
  let existingImg = document.getElementById(category);
  
  if (existingImg) {
    existingImg.remove(); // Remove the accessory if it is already present
  } else {
    const img = document.createElement('img');
    img.src = imgSrc;
    img.id = category;
    img.classList.add('layer');
    img.style.zIndex = zIndex; // Set the zIndex
    avatarDisplay.appendChild(img); // Add the accessory as a new layer
  }
}

// Function to set up slider functionality
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

  showOptions(); // Initial call to show options
}

// Set up sliders for each category
document.querySelectorAll('.slider').forEach(slider => {
  const options = slider.querySelector('.options').children;
  setupSlider(slider, options);
});

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
    toggleCategoryImage('eye-layer', `images/glasses/${option.getAttribute('data-img')}`, 3);
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
    toggleCategoryImage('cores-layer', `images/cores/${option.getAttribute('data-img')}`, 0);
  });
});

// Add event listeners for based selections
document.querySelectorAll('.based-option').forEach(option => {
  option.addEventListener('click', () => {
    toggleCategoryImage('based-layer', `images/based/${option.getAttribute('data-img')}`, 0);
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
  toggleCategoryImage('eye-layer', `images/glasses/${randomGlasses}`, 3);
  toggleCategoryImage('clothes-layer', `images/clothes/${randomClothes}`, 2);
  toggleCategoryImage('mouth-layer', `images/mouth/${randomMouth}`, 6);
  
  // Set random cores and based together
  toggleCategoryImage('cores-layer', `images/cores/${randomCores}`, 0);
  toggleCategoryImage('based-layer', `images/based/${randomBased}`, 0);
});

// Download functionality
downloadBtn.addEventListener('click', async () => {
    try {
        // Create a canvas with the desired resolution
        const canvas = document.createElement('canvas');
        canvas.width = 1000; // Set the desired width
        canvas.height = 1000; // Set the desired height

        const ctx = canvas.getContext('2d');

        // Draw the avatar display onto the canvas
        const avatarClone = await html2canvas(avatarDisplay, { useCORS: true });
        ctx.drawImage(avatarClone, 0, 0, canvas.width, canvas.height);

        // Create the downloadable image URL
        const imageUrl = canvas.toDataURL('image/png');

        // Create a link element
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'PinoPFP.png'; // Name of the downloaded file
        document.body.appendChild(link); // Append to body to make it work in Firefox
        link.click(); // Trigger the download
        document.body.removeChild(link); // Remove the link from the document
    } catch (error) {
        console.error("Error capturing and downloading the image:", error);
    }
});
