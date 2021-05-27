let filter = document.forms.filter;
let list = document.forms.list.products;
let price = document.querySelector('.current-price');
let radio = document.querySelectorAll('input[name="radio"]')
let label = document.querySelectorAll('.list .sort label')

let products = [
    {id: '001', cat: 'Ноутбуки', brand: 'Lenovo', model: 'IdeaPad 5 15ITL05',         price: '16 999',    pricetype: '₴', img: './files/169255555.jpg'},
    {id: '002', cat: 'Ноутбуки', brand: 'Lenovo', model: 'IdeaPad Gaming 3 15ARH05',  price: '25 999',    pricetype: '₴', img: './files/159698356.jpg'},
    {id: '003', cat: 'Ноутбуки', brand: 'Lenovo', model: 'V145-15',                   price: '8 999',     pricetype: '₴', img: './files/89657359.jpg'},
    {id: '004', cat: 'Ноутбуки', brand: 'HP',     model: 'Laptop 15s-eq1001ua',       price: '15 999',    pricetype: '₴', img: './files/66972137.jpg'},
    {id: '005', cat: 'Ноутбуки', brand: 'HP',     model: 'Gaming 15-ec1055ur',        price: '27 777',    pricetype: '₴', img: './files/29920238.jpg'},
    {id: '006', cat: 'Ноутбуки', brand: 'Asus',   model: 'X515JA-BR080',              price: '14 999',    pricetype: '₴', img: './files/129859700.jpg'},
    {id: '007', cat: 'Ноутбуки', brand: 'Asus',   model: 'ROG Strix G15',             price: '26 999',    pricetype: '₴', img: './files/27122440.jpg'},
    {id: '008', cat: 'Ноутбуки', brand: 'Acer',   model: 'Aspire 5 A515-56G-54JD',    price: '19 999',    pricetype: '₴', img: './files/37871265.jpg'},
    {id: '009', cat: 'Ноутбуки', brand: 'Acer',   model: 'Aspire 7 A715-41G-R7MZ',    price: '21 999',    pricetype: '₴', img: './files/129859700.jpg'},
    {id: '010', cat: 'Ноутбуки', brand: 'Acer',   model: 'Extensa 15 EX215-31-P87Q',  price: '13 999',    pricetype: '₴', img: './files/119730233.jpg'},
    {id: '011', cat: 'Смартфоны', brand: 'Xiaomi',     model: 'Redmi 9 4/64GB',  price: '4 299',    pricetype: '₴', img: './files/134257269.jpg'},
    {id: '012', cat: 'Смартфоны', brand: 'Xiaomi',     model: 'Mi 11 8/256GB',  price: '24 999',    pricetype: '₴', img: './files/160639886.jpg'},
    {id: '013', cat: 'Смартфоны', brand: 'Samsung',    model: 'Samsung Galaxy A32 4/64GB',  price: '6 599',    pricetype: '₴', img: './files/165913388.jpg'},
    {id: '014', cat: 'Смартфоны', brand: 'Samsung',    model: 'Galaxy S20 Plus 8/128GB',  price: '20 999',    pricetype: '₴', img: './files/21702042.jpg'},
    {id: '015', cat: 'Смартфоны', brand: 'Apple',      model: 'iPhone 12 Pro Max 128GB',  price: '40 999',    pricetype: '₴', img: './files/30873170.jpg'},
    {id: '016', cat: 'Смартфоны', brand: 'Apple',      model: 'iPhone 11 64GB',  price: '22 299',    pricetype: '₴', img: './files/37357013.jpg'},

]; // "VS Code" безпричинно ругается на числа 8 и 9 в "id", поэтому обьявил их строкой. Скрин в папке "Files".

formStart();

