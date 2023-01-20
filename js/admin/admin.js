//jquery logic
$(function () {
  $(".upload-hidden").on("change", function () {
    //jquery의 on은 자바스크립트의 addEventListener 역할을 한다.
    let filename;
    if (window.FileReader) {
      filename = $(this)[0].files[0].name;
      console.log(filename);
    }
    $(this).siblings().val(filename);
  });
  $("#main-image").on("change", imgFileSelect);
});

// ===> imgFileSelect function
const imgFileSelect = (event) => {
  const input = event.target; //변화된 입력창 타겟 저장
  const reader = new FileReader(); //FileReader 기능 저장 - 서버로 전송되는 파일의 정보를 읽는다.

  reader.onload = function () {
    const dataURL = reader.result; //base64로 인코딩된 값
    const output = document.querySelector("#img");
    output.src = dataURL;
  };
  reader.readAsDataURL(input.files[0]); //파일 입력이 저장된 객체의 files 배열에 FileReader 기능 실행
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
