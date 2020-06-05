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