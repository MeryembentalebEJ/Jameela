$(document).ready(function () {
  $('#search-icon').click(function () {
    $(this).toggleClass('fa-times'); //saerch icon changes to X
    $('#search-box').toggleClass('active');
  });
  $('#menu').click(function () {
    $('.navbar').toggleClass('nav-toggle');
  });
  // the navbar, search icon and saerch-box dissapear while scrolling
  $(window).on('scroll load', function () {
    $('#search-icon').removeClass('fa-times');
    $('#search-box').removeClass('active');
    $('.navbar').removeClass('nav-toggle');
    if ($(window).scrollTop() > 0) {
      $('header').addClass('sticky');
    } else {
      $('header').removeClass('sticky');
    }
  });
});

var suggestions =
  ['Beauty', 'Tote bags', 'Plage', 'Sunglasses', 'Lunettes', 'Sac', 'Produits', 'Nature', 'Fashion', 'Swimsuits', 'Maillo de bain', 'Summer', 'Argan', 'oil'];
$('#search').autocomplete({
  source: suggestions
});

//==================== Login-sign-up-form ==================
$(document).on('click', '#user,.Already-acount',function(){
   $('.form').addClass('login-active').removeClass('sign-up-active');
});

$(document).on('click', '.sign-up-btn',function(){
  $('.form').addClass('sign-up-active').removeClass('login-active');
});
$(document).on('click', '.form-cancel',function(){
  $('.form').removeClass('login-active').removeClass('sign-up-active');
});

//=============== Login-sign-up-form ======================

$('.small-image img').click(function(){
  var img = $(this).attr('src');
  $('.big-img img').attr('src', img);
});
$('#zoom').imagezoomsl({
 zoomrange: [4,4]
});

 
$('.small img').click(function(){
var img = $(this).attr('src');
$('.hair img').attr('src', img);
});

$('#zoom1').imagezoomsl({
zoomrange: [4,4]
});

$('.sm-img img').click(function(){
var img = $(this).attr('src');
$('.hydratation img').attr('src', img);
});
$('#zoom2').imagezoomsl({
zoomrange: [4,4]
});

$('.pic img').click(function(){
var img = $(this).attr('src');
$('.big img').attr('src', img);
});
$('#zoom3').imagezoomsl({
zoomrange: [4,4]
});

$('.pics img').click(function(){
var img = $(this).attr('src');
$('.picture img').attr('src', img);
});
$('#zoom4').imagezoomsl({
zoomrange: [4,4]
});




// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function () {
  // =============================
  // Private methods and propeties
  // =============================
  cart = [];

  // Constructor
  function Item(name, price, count) {
    this.name = name;
    this.price = price;
    this.count = count;
  }

  // Save cart
  function saveCart() {
    sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
  }
  if (sessionStorage.getItem("shoppingCart") != null) {
    loadCart();
  }

  // =============================
  // Public methods and propeties
  // =============================
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count);
    cart.push(item);
    saveCart();
  }
  // Set count from item
  obj.setCountForItem = function (name, count) {
    for (var i in cart) {
      if (cart[i].name === name) {
        cart[i].count = count;
        break;
      }
    }
  };
  // Remove item from cart
  obj.removeItemFromCart = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart[item].count--;
        if (cart[item].count === 0) {
          cart.splice(item, 1);
        }
        break;
      }
    }
    saveCart();
  }

  // Remove all items from cart
  obj.removeItemFromCartAll = function (name) {
    for (var item in cart) {
      if (cart[item].name === name) {
        cart.splice(item, 1);
        break;
      }
    }
    saveCart();
  }

  // Clear cart
  obj.clearCart = function () {
    cart = [];
    saveCart();
  }

  // Count cart 
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  }

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += cart[item].price * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  }

  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
        itemCopy[p] = item[p];

      }
      itemCopy.total = Number(item.price * item.count).toFixed(2);
      cartCopy.push(itemCopy)
    }
    return cartCopy;
  }

  // cart : Array
  // Item : Object/Class
  // addItemToCart : Function
  // removeItemFromCart : Function
  // removeItemFromCartAll : Function
  // clearCart : Function
  // countCart : Function
  // totalCart : Function
  // listCart : Function
  // saveCart : Function
  // loadCart : Function
  return obj;
})();


// *****************************************
// Triggers / Events
// ***************************************** 
// Add item
$('.add-to-cart').click(function (event) {
  event.preventDefault();
  var name = $(this).data('name');
  var price = Number($(this).data('price'));
  shoppingCart.addItemToCart(name, price, 1);
  displayCart();
});

// Clear items
$('.clear-cart').click(function () {
  shoppingCart.clearCart();
  displayCart();
});


function displayCart() {
  var cartArray = shoppingCart.listCart();
  var output = "";
  for (var i in cartArray) {
    output += "<tr>"
      + "<td>" + cartArray[i].name + "</td>"
      + "<td>" + cartArray[i].price + " € </td>"
      + "<td><div class='input-group'><button class='minus-item input-group-addon btn btn-primary' data-name=" + cartArray[i].name + ">-</button>"
      + "<input type='number' class='item-count form-control' data-name='" + cartArray[i].name + "' value='" + cartArray[i].count + "'>"
      + "<button class='plus-item btn btn-primary input-group-addon' data-name=" + cartArray[i].name + ">+</button></div></td>"
      + "<td><button class='delete-item btn btn-danger' data-name=" + cartArray[i].name + ">X</button></td>"
      + " = "
      + "<td>" + cartArray[i].total + " €</td>"
      + "</tr>";
  }
  $('.show-cart').html(output);
  $('.total-cart').html(shoppingCart.totalCart());
  $('.total-count').html(shoppingCart.totalCount());
}

// Delete item button

$('.show-cart').on("click", ".delete-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCartAll(name);
  displayCart();
})


// -1
$('.show-cart').on("click", ".minus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.removeItemFromCart(name);
  displayCart();
})
// +1
$('.show-cart').on("click", ".plus-item", function (event) {
  var name = $(this).data('name')
  shoppingCart.addItemToCart(name);
  displayCart();
})

// Item count input
$('.show-cart').on("change", ".item-count", function (event) {
  var name = $(this).data('name');
  var count = Number($(this).val());
  shoppingCart.setCountForItem(name, count);
  displayCart();
});

displayCart();

// Slider of the first page

$(document).ready(function(){
   $('.slider-inner').slick({
      infinit: true,
      slidesToShow: 4, //it controls the number of the pics to show
      slideToScroll: 1,
      centerMode: true,
      centerPadding:'0px',
      arrow: false,
      autoplay: true,
      autopalySpeed: 1000,
      speed: 1500

   });
});
