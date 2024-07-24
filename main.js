// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  // Adding the .hidden class to the error modal 
  const errorModal = document.getElementById('modal');
  if (errorModal) {
    errorModal.classList.add('hidden');
  }

  // click event listeners to all like glyphs
  const likeGlyphs = document.querySelectorAll('.like-glyph');
  likeGlyphs.forEach(glyph => {
    glyph.addEventListener('click', likeCallback);
  });
});

function likeCallback(event) {
  event.preventDefault(); // Prevent any default behavior
  const heart = event.target;

  mimicServerCall()
    .then(() => {
      // On success
      if (heart.textContent === EMPTY_HEART) {
        heart.textContent = FULL_HEART;
        heart.classList.add('activated-heart');
      } else {
        heart.textContent = EMPTY_HEART;
        heart.classList.remove('activated-heart');
      }
    })
    .catch((error) => {
      // On failure
      const errorModal = document.getElementById('modal');
      const errorMessage = document.getElementById('modal-message');

      if (errorModal) {
        errorModal.classList.remove('hidden');
        if (errorMessage) {
          errorMessage.textContent = error;
        }

        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      }
    });
}




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
