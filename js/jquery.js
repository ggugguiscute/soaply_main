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
        <img src="/images/${item.datamain}" alt="" />`;

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

  $.getJSON("/data/gallery.json", getGalleryData);
}); //recommended
