// 案例展示页面代码
class Gallery {
    constructor() {
        this.currentFilter = 'all';
        this.items = [
            // 客厅案例
            {
                id: 1,
                category: '客厅',
                title: '现代简约客厅',
                description: '明亮通透的空间设计',
                image: 'images/gallery/living-modern-1.jpg'
            },
            {
                id: 2,
                category: '客厅',
                title: '北欧风格客厅',
                description: '自然清新的北欧风情',
                image: 'images/gallery/living-nordic-1.jpg'
            },
            {
                id: 3,
                category: '客厅',
                title: '新中式客厅',
                description: '传统元素与现代设计的融合',
                image: 'images/gallery/living-chinese-1.jpg'
            },
            // 卧室案例
            {
                id: 4,
                category: '卧室',
                title: '轻奢主卧设计',
                description: '舒适优雅的睡眠空间',
                image: 'images/gallery/bedroom-luxury-1.jpg'
            },
            {
                id: 5,
                category: '卧室',
                title: '日式禅意卧室',
                description: '极简设计，宁静安逸',
                image: 'images/gallery/bedroom-japanese-1.jpg'
            },
            {
                id: 6,
                category: '卧室',
                title: '北欧儿童房',
                description: '活泼的色彩搭配',
                image: 'images/gallery/bedroom-kids-1.jpg'
            },
            // 厨房案例
            {
                id: 7,
                category: '厨房',
                title: '现代开放厨房',
                description: '开放式设计，烹饪更自在',
                image: 'images/gallery/kitchen-modern-1.jpg'
            },
            {
                id: 8,
                category: '厨房',
                title: '北欧简约厨房',
                description: '简洁实用的空间布局',
                image: 'images/gallery/kitchen-nordic-1.jpg'
            },
            {
                id: 9,
                category: '厨房',
                title: '美式乡村厨房',
                description: '温馨舒适的烹饪环境',
                image: 'images/gallery/kitchen-american-1.jpg'
            },
            // 书房案例
            {
                id: 10,
                category: '书房',
                title: '现代书房',
                description: '专注学习的理想空间',
                image: 'images/gallery/study-modern-1.jpg'
            },
            {
                id: 11,
                category: '书房',
                title: '中式书房',
                description: '传统文化的完美诠释',
                image: 'images/gallery/study-chinese-1.jpg'
            },
            {
                id: 12,
                category: '书房',
                title: '日式书房',
                description: '禅意十足的阅读空间',
                image: 'images/gallery/study-japanese-1.jpg'
            }
        ];
        
        this.init();
    }

    init() {
        // 绑定房间类型按钮点击事件
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.onclick = () => this.filterByRoom(btn.dataset.room);
        });

        // 显示所有案例
        this.displayGallery();
    }

    filterByRoom(room) {
        // 更新当前过滤器
        this.currentFilter = room || 'all';
        
        // 更新按钮状态
        document.querySelectorAll('.room-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.room === room);
        });

        // 重新显示过滤后的案例
        this.displayGallery();
    }

    displayGallery() {
        // 过滤案例
        const filtered = this.items.filter(item => 
            this.currentFilter === 'all' || item.category === this.currentFilter);

        // 生成HTML
        const html = filtered.map(item => `
            <div class="gallery-item">
                <div class="gallery-image">
                    <img src="${item.image}" alt="${item.title}">
                    <div class="gallery-overlay">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // 更新显示
        document.querySelector('.gallery-grid').innerHTML = html;
    }
}

// 初始化
const gallery = new Gallery(); 