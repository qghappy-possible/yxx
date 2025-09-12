// 通用工具函数
const utils = {
    // 显示消息提示
    showMessage(message, type = 'info') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = message;
        document.body.appendChild(messageDiv);
        
        setTimeout(() => messageDiv.remove(), 3000);
    },

    // 格式化价格
    formatPrice(price) {
        return '¥' + price.toLocaleString('zh-CN');
    },

    // 动画过渡
    async fadeTransition(element, callback) {
        element.style.opacity = '0';
        await new Promise(resolve => setTimeout(resolve, 300));
        callback();
        element.style.opacity = '1';
    }
};

// 导航栏效果
document.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.style.backgroundColor = window.scrollY > 50 ? 'rgba(255,255,255,0.95)' : '#fff';
});

// 移动端菜单
const toggleMobileMenu = () => {
    document.querySelector('.nav-links').classList.toggle('active');
}; 