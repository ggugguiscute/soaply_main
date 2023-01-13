window.addEventListener("load", function () {
  const url = document.location.href;
  //console.log(url);
  // split 메서드 참조 : https://hianna.tistory.com/377
  const urlIndex = Number(url.split("=")[1]);
  // console.log(typeof urlIndex);
  const detailImage = document.querySelector(".detail-image");
  const detailText = document.querySelector(".detail-text");

  //3. 장바구니 데이터 세션 작성 요청 함수
  const requestCart = () => {
    const addToCart = document.querySelector(".add_to_cart"); //장바구니 버튼
    // console.log(addToCart);
    const formData = new FormData(document.querySelector(".cart_form")); //장바구니 전달 데이터 폼

    addToCart.addEventListener("click", async () => {
      await this.fetch("/main_backend/model/cart_ctrl.php?req_cart=add_cart", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((cart) => {
          this.alert(cart.msg);
          this.location.reload();
          // console.log(cart);
        })
        .catch((err) => console.log(err));
    });
  };

  const getDetailData = async () => {
    await fetch(`/main_backend/model/get_details.php?idx=${urlIndex}`)
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        let imageEl;
        let textEl;
        imageEl = `<img src="/main_project/images/products/${data.pro_img}" alt="" />`;
        textEl = `<h2>${data.pro_name}</h2>
        <p>${data.pro_desc}</p>
        <span class="line"></span>

        <div class="price">
          <div class="price-title">
            <p>가격 :</p>
            <p>배송비 :</p>
          </div>
          <div class="price-value">
            <p>${data.pro_price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>
            <p>2,500원(3만원 이상 구매 시 무료배송)</p>
          </div>
        </div>

        <span class="line"></span>

        <div class="qnt-sum">
          <div class="qnts">
            <button class='down'>-</button>
            <strong class='count'>1</strong>
            <button class='up'>+</button>
          </div>
          <div class="sum">합계 : <em>${data.pro_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</em>원</div>
        </div>

        <div class="line"></div>

        <form onsubmit="return false" class="cart_form">
          <div class="detail-btns">
            <button class="common-btn add_to_cart" name="add_to_cart" type="submit">장바구니</button>
            <button class="common-btn">바로구매</button>
          </div>
          <!--1.포스트 방식으로 전달 : input hidden에 정보를 formdata로 전달 -->
          <input type="hidden" name="cart_idx" value="${data.pro_idx}">
          <input type="hidden" name="cart_name" value="${data.pro_name}">
          <input type="hidden" name="cart_desc" value="${data.pro_desc}">
          <input type="hidden" name="cart_price" value="${data.pro_price}">
          <input type="hidden" name="cart_img" value="${data.pro_img}">
          <input type="hidden" name="cart_count" value="1" class="cart_count">
          <input type="hidden" name="cart_sum" value="${data.pro_price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}" class="cart_sum">
        </form>`;
        detailImage.innerHTML = imageEl;
        detailText.innerHTML = textEl;

        //수량 증감 및 합산 금액 출력
        //1. DOM 객체 선택
        const countBtn = document.querySelectorAll(".qnts button"); // 수량 증감 버튼
        const countEl = document.querySelector(".count"); // 카운팅 숫자 요소
        const sumEl = document.querySelector(".sum em"); //금액 합산 요소

        //2.장바구니 수량 및 합계를 전달 데이터와 연동
        const cartCountEl = document.querySelector(".cart_count");
        const cartSumEl = document.querySelector(".cart_sum");

        let count = Number(countEl.textContent); // 카운팅 숫자
        let sumPrice = Number(sumEl.textContent.replace(",", "")); // 합산 금액

        // console.log(count);
        // console.log(sumPrice);

        countBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            if (this.classList.contains("up")) {
              count++;
            } else {
              //삼항 연산자 : 조건 ? 조건이 참일 때 : 조건이 거짓일 때
              count <= 1 ? (count = 1) : count--;
              // if (count <= 1) {
              //   count = 1;
              // } else {
              //   count--;
              // }
            }
            //console.log(count);
            countEl.textContent = cartCountEl.value = count;
            // cartCountEl.value = count;
            sumEl.textContent = cartSumEl.value = (count * sumPrice)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            // cartSumEl.value = (count * sumPrice)
            //   .toString()
            //   .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          });
        });
        requestCart(); //3.
      })
      .catch((err) => console.log(err));
  };

  getDetailData();
});
