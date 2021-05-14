function Hamburger(size, stuffing) {
  this.sizeItem = size.sizeItem;
  this.stuffingItem = stuffing.stuffingItem;
  this.price = size.price + stuffing.price;
  this.calories = size.calories + stuffing.calories
}

Hamburger.SIZE_SMALL = {
  price: 50,
  calories: 20,
  sizeItem: 'small'
}

Hamburger.SIZE_LARGE = {
  price: 100,
  calories: 40,
  sizeItem: 'large'
}

Hamburger.STUFFING_CHEESE = {
  price: 10,
  calories: 20,
  stuffingItem: ''
}

Hamburger.STUFFING_SALAD = {
  price: 20,
  calories: 5,
  stuffingItem: 'salad'
}

Hamburger.STUFFING_POTATO = {
  price: 15,
  calories: 10,
  stuffingItem: 'potato'
}

Hamburger.prototype.getSize = function() {
  return this.sizeItem;
}

Hamburger.prototype.getStuffing = function() {
  return this.stuffingItem;
}

Hamburger.prototype.calculatePrice = function() {
  return this.price;
}

Hamburger.prototype.calculateCalories = function() {
  return this.calories;
}

let hamburgerOrdered = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
console.log(hamburgerOrdered);
console.log(`method getSize result: ${hamburgerOrdered.getSize()}`);
console.log(`method getStuffing result: ${hamburgerOrdered.getStuffing()}`);
console.log(`calculatePrice result: ${hamburgerOrdered.calculatePrice()}`);
console.log(`calculateCalories result: ${hamburgerOrdered.calculateCalories()}\n`);

function Salad(name, weight) {
  this.nameItem = name.nameItem;
  this.weightItem = weight;
  this.weightUnit = 100;
  this.price = name.price;
  this.calories = name.calories;
}

Salad.NAME_CESAR = {
  price: 100,
  calories: 20,
  nameItem: 'Cesar'
}

Salad.NAME_OLIVIER = {
  price: 50,
  calories: 80,
  nameItem: 'Olivier'
}

Salad.prototype.getName = function() {
  return this.nameItem;
}

Salad.prototype.getWeight = function() {
  return this.weightItem;
}

Salad.prototype.calculatePrice = function() {
  return this.price * this.weightItem / this.weightUnit;
}

Salad.prototype.calculateCalories = function() {
  return (this.calories * this.weightItem) / this.weightUnit;
}

let saladOrdered = new Salad(Salad.NAME_CESAR, 500);
console.log(saladOrdered);
console.log(`method getName result: ${saladOrdered.getName()}`);
console.log(`method getWeight result: ${saladOrdered.getWeight()}`);
console.log(`calculatePrice result: ${saladOrdered.calculatePrice()}`);
console.log(`calculateCalories result: ${saladOrdered.calculateCalories()}\n`);

function Drink(name) {
  this.nameItem = name.nameItem;
  this.price = name.price;
  this.calories = name.calories;
}

Drink.NAME_COLA = {
  price: 50,
  calories: 40,
  nameItem: 'Coca-Cola'
}

Drink.NAME_COFFEE = {
  price: 80,
  calories: 20,
  nameItem: 'Coffee'
}

Drink.prototype.getName = function() {
  return this.nameItem;
}

Drink.prototype.calculatePrice = function() {
  return this.price;
}

Drink.prototype.calculateCalories = function() {
  return this.calories;
}

let drinkOrdered = new Drink(Drink.NAME_COFFEE);

console.log(drinkOrdered);
console.log(`method getName result: ${drinkOrdered.getName()}`);
console.log(`calculatePrice result: ${drinkOrdered.calculatePrice()}`);
console.log(`calculateCalories result: ${drinkOrdered.calculateCalories()}\n\n`);

function MakeOrder() {
  //this.order = [];
  this.orderClosed = false;
  this.order = Array.prototype.slice.call(arguments);
}

let order1 = new MakeOrder(hamburgerOrdered, saladOrdered, drinkOrdered);
console.log(order1);

MakeOrder.prototype.calculateTotalPrice = function(){
  return this.order.reduce( (sum, item) => {
    return sum + item.calculatePrice();
  },0);
}

console.log(`total price of order: ${order1.calculateTotalPrice()}`);

MakeOrder.prototype.calculateTotalCalories = function(){
  return this.order.reduce( (sum, item) => {
    return sum + item.calculateCalories();
  },0);
}

console.log(`total calories of order: ${order1.calculateTotalCalories()}`);

MakeOrder.prototype.closed = function() {
  this.orderClosed = true;
}

MakeOrder.prototype.addItem = function(item) {
  if (!this.orderClosed) {
    this.order.push(item);
    
  }
};

order1.addItem(hamburgerOrdered);
console.log('\n\nAfter adding item:')
console.log(order1);

MakeOrder.prototype.deleteItem = function(item) {
  if (this.orderClosed) {
    console.log('Order closed');
  } else {
    let idx = this.order.indexOf(item);
    this.order = this.order.slice(0, idx).concat(this.order.slice(idx+1));
  }
}

order1.deleteItem(drinkOrdered);
console.log('\n\nAfter deleting item - drink:')
console.log(order1);

order1.closed();
console.log('After method closed orderClosed:')
console.log(order1.orderClosed);