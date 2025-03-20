// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or prefer-color-scheme
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    body.classList.add('dark-theme');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const theme = body.classList.contains('dark-theme') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = 'var(--shadow)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Form submission with EmailJS
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Add EmailJS script to your HTML (add this in your HTML head):
    // 
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Initialize EmailJS with your user ID (sign up at emailjs.com)
        emailjs.init("11fOeG4fQg7YiH_y2"); // Replace with your actual EmailJS user ID
        
        // Prepare template parameters
        const templateParams = {
            name: name,
            email: email,
            message: message
        };
        
        // Send email using EmailJS
        emailjs.send('service_zugubfm', 'template_g54vd2n', templateParams)
            .then(function(response) {
                console.log('Email sent:', response);
                
                // Reset form and button
                contactForm.reset();
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
            }, function(error) {
                console.error('Email error:', error);
                
                // Reset button
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
                
                // Show error message
                alert('Sorry, there was an error sending your message. Please try again later.');
            });
    });
}

