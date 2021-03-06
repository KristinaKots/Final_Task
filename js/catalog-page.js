/*----------------------------------------------------------------
-----------------OPEN/CLOSE FILTERS-------------------------------
----------------------------------------------------------------*/
const filterBtn = document.getElementById("filters-btn");
const filtersMobile = document.getElementById("filters");
const filtersOpenIcon = document.getElementById("filters-open-icon");

filterBtn.addEventListener("click", function () {
    toggle(filtersMobile);
    filterBtn.classList.toggle("filters-btn--closed");
    toggle(filtersOpenIcon);
});

/*----------------------------------------------------------------
-----------dynamic catalog items & promo block rendering-----------
----------------------------------------------------------------*/
function filterData(data) {
    return data.filter(function (item) {
        return item.category === "women" && item.fashion === "Casual style";
    });
}

function sortDataByDate(data) {
    data.sort(function (a, b) {
        if (a.dateAdded < b.dateAdded) return 1;
        if (a.dateAdded > b.dateAdded) return -1;
        return 0;
    });
}

const data = window.catalog;
const filteredData = filterData(data);
sortDataByDate(filteredData);

const catalogList = document.getElementsByClassName("catalog__list")[0];
const itemTemplate = document.getElementById('item-template').innerHTML;
const promoTemplate = document.getElementById("promo-template").innerHTML;


(function () {

    renderShoppingListItems();
    window.addEventListener("resize", setTimeoutForEventHandler, false);

    var resizeTimeout;

    function setTimeoutForEventHandler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                renderShoppingListItems();
            }, 66);
        }
    }

    function renderShoppingListItems() {
        catalogList.innerHTML = "";
        var finalHTML = "";

        var maxWidth = Math.max(window.innerWidth, document.documentElement.clientWidth);

        filteredData.forEach(function (item, i) {
            if ((i === 2 && maxWidth <= 767) ||
                (i === 3 && maxWidth >= 768 && maxWidth <= 1024) ||
                (i === 4 && maxWidth > 1024)) {
                finalHTML += promoTemplate;
            }
            finalHTML += _.template(itemTemplate)(filteredData[i]);

        });
        catalogList.innerHTML = finalHTML;
    }
})();

/*----------------------------------------------------------------
-----------------highlighting selected list item------------------
----------------------------------------------------------------*/
const filters = document.getElementById("filters");
const selectedFashion = document.getElementById("selected-fashion");
const selectedType = document.getElementById("selected-type");
const selectedColor = document.getElementById("selected-color");
const selectedBrand = document.getElementById("selected-brand");
const selectedSize = document.getElementById("selected-size");
const selectedPrice = document.getElementById("selected-price");


filters.addEventListener("click", function(event) {

    if (event.target.tagName === "LI") {

        let selectedItem = event.target;
        let list = event.target.parentElement;
        let heading = list.previousElementSibling.firstElementChild;
        let selectedHeading = list.previousElementSibling.lastElementChild;
        let filter = list.previousElementSibling.parentElement;

        if (selectedItem !== list.firstElementChild) {
            selectedHeading.innerText = selectedItem.innerText;
            filter.classList.add("filter--selected");
        } else {
            selectedHeading.innerText = "";
            filter.classList.remove("filter--selected");

        }

        function updateSelectedFiltersString(selectedOption) {
            if (selectedItem !== list.firstElementChild) {
                selectedOption.innerText = selectedItem.innerText + ",";
                selectedOption.classList.add("selected-filters__item-selected");
            } else {
                selectedOption.innerText = heading.innerText + ",";
                selectedOption.classList.remove("selected-filters__item-selected");
            }
        }

        if (list.classList.contains("filter-fashion__list")) {
            updateSelectedFiltersString(selectedFashion);
        }
        if (list.classList.contains("filter-type__list")) {
            updateSelectedFiltersString(selectedType);
        }
        if (list.classList.contains("filter-color__list")) {
            updateSelectedFiltersString(selectedColor);
        }
        if (list.classList.contains("filter-brand__list")) {
            updateSelectedFiltersString(selectedBrand);
        }
        if (list.classList.contains("filter-size__list")) {
            updateSelectedFiltersString(selectedSize);
        }
        if (list.classList.contains("filter-price__list")) {
            updateSelectedFiltersString(selectedPrice);
        }

        (function selectAndHighlightItem() {
            for (let i = 0; i < list.children.length; i++) {
                list.children[i].classList.remove("filter__item--active");
                list.children[i].classList.remove("filter__item--not-selected");
            }
            if (selectedItem === list.firstElementChild) {
                selectedItem.classList.add("filter__item--not-selected");
            } else {
                selectedItem.classList.add("filter__item--active");
            }
        })();

    }


});












