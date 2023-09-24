let direction = 'ltr';

if (localStorage.getItem("Lang") === "english") {
  direction = 'ltr';

}

if (localStorage.getItem("Lang") === "arabic") {
    direction = 'rtl';
}
let main = new Splide( '#image-carousel', {
    type      : 'fade',
    rewind    : true,
    pagination: false,
    arrows    : true,
    direction: direction,
} );
let thumbnails = new Splide( '#thumbnail-carousel', {
    fixedWidth  : 100,
    fixedHeight : 110,
    gap         : 10,
    rewind      : true,
    pagination  : false,
    isNavigation: true,
    arrows    : false,
    direction: direction,
    breakpoints : {
        984:{
          gap         : 0,
          fixedWidth : 90,
          fixedHeight: 80,
        },
        818:{
          gap         : 10,
          fixedWidth : 70,
          fixedHeight: 80,
        },
        730:{
          gap         : 15,
          fixedWidth : 60,
          fixedHeight: 80,
        },
        650:{
          gap         : 10,
          fixedWidth : 50,
          fixedHeight: 80,
        },
        500: {
          gap         : 10,
          fixedWidth : 100,
          fixedHeight: 100,
        },},
} );
main.sync( thumbnails );
main.mount();
thumbnails.mount();

Splide.defaults = {
    rewind: true,
    fixedWidth  : 240,
fixedHeight : 480,
rewind      : true,
pagination  : false,
arrows    : true,
direction: direction,

breakpoints : {

    1024:{
      fixedWidth  : 220,
      fixedHeight : 430,
    },
    734:{
      fixedWidth  : 190,
      fixedHeight : 400,
    },
    768:{
        fixedWidth  : 210,
        fixedHeight : 400,
    },

    425:{
        fixedWidth  : 160,
        fixedHeight : 320,
    },
    375:{
      fixedWidth  : 135,
      fixedHeight : 300,
    },
    320:{
      fixedWidth  : 110,
      fixedHeight : 280,
    },
  },}
  new Splide('.Related-Products').mount();
  new Splide('.Addions-of-the-products').mount();
  new Splide('.cross-selling-Products').mount();
  new Splide('.Alternative-Products').mount();
  new Splide('.Upselling-Products').mount();