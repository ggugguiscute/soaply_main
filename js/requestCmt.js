const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);
console.log(urlIndex);

// http response code  참조 : https://www.whatap.io/ko/blog/40/

let status;

cmtBtn.addEventListener("click", () => {
  // 입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요");
    nameInput.focus();
    return;
  }

  // 입력창 작성 체크 끝 : 윗 부분이 완료되면 다음 코드로 진행
  // formData 참조 : https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector("form"));
  fetch(`/main_backend/model/register.php?p_idx=${urlIndex}`, {
    method: "POST",
    body: formData,
  })
    .then((res) => {
      console.log(res);
      status = res.status;
      return res.json();
    })
    .then((resData) => {
      // console.log(resData);
      alert(resData.msg);
      location.href = "/main_project/index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});
