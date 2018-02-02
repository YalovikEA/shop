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

  //Слайдер каталога продукта
  // $(document).on('click',.sort-view__item').slick('reinit');
  $('.js-catalog-view__slider').slick({
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    customPaging : function(slider, i) {
      var thumb = $(slider.$slides[i]).data('thumb');
      return '<a><img src="'+thumb+'"></a>';
    },
  });

  $('.js-compare-products').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: '.compare-products-slider__controls--prev',
    nextArrow: '.compare-products-slider__controls--next'
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

// Запуск видео с Utube
$('.video-start').click(function () {
  var videoID = $(this).parent().parent().data('video-id'),
      videoPlayer = $(this).parent().parent().attr('id');
  player = new YT.Player(videoPlayer, {
    videoId: videoID
  });
});

// Табы продуктов
$(document).on('click','.tabs-list__item', function () {
  var tabName = $(this).attr('show-tab');
  if ($(this).parents().hasClass('tabs-list--for-customer')) {
    window.location.href = '#' + tabName;
  }
  $(this).addClass('active').siblings().removeClass('active');
  $('.tabs-content .' + tabName).addClass('active').siblings().removeClass('active');
});

if (window.location.hash) {
  var loc = window.location.hash.split('').splice(1).join(''),
    tabsList = $('.tabs-list--for-customer li'),
    tabsContentList = $('.tab-content__item');
  for (var i = 0, iLen = tabsList.length; i < iLen; i++) {
    var attr = $(tabsList[i]).attr('show-tab');
    if (attr === loc) {
      $(tabsList[i]).addClass('active');
    } else {
      $(tabsList[i]).removeClass('active');
    }
  }
  for (var j = 0, jLen = tabsContentList.length; j < jLen; j++) {
    if ($(tabsContentList[j]).hasClass(loc)) {
      $(tabsContentList[j]).addClass('active');
    } else {
      $(tabsContentList[j]).removeClass('active');
    }
  }
};

// Аккордион
$(document).on('click','.accordion__title',function() {
  $(this).parent().toggleClass('active');
  var faqContent = $(this).siblings();
  if(faqContent.is(':visible')){
    faqContent.slideUp();
  }else {
    faqContent.slideDown();
  }
});


// Рейтинг
function rating(elem) {
  var ratingLine = $('.review-stars--set .review-star');
  ratingLine.removeClass('active');
  elem.addClass('active');

  for (var i = 0, rLen = ratingLine.length; i < rLen; i++) {
    if($(ratingLine[i]).hasClass('active')) {
      break;
    }
    $(ratingLine[i]).addClass('active');
  }
}

$('.review-stars--set .review-star').click(function () {
  var cur = $(this),
      ratingLine = $('.review-stars--set .review-star');
  ratingLine.removeClass('click-active');
  rating(cur);
  cur.addClass('click-active');
});

$('.review-stars--set .review-star')
  .mouseover(function() {
    var cur = $(this);
    rating(cur);
    cur.addClass('active');
  })
  .mouseout(function() {
    var ratingLine = $('.review-stars--set .review-star');
    ratingLine.addClass('active');


    for (var i = 5; i > 0; i--) {
      if($(ratingLine[i]).hasClass('click-active')) {
        break;
      }
      $(ratingLine[i]).removeClass('active');
    }
  });

// Фильтр
$(document).on('click','.filter-tab__link,.filter-hide-more',function() {
  var content = $('.filter-line--bottom');
  var filterArrow = $('.filter-hide-more');
  content.toggleClass('active');
  filterArrow.toggleClass('active');
  if(content.is(':visible')){
    content.slideUp();
    filterArrow.removeClass('active');
  }else {
    content.slideDown();
    filterArrow.addClass('active')
  }
});

// Слайдер значений
var rangeSlider = $('.range-slider');

for (var i = 0; i < rangeSlider.length; i++) {
  noUiSlider.create(rangeSlider[i], {
    start: [2000, 8000],
    connect: true,
    padding: 10,
    range: {
      'min': 1000,
      'max': 10000
    },
    format: wNumb({
      decimals: 0
    })
  });

  rangeSlider[i].noUiSlider.on('update', function (values, handle) {

    var value = values[handle],
      fromNumber = this.target.nextElementSibling.firstElementChild.lastElementChild,
      toNumber = this.target.nextElementSibling.children[1].lastElementChild;
    if (handle) {
      toNumber.value = value;
    } else {
      fromNumber.value = value;
    }
  });
};

$(document).on('click','.sort-view__item',function () {
  var catView = $(this).data('catalog-view');
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $('.catalog-view').removeClass().addClass('catalog-view catalog-view--'+catView);
  // Для отображения слайдера после display:none -> display:block
  $('.js-catalog-view__slider').slick('setPosition');
});


// Каталог попап
$(document).ready(function () {
  $('.product-prev-popup__link').magnificPopup({
    callbacks: {
      open: function () {
        $('.js-catalog-view__slider').slick('setPosition');
      }
    }
  });
});

// Карта в контактах
if ($('div').is('#contacts-map')) {
  ymaps.ready(function () {
    var myMap = new ymaps.Map('contacts-map', {
        center: [55.734056, 37.702679],
        zoom: 17
      }, {
        searchControlProvider: 'yandex#search'
      }),

      myPlacemark = new ymaps.Placemark([55.734298, 37.705823], {
        hintContent: '',
        balloonContent: ''
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'static/img/general/map-dot.png',
        iconImageSize: [30, 42],
        iconImageOffset: [-5, -38]
      });
    myMap.geoObjects
      .add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
    myMap.controls.remove('trafficControl').remove('searchControl').remove('typeSelector').remove('geolocationControl').remove('fullScreenControl').remove('rulerControl');
  });
};

// $(".main-nav__link").hover(
//   function () {
//     var hideMenu = $(this).data('hide-menu');
//     $.ajax({
//       url: hideMenu + ".html"
//     })
//       .done(function(html) {
//         $("#main-nav-hide").append(html);
//       });
//   }, function () {
//     $("#main-nav-hide").empty();
//   }
// );


$(".main-nav__link").hover(
  function () {
    var hideMenu = $(this).data('hide-menu');
        checkMenuItem = $(this)
    $.ajax({
      url: 'menu-hide/' + hideMenu + '.html'
    })
      .done(function (html) {
        $("#main-nav-hide").append(html);
      });
    $(".main-nav__link").removeClass('active');
    checkMenuItem.addClass('active');
  }, function () {
    if($("#main-nav-hide").is(':hover')) {
      $("#main-nav-hide").hover(
        function () {
        }, function () {
          $("#main-nav-hide").empty();
          $(".main-nav__link").removeClass('active');
        }
      );

    } else {
      $("#main-nav-hide").empty();
      $(".main-nav__link").removeClass('active');
    }
  }
);