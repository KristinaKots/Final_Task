/*----------------------------------------------------------------
-----------------highlighting selected color and size options-----
----------------------------------------------------------------*/
const sizeList = document.getElementsByClassName("item-full__size-list")[0];
const colorList = document.getElementsByClassName("item-full__color-list")[0];

function selectOptionsItem(optionsList, selectedItem) {
    for (let i = 0; i < optionsList.children.length; i++) {
        optionsList.children[i].classList.remove("item-full__option-item--selected");
    }
    selectedItem.classList.add("item-full__option-item--selected");
}

sizeList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        selectOptionsItem(sizeList, event.target);
    }
});
colorList.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
        selectOptionsItem(colorList, event.target);
    }
});


/*----------------------------------------------------------------
-----------------updating total amount and price at header bag-----
//----------------------------------------------------------------*/
const data = window.catalog;
const addToBagButton = document.getElementsByClassName("item-full__add-btn")[0];
const bagCounter = document.getElementById("bag-counter");
const bagPrice = document.getElementById("bag-price");

addToBagButton.addEventListener("click", function () {

    (function showBagPriceBlock() {
        const bagPriceBlockElem = document.getElementsByClassName("shopping-bag-link__price")[0];
        bagPriceBlockElem.classList.remove("hidden");
    })();

    (function updateBagCounter() {
        let bagCounterValue = bagCounter.textContent;
        bagCounter.textContent = +bagCounterValue + 1;
    })();


    function getDataItem() {
        let name = document.getElementsByClassName("item-full__name")[0].innerText;
        return data.filter(function (item) {
            if (item.title === name) return true;
        })[0];
    }
    
    (function updateBagTotalPrice() {
        let dataItem = getDataItem();
        let itemPrice = dataItem.discountedPrice;

        let bagPriceCurrentValue = bagPrice.textContent;
        bagPrice.textContent = (+bagPriceCurrentValue + (+itemPrice)).toFixed(2);
    })();
});
