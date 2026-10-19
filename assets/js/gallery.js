async function fetchGalleryData() {
  try {
    // Apne backend API ka URL yahan dalein
    const response = await fetch('http://localhost:5000/api/gallery');
    const result = await response.json();

    if (result.success) {
      renderGallery(result.data);
    }
  } catch (error) {
    console.error('Error fetching gallery data:', error);
  }
}

function renderGallery(items) {
  const galleryGrid = document.getElementById('galleryGrid');
  galleryGrid.innerHTML = ''; // Pehle ka content clear karein

  items.forEach(item => {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';

    if (item.type === 'image') {
      galleryItem.innerHTML = `<img src="${item.url}" alt="${item.title || 'Gallery Image'}">`;
    } else if (item.type === 'video') {
      galleryItem.innerHTML = `
        <video controls ${item.poster ? `poster="\${item.poster}"` : ''}>
          <source src="${item.url}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      `;
    }

    galleryGrid.appendChild(galleryItem);
  });
}

// Page load hone par function call karein
document.addEventListener('DOMContentLoaded', fetchGalleryData);