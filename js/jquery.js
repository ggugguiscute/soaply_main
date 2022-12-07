// $(document).ready(function(){
//     //do something
// }) //not recommended

$(function () {
  //   // Masonry Effect
  //   $(".grid").masonry({
  //     // options
  //     itemSelector: ".grid-item",
  //     //columnWidth: 200,
  //   });

  //const gridBox = $(".grid");

  const getGalleryData = (data) => {
    // console.log(data);
    let items = [];
    $.each(data, function (i, item) {
      // console.log(i);
      //console.log(item);
      const galleryItems = `<div class="grid-item">
        <img src="/main_project/images/${item.datamain}" alt="" />`;

      items.push($(galleryItems).get(0));
    });
    $(".grid").append(items);
    $(".grid").imagesLoaded(function () {
      // Masonry Effect
      $(".grid").masonry({
        // options
        itemSelector: ".grid-item",
        //columnWidth: 200,
      });
    });
  };

  $.getJSON("/main_project/data/gallery.json", getGalleryData);

  // navigation moving to target section
  $(".nav-lists li").on("click", function () {
    const targetIdx = $(this).index();
    //console.log(targetIdx);
    const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
    $("html, body").animate({ scrollTop: pagePosition }, 300);
  });
}); //recommended
