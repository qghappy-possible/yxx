// 简化认证代码
class Auth {
    constructor() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.bindEvents();
    }

    get isLoggedIn() {
        return !!this.user;
    }

    bindEvents() {
        const loginForm = document.getElementById('accountLoginForm');
        if (loginForm) {
            loginForm.onsubmit = e => {
                e.preventDefault();
                this.login(
                    loginForm.username.value,
                    loginForm.password.value,
                    loginForm.remember.checked
                );
            };
        }
    }

    async login(username, password, remember) {
        try {
            // 模拟API调用
            await new Promise(resolve => setTimeout(resolve, 500));
            
            if (username === 'demo' && password === 'demo123') {
                this.user = { username, name: '演示用户' };
                localStorage.setItem('user', JSON.stringify(this.user));
                if (remember) {
                    localStorage.setItem('rememberMe', 'true');
                }
                utils.showMessage('登录成功', 'success');
                location.href = 'index.html';
            } else {
                throw new Error('用户名或密码错误');
            }
        } catch (error) {
            utils.showMessage(error.message, 'error');
        }
    }

    logout() {
        this.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        utils.showMessage('已退出登录', 'info');
        location.href = 'login.html';
    }

    checkAuth() {
        if (!this.isLoggedIn) {
            location.href = 'login.html';
            return false;
        }
        return true;
    }
}

// 初始化
const auth = new Auth(); 