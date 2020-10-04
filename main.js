if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready () {
    let removeItemBtns = document.getElementsByClassName('btn-danger');
    for (let i = 0; i < removeItemBtns.length; i++) {
        let btn = removeItemBtns[i];
        btn.addEventListener('click', removeCartItem)
    }

    let quantityInputs = document.getElementsByClassName('item-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChange)
    }

    let addToCartBtns = document.getElementsByClassName('btn-primary');
    for (let i = 0; i < addToCartBtns.length; i++) {
        let btn = addToCartBtns[i];
        btn.addEventListener('click', addToCartClick)
    }
}

function removeCartItem(e) {
    let btnClick = e.target;
    btnClick.parentElement.parentElement.remove();
    updateTotal();
}

function quantityChange(e) {
    let input = e.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal();
}

function addToCartClick(e) {
    let btn = e.target;
    let shopItem = btn.parentElement.parentElement.parentElement;
    let shopItemBody = btn.parentElement.parentElement;
    let title = shopItemBody.getElementsByClassName('card-title')[0].innerText;
    let price = shopItemBody.getElementsByClassName('price')[0].innerText;
    let imgSrc = shopItem.getElementsByClassName('card-img-top')[0].src;
    addItemToCart(title, price, imgSrc);
    updateTotal();
}

function addItemToCart(title, price, imgSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('row', 'cart-row', 'mb-3');
    let cartItems = document.getElementsByClassName('cart-container')[0];
    let cartItemTitle = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemTitle.length; i++) {
        if (cartItemTitle[i].innerText == title) {
            alert('This item is already added to the cart')
            return;
        }
    }
    let cartRowContents = `
        <div class="col-4 col-sm-6 d-flex align-items-center">
            <img src="${imgSrc}" alt="" class="mr-4">
            <span class="cart-item-title">${title}</span>
        </div>
        <div class="col-3 col-sm-2 d-flex align-items-center">
            <span class="item-price">${price}</span>
        </div>
        <div class="col-5 col-sm-4 d-flex align-items-center">
            <input type="number" value="1" class="item-quantity mr-4 ml-auto">
            <button type="button" class="btn btn-danger"><i class="fa fa-trash"></i></button>
        </div>`
    cartRow.innerHTML = cartRowContents;
    cartItems.prepend(cartRow);
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('item-quantity')[0].addEventListener('change', quantityChange);
}

let removeItemBtns = document.getElementsByClassName('btn-danger');
for (let i = 0; i < removeItemBtns.length; i++) {
    let btn = removeItemBtns[i];
    btn.addEventListener('click', function(e) {
        let btnClick = e.target;
        btnClick.parentElement.parentElement.remove();
        updateTotal();
    })
}

function updateTotal() {
    let cartContainer = document.getElementsByClassName('cart-container')[0];
    let cartRows = cartContainer.getElementsByClassName('cart-row');
    let total = 0;

    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('item-price')[0];
        let quantityElement = cartRow.getElementsByClassName('item-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerHTML = `
        <strong><h2>Total</h2></strong>
        <span class="ml-auto"><h3>$${total}</h3></span>`
}