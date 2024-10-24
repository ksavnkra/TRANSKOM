var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    }

  },
});

$(document).ready(function () {
  $(".Contact").click(function () {
    alert('You can Write us a mail or can call us on!\nEmail: Transkom@gmail.com\nMobile Number: +919999999999');
  });
});