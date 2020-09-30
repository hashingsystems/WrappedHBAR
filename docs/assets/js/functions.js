/*global jQuery */
/* Contents
// ------------------------------------------------>
    1.  Background INSERT
    2.  NAVBAR FIXED
    3.	NAVBAR TOGGLE
    4.  NAVBAR SCROLL TO
    5.  NAVBAR SCROLLING SECTION
    6.  AJAX MAILCHIMP
    7.  AJAX CAMPAIGN MONITOR
    8.  PRICING SWITCHER
    9.  COUNTER UP
    10. OWL CAROUSEL
    11. MAGNIFIC POPUP VIDEO
    12. WOW
    13. AJAX CONTACT FORM
    14. SCROLL TO
*/
(function ($) {
    "use strict";



    /* ------------------  Background INSERT ------------------ */

    var $bgSection = $(".bg-section");

    $bgSection.each(function () {
        var bgSrc = $(this).children("img").attr("src");
        var bgUrl = 'url(' + bgSrc + ')';
        $(this).parent().css("backgroundImage", bgUrl);
        $(this).parent().addClass("bg-section");
        $(this).remove();
    });

    /* ------------------ NAVBAR FIXED ------------------ */

    $(window).scroll(function () {
        /* affix after scrolling 100px */
        if (
            $(document).scrollTop() > $(window).height() ||
            $(document).scrollTop() > 105
        ) {
            $(".navbar-sticky").addClass("navbar-fixed");
        } else {
            $(".navbar-sticky").removeClass("navbar-fixed");
        }
    });

    /* ------------------  NAVBAR TOGGLE ------------------ */

    $('.navbar-toggler').on('click', function () {
        $('.navbar-toggler-icon').toggleClass('active');
    });

    /* ------------------  NAVBAR SCROLL TO ------------------ */

    var aScroll = $('.nav-item .nav-link'),
        $navbarCollapse = $('.navbar-collapse');
    aScroll.on('click', function (event) {
        var target = $($(this).attr('href'));
        $(this).parent(".nav-item").siblings().removeClass('active');
        $(this).parent('.nav-item').addClass('active');

        if (target.length > 0) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }

        // If click link and navabr is show
        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').toggleClass('show');
            $('.navbar-toggler-icon').toggleClass('active');
            $('.navbar-toggler').toggleClass('collapsed');
        }
    });

    /* ------------------ NAVBAR SCROLLING SECTION ------------------ */

    var $section = $('section'),
        $bodyScroll = $('.body-scroll');
    if ($bodyScroll.length > 0) {
        $(window).on("scroll", function () {
            $section.each(function () {
                var sectionID = $(this).attr("id"),
                    sectionTop = $(this).offset().top - 100,
                    sectionHight = $(this).outerHeight(),
                    wScroll = $(window).scrollTop(),
                    $navHref = $("a[href='#" + sectionID + "']"),
                    $nav = $('.navbar-nav').find($navHref).parent();
                if (wScroll > sectionTop - 1 && wScroll < sectionTop + sectionHight - 1) {
                    $nav.addClass('active');
                    $nav.siblings().removeClass('active');
                }
            });
        });
    }

    /* ------------------  AJAX MAILCHIMP ------------------ */

    $('.mailchimp').ajaxChimp({
        url: "http://wplly.us5.list-manage.com/subscribe/post?u=91b69df995c1c90e1de2f6497&id=aa0f2ab5fa", //Replace with your own mailchimp Campaigns URL.
        callback: chimpCallback

    });

    function chimpCallback(resp) {
        if (resp.result === 'success') {
            $('.subscribe-alert').html('<h5 class="alert alert-success">' + resp.msg + '</h5>').fadeIn(1000);
            //$('.subscribe-alert').delay(6000).fadeOut();

        } else if (resp.result === 'error') {
            $('.subscribe-alert').html('<h5 class="alert alert-danger">' + resp.msg + '</h5>').fadeIn(1000);
        }
    }

    /* ------------------  AJAX CAMPAIGN MONITOR  ------------------ */

    $('#campaignmonitor').submit(function (e) {
        e.preventDefault();
        $.getJSON(
            this.action + "?callback=?",
            $(this).serialize(),
            function (data) {
                if (data.Status === 400) {
                    alert("Error: " + data.Message);
                } else { // 200
                    alert("Success: " + data.Message);
                }
            });
    });

    /* ------------------  PRICING SWITCHER  ------------------ */

    var $pricingSwitcher = $('.pricing-switcher'),
        $pricingLabel = $('.pricing-switcher label'),
        $pricingIndicator = $('.pricing-switcher .indicator'),
        $pricingball = $('.pricing-switcher .indicator .ball'),
        $pricingContainer = $('.pricing-container'),
        $pricingPanel = $('.pricing-panel');

    if ($pricingSwitcher.length > 0) {

        // If clicked on swaitcher label
        $pricingLabel.on('click', function () {
            $(this).siblings('label').removeClass('active');
            $(this).addClass('active');
            $pricingContainer.toggleClass('monthly yearly');
            $pricingPanel.toggleClass('hidden visible');
            $pricingball.toggleClass('monthly yearly');
        });

        // If cliced on indicator
        $pricingIndicator.on('click', function () {
            $pricingball.toggleClass('monthly yearly');
            $pricingContainer.toggleClass('monthly yearly');
            $pricingLabel.toggleClass('active');
            $pricingPanel.toggleClass('hidden visible');
        });
    }

    /* ------------------ OWL CAROUSEL ------------------ */

    $(".owl-carousel").each(function () {
        var $Carousel = $(this);
        $Carousel.owlCarousel({
            loop: $Carousel.data('loop'),
            autoplay: $Carousel.data("autoplay"),
            margin: $Carousel.data('space'),
            nav: $Carousel.data('nav'),
            dots: $Carousel.data('dots'),
            dotsSpeed: $Carousel.data('speed'),
            thumbs: true,
            thumbsPrerendered: true,
            thumbContainerClass: 'owl-thumbs',
            thumbItemClass: 'owl-thumb-item',
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: $Carousel.data('slide-res')
                },
                1000: {
                    items: $Carousel.data('slide'),
                }
            }
        });
    });

    /* ------------------  MAGNIFIC POPUP VIDEO ------------------ */

    $('.popup-modal').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#username',
        closeOnContentClick: false,
        closeBtnInside: false,
        modal: true
    });
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });


    $('.popup-video').magnificPopup({
        disableOn: 700,
        mainClass: 'mfp-fade',
        removalDelay: 0,
        preloader: false,
        fixedContentPos: false,
        type: 'iframe',
        iframe: {
            markup: '<div class="mfp-iframe-scaler">' +
                '<div class="mfp-close"></div>' +
                '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                '</div>',
            patterns: {
                youtube: {
                    index: 'youtube.com/',
                    id: 'v=',
                    src: '//www.youtube.com/embed/%id%?autoplay=1'
                }
            },
            srcAction: 'iframe_src',
        }
    });

    /* ------------------  WOW ------------------ */

    var wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 50,
        mobile: false,
        live: true

    });
    wow.init();

    /* ------------------  AJAX CONTACT FORM  ------------------ */

    var contactForm = $(".contactForm"),
        contactResult = $('.contact-result');

    contactForm.validate({
        debug: false,
        submitHandler: function (contactForm) {
            $(contactResult, contactForm).html('Please Wait...');
            $.ajax({
                type: "POST",
                url: "assets/php/contact.php",
                data: $(contactForm).serialize(),
                timeout: 20000,
                success: function (msg) {
                    // window.location.href = "thanks-you.html";
                    // Active this line if you need to add message alerts instead of Thanks You page
                    $(contactResult, contactForm).html('<div class="alert alert-success" style="margin-top:30px" role="alert"><strong>Thank you. We will contact you shortly.</strong></div>').delay(3000).fadeOut(2000);
                },
                error: $('.thanks').show()
            });
            return false;
        }
    });

    contactForm.removeAttr("novalidate");

    /* ------------------  SCROLL TO ------------------ */

    var aScroll = $('.scroll-to');
    aScroll.on('click', function (event) {
        var target = $($(this).attr('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    /* ------------------ PROGRESS BAR ------------------ */

    var $htmlDirection = $("html").attr("dir"),
        progressBar = $(".progress-bar"),
        progressBarTitle = $(".progress-title .value");

    $(".progressbar").each(function () {
        $(this).waypoint(
            function () {
                progressBarTitle.each(function () {
                    if ($htmlDirection == "rtl") {
                        $(this).css({
                            opacity: 1,
                            right: $(this).data("value") + "%" + "%"
                        });
                    } else {
                        $(this).css({
                            opacity: 1,
                            left: $(this).data("value") + "%"

                        });
                    }
                });

                progressBar.each(function () {
                    $(this).css(
                        "width",
                        $(this).attr("aria-valuenow") + "%"
                    );
                });

            },
            {
                triggerOnce: true,
                offset: "bottom-in-view"
            }
        );
    });

    /* ------------------ COUNTING NUMBERS ------------------ */

    $.fn.zyCounter = function (options) {
        var settings = $.extend({
            duration: 20,
            easing: 'swing',
        }, options);
        return this.each(function () {
            var $this = $(this);

            var startCounter = function () {
                var numbers = [];
                var length = $this.length;
                var number = $this.text();
                var isComma = /[,\-]/.test(number);
                var isFloat = /[,\-]/.test(number);
                var number = number.replace(/,/g, '');
                var divisions = settings.duration;
                var decimalPlaces = isFloat ? (number.split('.')[1] || []).length : 0;

                // make number string to array for displaying counterup
                for (var rcn = divisions; rcn >= 1; rcn--) {

                    var newNum = parseInt(number / divisions * rcn);
                    if (isFloat) {
                        newNum = parseFloat(number / divisions * rcn).toFixed(decimalPlaces);
                    }
                    if (isComma) {
                        while (/(\d+)(\d{3})/.test(newNum.toString())) {
                            newNum = newNum.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                        }
                    }

                    numbers.unshift(newNum);
                }
                var counterUpDisplay = function () {
                    $this.text(numbers.shift());
                    setTimeout(counterUpDisplay, settings.duration);
                };
                setTimeout(counterUpDisplay, settings.duration);
            } // end function

            //bind with waypoints
            $this.waypoint(startCounter, { offset: '100%', triggerOnce: true });
        });
    }

    $('.counting').zyCounter();

}(jQuery));

const ethBtn = document.querySelector('.eth-btn');
const hbarBtn = document.querySelector('.hbar-btn');
const status = document.querySelector('.status');
const operation = document.querySelector('.operation');
let contentSwitcher = document.getElementById('content-switcher');

ethBtn.addEventListener('click', () => {
    hbarBtn.classList.remove('active');
    ethBtn.classList.add('active');
    contentSwitcher.classList.remove('hbar-content')
    contentSwitcher.classList.add('eth-content')
    operation.innerText = 'Unwrap';
})

hbarBtn.addEventListener('click', () => {
    ethBtn.classList.remove('active');
    hbarBtn.classList.add('active');
    contentSwitcher.classList.remove('eth-content')
    contentSwitcher.classList.add('hbar-content')
    operation.innerText = 'Wrap';
})
