// ========================================
// MANUAL DE ESTILO WEB - JAVASCRIPT
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // Navegación suave al hacer clic en enlaces
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ========================================
    // Animación de entrada para las secciones
    // ========================================
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

    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ========================================
    // Copiar código de color al hacer clic
    // ========================================
    document.querySelectorAll('.color-box').forEach(colorBox => {
        colorBox.style.cursor = 'pointer';
        colorBox.title = 'Click para copiar el código de color';
        
        colorBox.addEventListener('click', function() {
            const colorCode = this.textContent.trim();
            navigator.clipboard.writeText(colorCode).then(() => {
                // Mostrar mensaje de confirmación
                const originalText = this.textContent;
                this.textContent = '¡Copiado!';
                this.style.background = '#28a745';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '';
                }, 1000);
            }).catch(err => {
                console.error('Error al copiar:', err);
            });
        });
    });

    // ========================================
    // Selector de tallas con estado activo
    // ========================================
    document.querySelectorAll('.size-badge').forEach(badge => {
        badge.addEventListener('click', function() {
            // Remover clase activa de todos los badges
            document.querySelectorAll('.size-badge').forEach(b => {
                b.style.background = 'var(--color-primary)';
                b.style.transform = 'scale(1)';
            });
            
            // Añadir estado activo al seleccionado
            this.style.background = 'var(--color-accent)';
            this.style.transform = 'scale(1.15)';
        });
    });

    // ========================================
    // Botones de añadir al carrito con feedback
    // ========================================
    document.querySelectorAll('.card .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = '✓ Añadido';
            this.style.background = '#28a745';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // ========================================
    // Formulario con validación básica
    // ========================================
    const formControls = document.querySelectorAll('.form-control');
    
    formControls.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--color-accent)';
        });
    });

    // ========================================
    // Hover effect en iconos
    // ========================================
    document.querySelectorAll('.icon-item').forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.querySelector('i').style.color = 'var(--color-accent)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.querySelector('i').style.color = 'var(--color-primary)';
        });
    });

    // ========================================
    // Navbar responsive toggle (para móvil)
    // ========================================
    const navbar = document.querySelector('.navbar-demo');
    if (navbar) {
        const navLinks = navbar.querySelector('.nav-links');
        
        // Crear botón de menú para móvil
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        menuButton.className = 'menu-toggle';
        menuButton.style.cssText = `
            display: none;
            background: transparent;
            border: 2px solid white;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
        `;
        
        navbar.appendChild(menuButton);
        
        // Toggle del menú
        menuButton.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--color-primary)';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '0 0 8px 8px';
        });
        
        // Mostrar botón en pantallas pequeñas
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            navLinks.style.display = 'none';
        }
        
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                menuButton.style.display = 'block';
                navLinks.style.display = 'none';
            } else {
                menuButton.style.display = 'none';
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
                navLinks.style.position = 'static';
                navLinks.style.padding = '0';
            }
        });
    }

    // ========================================
    // Efecto de ripple en botones
    // ========================================
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========================================
    // Animación ripple CSS
    // ========================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ========================================
    // Scroll to top button
    // ========================================
    const scrollTopButton = document.createElement('button');
    scrollTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopButton.className = 'scroll-top';
    scrollTopButton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 15px 20px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: var(--shadow-lg);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollTopButton);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.style.opacity = '1';
            scrollTopButton.style.visibility = 'visible';
        } else {
            scrollTopButton.style.opacity = '0';
            scrollTopButton.style.visibility = 'hidden';
        }
    });
    
    scrollTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // Console message para desarrolladores
    // ========================================
    console.log('%c Manual de Estilo Web ', 'background: #1a1a2e; color: #fff; padding: 10px; font-size: 16px; font-weight: bold;');
    console.log('%c Este es el manual de estilo para la marca de ropa. ', 'color: #0f4c75; font-size: 12px;');
    console.log('%c Todos los componentes están listos para usar. ', 'color: #6c757d; font-size: 12px;');
});

// ========================================
// Función para cambiar tema (opcional)
// ========================================
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
