var header = document.querySelector("header");

window.addEventListener("scroll", function () { // can omit window. as its the top level

    // console.log("it works"); // test

    // console.log(scrollY); // test

    if (scrollY > 300) {
        header.classList.add("scrolled")

    } else {
        header.classList.remove("scrolled")
    }

});