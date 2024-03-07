// Dummy data representing images, their topics, and artists
const imageData = [
    { src: "../assets/img/Consept_Art/Tessy/Athenian_Bust_Man.jpg", topic: "Characters", artist: "Tessy" },
    { src: "../assets/img/Consept_Art/Tessy/Athena's_Owl.jpeg", topic: "Creatures", artist: "Tessy" },
    { src: "../assets/img/Consept_Art/Tessy/Walk_Way.jpg", topic: "Environments", artist: "Tessy" },
    { src: "../assets/img/Consept_Art/Tessy/Temple_Trims.jpeg", topic: "Environments", artist: "Tessy" },
  ];
  
  
  function toggleSidebar(initial = false) {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    const mainContent = document.getElementById('main-content');
  
    if (initial) {
      sidebar.style.width = '0';
      toggleBtn.style.left = '0';
      mainContent.style.marginLeft = '0';
    } else {
      if (sidebar.style.width === '250px' || sidebar.style.width === '') {
        sidebar.style.width = '0';
        toggleBtn.style.left = '0';
        mainContent.style.marginLeft = '0';
      } else {
        sidebar.style.width = '250px';
        toggleBtn.style.left = '250px';
        mainContent.style.marginLeft = '250px';
      }
    }
  }
  
  // Initialize sidebar to be closed
  document.addEventListener('DOMContentLoaded', () => {
    toggleSidebar(true);
    filterGallery('no');
  });
  
  
  
  function filterGallery(filter) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = ''; // Clear the gallery
  
    if (filter === 'no') {
      console.log('Displaying all images without sorting');
      displayImagesInGrid(imageData, gallery);
    } else {
      console.log(`Filtering by ${filter}`);
      const groupedImages = groupImagesBy(imageData, filter);
      console.log('Grouped images:', groupedImages);
      for (const key in groupedImages) {
        console.log(`Displaying images for ${key}`);
        const folderDiv = document.createElement('div');
        folderDiv.innerHTML = `<h3>${key}</h3>`;
        displayImagesInGrid(groupedImages[key], folderDiv);
        gallery.appendChild(folderDiv);
      }
    }
  }
  function groupImagesBy(images, property) {
    return images.reduce((acc, image) => {
      const key = image[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(image);
      return acc;
    }, {});
  }  
  
  function displayImagesInGrid(images, parentElement) {
    let rowDiv = document.createElement('div');
    rowDiv.classList.add('row');
    images.forEach((image, index) => {
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('image-container');
  
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = "Gallery Image";
      imgElement.onclick = () => enlargeImage(imgElement); // Add onclick event
      imgWrapper.appendChild(imgElement);
  
      const artistLabel = document.createElement('div');
      artistLabel.classList.add('artist-label');
      artistLabel.textContent = image.artist;
      imgWrapper.appendChild(artistLabel);
  
      rowDiv.appendChild(imgWrapper);
      if ((index + 1) % 4 === 0) { // Adjust for four images per row
        parentElement.appendChild(rowDiv);
        rowDiv = document.createElement('div');
        rowDiv.classList.add('row');
      }
    });
    if (rowDiv.hasChildNodes()) {
      parentElement.appendChild(rowDiv);
    }
  }
  
  function enlargeImage(imgElement) {
    // Create an overlay div if it doesn't exist
    let overlay = document.getElementById('image-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'image-overlay';
      overlay.onclick = () => overlay.style.display = 'none'; // Hide on click
      document.body.appendChild(overlay);
    }
  
    // Set the overlay content to the clicked image
    overlay.innerHTML = '';
    const clone = imgElement.cloneNode();
    clone.classList.add('enlarged-image');
    overlay.appendChild(clone);
  
    // Show the overlay
    overlay.style.display = 'flex';
  }
  
  
  // Initialize gallery with no filter
  document.addEventListener('DOMContentLoaded', () => {
    filterGallery('no');
  });
  