$(document).ready(function () {
    svg4everybody({});
});

$(document).ready(function () {
  // Слайдер на главной странице
  $('.js-index-slider').slick({
    prevArrow: '.index-slider__controls--prev',
    nextArrow: '.index-slider__controls--next',
    dots: true,
    customPaging : function() {
      return '<a class="index-slider__dots"></a>';
    },
  });

  // Слайдер рекомендованных товаров
  $('.js-recommended-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    appendDots: '.recommended-slider__nav',
    prevArrow: '.recommended-slider__controls--prev',
    nextArrow: '.recommended-slider__controls--next',
    customPaging : function() {
      return '<a class="recommended-slider__dot"></a>';
    },
  });

  // Слайдер галлереи продукта
  $('.js-product-gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.js-product-gallery-nav',
    prevArrow: '.product-gallery__controls--prev',
    nextArrow: '.product-gallery__controls--next'
  });

  // Слайдер навигации продукта
  $('.js-product-gallery-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    centerMode: true,
    asNavFor: '.js-product-gallery'
  });

  // Позиционируем управление слайдера на главной странице
  function sliderElemPos(elem,pos) {
    var windowWidth = $(window).width(),
        containerWidth = $('.container').width(),
        position = (windowWidth-containerWidth)/2;
    $('.index-slider ' + elem).css(pos,position);
  }

  // Позиционируем точки слайдера на главной странице
  sliderElemPos('.slick-dots','left');

  // Позиционируем стрелки слайдера на главной странице
  sliderElemPos('.index-slider__controls','right');

  // Функции при ресайзе
  $(window).resize(function () {
    sliderElemPos('.slick-dots','left');
    sliderElemPos('.index-slider__controls','right');
  })
});

$('.video-start').click(function () {
  var videoID = $(this).parent().parent().data('video-id'),
      videoPlayer = $(this).parent().parent().attr('id');
  player = new YT.Player(videoPlayer, {
    videoId: videoID
  });
});