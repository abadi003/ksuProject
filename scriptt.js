window.addEventListener("scroll", function () {
document.getElementsByTagName("div")[0].style.height = 100
});
var isHidden = true;
var popup = document.getElementsByClassName("popup");
var login = document.getElementById("login");
document.addEventListener("mousedown" , function (target) {
    if (!isPopupChildren(target) && !isHidden && target.target!==login ){
        popup[0].classList.toggle("show");
        isHidden = true;
    }
})
document.getElementById("login").addEventListener("click" , function () {
document.getElementsByTagName("div")[1].classList.toggle("show");
isHidden =false;
});
function isPopupChildren(target) {
    for (let i = 0 ; i < popup[0].childNodes.length ; ++i){
        if (target.target === popup[0].childNodes[i] || target.target === popup[0]){
            return true;
        }
    }
return false;
}