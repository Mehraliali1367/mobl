var swiper = new Swiper(".swiper", {
  spaceBetween: 30,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: false
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive breakpoints
  breakpoints: {
    0: { slidesPerView: 1 },
    580: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  },
});

// const swiper = new Swiper('.slider-wrapper', {
//     loop: false,
//     grabCursor: true,
//     spaceBetween: 10,

//     // Pagination bullets
//     pagination: {
//       el: '.swiper-pagination',
//       clickable: true,
//       dynamicBullets: true
//     },

//     // Navigation arrows
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },

//     // Responsive breakpoints
//     breakpoints: {
//       0: {
//         slidesPerView: 1
//       },
//       768: {
//         slidesPerView: 4
//       },
//       1024: {
//         slidesPerView: 6
//       }
//     }
//   });
