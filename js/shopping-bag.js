const data = window.catalog;
const buyBtn = document.getElementById("buy-btn");
const emptyBagBtn = document.getElementById("empty-btn");
const shoppingBag = document.getElementById("shopping-bag");

const bagPriceBlock = document.getElementsByClassName("shopping-bag-link__price")[0];
const bagPrice = document.getElementById("header-bag-price");
const bagCounter = document.getElementById("bag-counter");
const totalPrice = document.getElementById("total-price");

function discardTotalPricesAndQuantity() {
    bagPriceBlock.classList.add("hidden");
    bagCounter.innerText = "0";
    totalPrice.innerText = "0";
}

function setMessageInShoppingBag(message) {
    shoppingBag.innerHTML = "<p class='shopping-bag__message'>" + message + "</p>";
}

buyBtn.addEventListener("click", function () {
    let message = "Thank you for your purchase!";
    setMessageInShoppingBag(message);
    discardTotalPricesAndQuantity();
});

emptyBagBtn.addEventListener("click", function () {
    let message = "Your shopping bag is empty. Use Catalog to add new items";
    setMessageInShoppingBag(message);
    discardTotalPricesAndQuantity();
});


shoppingBag.addEventListener("click", function (event) {
    let target = event.target;

    function getDataItem(targetBtn) {
        let itemCaption;

        if (targetBtn.classList.contains("bag-item__delete-btn")) {
             itemCaption = targetBtn.parentElement;
        } else {
            itemCaption = targetBtn.parentElement.parentElement;
        }

        let name = itemCaption.firstElementChild.innerText;

        return data.filter(function (item) {
            if (item.title !== name)  return false;
             return true;

        })[0];
    }

    if (target.classList.contains("bag-item__plus")) {

        let quantity = target.previousElementSibling;
        let quantityValue = quantity.innerText;
        quantity.innerText = +quantityValue + 1;

        (function increaseTotalPriceAndQuantity() {
            let dataItem = getDataItem(target);
            console.log(dataItem);
            let price = dataItem.discountedPrice;
            let currentTotalPrice = +totalPrice.innerText;

            bagCounter.innerText = +bagCounter.innerText + 1;
            bagPrice.innerText = (currentTotalPrice + price).toFixed(2);
            totalPrice.innerText = (currentTotalPrice + price).toFixed(2);
        })();
    }

    if (target.classList.contains("bag-item__minus")) {

        let quantity = target.nextElementSibling;
        let quantityValue = quantity.innerText;
        if ((+quantityValue) === 1) return;
        quantity.innerText = +quantityValue - 1;

        (function decreaseTotalPriceAndQuantity() {

            let dataItem = getDataItem(target);
            let price = dataItem.discountedPrice;
            let currentTotalPrice = +totalPrice.innerText;

            bagCounter.innerText = +bagCounter.innerText - 1;
            bagPrice.innerText = (currentTotalPrice - price).toFixed(2);
            totalPrice.innerText = (currentTotalPrice - price).toFixed(2);
        })();
    }

    if (target.classList.contains("bag-item__delete-btn")) {

        (function decreaseTotalPriceAndQuantity() {
            let dataItem = getDataItem(target);
            let price = dataItem.discountedPrice;
            let currentTotalPrice = +totalPrice.innerText;
            let quantity = target.parentElement
                .getElementsByClassName("bag-item__quantity-number")[0].innerText;

            bagCounter.innerText = +bagCounter.innerText - +quantity;
            bagPrice.innerText = (currentTotalPrice - (price * +quantity)).toFixed(2);
            totalPrice.innerText = (currentTotalPrice - (price * +quantity)).toFixed(2);
        })();

        (function removeItemFromShoppingBag() {
            let item = target.parentElement.parentElement.parentElement;
            item.classList.add("hidden");
        })();
    }
});