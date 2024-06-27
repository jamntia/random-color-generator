function generateRandomColor() {
    // Define valid characters for #xxxxxx format:
    const characters = "0123456789ABCDEF"

    // Accounts for CSS notation
    let result = "#"

    for (let i = 0; i < 6; i++) {
        // Find a random number between 0 and 15 (length of characters)
        const randomIndex = Math.floor(Math.random() * 16)

        // Add a random valid character to the result
        result += characters[randomIndex]
    }

    return result;
}

// Function to copy hex code to clipboard
function copyHexCode(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const hexElement = element.querySelector('.color-code');
        const hexCode = hexElement.textContent.trim();

        navigator.clipboard.writeText(hexCode)
            .then(() => {
                showCopiedMessage(hexElement);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    }
}


// Function to display copied message near the hex code
function showCopiedMessage(element) {
    const messageElement = document.createElement('span');
    messageElement.textContent = 'Hex code copied!';
    messageElement.classList.add('copied-message');

    element.appendChild(messageElement);

    // Remove the message after a short delay (e.g., 2 seconds)
    setTimeout(() => {
        messageElement.remove();
    }, 2000);
}

// Function to change background color
function changeBackgroundColor(selector) {
    const element = document.querySelector(selector);
    if (element) {
        // Remove initial border class if it exists
        element.querySelector('.change-btn').classList.remove('initial-border');

        // Generate a new color
        const newColor = generateRandomColor();

        // Update the background color
        element.style.backgroundColor = newColor;

        // Update the hex code text
        const hexElement = element.querySelector('.color-code');
        if (hexElement) {
            hexElement.textContent = newColor;
        }

        // Remove any existing copied message
        const copiedMessage = element.querySelector('.copied-message');
        if (copiedMessage) {
            copiedMessage.remove();
        }
    }
}


// Function to toggle the lock state
function toggleLock(selector) {
    const element = document.querySelector(selector);
    if (element) {
        const changeBtn = element.querySelector('.change-btn');
        const lockBtn = element.querySelector('.lock-btn');

        if (lockBtn.classList.contains('locked')) {
            // Unlock the column
            lockBtn.textContent = '🔓';
            lockBtn.classList.remove('locked');
            changeBtn.disabled = false;
        } else {
            // Lock the column
            lockBtn.textContent = '🔒';
            lockBtn.classList.add('locked');
            changeBtn.disabled = true;
        }
    }
}