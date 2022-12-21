//jquery logic
$(function () {
  $(".upload-hidden").on("change", function () {
    //jquery의 on은 자바스크립트의 addEventListener 역할을 한다.
    // console.log(changed);
    let filename;
    if (window.FileReader) {
      //   console.log($(this));
      filename = $(this)[0].files[0].name;
      console.log(filename);
    }
    // console.log($(this));
    $(this).siblings().val(filename);
  });
  $("#main-image").on("change", imgFileSelect);
});

// ===> imgFileSelect function
const imgFileSelect = (event) => {
  const input = event.target; //변화된 입력창 타겟 저장
  const reader = new FileReader(); //FileReader 기능 저장

  reader.onload = function () {
    const dataURL = reader.result;
    const output = document.querySelector("#img");
    output.src = dataURL;
    // console.log(dataURL);
  };
  reader.readAsDataURL(input.files[0]);
};

//tabs code
const btns = document.querySelectorAll(".admin-btns button");
const panels = document.querySelectorAll(".admin-panels .panel");

btns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    btns.forEach((item) => {
      item.classList.remove("active");
    });
    panels.forEach((panel) => {
      panel.style.display = "none";
    });
    btns[idx].classList.add("active");
    panels[idx].style.display = "flex";
  });
});
