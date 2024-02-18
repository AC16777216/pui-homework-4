// UNUSED - An array of all possible glazing options
/* let allGlazes = [
    {
        glazeType: 'keep-original',
        glazePrice: 0.0
    },
    {
        glazeType: 'sugar-milk',
        glazePrice: 0.0
    },
    {
        glazeType: 'vanilla-milk',
        glazePrice: 0.5
    },
    {
        glazeType: 'double-chocolate',
        glazePrice: 1.5
    }
] */

// UNUSED - An array of all possible pack size options
/*let allSizes = [
    {
        sizeType: '1',
        sizePrice: 1.0
    },
    {
        sizeType: '3',
        sizePrice: 3.0
    },
    {
        sizeType: '6',
        sizePrice: 5.0
    },
    {
        sizeType: '12',
        sizePrice: 10.0
    }
]*/

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

price.priceElement = document.querySelector("#price");
price.glazeElement = document.querySelector("#glazing");
price.sizeElement = document.querySelector("#pack-size");

price.glazeElement.addEventListener('change', onGlazeChange);
price.sizeElement.addEventListener('change', onSizeChange);

displayPrice(price);