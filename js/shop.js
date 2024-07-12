let cardContainer = document.querySelector("#cardContainer");

// function addProducts() {
//     products.forEach(
//         individualCard => cardContainer.innerHTML += 
//         `
//         <div class="card" id="cardNumber${individualCard.id}">
//             <img src="${imagePath}${individualCard.image}" alt="${individualCard.description}">
//             <div class="cardText">
//                 <h4>${individualCard.name}</h4>
//                 <p>${individualCard.description}</p>
//                 <p>&dollar; ${individualCard.price}</p>
//                 <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
//             </div>
//         </div>
//         `
//     );
// }
// addProducts();

let productsPerPage = 6;
let currentPage = 1;
let pagedResults = [];
let totalProducts = products.length;
console.log(((currentPage * productsPerPage) >= totalProducts)? true : false);
function paginate() {
    let end = currentPage*productsPerPage;
    let start = end - productsPerPage;
    pagedResults = products.slice(start, end);
    $('#cardContainer').empty();
    $(pagedResults).each((index, individualCard)=>{
        $('#cardContainer').append(
            `
            <div class="card" id="cardNumber${individualCard.id}">
                <img src="${imagePath}${individualCard.image}" alt="${individualCard.description}">
                <div class="cardText">
                    <h4>${individualCard.name}</h4>
                    <p>${individualCard.description}</p>
                    <p>&dollar; ${individualCard.price}</p>
                    <button class="cartButton" id="${individualCard.id}">Add to Cart</button>
                </div>
            </div>
            `
        );
    });
    if(currentPage <= 1) {
        $('.previous').attr('disabled', 'true');
    } else {
        $('.previous').removeAttr('disabled');
    }
    if((currentPage * productsPerPage) >= totalProducts) {
        $('.next').attr('disabled', 'true');
    } else {
        $('.next').removeAttr('disabled');
    }
}
paginate();

$('.previous').click(()=>{
    if(currentPage > 1) {
        currentPage--;
        paginate();
        saveToLocalStorage();
        fadeButtons();
    }
});

$('.next').click(()=>{
    if((currentPage * productsPerPage) <= totalProducts) {
        currentPage++;
        paginate();
        saveToLocalStorage();
        fadeButtons();
    }
});

function saveToLocalStorage() {
    let cartButton = document.getElementsByClassName("cartButton");
    for (let i = 0; i < cartButton.length; i++) {
        cartButton[i].addEventListener('click', function() {
            let selectedProduct = products.find((product) => product.id == cartButton[i].id);
            let cartItemSearch =  cart.find((cartItem) => cartItem.id == selectedProduct.id);
            if(cartItemSearch) {
                cartItemSearch.quantity++;
            } else {
                cart.push(selectedProduct);
            }
            localStorage.setItem('CART', JSON.stringify(cart));
            displayCart();
        });
    }
}
saveToLocalStorage();

function displayCart() {
    clearStorageAndCart();
    sideBarContainer.innerHTML = "";
    cart.forEach(
        cartItem => sideBarContainer.innerHTML +=
        `
        <div class="tableRow">
            <div class="tableCell">${cartItem.name}</div>
            <div class="tableCell">&dollar; ${cartItem.price}</div>
        </div>
        <div class="tableRow">
            <div class="tableCell borderBottom">
                <input class="quantityNumberInput" id="${cartItem.id}" type="number" value="${cartItem.quantity}" min="1" max="5">
            </div>
            <a class="tableCell borderBottom removeLink" href="#" id="${cartItem.id}">Remove</a>
        </div>
        `
    );
    removeFromCart();
    updateQuantity();
}
displayCart();

let checkoutButton = document.getElementById('checkoutButton');
checkoutButton.addEventListener('click', function() {
    window.location.assign('cart.html');
});