var header = document.querySelector("header");

window.addEventListener("scroll", function () {

    if (scrollY > 300) {
        header.classList.add("scrolled")

    } else {
        header.classList.remove("scrolled")
    }

});

//  Video

var video = document.querySelector("#video");
var play = document.querySelector("#play");

play.addEventListener("click", function (e) {

        e.preventDefault();

        if (video.paused) {
            video.play();
            play.textContent = "Play Video";
        } else {
            video.pause();

            play.textContent = "Pause Video";
        }
    }

);

// Mobile Navigation

const hamburger = document.querySelector("#hamburger");
const menu = document.querySelector("#menu");

menu.addEventListener("click", () => {
    menu.classList.remove("opened");
    menu.style.top = header.clientHeight + "px";
});

hamburger.addEventListener("click", (e) => {

    e.preventDefault();

    if (menu.classList.contains("opened")) {
        menu.classList.remove("opened");

    } else {

        menu.classList.add("opened");
    }
});

// Form validation

const form = document.querySelector("#contact-form");
const name = form.querySelector("#fname");
const email = form.querySelector("#email");
const errorDiv = form.querySelector(".error");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    console.log(name.value, email.value);

    let error = "";

    // if (name.value && isNaN(name.value)){ // if this and this, chain parameters
    // }

    if (name.value === "") {
        error = "Name field can not be empty";
        errorDiv.textContent = error;
        return false;
    }
    if (email.value === "") {
        error = "Email field can not be empty";
        errorDiv.textContent = error;
        return false;
    }
    if (!email.value.includes("@")) {
        error = "Not a valid email.";
        errorDiv.textContent= error;
        return false;
    }

    console.log(error);

    // TODO: handle submit

    // clears all form fields
    form.reset();

});