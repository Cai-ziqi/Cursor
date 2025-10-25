// 哈利波特魔法学院 - 页面功能
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // 初始化魔法效果
    initMagicEffects();

    // 导航链接点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            // 魔法切换效果
            createMagicTransition(() => {
                // 移除所有活动状态
                navLinks.forEach(l => l.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));
                
                // 添加活动状态
                this.classList.add('active');
                document.getElementById(targetId).classList.add('active');
                
                // 关闭移动端菜单
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    });

    // 移动端菜单切换
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // 添加魔法音效（模拟）
        createMagicSound();
    });

    // 点击菜单外部关闭菜单
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 滚动时更新导航栏样式
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        }
    });

    // 技能条动画
    const skillBars = document.querySelectorAll('.skill-progress');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                
                // 添加魔法效果
                createMagicSparkles(skillBar);
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 200);
                skillObserver.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // 统计数字动画
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const finalNumber = parseInt(statNumber.textContent);
                animateNumber(statNumber, 0, finalNumber, 2000);
                statObserver.unobserve(statNumber);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        statObserver.observe(number);
    });

    // 数字动画函数
    function animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const isPercentage = element.textContent.includes('%');
        
        // 添加魔法效果
        createMagicSparkles(element);
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            element.textContent = current + (isPercentage ? '%' : '');
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    }

    // 项目卡片悬停效果
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            createMagicSparkles(this);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // 联系表单处理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // 简单的表单验证
            if (!name || !email || !subject || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟发送成功
            createMagicTransition(() => {
                showNotification('猫头鹰已成功发送！我会尽快回复您。', 'success');
                this.reset();
            });
        });
    }

    // 邮箱验证函数
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 魔法通知函数
    function showNotification(message, type = 'info') {
        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // 添加魔法图标
        const icon = type === 'success' ? '✨' : type === 'error' ? '⚡' : '🔮';
        notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.2rem;">${icon}</span>
                <span>${message}</span>
            </div>
        `;
        
        // 添加魔法样式
        const colors = {
            success: 'linear-gradient(135deg, #10b981, #059669)',
            error: 'linear-gradient(135deg, #ef4444, #dc2626)',
            info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
        };
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${colors[type]};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 15px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.3);
            z-index: 10000;
            transform: translateX(100%) scale(0.8);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            max-width: 350px;
            font-weight: 500;
            border: 2px solid rgba(255, 215, 0, 0.3);
        `;
        
        document.body.appendChild(notification);
        
        // 魔法出现动画
        setTimeout(() => {
            notification.style.transform = 'translateX(0) scale(1)';
            createMagicSparkles(notification);
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.style.transform = 'translateX(100%) scale(0.8)';
            notification.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 400);
        }, 4000);
    }

    // 平滑滚动到顶部
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // 添加魔法返回顶部按钮
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-hat-wizard"></i>';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.title = '魔法传送';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #740001, #d3a625);
        color: white;
        border: 2px solid #ffd700;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.4rem;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(backToTopBtn);
    
    // 显示/隐藏返回顶部按钮
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        createMagicTransition(scrollToTop);
    });
    
    // 添加悬停效果
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        createMagicSparkles(this);
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // 魔法页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.8s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
            createMagicSparkles(document.body);
        }, 200);
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // 触摸设备优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // 为触摸设备添加特殊样式
        const style = document.createElement('style');
        style.textContent = `
            .touch-device .project-card:hover,
            .touch-device .stat-item:hover,
            .touch-device .trait-item:hover {
                transform: none;
            }
            
            .touch-device .btn:hover {
                transform: none;
            }
        `;
        document.head.appendChild(style);
    }

    // 性能优化：防抖函数
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // 优化滚动事件
    const debouncedScrollHandler = debounce(function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.3)';
        }
    }, 10);

    window.addEventListener('scroll', debouncedScrollHandler);
});

