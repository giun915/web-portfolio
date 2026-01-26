
document.addEventListener('DOMContentLoaded', function () {
  
  const skillSlide = new Swiper('.skillSlide', {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 3,
    spaceBetween: 32,
    mousewheel: true,
  });

  const projectSlide = new Swiper('.projectSlide', {
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    slidesPerView: 3,
    spaceBetween: 32,
    mousewheel: true,
  });
  
});
