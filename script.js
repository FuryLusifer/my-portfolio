// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section > h2, .project-card, .skill-item, .about-content, .testimonial-container')
        .forEach(el => observer.observe(el));
};

// Skill bars animation
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, 200);
    });
};

// Testimonials
const testimonials = [
    {
        quote: "An exceptional developer who delivers outstanding results. The attention to detail and commitment to quality is remarkable.",
        author: "Aswin Karki",
        title: "Freelance Full-stack Developer"
    },
    {
        quote: "Working with them was a pleasure. They brought our vision to life with creativity and technical excellence.",
        author: "Aashutosh Dahal",
        title: "CEO, PaperKite Studios"
    },
    {
        quote: "Their expertise in java development helped us create a seamless user experience that our customers love.",
        author: "Sanjay Das",
        title: "Business Owner"
    }
];

let currentTestimonial = 0;
let testimonialInterval;

const setupTestimonials = () => {
    const container = document.querySelector('.testimonial-dots');
    const quote = document.querySelector('.quote');
    const authorName = document.querySelector('.author-name');
    const authorTitle = document.querySelector('.author-title');

    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        container.appendChild(dot);
    });

    // Show first testimonial
    showTestimonial(0);

    // Start automatic rotation
    startTestimonialRotation();
};

const showTestimonial = (index) => {
    const testimonial = testimonials[index];
    const quote = document.querySelector('.quote');
    const authorName = document.querySelector('.author-name');
    const authorTitle = document.querySelector('.author-title');
    const dots = document.querySelectorAll('.dot');

    quote.textContent = testimonial.quote;
    authorName.textContent = testimonial.author;
    authorTitle.textContent = testimonial.title;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });

    currentTestimonial = index;
};

const startTestimonialRotation = () => {
    testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 3000); // Change testimonial every 3 seconds
};

// Smooth scroll
const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
};

// Contact form handling
const setupContactForm = () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        // In a real application, you would send this data to a server
        console.log('Form submitted:', data);
        form.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    observeElements();
    animateSkillBars();
    setupTestimonials();
    setupContactForm();

    const navToggle = document.getElementById('nav-toggle');
    const navList = document.getElementById('nav-list');

    navToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
    });
});
