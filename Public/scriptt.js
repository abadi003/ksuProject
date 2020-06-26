window.addEventListener("scroll", function () {
document.getElementsByTagName("div")[0].style.height = 100
});
var isHidden = true;
var popup = document.getElementsByClassName("popup");
var login = document.getElementById("login");
var myMenuButton = document.getElementById("my-menu");
var menu = document.getElementsByClassName("menu")
document.addEventListener("mousedown" , function (target) {
    if (!isPopupChildren(target) && !isHidden ){
        popup[0].classList.toggle("fade-out");
        popup[0].addEventListener("animationend" , function (target) {
            if(popup[0].classList.contains("show") && popup[0].classList.contains("fade-out")){
                popup[0].classList.toggle("fade-out");
                popup[0].classList.toggle("show");
            }
        })

        isHidden = true;
    }
    if (!isMenuChildren(target) && menu[0].classList.contains("show-menu")){
        menu[0].classList.toggle("slide-out");
        menu[0].addEventListener("animationend" , function () {
            if (menu[0].classList.contains("show-menu") && menu[0].classList.contains("slide-out")){
                menu[0].classList.toggle("slide-out");
                menu[0].classList.toggle("show-menu");
            }
        })
    }

})

login.addEventListener("click" , function () {
    if (!popup[0].classList.contains("show")){
        popup[0].classList.toggle("show");
        isHidden =false;
    }

});
function isPopupChildren(target) {
    for (let i = 0 ; i < popup[0].childNodes[1].childNodes.length ; ++i){
        if (target.target === popup[0].childNodes[1].childNodes[i]|| target.target === popup[0] ){
            return true;
        }
    }
return false;
}
function isMenuChildren(target) {
    for (let i = 0 ; i < menu[0].childNodes.length ; ++i){
        if (target.target === menu[0].childNodes[i] || target.target === menu[0]){
            return true;
        }
    }
    return false;
}
myMenuButton.addEventListener("click" , function () {
document.getElementsByClassName("menu")[0].classList.toggle("show-menu");
})

