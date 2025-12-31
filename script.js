// Set the launch date (30 days from now as default)
const launchDate = new Date();
launchDate.setDate(launchDate.getDate() + 30);

// Update countdown every second
function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate.getTime() - now;

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Update DOM elements
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

    // If countdown is finished
    if (distance < 0) {
        clearInterval(countdownInterval);
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
    }
}

// Start countdown
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Handle form submission with Web3Forms
const notifyForm = document.getElementById('notifyForm');
const WEB3FORMS_ACCESS_KEY = 'bbc58898-52f9-4dd9-9a26-4e36c1ee66f1';

notifyForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const emailInput = this.querySelector('input[type="email"]');
    const submitButton = this.querySelector('button[type="submit"]');
    const email = emailInput.value;

    // Disable form during submission
    emailInput.disabled = true;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    try {
        // Prepare form data for Web3Forms
        const formData = new FormData();
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);
        formData.append('email', email);
        formData.append('subject', 'New Coming Soon Page Signup - Fresh Start Multiservices');
        formData.append('from_name', 'Fresh Start Coming Soon Page');

        // Submit to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            // Show success message
            showMessage('success', 'Success!', "We'll notify you when we launch.");
            // Reset form
            emailInput.value = '';
        } else {
            // Show error message
            showMessage('error', 'Oops!', 'Something went wrong. Please try again.');
        }
    } catch (error) {
        // Show error message
        showMessage('error', 'Oops!', 'Something went wrong. Please try again.');
        console.error('Form submission error:', error);
    } finally {
        // Re-enable form
        emailInput.disabled = false;
        submitButton.disabled = false;
        submitButton.innerHTML = 'Notify Me <span class="arrow">→</span>';
    }
});

// Function to show success/error messages
function showMessage(type, title, message) {
    const messageDiv = document.createElement('div');
    const icon = type === 'success' ? '✓' : '⚠';
    const titleColor = type === 'success' ? 'var(--primary-green)' : '#ff4444';

    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--dark-bg);
        color: var(--text-light);
        padding: 2rem 3rem;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        text-align: center;
        animation: fadeInUp 0.5s ease-out;
    `;

    messageDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
        <h3 style="font-size: 1.5rem; margin-bottom: 0.5rem; color: ${titleColor};">${title}</h3>
        <p style="color: var(--text-gray);">${message}</p>
    `;

    document.body.appendChild(messageDiv);

    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 3000);
}

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
    }
`;
document.head.appendChild(style);

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add parallax effect to decorative circles
window.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});
