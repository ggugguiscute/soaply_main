$(document).ajaxComplete(function () {
  const header = document.querySelector("#header");
  // console.log(header);
  const stickyHeader = () => {
    const scry = window.scrollY;
    if (scry > 0) header.classList.add("active");
    else header.classList.remove("active");
  };
  window.addEventListener("scroll", stickyHeader);
});
