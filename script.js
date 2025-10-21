// Main JavaScript for Hummanizer Landing Page

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('Hummanizer Landing Page loaded successfully!');
    
    // Initialize tooltips if using Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
});

// Start the application
function startApp() {
    // For demo purposes - in production this would redirect to the actual app
    const email = prompt('Enter your email to get started (demo):');
    if (email) {
        alert(`Welcome to Hummanizer! A verification email would be sent to ${email} in production.`);
        // In production: window.location.href = '/dashboard.html';
        
        // Demo: Show success message
        showNotification('Welcome to Hummanizer! You can now start humanizing text.', 'success');
    }
}

// Show demo modal
function showDemo() {
    // Create a simple demo modal
    const demoHTML = `
        <div class="modal fade" id="demoModal" tabindex="-1">
            <div class="modal-dialog modal-lg">
                <div class="modal-content bg-dark text-light">
                    <div class="modal-header border-secondary">
                        <h5 class="modal-title">
                            <i class="fas fa-play-circle me-2 text-primary"></i>
                            Hummanizer Demo
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="ratio ratio-16x9">
                            <div class="d-flex align-items-center justify-content-center bg-black rounded">
                                <div class="text-center">
                                    <i class="fas fa-play-circle display-1 text-primary mb-3"></i>
                                    <p class="lead">Demo video would play here</p>
                                    <button class="btn btn-primary mt-3" onclick="startApp()">
                                        Try It Yourself
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-md-6">
                                <h6><i class="fas fa-robot text-primary me-2"></i>Before</h6>
                                <p class="small text-muted">AI-generated text that sounds robotic and detectable</p>
                            </div>
                            <div class="col-md-6">
                                <h6><i class="fas fa-user text-warning me-2"></i>After</h6>
                                <p class="small text-muted">Natural, human-like text that bypasses AI detection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to body if not already there
    if (!document.getElementById('demoModal')) {
        document.body.insertAdjacentHTML('beforeend', demoHTML);
    }
    
    // Show the modal
    const demoModal = new bootstrap.Modal(document.getElementById('demoModal'));
    demoModal.show();
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
    `;
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        if (this.classList.contains('btn-primary') || this.classList.contains('btn-light')) {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Loading...';
            this.disabled = true;
            
            // Reset after 2 seconds for demo
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
            }, 2000);
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step-number').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});