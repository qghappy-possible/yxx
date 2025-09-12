// 简化登录页面代码
class Login {
    constructor() {
        this.currentTab = 'login';
        this.init();
    }

    init() {
        this.bindTabs();
        this.bindForms();
    }

    bindTabs() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = () => {
                this.switchTab(btn.dataset.tab);
            };
        });
    }

    switchTab(tab) {
        this.currentTab = tab;
        // 更新标签状态
        document.querySelectorAll('.tab-btn').forEach(btn => 
            btn.classList.toggle('active', btn.dataset.tab === tab));
        // 更新表单显示
        document.querySelectorAll('.login-form').forEach(form => 
            form.classList.toggle('active', form.id === `${tab}Form`));
    }

    bindForms() {
        // 绑定登录表单
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.onsubmit = e => {
                e.preventDefault();
                this.handleLogin(loginForm);
            };
        }

        // 绑定注册表单
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.onsubmit = e => {
                e.preventDefault();
                this.handleRegister(registerForm);
            };
        }
    }

    showMessage(message, type = 'success') {
        const messageBox = document.getElementById('messageBox');
        const messageContent = messageBox.querySelector('.message-content');
        const messageText = messageBox.querySelector('.message-text');

        // 设置消息内容和类型
        messageText.textContent = message;
        messageContent.className = 'message-content ' + type;

        // 显示消息
        messageBox.style.display = 'block';

        // 3秒后自动隐藏
        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 3000);
    }

    async handleLogin(form) {
        try {
            const username = form.username.value;
            const password = form.password.value;

            if (!username || !password) {
                throw new Error('请填写用户名和密码');
            }

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showMessage('登录成功，正在跳转...');
            
            // 延迟跳转，让用户看到成功提示
            setTimeout(() => {
                location.href = 'index.html';
            }, 1000);
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    async handleRegister(form) {
        try {
            const username = form.username.value;
            const email = form.email.value;
            const password = form.password.value;
            const confirmPassword = form.confirmPassword.value;

            // 表单验证
            if (!username || !email || !password || !confirmPassword) {
                throw new Error('请填写所有必填项');
            }

            if (password !== confirmPassword) {
                throw new Error('两次输入的密码不一致');
            }

            if (password.length < 6) {
                throw new Error('密码长度不能少于6位');
            }

            if (!this.validateEmail(email)) {
                throw new Error('请输入有效的邮箱地址');
            }

            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 500));
            this.showMessage('注册成功，请登录');
            
            // 延迟切换到登录页面
            setTimeout(() => {
                this.switchTab('login');
                form.reset();
            }, 1000);
        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
}

// 初始化
const login = new Login(); 