(function() {

	/**
     * Initialization
     */
    function init() {
        bindEvents()
        initMainSlider()
        initProductsSlider()
        initSelect2()
        initProductSlider()
        quantityCounter()
        initTippy()
        initMasonry()
        initZoom()
        initModal()
        initRating()
        initPhoneMask()
        initTabs()
        initHideShowPassoword()
        accordeon()
        headerScroll()
        initMap()
    }

    function bindEvents() {
        $('.pushy .callback').on('click', pushyLinkClicked)
        $('.pushy-menu > li > a').on('click', pushyMenu)
        $('.mobile-header-search-form .js-search-btn').on('click', toggleMobileSearch)
        $('.mobile-header-search-form .js-close-btn').on('click', toggleMobileSearch)
    }

    function pushyLinkClicked(e) {
        $('body').removeClass('pushy-open-left');
        return false;
    }

    function pushyMenu(e) {
        $(this).toggleClass('active')
        return false;
    }

    function toggleMobileSearch(e) {
        var mSearchForm = $('.mobile-header-search-form')
        mSearchForm.toggleClass('active')
        if(mSearchForm.hasClass('active')) {
            mSearchForm.find('.expanded-search-form').slideDown()
        } else {
            mSearchForm.find('.expanded-search-form').slideUp()
        }
    }

    function initMainSlider() {
        mainSwiper = new Swiper('.section-main-slider .swiper-container', {
            speed: 600,
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: '.section-main-slider .swiper-button-next',
                prevEl: '.section-main-slider .swiper-button-prev',
            },
            pagination: {
                el: '.section-main-slider .swiper-pagination',
                clickable: true,
            },
        })
    }

    function initProductsSlider() {
        productsSwiper = new Swiper('.section-products-slider .swiper-container', {
            speed: 600,
            slidesPerView: 1,
            loop: true,
            navigation: {
                nextEl: '.section-products-slider .swiper-button-next',
                prevEl: '.section-products-slider .swiper-button-prev',
            },
            breakpoints: {
                769: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }
        })
    }

    function initSelect2() {
        $.fn.select2.amd.define('select2/i18n/ru',[],function () {
            // Russian
            return {
                errorLoading: function () {
                    return 'Результат не может быть загружен.';
                },
                inputTooLong: function (args) {
                    var overChars = args.input.length - args.maximum;
                    var message = 'Пожалуйста, удалите ' + overChars + ' символ';
                    if (overChars >= 2 && overChars <= 4) {
                        message += 'а';
                    } else if (overChars >= 5) {
                        message += 'ов';
                    }
                    return message;
                },
                inputTooShort: function (args) {
                    var remainingChars = args.minimum - args.input.length;

                    var message = 'Пожалуйста, введите ' + remainingChars + ' или более символов';

                    return message;
                },
                loadingMore: function () {
                    return 'Загружаем ещё ресурсы…';
                },
                maximumSelected: function (args) {
                    var message = 'Вы можете выбрать ' + args.maximum + ' элемент';

                    if (args.maximum  >= 2 && args.maximum <= 4) {
                        message += 'а';
                    } else if (args.maximum >= 5) {
                        message += 'ов';
                    }

                    return message;
                },
                noResults: function () {
                  return 'Ничего не найдено';
                },
                searching: function () {
                  return 'Поиск…';
                }
            };
        });

        $('.sorting-select select').select2({
            minimumResultsForSearch: -1,
            language: 'ru',
            dropdownCssClass: 'sorting-select-dropdown',

        }).on('select2:open', function (e) {
            $('.select2-results__options').niceScroll({
                cursorcolor: "#EDEDED",
                cursorwidth: "8px",
                cursorborder: "none",
                cursorborderradius: "0px",
                scrollspeed: 120,
                autohidemode: false
            });

        }).on('select2:select', function (e) {
            console.log(e.target.selectedIndex) //индекс выбранного
            $(this).select2("close");
        });

        $('.form-select').select2({
            minimumResultsForSearch: -1,
            language: 'ru',
            dropdownCssClass: 'form-select-dropdown',
        })
    }

    function initProductSlider() {
        $('.product-main__slider .slider-for').slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          fade: true,
          asNavFor: '.product-main__slider .slider-nav'
        });
        $('.product-main__slider .slider-nav').slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: '.product-main__slider .slider-for',
          // dots: true,
          // centerMode: true,
          focusOnSelect: true
        });
    }

    function quantityCounter() {
        $('.minus').on('click', function () {
            var $input = $(this).parent().find('input');
            var count = parseInt($input.val()) - 1;
            count = count < 1 ? 1 : count;
            $input.val(count);
            $input.change();
            return false;
        });
        $('.plus').on('click', function () {
            var $input = $(this).parent().find('input');
            $input.val(parseInt($input.val()) + 1);
            $input.change();
            return false;
        });
    }

    function initTippy() {
        tippy('[data-toggle="tooltip"]', {
            arrow: true,
            trigger: 'click',
            maxWidth: 250,
        });
    }

    function initMasonry() {
        $('.js-testimonials-list').masonry({
            columnWidth: '.testimonial',
            itemSelector: '.testimonial',
            percentPosition: true,
        });
    }

    function initZoom() {
        $('.zoom').mlens({
            imgSrc: $(this).attr("data-big"),
            borderSize: 0,
            lensShape: "circle",
            lensSize: ["260px","260px"],
            zoomLevel: 1.5,
            responsive: true,
        });
    }

    function initModal() {
        $('.popup-up').magnificPopup({
            type: 'inline',
            preloader: false,
            fixedContentPos: true,
            fixedBgPos: true,
            overflowY: 'auto',
            preloader: false,
            midClick: true,
            removalDelay: 200,
            mainClass: 'my-mfp-zoom-in'
        })

        $(document).on('click', '.popup-modal-dismiss', popupModalDismiss)
    }

    function popupModalDismiss (e) {
        e.preventDefault()
        $.magnificPopup.close()
        tippy.hideAll()
    }

    function initRating() {
        if($("#rating").length) {
            $("#rating").rating({
                "value": 4
            });
        }
    }

    function initPhoneMask() {
        $('input.phone').inputmask("+7(999)999-99-99");
    }

    function initTabs() {

        $('.js-tabs-nav li:not(.no-click)').each(function(i){
            $(this).attr('data-tab', i);
        });

        $('.js-tab-content>li').each(function(i){
            $(this).attr('data-tab', i);
        });

        $('.js-tabs-nav li:not(.no-click)').on('click', function(){
            var dataTab = $(this).data('tab');
            var getWrapper = $(this).closest('.js-tabs-wrapper');

            $(this).siblings().removeClass('active');
            $(this).addClass('active');

            getWrapper.find('.js-tab-content>li').hide();
            getWrapper.find('.js-tab-content>li[data-tab='+dataTab+']').fadeIn('slow');
            return false
        });
    }

    function initHideShowPassoword() {
        $('#password + .fa').on('click', function() {
           $(this).toggleClass('fa-eye').toggleClass('fa-eye-slash'); 
           $('#password').togglePassword(); 
        });

        $('.hideShowPassword').hideShowPassword(false, true);
    }

    function accordeon() {
        $('.accordeon').each(function(){
          var $item = $('.acc-item', $(this)),
              $title = $('.acc-title', $(this)),
              $hidden = $('.acc-hidden', $(this));

          $title.on('click', function(){
            $(this).toggleClass('active');

            if($(this).hasClass('active')){
              // $(this).addClass('active');
              $(this).siblings('.acc-hidden').slideDown();
            } else{
              $(this).siblings('.acc-hidden').slideUp(400);
                $(this).removeClass('active');
            }

          });
        });
    }

    function headerScroll() {
        $(window).scroll(function(){
            var s = $(this).scrollTop();

            if(s > 1){
                $('.header').addClass('active');
            } else{
                $('.header').removeClass('active');
            }
        })
    }

    function initMap() {
        if($('#map').length) {
            var myMap;
            ymaps.ready(function () {
                myMap = new ymaps.Map('map', {
                    controls: ['zoomControl', 'fullscreenControl'],
                    center: [55.748538568987954,37.703370500000005],
                    zoom: 16
                }, {
                    searchControlProvider: 'yandex#search'
                });

                myMap.behaviors.disable('scrollZoom');

                var myPlacemark = new ymaps.Placemark([55.748538568987954,37.703370500000005], {
                    // hintContent: 'Собственный значок метки'
                }, {
                    // iconLayout: 'default#image',
                    // iconImageHref: 'img/pin.png',
                    // iconImageSize: [47, 59],
                    // iconImageOffset: [-23, -47]
                });

                myMap.geoObjects.add(myPlacemark);
            });
        }
    }


    init()

})()