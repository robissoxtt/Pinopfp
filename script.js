 // Select main elements
const generateBtn = document.getElementById('generate-btn');
const defaultBtn = document.getElementById('default-btn');
const downloadBtn = document.getElementById('download-btn');
const avatarDisplay = document.getElementById('avatar-display');
const avatarImage = document.getElementById('avatar-image');

// Handle image loading errors
avatarImage.onerror = function () {
    console.error("Error loading image:", avatarImage.src);
    avatarImage.src = 'images/default/fallback_image.png';
};

// Accessories
const accessories = {
  front: ['front (2).png', 'front (4).png', 'front (5).png', 
          'front (6).png', 'front (7).png', 'front (8).png', 
          'front (9).png', 'front (10).png', 'front (11).png', 'front (12).png'],
  
  hats: ['hat (2).png', 'hat (3).png', 'hat (4).png', 'hat (5).png', 
         'hat (6).png', 'hat (7).png', 'hat (8).png', 'hat (9).png',
         'hat (10).png', 'hat (11).png', 'hat (12).png', 'hat (13).png', 
         'hat (14).png', 'hat (15).png', 'hat (16).png', 'hat (17).png', 
         'hat (18).png', 'hat (19).png', 'hat (20).png', 'hat (21).png', 
         'hat (22).png', 'hat (23).png', 'hat (24).png', 'hat (25).png', 
         'hat (26).png', 'hat (27).png', 'hat (28).png', 'hat (29).png', 
         'hat (30).png', 'hat (31).png', 'hat (32).png', 'hat (33).png',
         'hat (34).png', 'hat (35).png', 'hat (36).png', 'hat (37).png', 'hat (38).png'],
  
  glasses: [ 'glasses (2).png', 'glasses (3).png', 'glasses (4).png', 
            'glasses (5).png', 'glasses (6).png', 'glasses (7).png', 'glasses (8).png', 
            'glasses (9).png', 'glasses (10).png', 'glasses (11).png', 'glasses (12).png', 
            'glasses (13).png', 'glasses (14).png', 'glasses (15).png', 'glasses (16).png', 
            'glasses (17).png','glasses (18).png','glasses (19).png'],
  
  clothes: [ 'clothes (2).png', 'clothes (3).png', 'clothes (4).png', 
            'clothes (5).png', 'clothes (6).png', 'clothes (7).png', 'clothes (8).png', 
            'clothes (9).png','clothes (10).png','clothes (11).png','clothes (12).png', 
            'clothes (13).png','clothes (14).png', 'clothes (15).png','clothes (16).png', 
            'clothes (17).png','clothes (18).png','clothes (19).png','clothes (20).png',
            'clothes (21).png','clothes (22).png','clothes (23).png','clothes (24).png',
            'clothes (25).png','clothes (26).png','clothes (27).png','clothes (28).png',
            'clothes (29).png','clothes (30).png','clothes (31).png','clothes (32).png',
            'clothes (33).png','clothes (34).png','clothes (35).png','clothes (36).png',
            'clothes (37).png','clothes (38).png','clothes (39).png'],
  
  mouth: [ 'mouth (2).png', 'mouth (3).png', 'mouth (4).png', 'mouth (5).png', 
          'mouth (6).png', 'mouth (7).png'],
  
  cores: [ 'base (2).png', 'base (3).png', 'base (4).png', 'base (5).png', 
          'base (6).png', 'base (7).png', 'base (8).png', 'base (9).png', 
          'base (10).png', 'base (11).png'],
  
  based: [ 'aesthetic (2).png', 'aesthetic (3).png', 'aesthetic (4).png', 
          'aesthetic (5).png', 'aesthetic (6).png', 'aesthetic (7).png', 'aesthetic (8).png', 
          'aesthetic (9).png', 'aesthetic (10).png', 'aesthetic (11).png', 'aesthetic (12).png', 
          'aesthetic (13).png', 'aesthetic (14).png', 'aesthetic (15).png', 'aesthetic (16).png', 
          'aesthetic (17).png', 'aesthetic (18).png', 'aesthetic (19).png', 'aesthetic (20).png',
         'aesthetic (21).png','aesthetic (22).png','aesthetic (23).png']
};
 
const categoryProbabilities = {
    front: 0.8,        // Always include (100% chance)
    hats: 0.8,       // 70% chance to include
    glasses: 0.8,    // 50% chance to include
    clothes: 0.8,    // 90% chance to include
    mouth: 0.5,      // 80% chance to include
    cores: 0.8,        // Always include (100% chance)
    based: 0.8,         // Always include (100% chance)
};

// Define zIndex for each category
const layerZIndex = {
    background: -3,
    cores: 2,
    based: 1,
    clothes: 5,
    mouth: 7,
    glasses: 3,
    hats: 6,
    front: 8,
};

// Function to set default avatar
function setDefaultAvatar() {
    avatarImage.src = "images/default/default_pino.png";

    // Clear existing layers except background and watermark
    clearLayersExceptBackgroundAndWatermark();

    // Add default layers
    addOrReplaceCategoryImage('background-layer', "images/default/default_background.png", -3);
}

