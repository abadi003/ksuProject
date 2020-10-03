let item;
if (window.innerWidth < 765) {
  $(".nav-item").on({
    click: function (event) {
      setTimeout(() => {
        console.log(event.target.className);
        if (item) {
          event.stopPropagation();
          if (item.height() == window.innerHeight - 80) {
            // item.css("top" , 2)
            item
              .find(".bg-white.py-2.collapse-inner.rounded")
              .removeClass("scroll_menu");
          }
          item.css("display", "none");
          item.css("position", "initial");
        }
        if (event.target.className == "collapse-item") {
          return;
        }
        var position = $(this).offset();
        if (
          $(this).find(".collapse").height() +
            $(this).get(0).getBoundingClientRect().top >=
          window.innerHeight
        ) {
          if ($(this).find(".collapse").height() >= window.innerHeight - 80) {
            $(this).find(".collapse").css("top", 80);
            $(this)
              .find(".collapse")
              .find(".bg-white.py-2.collapse-inner.rounded")
              .addClass("scroll_menu");
          } else {
            $(this)
              .find(".collapse")
              .css(
                "top",
                window.innerHeight - $(this).find(".collapse").height()
              );
          }
        } else {
          $(this)
            .find(".collapse")
            .css("top", $(this).get(0).getBoundingClientRect().top);
        }
        $(this)
          .find(".collapse")
          .css("left", position.left + 104);
        $(this).find(".collapse").css("position", "fixed");
        $(this).find(".collapse").css("display", "inherit");
        item = $(this).find(".collapse");
      }, 60);
    },
    mouseleave: function (event) {
      event.stopPropagation();
      if ($(this).find(".collapse").height() == window.innerHeight - 80) {
        // item.css("top" , 2)
        $(this)
          .find(".collapse")
          .find(".bg-white.py-2.collapse-inner.rounded")
          .removeClass("scroll_menu");
      }
      $(this).find(".collapse").css("display", "none");
      $(this).find(".collapse").css("position", "initial");
    },
  });
}
