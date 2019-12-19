// получить товар из исходных данных по id
function getRawGoodById(id){

    let res = null; 
    goods.forEach(good => {
        if(good["T"] == id){
            res = good
        }
    })

    return res
}

// подготовка исходных данных
// добавление в дерево групп товаров свойств товаров
function prepareData(names){
    
    for(key in names){
        let groupObj = names[key];
        let products = groupObj.B;

        for(keyProduct in products){ // products
            
            productObj = products[keyProduct]

            // add extra data to product obj
            let good = getRawGoodById(keyProduct);
            if(good){
                productObj.id = good["T"];
                productObj.price = good["C"];
                productObj.count = good["P"];
                productObj.countSelected = 1;
                productObj.show = true;
            } else {
                productObj.show = false;
            }
        }
    }

    return names
}

let productGroups = prepareData(names); // группы продуктов

var app = new Vue({
    el: '#app',
    data: {
        productGroups: productGroups,
        basket: [],
        dollarRate: 60
    },
    methods: {
        changeRate: function (event) {

            let value = parseInt(event.target.value);
            let min = 20;
            let max = 80;
            if(value < min){
                value = min
            } else if(value > max){
                value = max
            }

            this.dollarRate = value;            
        }
    }
})