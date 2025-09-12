// 简化产品页面代码
class Products {
    constructor() {
        this.filters = {
            category: '',
            price: '',
            style: ''
        };
        this.items = [
            // 卧室家具
            {
                id: 1,
                name: '现代简约双人床',
                category: 'bedroom',
                price: 2999,
                style: 'modern',
                image: 'images/products/bed-modern.jpg',
                description: '简约现代设计双人床，1.8米宽，环保材质',
                badge: '热销'
            },
            {
                id: 2,
                name: '北欧风格衣柜',
                category: 'bedroom',
                price: 3599,
                style: 'nordic',
                image: 'images/products/wardrobe-nordic.jpg',
                description: '大容量衣柜，多功能收纳，环保板材',
                badge: '新品'
            },
            {
                id: 3,
                name: '欧式床头柜',
                category: 'bedroom',
                price: 899,
                style: 'european',
                image: 'images/products/nightstand-european.jpg',
                description: '精致雕花床头柜，优质实木打造',
            },

            // 客厅家具
            {
                id: 4,
                name: '现代布艺沙发',
                category: 'living',
                price: 4999,
                style: 'modern',
                image: 'images/products/sofa-modern.jpg',
                description: '舒适三人布艺沙发，可拆洗，多色可选',
                badge: '热销'
            },
            {
                id: 5,
                name: '实木茶几',
                category: 'living',
                price: 1599,
                style: 'chinese',
                image: 'images/products/coffee-table-wood.jpg',
                description: '中式实木茶几，天然木纹，古朴大方'
            },
            {
                id: 6,
                name: '北欧电视柜',
                category: 'living',
                price: 2299,
                style: 'nordic',
                image: 'images/products/tv-stand-nordic.jpg',
                description: '简约电视柜，大容量储物，北欧设计'
            },

            // 厨房家具
            {
                id: 7,
                name: '整体橱柜',
                category: 'kitchen',
                price: 8999,
                style: 'modern',
                image: 'images/products/kitchen-cabinet.jpg',
                description: '定制整体橱柜，环保材质，多功能收纳',
                badge: '可定制'
            },
            {
                id: 8,
                name: '岛台餐桌',
                category: 'kitchen',
                price: 3999,
                style: 'modern',
                image: 'images/products/kitchen-island.jpg',
                description: '多功能岛台餐桌，集备餐和用餐于一体'
            },
            {
                id: 9,
                name: '欧式厨柜',
                category: 'kitchen',
                price: 6999,
                style: 'european',
                image: 'images/products/kitchen-european.jpg',
                description: '欧式风格厨柜，精致雕花，奢华大气'
            },

            // 书房家具
            {
                id: 10,
                name: '书桌书架组合',
                category: 'study',
                price: 2499,
                style: 'modern',
                image: 'images/products/desk-shelf.jpg',
                description: '现代简约书桌书架组合，环保材质',
                badge: '套装'
            },
            {
                id: 11,
                name: '人体工学椅',
                category: 'study',
                price: 1299,
                style: 'modern',
                image: 'images/products/ergonomic-chair.jpg',
                description: '人体工学设计，舒适办公，保护脊椎',
                badge: '热卖'
            },
            {
                id: 12,
                name: '日式书柜',
                category: 'study',
                price: 3299,
                style: 'japanese',
                image: 'images/products/bookcase-japanese.jpg',
                description: '日式简约书柜，原木质感，禅意十足'
            }
        ];
        this.init();
    }

    init() {
        this.bindFilters();
        this.displayProducts();
    }

    bindFilters() {
        ['category', 'price', 'style'].forEach(type => {
            const select = document.getElementById(`${type}-filter`);
            if (select) {
                select.onchange = () => {
                    this.filters[type] = select.value;
                    this.displayProducts();
                };
            }
        });
    }

    filterProducts() {
        return this.items.filter(item => {
            const categoryMatch = !this.filters.category || item.category === this.filters.category;
            const styleMatch = !this.filters.style || item.style === this.filters.style;
            const priceMatch = !this.filters.price || this.checkPriceRange(item.price, this.filters.price);
            return categoryMatch && styleMatch && priceMatch;
        });
    }

    checkPriceRange(price, range) {
        const [min, max] = range.split('-').map(Number);
        return max ? price >= min && price <= max : price >= min;
    }

    displayProducts() {
        const filtered = this.filterProducts();
        const html = filtered.map(item => `
            <div class="product-card">
                <div class="product-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
                </div>
                <div class="product-info">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="product-price">${utils.formatPrice(item.price)}</div>
                    <div class="product-actions">
                        <button onclick="products.addToCart(${item.id})">加入购物车</button>
                        <button onclick="products.customize(${item.id})" class="customize-btn">立即定制</button>
                    </div>
                </div>
            </div>
        `).join('');

        utils.fadeTransition(
            document.querySelector('.product-grid'),
            () => document.querySelector('.product-grid').innerHTML = html
        );
    }

    addToCart(id) {
        const item = this.items.find(i => i.id === id);
        if (item) {
            // 这里可以调用购物车类的方法
            utils.showMessage('已添加到购物车', 'success');
        }
    }

    customize(id) {
        location.href = `customize.html?product=${id}`;
    }
}

// 初始化
const products = new Products(); 