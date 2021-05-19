let form = document.forms.mainform;
let filter = document.forms.filter;
let names = [
    {name: 'Sergiy',    age: '20', city: 'Poltava'},
    {name: 'Evgen',     age: '32', city: 'Kharkiv'},
    {name: 'Vlad',      age: '12', city: 'Kiev'},
    {name: 'Egor',      age: '43', city: 'Odesa'},
    {name: 'Sergiy',    age: '24', city: 'Odesa'},
    {name: 'Sergiy',    age: '24', city: 'Kiev'},
    {name: 'Egor',      age: '32', city: 'Dnipro'},
    {name: 'Vlad',      age: '24', city: 'Dnipro'},
    {name: 'Vlad',      age: '20', city: 'Poltava'},
    {name: 'Kolya',     age: '12', city: 'Kharkiv'},
    {name: 'Kolya',     age: '20', city: 'Kiev'},
    {name: 'Vadim',     age: '12', city: 'Kiev'},
    {name: 'Petya',     age: '20', city: 'Zhitomir'},
    {name: 'Vadim',     age: '24', city: 'Poltava'},
    {name: 'Vlad',      age: '20', city: 'Zhitomir'},
];
createStartList();
function createStartList() {
    names.forEach(function (value, index, arr){
        form.innerHTML += 
        `
        <label class="block">
            <h6>Name: <span class="value">${value.name}</span></h6> <h6>Age: <span class="value">${value.age}</span></h6> <h6>City: <span class="value">${value.city}</span></h6>
        </label>
        `
    });
}

createNameForm(names);
createAgeForm(names);
createCityForm(names);

function createNameForm(names) {
    let uniqe = [];
    names.forEach(function (value, index, arr){
        if (uniqe.indexOf(value.name) == -1) {
            uniqe.push(value.name)
        }
    })
    uniqe.sort()
    console.log(uniqe)
    uniqe.forEach(function(value,index,arr){
        filter.name.innerHTML += 
        `
        <option> ${value} </option>
        `
    })
}
function createAgeForm(names) {
    let uniqe = [];
    names.forEach(function (value, index, arr){
        if (uniqe.indexOf(value.age) == -1) {
            uniqe.push(value.age)
        }
    })
    uniqe.sort()
    console.log(uniqe)
    uniqe.forEach(function(value,index,arr){
        filter.age.innerHTML += 
        `
        <option> ${value} </option>
        `
    })
}
function createCityForm(names) {
    let uniqe = [];
    names.forEach(function (value, index, arr){
        if (uniqe.indexOf(value.city) == -1) {
            uniqe.push(value.city)
        }
    })
    uniqe.sort()
    console.log(uniqe)
    uniqe.forEach(function(value,index,arr){
        filter.city.innerHTML += 
        `
        <option> ${value} </option>
        `
    })
}
filter.name.onchange = function() {
    createList();
}
filter.age.onchange = function() {
    createList();
}
filter.city.onchange = function() {
    createList();
}

function createList() {
    form.innerHTML = '';
    let city;
    let age;   
    let name;
    if(filter.name.value) {
        name = filter.name.value;  
    }

    if(filter.age.value) {
        age = filter.age.value;  
    }

    if(filter.city.value) {
        city = filter.city.value;  
    }
    console.log(name,age,city)
    names.forEach(function (value, index, arr){
        if ((name === value.name || name === 'none') && (age === value.age || age === 'none') && (city === value.city || city === 'none')){
            form.innerHTML +=
            `
            <label class="block">
                <h6>Name: <span class="value">${value.name}</span></h6> <h6>Age: <span class="value">${value.age}</span></h6> <h6>City: <span class="value">${value.city}</span></h6>
            </label>
            `
        }
    });
}
/* 

*/