// Ensure watermark exists
function ensureWatermarkLayer() {
    let watermarkLayer = document.getElementById('watermark-layer');
    if (!watermarkLayer) {
        watermarkLayer = document.createElement('img');
        watermarkLayer.src = 'images/default/watermark.png';
        watermarkLayer.id = 'watermark-layer';
        watermarkLayer.classList.add('layer');
        watermarkLayer.style.zIndex = 10;
        watermarkLayer.style.position = 'absolute';
        watermarkLayer.style.width = '100%';
        watermarkLayer.style.height = '100%';
        watermarkLayer.style.top = '0';
        watermarkLayer.style.left = '0';
        avatarDisplay.appendChild(watermarkLayer);
    }
}

// Function to clear layers except background and watermark
function clearLayersExceptBackgroundAndWatermark() {
    document.querySelectorAll('.layer').forEach(layer => {
        if (!layer.id.includes('background') && layer.id !== 'watermark-layer') {
            layer.remove();
        }
    });
}




// Add event listeners for base colors (cores) and aesthetics (based)
document.querySelectorAll('.cores-option').forEach(option => {
    option.addEventListener('click', () => {
        const img = option.getAttribute('data-img');
        if (img) {
            // Clear the aesthetic layer when a base color is selected
            const aestheticLayer = document.getElementById('based-layer');
            if (aestheticLayer) {
                aestheticLayer.remove();
                console.log("Cleared the aesthetic layer (based) due to base color selection.");
            }

            // Add or replace the cores layer
            addOrReplaceCategoryImage('cores-layer', `images/cores/${img}`, layerZIndex.cores);
        }
    });
});

document.querySelectorAll('.based-option').forEach(option => {
    option.addEventListener('click', () => {
        const img = option.getAttribute('data-img');
        if (img) {
            // Clear the base color layer when an aesthetic is selected
            const coresLayer = document.getElementById('cores-layer');
            if (coresLayer) {
                coresLayer.remove();
                console.log("Cleared the base color layer (cores) due to aesthetic selection.");
            }

            // Add or replace the based layer
            addOrReplaceCategoryImage('based-layer', `images/based/${img}`, layerZIndex.based);
        }
    });
});





// Add or replace a category image in a layer
function addOrReplaceCategoryImage(category, imgSrc, defaultZIndex = 1) {
    let existingImg = document.getElementById(category);

    // Use zIndex from configuration or fall back to default
    const zIndex = layerZIndex[category.split('-')[0]] || defaultZIndex;

    if (!existingImg) {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.id = category;
        img.classList.add('layer');
        img.style.zIndex = zIndex;
        avatarDisplay.appendChild(img);
    } else {
        existingImg.src = imgSrc;
        existingImg.style.zIndex = zIndex; // Ensure zIndex is updated
    }
}

// Add click events for options
Object.keys(accessories).forEach(category => {
    const options = document.querySelectorAll(`.${category}-option`);
    options.forEach(option => {
        option.addEventListener('click', () => {
            const img = option.getAttribute('data-img');
            if (img) {
                addOrReplaceCategoryImage(`${category}-layer`, `images/${category}/${img}`);
            }
        });
    });
});


generateBtn.addEventListener('click', () => {
    clearLayersExceptBackgroundAndWatermark();
    ensureWatermarkLayer();

    Object.keys(accessories).forEach(category => {
        const items = accessories[category]; // Obtem os itens da categoria
        const probability = categoryProbabilities[category] || 1; // Padrão 100% de chance

        // Verifica se deve incluir a categoria com base na probabilidade
        if (Math.random() <= probability && items.length > 0) {
            // Escolhe um item aleatório da categoria
            const randomItem = items[Math.floor(Math.random() * items.length)];
            addOrReplaceCategoryImage(`${category}-layer`, `images/${category}/${randomItem}`);
        } else {
            console.log(`Categoria "${category}" não incluída devido à probabilidade.`);
        }
    });
});

// Download the avatar
downloadBtn.addEventListener('click', async () => {
    const clone = avatarDisplay.cloneNode(true);
    clone.style.position = 'absolute';
    clone.style.margin = '0';
    clone.style.borderRadius = '0';
    clone.style.top = '-9999px';
    clone.style.left = '-9999px';
    clone.style.width = '500px';
    clone.style.height = '500px';
    document.body.appendChild(clone);

    try {
        const canvas = await html2canvas(clone, {
            width: 500,
            height: 500,
            scale: 2,
            useCORS: true,
            backgroundColor: null
        });

        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'PINOZATION_COMPLETED.png';
        link.click();
    } catch (error) {
        console.error('Error capturing the image:', error);
    } finally {
        document.body.removeChild(clone);
    }
});

// Ensure defaults on load
window.addEventListener('load', () => {
    setDefaultAvatar();
    ensureWatermarkLayer();
});

// Reset to default on button click
defaultBtn.addEventListener('click', () => {
    setDefaultAvatar();
    ensureWatermarkLayer();
});
