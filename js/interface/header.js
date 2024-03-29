window.addEventListener("load", function () {
  /********** Elements Clone for Mobile **********/
  this.setTimeout(function () {
    const mobileMenus = document.querySelector(".mobile-menus");

    /********** Change Menu link between main and sub pages **********/
    //1. 웹 주소에서 index 포함 여부를 파악한다.
    //2. 포함이 되었을 경우 navs li a의 href는 #
    //3. 포함이 되지 않았을 경우 navs li a 의 주소를 해당 페이지 주소로 변경
    //4. 주의할 점은 각 링크가 두 개씩 존재한다는 것

    const pgadr = window.location.href;

    const links = document.querySelectorAll(
      ".home-link, .shop-link, .gal-link"
    );

    if (pgadr.includes("index")) {
      links.forEach((item) => {
        item.setAttribute("href", "#");
      });
    } else {
      links.forEach((item) => {
        const itemCls = item.getAttribute("class");
        if (itemCls === "home-link") {
          item.setAttribute("href", "/main_project/index.html");
        } else if (itemCls === "shop-link") {
          item.setAttribute("href", "/main_project/pages/shop.html");
        } else {
          item.setAttribute("href", "/main_project/pages/gallery.html");
        }
      });
    }

    /********** Mobile Menu Toggle **********/
    const mobileBtn = document.querySelector(".mobile-btn");
    toggleMobileBtn = (e) => {
      const target = e.currentTarget;
      const menuHeight = mobileMenus.scrollHeight; //scrollHeight : 지정 대상의 높이값을 읽어준다.
      target.classList.toggle("active");

      if (target.classList.contains("active")) {
        target.classList.remove("not-active");
        mobileMenus.style.height = menuHeight + "px"; //또는 `${menuHeight}px`
      } else {
        target.classList.add("not-active");
        mobileMenus.style.height = 0;
      }
    };

    mobileBtn.addEventListener("click", toggleMobileBtn);

    //모바일 메뉴 클릭 시 드롭 메뉴 사라짐
    const naviLists = document.querySelectorAll(".nav-lists li");

    naviLists.forEach((navBtn) => {
      navBtn.addEventListener("click", function () {
        mobileBtn.classList.remove("active");
        mobileBtn.classList.add("not-acvite");
        mobileMenus.style.height = 0;
      });
    });
  }, 500);
});
