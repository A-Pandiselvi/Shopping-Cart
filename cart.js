var btncart=document.querySelector(".cart-icon")
var cart = document.querySelector('.cart')
var btnclose = document.querySelector(".x-close")


btncart.addEventListener('click', () =>{
  cart.style.right = '0'
})

btnclose.addEventListener('click',() =>{
  cart.style.right='-65%'
})

document.addEventListener('DOMContentLoaded',Loadfood)

function Loadfood(){
  LoadContent();
 
}

function LoadContent(){
  //Remove food item form cart
  var btndelete = document.querySelectorAll('.cart-delete')
  btndelete.forEach((btn) => {
    btn.addEventListener('click',removeitem)
  })

  //product item change event  -- quantity item
  var quantity = document.querySelectorAll('.cart-quality')
  quantity.forEach((input) => {
    input.addEventListener('change',changeQty)
  })

  //click the image and add to cart
  var cartbtn= document.querySelectorAll('.add-to-cart')
  cartbtn.forEach((btn) => {
    btn.addEventListener('click',addCart)
  })
  updatetotal()
}

// ------------

//remove one by one item
function removeitem(){
  if(confirm('Are you Sure you want delete the item')){

    //entha 2 lines vathu itemlist ku
var title = this.parentElement.querySelector('.cart-food-title').innerHTML;
itemlist=itemlist.filter((el) => el.foodtitle != title)

  this.parentElement.remove()
  LoadContent()
}
}

//Qualtity item
function changeQty(){
if(isNaN(this.value) || this.value < 1){
this.value = 1;  

}
LoadContent()
}



var itemlist = []

//Add cart to side bar
function addCart(){
  var food =this.parentElement;
  var foodtitle = food.querySelector('.foot-title')
  .innerHTML;
  var foodprice = food.querySelector('.foot-price').innerHTML;
  var foodimg = food.querySelector('.food-img').src;
  //console.log(foodtitle,foodprice,foodimg)

let newproduct ={foodtitle,foodprice,foodimg}
//check product alredy exit in cart
if(itemlist.find((el)=> el.foodtitle == newproduct.foodtitle)){
  alert('Product Already added in Cart')
  return;
}else{
  itemlist.push(newproduct)
}



 var onefoodcar =  createcartProduct(foodtitle,foodprice,foodimg)
 var element = document.createElement('div')
 element.innerHTML=onefoodcar
var cartbasket = document.querySelector(".cart-content")
cartbasket.append(element)
LoadContent();

}

function createcartProduct(foodtitle,foodprice,foodimg){
   // oru food cart 
  return `
<div class="cart-box">
    <img class="cart-img" src="${foodimg}"/>
   <div class="datile-box">
    <div class="cart-food-title">${foodtitle}</div>
    <div class="price-box">
    <div style="display: flex;">
        <div >Rs.</div>
        <div class="cart-price">${foodprice}</div>
        </div>
        <div class="cart-amt">${foodprice}</div>
    </div>
    <input type="number" name="" value='1' class="cart-quality" id="">
   </div>
   <div class="cart-delete"><i class="fa-solid fa-trash"></i></i></div>
</div>
   `
  // oru food cart 
}


//cart value update 
function updatetotal(){
   const cartItems=document.querySelectorAll('.cart-box')
   const totalamt= document.querySelector('.total-price')

   let totals = 0;

   cartItems.forEach(product =>{
    let priceElement =product.querySelector('.cart-price')
    //let price =parseFloat(priceElement.innerHTML.replace("Rs.",""));
    let price= priceElement.innerHTML
    //let prices = price.replace('RS.', '')
    let qty = product.querySelector('.cart-quality').value;
console.log(qty)
 console.log( price)
    totals += (price*qty);
     product.querySelector('.cart-amt').innerText ='Rs.' + ( price*qty )
   
    })
  totalamt.innerHTML='Rs.'+totals

  //Add product count in cart Icon
  const cartcount = document.querySelector('.cart-count')
  const count = itemlist.length;
  cartcount.innerHTML=count

  if(count==0){
    cartcount.style.display='none'
  }
  else{
    cartcount.style.display='block'

  }

}

//place order
var cartbox = document.querySelectorAll('.cart-box')


var place = document.querySelector('.place-order')
place.addEventListener('click',()=>{
  alert("Your order successfully")
})


// search list 
var eightbox = document.getElementById('shop')
var search = document.getElementById('filter')
var productlist = eightbox.querySelectorAll(".food-box")

search.addEventListener('keyup', function(event){
  var entervalue = event.target.value.toUpperCase()

  for(counts = 0; counts<productlist.length ; counts=counts+1){
    var productname = productlist[counts].querySelector('.foot-title').textContent

    if(productname.toUpperCase().indexOf(entervalue) <0 ){
      productlist[counts].style.display='none'
    }
    else{
      productlist[counts].style.display='block'
    }
  }
})


// --------------

// filter section 
// filterObjects('all');

// function filterObjects(c){
//   var x,i;
//   x = document.getElementsByClassName('food-box')
//   if(c== 'all') c = '';
//   for(i = 0 ; i < x.length ; i++){
//     removeClass(x[i] , 'show');
//     if(x[i].className.indexOf(c) > -1) addClass(x[i], 'show')
//   }
// }

// function addClass(element, name){
//   var i, arr1,arr2;
//   arr1 = element.className.split('');
//   arr2 = name.split('');
//   for(i=0 ; i<arr2.length; i++){
//     if(arr1.indexOf(arr2[i])  == -1) {
//       element.className += '' + arr2[i];
//     }
//   }
// }

// function removeClass(element, name){
//   var i, arr1, arr2;
//   arr1= element.className.split('');
//   arr2 = name.split('');
//   for(i=0 ; i<arr2.length ; i++){
//     while(arr1.indexOf(arr2[i]) > -1){
//       arr1.splice(arr1.indexOf(arr2[i]) , 1)
//     }
//   }
//   element.className = arr1.join('');
// }


// 2-part 

const filterButtons = document.querySelectorAll('.buttons button')
const filterablecards = document.querySelectorAll('.shop-container .food-box')

//console.log(filterButtons, filterablecards)

//Define the filtercards function
const filtercards = e =>{
  document.querySelector('.btns').classList.remove('btns')
  e.target.classList.add('btns')
        console.log(e.target)

        //Iterate over each filterable card
filterablecards.forEach(cart => {
  //Add 'hide' class to hide the card initially
  cart.classList.add('hide');
  //check if the card matches the slected filter or 'all' is selected
  if(cart.dataset.name === e.target.dataset.name || e.target.dataset.name === 'all')
    cart.classList.remove('hide');

  })
}



//add click event listener to each filter button
filterButtons.forEach(button => button.addEventListener('click', filtercards))