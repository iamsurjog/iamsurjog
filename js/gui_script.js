// =============== CUSTOM CURSOR ===============
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .social-icon, .project-item, .filter-btn, .category');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
        cursorFollower.classList.add('active');
    });
    
    link.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
        cursorFollower.classList.remove('active');
    });
});

// For mobile devices, hide custom cursor
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

if (isMobile()) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}

// =============== NAVBAR ===============
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksLi = document.querySelectorAll('.nav-links li');
const header = document.querySelector('header');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on links
navLinksLi.forEach(li => {
    li.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active link on scroll
const sections = document.querySelectorAll('section');
const navLinks2 = document.querySelectorAll('.nav-links ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============== STATS COUNTER ===============
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function startCounter() {
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        let count = 0;
        const updateCount = () => {
            const increment = target / 50;
            if (count < target) {
                count += increment;
                stat.textContent = Math.ceil(count);
                setTimeout(updateCount, 40);
            } else {
                stat.textContent = target;
            }
        };
        updateCount();
    });
}

// Start counter on scroll
const aboutStats = document.querySelector('.about-stats');
window.addEventListener('scroll', () => {
    if (aboutStats.getBoundingClientRect().top < window.innerHeight * 0.75 && !hasAnimated) {
        hasAnimated = true;
        startCounter();
    }
});

// =============== SKILLS PROGRESS ===============
const skillsSection = document.querySelector('.skills-section');
const progressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

window.addEventListener('scroll', () => {
    if (skillsSection.getBoundingClientRect().top < window.innerHeight * 0.75 && !skillsAnimated) {
        skillsAnimated = true;
        progressBars.forEach(progress => {
            const value = progress.getAttribute('data-progress');
            progress.style.width = `${value}%`;
        });
    }
});

// =============== SKILLS TABS ===============
const categories = document.querySelectorAll('.category');
const skillsLists = document.querySelectorAll('.skills-list');

categories.forEach(category => {
    category.addEventListener('click', () => {
        // Remove active class from all categories
        categories.forEach(cat => cat.classList.remove('active'));
        
        // Add active class to clicked category
        category.classList.add('active');
        
        // Hide all skills lists
        skillsLists.forEach(list => list.classList.add('hidden'));
        
        // Show the corresponding skills list
        const categoryId = category.getAttribute('data-category');
        document.getElementById(categoryId).classList.remove('hidden');
        
        // Animate progress bars in the visible category
        const visibleProgressBars = document.querySelectorAll(`#${categoryId} .skill-progress`);
        visibleProgressBars.forEach(progress => {
            progress.style.width = '0';
            setTimeout(() => {
                const value = progress.getAttribute('data-progress');
                progress.style.width = `${value}%`;
            }, 100);
        });
    });
});

// =============== PROJECT FILTERS ===============
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Get filter value
        const filterValue = button.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 500);
            }
        });
    });
});

// =============== CONTACT FORM ===============
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
            formStatus.textContent = 'Please fill in all fields';
            formStatus.style.color = 'red';
            return;
        }
        
        // Simulate form submission
        formStatus.textContent = 'Sending message...';
        formStatus.style.color = '#555';
        
        setTimeout(() => {
            contactForm.reset();
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            
            setTimeout(() => {
                formStatus.textContent = '';
            }, 3000);
        }, 1500);
    });
}

// =============== BACK TO TOP ===============
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =============== SCROLL REVEAL ANIMATIONS ===============
// Add scroll reveal animations to elements as they come into view
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.25
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
    });
}, observerOptions);

// Add animation to all section headers
document.querySelectorAll('.section-header').forEach(elem => {
    elem.classList.add('fade-in');
    appearOnScroll.observe(elem);
});

// Add animation to all skill items
document.querySelectorAll('.skill-item').forEach(elem => {
    elem.classList.add('slide-up');
    appearOnScroll.observe(elem);
});

// Add animation to all project items
document.querySelectorAll('.project-item').forEach(elem => {
    elem.classList.add('fade-in');
    appearOnScroll.observe(elem);
});

// Add animation to all contact items
document.querySelectorAll('.contact-item').forEach(elem => {
    elem.classList.add('slide-right');
    appearOnScroll.observe(elem);
});

// =============== PRELOADER ===============
window.addEventListener('load', () => {
    // After everything is loaded, add a class to the body to enable transitions
    document.body.classList.add('loaded');
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

// Set initial theme based on HTML class
if (document.documentElement.classList.contains('dark-theme')) {
  themeToggle.checked = true;
}

themeToggle.addEventListener('change', function() {
  if (this.checked) {
    document.documentElement.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark-theme');
    localStorage.setItem('theme', 'light');
  }
});

