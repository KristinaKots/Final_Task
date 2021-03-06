const menuBtn = document.getElementById("menu-btn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function() {
    toggle(nav);
    toggleClasses(menuBtn, "menu-btn--opened", "menu-btn--closed");

});

function toggle(elem) {
    if (elem.classList.contains("hidden")) {
        elem.classList.remove("hidden");
    } else {
        elem.classList.add("hidden");
    }
}

function toggleClasses(elem, class1, class2) {
    if (elem.classList.contains(class1)) {
        elem.classList.remove(class1);
        elem.classList.add(class2);
    } else {
        elem.classList.remove(class2);
        elem.classList.add(class1);
    }
}