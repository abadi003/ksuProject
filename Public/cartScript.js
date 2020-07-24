$(".searchButton").click(function(){
    let searched =  $(".search").val()
   $.post("/search",{
       searched: searched
   },function(result){
       location.href = "/"
       $("body").html(result);
   })
 })
 $(".delete").click(function(){
     $.post("/cart" , {
         delete: $(this).val()
     }, function(result){
         $("body").html(result)
     })
 })
 $(".category").click(function(){
    $.post("/get_from_category",{
        category:$(".categoryName").text()
    } , function(result){
        $("body").html(result)
    })
  });
