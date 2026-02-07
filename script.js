// Initialize EmailJS with your public key (replace with your actual key)
(function() {
    emailjs.init("yJvsuj8RTKxx5_iBe");
})();

// Function to hide both responses and clear animations
function hideAllResponses() {
    const response = document.getElementById('response');
    const noResponse = document.getElementById('noResponse');
    response.classList.add('hidden');
    noResponse.classList.add('hidden');
    // Clear hearts container
    document.getElementById('hearts').innerHTML = '';
    // Reset sad Hearts animation
    const sadHearts = document.getElementById('sadHearts');
    sadHearts.style.animation = 'none';
}

// Function to send email notification
function sendEmail(buttonType) {
    const templateParams = {
        button: buttonType, // "Yes" or "No"
        time: new Date().toLocaleString() // Current date/time
    };

    emailjs.send("service_qkidfjl", "template_j3dese9", templateParams)
        .then(function(response) {
            console.log("Email sent successfully!", response.status, response.text);
        }, function(error) {
            console.log("Failed to send email:", error);
        });
}



// Event listener for "Yes" button
document.getElementById('yesBtn').addEventListener('click', function() {
    hideAllResponses(); // Hide everything first
    const response = document.getElementById('response');
    response.classList.remove('hidden'); // Show "Yes" response

 // Send email notification
    sendEmail("Yes");


    // Generate animated hearts
    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 10; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '❤️';
        heart.style.left = Math.random() * 100 + '%'; // Random horizontal position
        heart.style.animationDelay = Math.random() * 2 + 's'; // Stagger animations
        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => heart.remove(), 3000);
    }
});

document.getElementById('noBtn').addEventListener('click', function() {
    const response = document.getElementById('response');
    const noResponse = document.getElementById('noResponse');
    response.classList.add('hidden'); // Hide "Yes" response if shown
    noResponse.classList.remove('hidden'); // Show "No" response

      // Send email notification
    sendEmail("No");


    // Trigger shake animation on the sad heart
    const sadHearts = document.getElementById('sadHearts');
    sadHearts.style.animation = 'none'; // Reset animation
    setTimeout(() => sadHearts.style.animation = 'shake 1s ease-in-out', 10); // Restart animation
});