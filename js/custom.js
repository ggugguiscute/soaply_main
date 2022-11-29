/********** Elements Clone for Mobile **********/
const mobileMenus = document.querySelector(".mobile-menus");
const navs = document.querySelector(".nav-lists").cloneNode(true);
const info = document.querySelector(".info").cloneNode(true);

mobileMenus.appendChild(navs);
mobileMenus.appendChild(info);

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

/********** Header change Effect **********/
const header = document.querySelector("#header");
const stickyHeader = () => {
  const scry = window.scrollY;
  if (scry > 0) header.classList.add("active");
  else header.classList.remove("active");
};

window.addEventListener("scroll", stickyHeader);

/********** Scroll Reveal Effect **********/
const sr = ScrollReveal({
  //생성자는 앞에 반드시 대문자로,,
  reset: false,
});

sr.reveal(".wrapper", { duration: 1000 });
