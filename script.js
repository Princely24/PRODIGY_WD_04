  // Form Validation
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const errorMessage = document.getElementById('form-error');

    if (name === '' || email === '' || message === '') {
        errorMessage.textContent = 'Please fill in all fields.';
        event.preventDefault();
    } else if (!validateEmail(email)) {
        errorMessage.textContent = 'Please enter a valid email address.';
        event.preventDefault();
    } else {
        errorMessage.textContent = '';
    }
});

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dynamic Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');

        projectCards.forEach(card => {
            if (category === 'all' || card.getAttribute('data-category') === category) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Function to filter projects
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    projects.forEach(project => {
        
        if (category === 'all' || project.classList.contains(category)) {
            project.style.display = 'block'; 
        } else {
            project.style.display = 'none'; 
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    const skillLevels = document.querySelectorAll('.skill-level');
    skillLevels.forEach((skill, index) => {
        const level = skill.dataset.level; 
        skill.style.width = 0; 
        skill.style.animation = `slideIn${index} 1s forwards`; 

        // Create unique keyframes for each skill bar
        const keyframes = `
            @keyframes slideIn${index} {
                from { width: 0; }
                to { width: ${level}; }
            }
        `;
        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerHTML = keyframes;
        document.head.appendChild(styleSheet);
    });

    // Function to check if skills section is in view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add event listener to check for scroll
    window.addEventListener('scroll', () => {
        const skillsSection = document.getElementById('skills');
        if (isInViewport(skillsSection)) {
            skillLevels.forEach(skill => {
                skill.style.width = skill.dataset.level; 
            });
            window.removeEventListener('scroll', arguments.callee); // Remove event listener after animation
        }
    });
});
