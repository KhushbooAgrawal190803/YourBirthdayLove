// PHOTO SETUP HELPER
// This file will help you quickly set up your photos

// STEP 1: Place your 8 photos in the same folder as index.html
// STEP 2: List their exact filenames here (including extension like .jpg or .png)

const photoFilenames = [
    'photo1.jpg',  // Replace with your actual filename
    'photo2.jpg',  // Replace with your actual filename
    'photo3.jpg',  // Replace with your actual filename
    'photo4.jpg',  // Replace with your actual filename
    'photo5.jpg',  // Replace with your actual filename
    'photo6.jpg',  // Replace with your actual filename
    'photo7.jpg',  // Replace with your actual filename
    'photo8.jpg',  // Replace with your actual filename
];

// Optional: Add captions for each photo
const captions = [
    'Our beautiful moments ❤️',
    'Adventures together 🌍',
    'Making memories 📸',
    'Laughter and joy 😊',
    'Forever and always 💕',
    'You and me 🥰',
    'Best moments 🌟',
    'Love you 💖'
];

// STEP 3: Copy the code below into script.js at line 165 (replacing the commented example)

console.log('Copy this into script.js:');
console.log('addPhotosToGallery([');
photoFilenames.forEach((filename, index) => {
    console.log(`    { src: '${filename}', caption: '${captions[index]}' },`);
});
console.log(']);');

