// 简化购物车代码
class Cart {
    constructor() {
        this.items = [];
        this.init();
    }

    init() {
        this.loadItems();
        this.updateUI();
        this.bindEvents();
    }

    loadItems() {
        // 这里可以从localStorage或API加载购物车数据
        this.items = [
            {id: 1, name: '现代简约双人床', price: 2999, quantity: 1},
            {id: 2, name: '北欧风格衣柜', price: 3599, quantity: 1},
            {id: 3, name: '现代布艺沙发', price: 4999, quantity: 1}
        ];
    }

    updateUI() {
        const subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = subtotal > 1000 ? 0 : 20;
        
        document.getElementById('subtotal').textContent = utils.formatPrice(subtotal);
        document.getElementById('shipping').textContent = utils.formatPrice(shipping);
        document.getElementById('total').textContent = utils.formatPrice(subtotal + shipping);
    }

    bindEvents() {
        document.querySelectorAll('.quantity-controls button').forEach(btn => {
            btn.onclick = () => {
                const [id, delta] = [btn.dataset.id, parseInt(btn.dataset.delta)];
                this.updateQuantity(id, delta);
            };
        });

        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.onclick = () => this.removeItem(btn.dataset.id);
        });
    }

    updateQuantity(id, delta) {
        const item = this.items.find(i => i.id === parseInt(id));
        if (item) {
            item.quantity = Math.max(0, item.quantity + delta);
            this.updateUI();
        }
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== parseInt(id));
        this.updateUI();
        utils.showMessage('商品已移除', 'info');
    }
}

// 初始化
document.addEventListener('DOMContentLoaded', () => new Cart()); 