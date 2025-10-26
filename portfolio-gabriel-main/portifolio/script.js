document.addEventListener("DOMContentLoaded", function () {

    // --- 1. Navbar Scroll Effect ---
    const mainNavbar = document.getElementById('mainNavbar');
    const scrollThreshold = 50; // Pixels to scroll before changing navbar

    function updateNavbar() {
        if (window.scrollY > scrollThreshold) {
            // Scrolled down
            mainNavbar.classList.add('navbar-scrolled');
            // Swap light/dark classes for text color
            mainNavbar.classList.remove('navbar-light');
            mainNavbar.classList.add('navbar-dark');
        } else {
            // At the top
            mainNavbar.classList.remove('navbar-scrolled');
            // Swap back
            mainNavbar.classList.remove('navbar-dark');
            mainNavbar.classList.add('navbar-light');
        }
    }

    // Run on page load
    updateNavbar();
    // Run on scroll
    document.addEventListener('scroll', updateNavbar);


    // --- 2. Scroll-Reveal Animations ---
    const targets = document.querySelectorAll('.scroll-fade-in');

    const options = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible to trigger
    };

    const callback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the "is-visible" class to trigger the CSS transition
                entry.target.classList.add('is-visible');
                // Stop observing this target so the animation doesn't re-run
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(callback, options);

    // Observe each target
    targets.forEach(target => {
        observer.observe(target);
    });


    // --- 3. Modern Contact Form Handler ---
    const contactForm = document.getElementById('contactForm');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formMessage = document.getElementById('form-message');

    contactForm.addEventListener('submit', async function (event) {
        // Prevent the default browser submission
        event.preventDefault();

        // Get original button text and disable it
        const originalButtonText = submitButton.innerHTML;
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Enviando...
        `;

        // Clear previous messages
        formMessage.innerHTML = '';
        formMessage.className = 'mt-3';

        // Simulate a network request (e.g., sending to an API)
        // Replace this with your actual form submission logic (e.g., fetch)
        try {
            // Simulate a 1.5 second delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // --- SIMULATED SUCCESS ---
            // Show success message
            formMessage.innerHTML = 'Obrigado pelo seu contato! Mensagem enviada com sucesso.';
            formMessage.classList.add('alert', 'alert-success');
            // Reset the form fields
            contactForm.reset();
            // --- END SIMULATED SUCCESS ---

            /* // --- SIMULATED ERROR (uncomment to test) ---
            throw new Error('Failed to send message.');
            // --- END SIMULATED ERROR ---
            */

        } catch (error) {
            // --- ERROR HANDLING ---
            // Show error message
            formMessage.innerHTML = 'Houve um erro ao enviar a mensagem. Tente novamente mais tarde.';
            formMessage.classList.add('alert', 'alert-danger');

        } finally {
            // --- ALWAYS RUNS ---
            // Re-enable the button and restore its text
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });

});