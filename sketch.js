var dog,sadDog,happyDog;
var foodS,foodStock;
var fedTime,lastFed;
var feed,addFood;
var foodobj;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  foodobj=new Food();
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  

  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

feed=createButton('Feed the Dog');
feed.position(700,95);
feed.mousePressed(feedDog);

addFood=createButton('Add Food');
addFood.position(800,95);
addFood.mousePressed(addFood);
}

function draw() {
  background(46,139,87);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  if(foodobj.getFoodStock<=0){
    foodobj.updateFoodStock(foodobj.getFoodStock()*0);
  }
  else{
    foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  }
  database.ref('/').update({
    Food:foodobj.getFoodStock(),
    feedTime:hour()
  })
}

//function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}