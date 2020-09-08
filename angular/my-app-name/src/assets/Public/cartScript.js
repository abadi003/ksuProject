// $(".searchButton").click(function(){
//     let searched =  $(".search").val()
//    $.post("/search",{
//        searched: searched
//    },function(result){
//        location.href = "/"
//        $("body").html(result);
//    })
//  })
//  $(".delete").click(function(){
//      $.post("http://localhost:3/cart" , {
//          delete: $(this).val()
//      }, function(result){
//         let newCart = Number(localStorage.getItem("cart count")) 
//         --newCart
//        localStorage.removeItem("cart count")
//        localStorage.setItem("cart count" , newCart)
//      })
//  })
//  $(".category").click(function(){
//     $.post("http://localhost:3/get_from_category",{
//         category:$(".categoryName").text()
//     } , function(result){
        
//     })
//   });
