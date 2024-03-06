//Task 1

var animal = {
    name: 'Lion',
    age: 5,
    likes: 'meat',
    
    getInfo: function () {
        for (var key in this) {
            if (typeof this[key] !== 'function') {
                console.log(key + ': ' + this[key]);
            }
        }
    }
};
animal.getInfo();
animal.location = 'Gungle';
animal.getInfo();



//Task2

var services = {
    "стрижка": "60 грн",
    "гоління": "80 грн",
    "Миття голови": "100 грн",
    price: function() {
        var totalPrice = 0;
        for (var key in this) {
            if (typeof this[key] !== 'function') {
                var priceValue = Number(this [key].substring(0, this[key].length - 4));
                totalPrice += priceValue;
            }
        }
        
        return totalPrice;
    },
    minPrice: function() {
        var minPrice = Infinity;
        for (var key in this) {
            if (typeof this[key] !== 'function') {
                var priceValue = Number(this [key].substring(0, this[key].length - 4));
                if (priceValue < minPrice) {
                    minPrice = priceValue;
                }
            }
        }
        return minPrice;
    },
    maxPrice: function() {
        
        var maxPrice = -Infinity;
        for (var key in this) {
            if (typeof this[key] !== 'function') {
                var priceValue = Number(this [key].substring(0, this[key].length - 4));
                if (priceValue > maxPrice) {
                   maxPrice = priceValue;
                }
            }
        }
        return maxPrice;
    }
};

services['Розбити скло'] = "200 грн";

console.log("Загальна вартість послуг: " + services.price() + " грн");
console.log("Мінімальна вартість послуги: " + services.minPrice() + " грн");
console.log("Максимальна вартість послуги: " + services.maxPrice() + " грн");