// 魔法效果函数
function initMagicEffects() {
    // 创建魔法粒子效果
    createMagicParticles();
    
    // 添加魔法光标效果
    addMagicCursor();
    
    // 初始化魔法音效
    initMagicSounds();
}

function createMagicTransition(callback) {
    // 创建魔法过渡效果
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
        z-index: 9999;
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(overlay);
    
    // 显示过渡效果
    setTimeout(() => {
        overlay.style.opacity = '1';
        setTimeout(() => {
            callback();
            overlay.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }, 150);
    }, 50);
}

function createMagicSparkles(element) {
    const sparkles = ['✨', '⭐', '🌟', '💫', '✨'];
    const colors = ['#ffd700', '#ffed4e', '#fff700', '#ffa500', '#ff8c00'];
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
        sparkle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 10 + 10}px;
            color: ${colors[Math.floor(Math.random() * colors.length)]};
            pointer-events: none;
            z-index: 10000;
            animation: sparkleFloat 1.5s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
        sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            if (document.body.contains(sparkle)) {
                document.body.removeChild(sparkle);
            }
        }, 1500);
    }
    
    // 添加CSS动画
    if (!document.getElementById('sparkle-animation')) {
        const style = document.createElement('style');
        style.id = 'sparkle-animation';
        style.textContent = `
            @keyframes sparkleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.5);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function createMagicParticles() {
    const particleContainer = document.querySelector('.magic-particles');
    if (!particleContainer) return;
    
    // 创建动态粒子
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            animation: particleFloat ${Math.random() * 10 + 10}s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        
        particleContainer.appendChild(particle);
    }
    
    // 添加粒子动画CSS
    if (!document.getElementById('particle-animation')) {
        const style = document.createElement('style');
        style.id = 'particle-animation';
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    transform: translateY(100vh) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function addMagicCursor() {
    // 添加魔法光标效果
    document.addEventListener('mousemove', function(e) {
        const cursor = document.querySelector('.magic-cursor');
        if (!cursor) {
            const newCursor = document.createElement('div');
            newCursor.className = 'magic-cursor';
            newCursor.style.cssText = `
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                transition: transform 0.1s ease;
            `;
            document.body.appendChild(newCursor);
        }
        
        const cursorElement = document.querySelector('.magic-cursor');
        cursorElement.style.left = e.clientX - 10 + 'px';
        cursorElement.style.top = e.clientY - 10 + 'px';
    });
    
    // 悬停效果
    document.addEventListener('mouseover', function(e) {
        if (e.target.matches('a, button, .project-card, .stat-item')) {
            const cursor = document.querySelector('.magic-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1.5)';
                cursor.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 1) 0%, transparent 70%)';
            }
        }
    });
    
    document.addEventListener('mouseout', function(e) {
        if (e.target.matches('a, button, .project-card, .stat-item')) {
            const cursor = document.querySelector('.magic-cursor');
            if (cursor) {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8) 0%, transparent 70%)';
            }
        }
    });
}

function createMagicSound() {
    // 模拟魔法音效（通过视觉反馈）
    const soundEffect = document.createElement('div');
    soundEffect.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%) scale(0);
        pointer-events: none;
        z-index: 10000;
        animation: soundWave 0.5s ease-out;
    `;
    
    document.body.appendChild(soundEffect);
    
    setTimeout(() => {
        if (document.body.contains(soundEffect)) {
            document.body.removeChild(soundEffect);
        }
    }, 500);
    
    // 添加音效动画CSS
    if (!document.getElementById('sound-animation')) {
        const style = document.createElement('style');
        style.id = 'sound-animation';
        style.textContent = `
            @keyframes soundWave {
                0% {
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 1;
                }
                100% {
                    transform: translate(-50%, -50%) scale(3);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function initMagicSounds() {
    // 初始化魔法音效系统
    // 这里可以添加实际的音效文件
    console.log('🔮 魔法音效系统已激活');
}