function formStart() {
    let uniqe = [];
    products.forEach(function(item) {
        list.innerHTML += 
        `
        <label class="block">
            <img src="${item.img}" class="img">
            <h6 class="brand">${item.brand}</h6>
            <h6 class="model">${item.model}</h6>
            <h6 class="price">${item.price}${item.pricetype}</h6>
        </label>
        `
        if(uniqe.indexOf(item.cat) == -1){
            uniqe.push(item.cat)
        }
    })
    for(let item of uniqe) {
        filter.category.innerHTML += 
        `
        <option> ${item} </option>
        `
    }
}

let currentCatStatus;

filter.category.onchange = function() {
    if (filter.category.value !== 'ВСЕ') {
        //filter.brand.value = '1';
        // Вот здесь не получается изменить значение в поле "filter.brand".
        filter.brand.removeAttribute('Disabled');
        globalFilter()
    } else {
        filter.brand.setAttribute('Disabled', '');
        globalFilter();
        
    }
    if (filter.category.value !== currentCatStatus && filter.category.value !== 'ВСЕ') {
        createBrandList();
    }
}

filter.brand.onchange = function() {
    globalFilter();
}
filter.price.onchange = function() {
    price.innerText = filter.price.value + products[0].pricetype;
    globalFilter();
}

function createBrandList() {
    let uniqe = ['ВСЕ'];
    filter.brand.innerHTML = '';
    for(let item of products) {
        if(item.cat === filter.category.value) {
            if(uniqe.indexOf(item.brand) == -1) {
                uniqe.push(item.brand);
            }
        }
        currentCatStatus = filter.category.value;
    }
    for(let item of uniqe) {
        filter.brand.innerHTML += 
        `
        <option>${item}</option>
        `
    }
    globalFilter();
}

function globalFilter() {
    list.innerHTML = '';
    let toList = [];
    products.forEach(function(item){
        item.price = item.price.replace(' ', '');
        if (filter.category.value === 'ВСЕ' && item.price <= Number(filter.price.value)) {
           toList.push(item)
        }
        if ((item.cat === filter.category.value) && (item.brand === filter.brand.value || filter.brand.value === 'ВСЕ') && (item.price <= Number(filter.price.value))) {
            toList.push(item)
        }
    })
    for(item of radio) {
        if(item.checked == true) {
            if(item.value === 'type1') {
                toList.sort(function(a, b){
                    if(Number(a.price) > Number(b.price)) {
                        return -1;
                    }
                    if(Number(a.price) < Number(b.price)) {
                        return 1;
                    }
                    if(Number(a.price) = Number(b.price)) {
                        return 0;
                    }
                })
            }
            if(item.value === 'type2') {
                toList.sort(function(a, b){
                    if(Number(a.price) < Number(b.price)) {
                        return -1;
                    }
                    if(Number(a.price) > Number(b.price)) {
                        return 1;
                    }
                    if(Number(a.price) = Number(b.price)) {
                        return 0;
                    }
                })
            }
            if(item.value == 'type3'){
                toList.sort(function(a, b){
                    if(a.model < b.model) {
                        return -1;
                    }
                    if(a.model > b.model) {
                        return 1;
                    }
                    if(a.model = b.model) {
                        return 0;
                    }
                })
            }
            if(item.value == 'type4'){
                toList.sort(function(a, b){
                    if(a.model > b.model) {
                        return -1;
                    }
                    if(a.model < b.model) {
                        return 1;
                    }
                    if(a.model = b.model) {
                        return 0;
                    }
                })
            }
        }
    }
    toList.forEach(function(item) {
        list.innerHTML += 
        `
        <label class="block">
            <img src="${item.img}" class="img">
            <h6 class="brand">${item.brand}</h6>
            <h6 class="model">${item.model}</h6>
            <h6 class="price">${item.price}${item.pricetype}</h6>
        </label>
        `
    })
}

for(i = 0; i < label.length; i++) {
    label[i].onchange = function(event) {
        clearing();
        this.classList.toggle('active')
        globalFilter();
    }
}

function clearing() {
    for(let item of label) {
        item.classList.remove('active')
    }
}