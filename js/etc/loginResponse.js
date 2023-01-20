window.addEventListener("load", function () {
  async function checkSign() {
    const userIcon = document.querySelectorAll(".user");
    // console.log(userIcon); //2개의 배열 요소
    const adminIcon = this.document.querySelectorAll(".admin");
    const cart = document.querySelectorAll(".cart");

    this.fetch("/main_backend/etc/check_sign.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const cartItemEl = `
      <a href="/main_project/pages/cart.html"><i class="ri-shopping-cart-line"></i><em>(${data.cart_count})</em></a>
      `;

        if (data.userid === "guest") {
          //로그인하지 않았을 때(guest 상태일 때)
          adminIcon.forEach((item) => {
            item.style.display = "none";
          });
          //어드민 가려줌

          userIcon.forEach((item) => {
            item.innerHTML = `<a href="/main_project/pages/sign-in.html">
                                <i class="ri-user-3-fill"></i>
                              </a>`;
          }); //사용자 정보 없는 아이콘

          cart.forEach((cartEl) => {
            cartEl.innerHTML = cartItemEl;
          });

          //카트 숫자 아이콘
        } else {
          if (data.user_lvl === 1) {
            adminIcon.forEach((item) => {
              item.style.display = "flex";
            });

            userIcon.forEach((item) => {
              item.innerHTML = `<button class="signout"><span>${data.userid}</span>&nbsp;| <a href="#"> Logout</a></button>`;
            });

            cart.forEach((cartEl) => {
              cartEl.innerHTML = cartItemEl;
            });
          } else {
            adminIcon.forEach((item) => {
              item.style.display = "none";
            });
            userIcon.forEach((item) => {
              item.innerHTML = `<button class="signout"><span>${data.userid}</span>&nbsp; | <a href="#"> Logout</a></button>`;
            });
            cart.forEach((cartEl) => {
              cartEl.innerHTML = cartItemEl;
            });
          }
        }

        const signoutBtn = document.querySelectorAll(".signout a");

        if (signoutBtn) {
          signoutBtn.forEach((btn) => {
            btn.addEventListener("click", (e) => {
              e.preventDefault();
              this.fetch("/main_backend/model/register.php?q=signout")
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  this.alert("로그아웃 되었습니다.");
                  this.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  this.setTimeout(function () {
    checkSign();
  }, 500);
});
