// 定制表单对象
const customizeForm = {
    currentStep: 1,
    selectedRoom: '',
    selectedStyle: '',
    dimensions: {},
    selectedMaterials: [],

    // 初始化
    init() {
        this.bindEvents();
        this.updateStepDisplay();
    },

    // 绑定事件
    bindEvents() {
        // 房间选择事件
        document.querySelectorAll('.room-option').forEach(room => {
            room.addEventListener('click', (e) => {
                this.selectedRoom = room.dataset.room;
                this.goToStep(2);
                this.updateOrderSummary();
            });
        });

        // 风格选择事件
        document.querySelectorAll('.style-card').forEach(style => {
            style.addEventListener('click', (e) => {
                this.selectedStyle = style.dataset.style;
                this.goToStep(3);
                this.updateOrderSummary();
            });
        });

        // 尺寸输入事件
        document.querySelectorAll('#step3 input[type="number"]').forEach(input => {
            input.addEventListener('change', () => {
                this.dimensions[input.id] = input.value;
                this.updateOrderSummary();
            });
        });

        // 材料选择事件
        document.querySelectorAll('.material-item').forEach(material => {
            material.addEventListener('click', (e) => {
                material.classList.toggle('selected');
                this.updateSelectedMaterials();
                this.updateOrderSummary();
            });
        });

        // 提交订单事件
        document.querySelector('.submit-order').addEventListener('click', () => {
            this.submitOrder();
        });
    },

    // 跳转到指定步骤
    goToStep(step) {
        if (step < 1 || step > 5) return;
        
        // 更新当前步骤
        this.currentStep = step;
        
        // 更新步骤显示
        this.updateStepDisplay();
    },

    // 更新步骤显示
    updateStepDisplay() {
        // 更新步骤指示器
        document.querySelectorAll('.step').forEach(stepEl => {
            const stepNum = parseInt(stepEl.dataset.step);
            if (stepNum <= this.currentStep) {
                stepEl.classList.add('active');
            } else {
                stepEl.classList.remove('active');
            }
        });

        // 更新内容显示
        document.querySelectorAll('.step-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`step${this.currentStep}`).classList.add('active');
    },

    // 更新已选材料
    updateSelectedMaterials() {
        this.selectedMaterials = [];
        document.querySelectorAll('.material-item.selected').forEach(item => {
            this.selectedMaterials.push(item.querySelector('h4').textContent);
        });
    },

    // 更新订单摘要
    updateOrderSummary() {
        if (this.selectedRoom) {
            document.getElementById('selected-room').textContent = this.selectedRoom;
        }
        if (this.selectedStyle) {
            document.getElementById('selected-style').textContent = this.selectedStyle;
        }
        if (Object.keys(this.dimensions).length > 0) {
            const dims = `${this.dimensions['room-length'] || 0}m × ${this.dimensions['room-width'] || 0}m × ${this.dimensions['room-height'] || 0}m`;
            document.getElementById('room-dimensions').textContent = dims;
        }
        if (this.selectedMaterials.length > 0) {
            document.getElementById('selected-materials').textContent = this.selectedMaterials.join(' + ');
        }
    },

    // 提交订单
    submitOrder() {
        // 验证所有必要信息是否填写
        if (!this.validateOrder()) {
            alert('请完善所有必要信息');
            return;
        }

        // 这里添加实际的订单提交逻辑
        alert('订单提交成功！我们的客服会尽快与您联系。');
    },

    // 验证订单信息
    validateOrder() {
        return this.selectedRoom && 
               this.selectedStyle && 
               Object.keys(this.dimensions).length === 3 &&
               this.selectedMaterials.length > 0;
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    customizeForm.init();
});