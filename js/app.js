//import {rolls, rollType} from './rollsData.js'

// Rolls array containing information for every type of roll
const rolls = {
    "Original": {
        "basePrice": 2.49,
        "imageFile": "original-cinnamon-roll.jpg"
    },
    "Apple": {
        "basePrice": 3.49,
        "imageFile": "apple-cinnamon-roll.jpg"
    },
    "Raisin": {
        "basePrice": 2.99,
        "imageFile": "raisin-cinnamon-roll.jpg"
    },
    "Walnut": {
        "basePrice": 3.49,
        "imageFile": "walnut-cinnamon-roll.jpg"
    },
    "Double-Chocolate": {
        "basePrice": 3.99,
        "imageFile": "double-chocolate-cinnamon-roll.jpg"
    },
    "Strawberry": {
        "basePrice": 3.99,
        "imageFile": "strawberry-cinnamon-roll.jpg"
    }    
};

const price = {
    basePrice: 2.49,
    glazeAdd: 0.0,
    sizeMultiplier: 1.0,
    priceElement: null,
    glazeElement: null,
    sizeElement: null
};

// Update price value on the page
function displayPrice(price) {
    let finalPrice = ((price.basePrice + price.glazeAdd) * price.sizeMultiplier).toFixed(2);
    price.priceElement.innerText = "$" + finalPrice;
}

// Update for glaze dropdown
function onGlazeChange() {
    // Print console message to confirm option
    console.log('Glaze changed to ' + this.value);

    // UNUSED - attempt to calculate using arrays
    /*let glazeIndex = parseInt(this.value);
    console.log(glazeIndex);*/

    if(this.value == 'keep-original' || this.value == 'sugar-milk') {
        price.glazeAdd = 0.0;
    }
    else if(this.value == 'vanilla-milk') {
        price.glazeAdd = 0.5;
    }
    else if(this.value == 'double-chocolate') {
        price.glazeAdd = 1.5;
    }
    else {
        console.log('Something went wrong with glaze dropdown');
    }

    console.log("Glaze add is now " + price.glazeAdd);

    displayPrice(price);
}

// Update for size dropdown
function onSizeChange() {
    // Print console message to confirm option
    console.log('Size changed to ' + this.value);

    if(this.value == '1') {
        price.sizeMultiplier = 1.0;
    }
    else if(this.value == '3') {
        price.sizeMultiplier = 3.0;
    }
    else if(this.value == '6') {
        price.sizeMultiplier = 5.0;
    }
    else if(this.value == '12') {
        price.sizeMultiplier = 10.0;
    }
    else {
        console.log('Something went wrong with size dropdown');
    }

    console.log("Size multiplier is now " + price.sizeMultiplier);

    displayPrice(price);
}


// Get rollType
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get('roll');
//console.log(rollType);
//console.log(rolls[rollType]);

// Change PRODUCT banner depending on rollType
let productBannerElem = document.querySelector('#product-banner');
if (productBannerElem != null){
    productBannerElem.innerHTML = rollType + " cinnamon roll";
}

// Change image depending on rollType
let productImageElem = document.querySelector('.product-image');
productImageElem.src = "images/products/" + rolls[rollType]["imageFile"];
//console.log("images/products/" + rolls[rollType]["imageFile"]);

// Change basePrice depending on rollType
price.basePrice = rolls[rollType]["basePrice"];
//console.log(rolls[rollType]["basePrice"]);

// Section for modifying displayed price
price.priceElement = document.querySelector("#price");
price.glazeElement = document.querySelector("#glazing");
price.sizeElement = document.querySelector("#pack-size");

price.glazeElement.addEventListener('change', onGlazeChange);
price.sizeElement.addEventListener('change', onSizeChange);

displayPrice(price);


// cart Array, and Roll objects to be stored in cart
let cart = [];
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }

    printRoll() {
        console.log("rollType is " + this.type);
        console.log("rollGlazing is " + this.glazing);
        console.log("packSize is " + this.size);
        console.log("basePrice is " + this.basePrice);
    }
}

// Section for adding Rolls to cart
function addToCart(){
    const glazing = price.glazeElement.value;
    //console.log(glazing);
    const sizing = price.sizeElement.value;

    let newRoll = new Roll(rollType, glazing, sizing, price.basePrice);
    //console.log("Created new roll");
    //newRoll.printRoll();
    cart.push(newRoll);
    //console.log("New roll added to cart");

    // print statements
    for(let i=0; i<cart.length; i++) {
        let aRoll = cart[i];
        aRoll.printRoll();
    }
}

let addToCartElem = document.querySelector('#add-cart-button');
addToCartElem.addEventListener('click', addToCart)