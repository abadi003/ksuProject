// var myMenuButton = document.getElementById("my-menu-button");
// var menu = document.getElementById("menu")
// document.addEventListener("mousedown" , function (target) {
//     if (!isMenuChildren(target) && !menu.classList.contains("show-menu")){
//         menu.classList.remove("slide-out");
//         menu.classList.add("slide-back");
//         menu.addEventListener("animationend" , function () {
//             if (!menu.classList.contains("slide-out")){
//             console.log("hi")
//             menu.classList.add("show-menu");
//             menu.classList.remove("slide-back");  
//             myMenuButton.classList.remove("show-menu");
//             }
                
//         })

//     }

// })

// function isMenuChildren(target) {
//     for (let i = 0 ; i < menu.childNodes.length ; ++i){
//         if (target.target === menu.childNodes[i] || target.target === menu){
//             return true;
//         }
//     }
//     return false;
// }
// myMenuButton.addEventListener("click" , function () {
// menu.classList.add("slide-out");
// menu.classList.remove("show-menu");
// myMenuButton.classList.add("show-menu");
// })

$(".add").click(function(){
    $.post("/add_to_cart",{
        url:$(this).val()
    } , function(result){
        $("body").html(result)
    })
  });
  $(".search").keyup(function(){
     let searched =  $(this).val()
    $.post("/search",{
        searched: searched
    },function(result){
        searched = $(".search").val();
        $("body").html(result);
        $(".search").val(searched);
        $(".search").focus();
    })
  })
  $(".category").click(function(){
    $.post("/get_from_category",{
        category:$(".categoryName").text()
    } , function(result){
        $("body").html(result)
    })
  });

