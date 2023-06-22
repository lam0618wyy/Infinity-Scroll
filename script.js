const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let  ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'W7e20_AJogA8tWSR9WjT8CwS-dozzyIzLCZrZ_guK9I';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
  console.log('image loaded');
  imageLoaded++;
  console.log(imageLoaded);
  if (imageLoaded === totalImages){
    ready = true;
    loader.hidden = true;
    console.log('ready =', ready);
  }
}

// Helper Function to Set Attribustes on DOM Elements
function setAttribute(element, attribustes) {
  for (const key in attribustes) {
    element.setAttribute(key, attribustes[key]);
  }
}

// Create Elements For links & Photos, Add to DOM
function displayPhotos() {
  imageLoaded = 0;
  totalImages = photosArray.length;
  console.log('total image', totalImages);
  // Run function for each object in photoArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');
    setAttribute(item, { 
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);
    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos () {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error){
        // Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', ()=>{
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight  - 1000 && ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();