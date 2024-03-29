const cmtInputBox = document.querySelector("textarea");
const cmtBtn = document.querySelector("button[type=submit]");
const isCheck = document.getElementsByName("cmt_star");
const url = document.location.href;
const urlIndex = Number(url.split("=")[1]);

// http response code  참조 : https://www.whatap.io/ko/blog/40/

let status;

//상품평 작성
cmtBtn.addEventListener("click", () => {
  let selected = false;
  // 입력창 작성 체크
  if (!cmtInputBox.value) {
    alert("내용을 입력해주세요");
    nameInput.focus();
    return;
  }

  //별점 작성 체크
  for (let radio of isCheck) {
    if (radio.checked) {
      selected = true;
    }
  }

  if (!selected) {
    const isInput = confirm(
      "별점 평가가 없으면 1개가 입력됩니다. \n입력하시겠습니까?"
    );
    if (!isInput) {
      return;
    }
  }

  // 입력창 작성 체크 끝 : 윗 부분이 완료되면 다음 코드로 진행
  // formData 참조 : https://ko.javascript.info/formdata
  const formData = new FormData(document.querySelector(".comment-form form"));
  fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=post_cmt`,
    {
      method: "POST",
      body: formData,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      alert(resData.msg);
      location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
});

const cmtWrapper = document.querySelector(".comment-wrapper");
const listCount = document.querySelector(".comment-info strong");

//Get Comments
const getCmtLists = async () => {
  await fetch(
    `/main_backend/model/cmt_ctrl.php?p_idx=${urlIndex}&req_sign=get_cmt`
  )
    .then((res) => res.json())
    .then((lists) => {
      console.log(lists);
      if (lists.msg) {
        cmtWrapper.innerHTML = `<p class="no-list">${lists.msg}</p>`;
        return;
      }

      listCount.textContent = lists.length; //입력된 평가글 갯수 표시

      const avg = Number(lists[0].avg); // 평균값 숫자로 변환
      const floatAvg = parseFloat(avg).toFixed(2); //parseFloat = 실수로 표시, toFixed(n) = 소수점 n번째 자리까지 표시 => 반올림,내림 가능
      const starVal = document.querySelector(".star-avg-val");
      const riFill = document.querySelector(".ri-fill");

      starVal.textContent = floatAvg; //평균값 표시
      riFill.style.width = (floatAvg / 5) * 100 + "%";
      console.log(floatAvg);

      let listsElmt;
      lists.map((list, idx) => {
        if (list.user_id === "guest") {
          listsElmt = `<div class="comment-lists">
                <div class="list-info">
                  <p>${list.user_id} | </p>
                  <em>${list.cmt_reg} | </em>
                  <div class="star-lists"></div>
                </div>
                <div class="list-content" id="list-${idx}">
                  <p>${list.cmt_cont}</p>
                </div>
              </div>`;
        } else {
          if (list.user_id === list.session_id) {
            listsElmt = `
                <div class="comment-lists">
                  <div class="list-info">
                    <p>${list.user_id} |</p>
                    <em>${list.cmt_reg} |</em>
                    <button type = "button" class="cmt-update">수정하기</button> |
                    <div class="star-lists"></div>
                  </div>
                  <div class="list-content" id="list-${idx}">
                    <p>${list.cmt_cont}</p>
                  </div>
                </div>     
              `;
          } else {
            listsElmt = `<div class="comment-lists">
                <div class="list-info">
                  <p>${list.user_id} | </p>
                  <em>${list.cmt_reg}| </em>
                  <div class="star-lists"></div>
                </div>
                <div class="list-content" id="list-${idx}">
                  <p>${list.cmt_cont}</p>
                </div>
              </div>`;
          }
        }
        cmtWrapper.innerHTML += listsElmt;
      });

      updateCmt(lists); //수정하기 기능 분리 호출
      getRating(lists); //별점 출력 함수 호출
    })
    .catch((err) => console.log(err));
};

getCmtLists();

//별점 출력 함수 선언
function getRating(star) {
  let starArr = [];
  const starLists = document.querySelectorAll(".star-lists");
  // console.log(star.rating); //여러개의 제이슨 요소이기 때문에 읽히지 않음 > undefined
  star.forEach((num) => {
    console.log(num.rating);
    starArr.push(num.rating);
  });

  starLists.forEach((elm, i) => {
    const negativeNo = 5 - starArr[i];
    for (let j = 0; j < starArr[i]; j++) {
      elm.innerHTML += '<i class = "ri-star-fill"></i>';
    }

    for (let k = 0; k < negativeNo; k++) {
      elm.innerHTML += '<i class = "ri-star-line"></i>';
    }
  });
}

//수정하기 기능 함수 선언
function updateCmt(cmtObjs) {
  const cmtUpBtns = document.querySelectorAll("button.cmt-update"); //수정하기 버튼 그룹
  if (cmtObjs.length !== 0 && cmtUpBtns) {
    cmtUpBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        // 노드 추적은 공백을 포함한다.

        const itemClass = this.className;
        console.log(itemClass);

        cmtUpBtns.forEach((aBtn) => {
          aBtn.classList.remove("active");
        });

        if (itemClass == "cmt-update") {
          this.classList.add("active");
        }

        cmtUpBtns.forEach((bBtn, idx) => {
          const changeInput = cmtUpBtns[idx].parentNode.nextSibling.nextSibling;
          const thisIdx = changeInput.getAttribute("id").split("-")[1];

          if (bBtn.classList.contains("active")) {
            cmtUpBtns[idx].textContent = "취소하기";
            changeInput.innerHTML = `
          <form onsubmit="return false;" class="update-form update-form-${thisIdx}">
            <input type="text" name="update_cont" value="${cmtObjs[thisIdx].cmt_cont}">
            <div class="rating">
              <div class="stars">
                <input type="radio" name="cmt_star" id="up-star-${thisIdx}-1" value="5" class="val-5" />
                <label for="up-star-${thisIdx}-1">
                  <i class="ri-star-line"></i>
                  <i class="ri-star-fill"></i>
                </label>
                <input type="radio" name="cmt_star" id="up-star-${thisIdx}-2" value="4" class="val-4" />
                <label for="up-star-${thisIdx}-2">
                  <i class="ri-star-line"></i>
                  <i class="ri-star-fill"></i>
                </label>
                <input type="radio" name="cmt_star" id="up-star-${thisIdx}-3" value="3" class="val-3" />
                <label for="up-star-${thisIdx}-3">
                  <i class="ri-star-line"></i>
                  <i class="ri-star-fill"></i>
                </label>
                <input type="radio" name="cmt_star" id="up-star-${thisIdx}-4" value="2" class="val-2" />
                <label for="up-star-${thisIdx}-4">
                  <i class="ri-star-line"></i>
                  <i class="ri-star-fill"></i>
                </label>
                <input type="radio" name="cmt_star" id="up-star-${thisIdx}-5" value="1" class="val-1" />
                <label for="up-star-${thisIdx}-5">
                  <i class="ri-star-line"></i>
                  <i class="ri-star-fill"></i>
                </label>
              </div>
            </div>
            <button type="submit">수정입력</button>
          </form>
          `;

            //기존에 입력된 별점 가져오기
            const upRadioNum = document.querySelector(
              `.update-form-${thisIdx} input[type="radio"].val-${cmtObjs[thisIdx].rating}`
            );

            upRadioNum.checked = true;

            const udSubmitBtn = document.querySelector(
              `.update-form-${thisIdx} button`
            );

            udSubmitBtn.addEventListener("click", function () {
              const formData = new FormData(
                document.querySelector(`.update-form-${thisIdx}`)
              );

              fetch(
                `/main_backend/model/cmt_ctrl.php?cmt_idx=${cmtObjs[thisIdx].cmt_idx}&req_sign=patch_cmt`,
                {
                  method: "PATCH",
                  body: formData,
                }
              )
                .then((res) => {
                  return res.json();
                })
                .then((resData) => {
                  alert(resData.msg);
                  location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          } else {
            cmtUpBtns[idx].textContent = "수정하기";
            changeInput.innerHTML = `
            <p>${cmtObjs[thisIdx].cmt_cont}</p>
          `;
          }
        });
      });
    });
  } else {
  }
}
