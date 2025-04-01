// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    hamburger.querySelector('i').classList.toggle('fa-bars');
    hamburger.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('show');
        hamburger.querySelector('i').classList.add('fa-bars');
        hamburger.querySelector('i').classList.remove('fa-times');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu after clicking
            navLinks.classList.remove('show');
            hamburger.querySelector('i').classList.add('fa-bars');
            hamburger.querySelector('i').classList.remove('fa-times');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(element);
});

// Form submission handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual API endpoint)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Show success message
            submitButton.textContent = 'Message Sent!';
            submitButton.style.backgroundColor = '#00B894';
            
            // Reset form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        } catch (error) {
            // Show error message
            submitButton.textContent = 'Error Sending';
            submitButton.style.backgroundColor = '#FF6B6B';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.style.backgroundColor = '';
                submitButton.disabled = false;
            }, 3000);
        }
    });
}

// Parallax effect for hero section
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    });
}

// Active section highlighting in navigation
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${sectionId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
});

// HR Terms and Definitions
const hrTerms = [
    { term: "HR Analytics", definition: "The use of data and analytics to make informed decisions about human resources management." },
    { term: "Employee Engagement", definition: "The emotional commitment an employee has to their organization and its goals." },
    { term: "Performance Management", definition: "The process of creating a work environment that enables employees to perform to the best of their abilities." },
    { term: "Talent Management", definition: "The systematic process of identifying, recruiting, developing, and retaining employees." },
    { term: "Succession Planning", definition: "The process of identifying and developing future leaders to fill key positions." },
    { term: "Workforce Planning", definition: "The process of analyzing and forecasting workforce needs to ensure the right people are in the right jobs." },
    { term: "Employee Relations", definition: "The management of relationships between employers and employees." },
    { term: "Compensation & Benefits", definition: "The total rewards package offered to employees in exchange for their work." },
    { term: "Learning & Development", definition: "The process of enhancing employee skills and knowledge through training and education." },
    { term: "HR Compliance", definition: "Ensuring adherence to labor laws and regulations in HR practices." },
    { term: "Recruitment", definition: "The process of finding and attracting qualified candidates for job openings." },
    { term: "Onboarding", definition: "The process of integrating new employees into the organization." },
    { term: "Employee Retention", definition: "Strategies to keep valuable employees in the organization." },
    { term: "HR Strategy", definition: "The long-term plan for managing human resources to achieve organizational goals." },
    { term: "HR Metrics", definition: "Quantifiable measures used to track HR performance and effectiveness." }
];

// Function to create HR terms cards
function createHRTermsCards() {
    const container = document.querySelector('.hr-terms-container');
    if (!container) return;

    hrTerms.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'hr-term-card';
        card.innerHTML = `
            <div class="term-content">
                <h3>${item.term}</h3>
                <div class="definition" style="display: none;">
                    <p>${item.definition}</p>
                </div>
                <button class="show-definition-btn">Show Definition</button>
            </div>
        `;

        // Add click event to the show definition button
        const showBtn = card.querySelector('.show-definition-btn');
        const definition = card.querySelector('.definition');
        
        showBtn.addEventListener('click', function() {
            if (definition.style.display === 'none') {
                definition.style.display = 'block';
                showBtn.textContent = 'Hide Definition';
            } else {
                definition.style.display = 'none';
                showBtn.textContent = 'Show Definition';
            }
        });

        container.appendChild(card);
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    createHRTermsCards();
    // ... rest of your existing initialization code ...
}); 