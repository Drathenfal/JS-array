// combined code

document.addEventListener('DOMContentLoaded', function () {
    // Function to get a random number between 1 and 1000 (you can adjust this range)
    function getRandomNumber() {
        return Math.floor(Math.random() * 1000) + 1;
    }

    // Function to set a random image source to the img tag
    function displayRandomImage() {
        const imageElement = document.getElementById('image');
        const randomNumber = getRandomNumber();
        imageElement.src = `https://picsum.photos/id/${randomNumber}/200/300`;
    }

    // Call the function to display a random image when the page loads
    displayRandomImage();

    // Add event listener to the New Image button
    const buttonImage = document.querySelector('.button-image');
    buttonImage.addEventListener('click', () => {
        displayRandomImage();
        showClearButton();
    });

    // Add event listener to the Link To Email button
    const emailForm = document.getElementById('emailForm');
    const emailEntry = document.querySelector('.email-entry');
    const errorDisplay = document.querySelector('.error');
    const emailLinkedImage = document.querySelector('.email-linked-image');
    const emailImages = [];

    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailValue = emailEntry.value.trim();

        if (emailValue === '') {
            errorDisplay.innerText = 'Email is required';
        } else if (!isValidEmail(emailValue)) {
            errorDisplay.innerText = 'Provide a valid email address';
        } else {
            errorDisplay.innerText = '';
            // Add the current image source to the array
            const imageElement = document.getElementById('image');
            const imageSrc = imageElement.src;
            emailImages.push(imageSrc);

            // Create image tags for each image in the array
            let imagesHTML = '';
            for (const image of emailImages) {
                imagesHTML += `<img src="${image}" alt="Linked Image" style="max-width:100%;" /><br>`;
            }

            emailLinkedImage.innerHTML = imagesHTML;
            showClearButton();
        }
    });

    // Function to validate the email format
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Show the Clear Images button
    function showClearButton() {
        const clearImagesButton = document.querySelector('.clear-image-button');
        clearImagesButton.style.display = 'block';
    }

    // Add event listener to the Clear Images button
    const clearImagesButton = document.querySelector('.clear-image-button');
    clearImagesButton.addEventListener('click', () => {
        emailImages.length = 0; // Clear the array of saved images
        emailLinkedImage.innerHTML = ''; // Clear the displayed images
        clearImagesButton.style.display = 'none'; // Hide the Clear Images button
    });
});