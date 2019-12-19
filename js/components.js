// список групп товаров
Vue.component('groups', {
    template: "#groups-template",
    props: {
        groups: {
            type: Object
        },
        rate: {}  // курс доллара
    },
    data(){
        return {
            
        }
    }

})

// конкретная группа товара
Vue.component('one-group', {
    template: "#one-group-template",
    props: {
        group: {
            type: Object
        },
        rate: {}
    },
    data(){
        return {

        }
    }

})


// список товаров
Vue.component('products', {
    template: "#products-template",
    props: {
        products: {
            type: Object
        },
        rate: {},
        groupTitle: {
            type: String
        }
    },
    data(){
        return {

        }
    }

})


// конкретный продукт
Vue.component('one-product', {
    template: "#one-product-template",
    props: {
        product: {
            type: Object
        },
        rate: {},
        groupTitle: {
            type: String
        }
    },
    data(){
        return {
            prevRate: null,
            changeRate: ''
        }
    },
    computed: {
        // цена в рублях
        priceRub: function() {

            // сравниваем с прошлым значением курса
            if(this.prevRate){
                if(this.prevRate > this.rate){
                    this.changeRate = 'up'
                } else if(this.prevRate < this.rate){
                    this.changeRate = 'down'
                }
            }
            // запоминаем текущее значение курса
            this.prevRate = this.rate

            return (this.product.price * this.rate).toFixed(0);
        }
    },
    methods: {
        // добавление товара в корзину
        addToBasket: function (event) {
            this.product.groupTitle = this.groupTitle;
            let id = this.product.id;
            
            // check what item already in the basket (проверка на наличие товара в корзине)
            let alreadyExist = false;
            app.basket.forEach(item => {
                if(item.id == id){
                    alreadyExist = true
                }
            })
            // item NOT in the basket (товара нет в корзине => добавляем)
            if(!alreadyExist){
                app.basket.push(this.product)  
            }

        }
    }
})

// список товаров в корзине
Vue.component('basket-products', {
    template: "#basket-products-template",
    props: {
        products: {
            type: Array
        },
        rate: {}
    },
    data(){
        return {

        }
    },
    computed: {
        // цена всей корзины
        total: function() {
            let total = 0;
            this.products.forEach(item => {
                total += item.price * this.rate * item.countSelected;
            })
            return total.toFixed(0)
        }
    }

})

// конкретный товар в корзине
Vue.component('one-basket-product', {
    template: "#one-basket-product-template",
    props: {
        product: {
            type: Object
        },
        products: {
            type: Array
        },
        rate: {},
        index: Number
    },
    data(){
        return {

        }
    },
    computed: {
        // цена одной позиции в корзине с учетом кол-ва (в рублях)
        totalPriceRub: function() { 
            return (this.product.price * this.rate * this.product.countSelected).toFixed(0);
        },
        // цена одной позиции в корзине без учета кол-ва  (в рублях)
        priceRub: function() {
            return (this.product.price * this.rate).toFixed(0);
        }
    },
    methods: {
        // удалить товар из корзины
        deleteFromBasket: function () {

            let id = this.product.id;
            let i = null;
            this.products.forEach((item, index) => {
                if(item.id == id){
                    i = index
                }
            })

            if(i || i == 0){
                this.products.splice(i, 1)
            }
        }
    }
})