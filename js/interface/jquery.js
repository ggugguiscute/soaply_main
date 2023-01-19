// $(document).ready(function(){
//     //do something
// }) //not recommended

$(function () {
  // navigation moving to target section
  $(document).ajaxComplete(function () {
    //비동기 데이터가 완전히 로드 된 이후에 실행
    $(".nav-lists li").on("click", function (e) {
      e.preventDefault(); //a에 적용된 기본 기능 제거(클릭이벤트)
      const targetIdx = $(this).index();
      //console.log(targetIdx);
      const pagePosition = $(".nav-target").eq(targetIdx).offset().top;
      $("html, body").animate({ scrollTop: pagePosition - 50 }, 100);
    });
  });
}); //recommended
