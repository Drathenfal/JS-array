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
    const linkedEmailContainers = document.getElementById('linkedEmailContainers');
    const emailImages = {};

    emailForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailValue = emailEntry.value.trim();

        if (emailValue === '') {
            errorDisplay.innerText = 'Email is required';
        } else if (!isValidEmail(emailValue)) {
            errorDisplay.innerText = 'Provide a valid email address';
        } else {
            errorDisplay.innerText = '';

            // Add the current image source to the array for the email
            const imageElement = document.getElementById('image');
            const imageSrc = imageElement.src;

            if (!emailImages[emailValue]) {
                emailImages[emailValue] = [];
            }

            if (!emailImages[emailValue].includes(imageSrc)) {
                emailImages[emailValue].push(imageSrc);

                // Create heading and linked email name
                let emailContainer = linkedEmailContainers.querySelector(`[data-email="${emailValue}"]`);

                if (!emailContainer) {
                    emailContainer = document.createElement('div');
                    emailContainer.classList.add('linked-email-container');
                    emailContainer.setAttribute('data-email', emailValue);

                    // Create heading and linked email name
                    emailContainer.innerHTML = `
                        <div class="linked-email-name">${emailValue}</div>
                        <div class="email-linked-image"></div>
                        <button class="button clear-image-button">Clear Images</button>
                    `;

                    // Append the email container to the main container
                    linkedEmailContainers.appendChild(emailContainer);
                }

                // Create container for linked email's images
                const imagesContainer = emailContainer.querySelector('.email-linked-image');

                // Create image tag for the linked image
                const imageTag = document.createElement('img');
                imageTag.src = imageSrc;
                imageTag.alt = 'Linked Image';
                imageTag.classList.add('image-container');

                // Append image tag to the images container
                imagesContainer.appendChild(imageTag);

                showClearButton();
            } else {
                errorDisplay.innerText = 'This image is already assigned to the email.';
            }
        }
    });

    // Function to validate the email format
    function isValidEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Show the Clear Images button
    function showClearButton() {
        const clearImagesButton = document.querySelectorAll('.clear-image-button');
        clearImagesButton.forEach(button => {
            button.style.display = 'block';
        });
    }

    // Add event listener to the Clear Images buttons
    linkedEmailContainers.addEventListener('click', (e) => {
        if (e.target.classList.contains('clear-image-button')) {
            const emailContainer = e.target.closest('.linked-email-container');
            if (emailContainer) {
                const imagesContainer = emailContainer.querySelector('.email-linked-image');
                imagesContainer.innerHTML = ''; // Clear the displayed images
                showClearButton();
            }
        }
    });
});
