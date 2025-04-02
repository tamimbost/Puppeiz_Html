(function ($, window) {
  "use strict";
  var tjJs = {
    m: function () {
      tjJs.d();
      tjJs.methods();
    },

    d: function () {
      this._window = $(window);
      this._document = $(document);
      this._body = $("body");
      this._html = $("html");
    },
    methods: function () {
      this.inlineCssActivation();
      this.niceSelections();
      this.customCountrySelection();
      this.swiperActivation();
      this.categoryButtonActivation();
      this.sudoCode();
      this.successfullyAddInWishlist();
      this.successfullyAddInCart();
      this.productDetailsZoom();
      this.productQuantity();
      this.productReview();
      this.productQuickView();
      this.countdownActivation();
    },

    // Start Count Down Activation
    countdownActivation: function () {
      $(document).ready(function () {
        function startCountdown(targetDate) {
          function updateCountdown() {
            let now = new Date().getTime();
            let distance = targetDate - now;
            if (distance < 0) {
              clearInterval(interval);
              return;
            }
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            $("#days").text(days < 10 ? "0" + days : days);
            $("#hours").text(hours < 10 ? "0" + hours : hours);
            $("#minutes").text(minutes < 10 ? "0" + minutes : minutes);
            $("#seconds").text(seconds < 10 ? "0" + seconds : seconds);
          }
          let interval = setInterval(updateCountdown, 1000);
          updateCountdown();
        }

        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 50); // After 50 Days
        startCountdown(targetDate.getTime());
      });
    },
    // End Count Down Activation

    // Start Product Review 
    productReview: function () {
      $(document).ready(function () {
        let selectedRating = 0;
        let ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        let totalReviews = 0;

        function updateRatingBars() {
          for (let i = 1; i <= 5; i++) {
            let percentage = totalReviews > 0 ? (ratingCounts[i] / totalReviews) * 100 : 0;
            $(`#bar-${i}`).css('width', percentage + '%');
          }
          $('#review-count').text(totalReviews);
        }

        $('#star-rating span').click(function () {
          selectedRating = $(this).data('value');
          $('#star-rating span').removeClass('selected');
          $(this).prevAll().addBack().addClass('selected');
        });

        $('#submit-review').click(function () {
          let name = $('#name').val().trim();
          let review = $('#review').val().trim();
          let stars = '<i class="fa-solid fa-star-sharp"></i>'.repeat(selectedRating) + '<i class="fa-regular fa-star-sharp"></i>'.repeat(5 - selectedRating);

          if (name !== "" && review !== "" && selectedRating > 0) {
            $('#reviews-list').append(`<div class='review'><span class='reviewer-name'>${name}</span> ${review} <span class='stars'>${stars}</span></div>`);
            ratingCounts[selectedRating]++;
            totalReviews++;
            updateRatingBars();
            $('#review-form')[0].reset();
            $('#star-rating span').removeClass('selected');
            selectedRating = 0;
          } else {
            alert("Please fill out all fields and select a rating.");
          }
        });
      });
    },
    // End Product Review

    // Start Product Quantity
    productQuantity: function () {
      $(document).ready(function () {
        $(".tj__quantity-increase").click(function () {
          let $input = $(".tj__quantity-fieldset");
          let qty = parseInt($input.val());
          $input.val(qty + 1);
        });

        $(".tj__quantity-decrease").click(function () {
          let $input = $(".tj__quantity-fieldset");
          let qty = parseInt($input.val());
          if (qty > 1) {
            $input.val(qty - 1);
          }
        });

        $(".tj__quantity-fieldset").on("input", function () {
          let value = $(this).val();
          if (!/^[1-9]\d*$/.test(value)) {
            $(this).val(1);
          }
        });
      });

    },
    // End Product Quantity

    // Start Product Detalis Zoom
    productDetailsZoom: function () {
      $(document).ready(function () {
        $('.tj__product-details-area__img-item').mousemove(function (event) {
          var $image = $(this).find('img');
          var imgWidth = $image.width();
          var imgHeight = $image.height();
          var containerWidth = $(this).width();
          var containerHeight = $(this).height();
          var offsetX = event.pageX - $(this).offset().left;
          var offsetY = event.pageY - $(this).offset().top;
          var percentageX = (offsetX / containerWidth) * 100;
          var percentageY = (offsetY / containerHeight) * 100;

          $image.css({
            'transform-origin': `${percentageX}% ${percentageY}%`,
            'transform': 'scale(2)'
          });
        }).mouseleave(function () {
          $(this).find('img').css({
            'transform': 'scale(1)',
            'transition': '0.3s',
            'transform-origin': 'center'
          });
        });
      });

    },
    // End Product Detlis zoom

    // Start Product Quick View 
    productQuickView: function () {
      $(document).ready(function () {
        $(".tj__product-icon-view").on('click', function () {
          $(".tj__product-details-popup-view").show(500);
          $("#tj__anywhere-home").addClass("active");
        });

        $("#tj__anywhere-home").on('click', function () {
          $(".tj__product-details-popup-view").hide(200);
          $("#tj__anywhere-home").removeClass("active");
        });
        $(".tj__product-details-close-icon").on('click', function () {
          $(".tj__product-details-popup-view").hide(200);
          $("#tj__anywhere-home").removeClass("active");
        });
      });
    },
    // End Product Quick View

    // Start Successfully Add In Cart
    successfullyAddInCart: function () {
      $(document).ready(function () {
        $(".tj__product-icon-addtocart").on('click', function () {
          $(".tj__successfully-addedin-cart").show(500);
          $("#tj__anywhere-home").addClass("active");
        });

        $("#tj__anywhere-home").on('click', function () {
          $(".tj__successfully-addedin-cart").hide(200);
          $("#tj__anywhere-home").removeClass("active");
        });
      });
    },
    // End Successfully Add In Cart

    // Start Successfully Add In Wishlist
    successfullyAddInWishlist: function () {
      $(document).ready(function () {
        $(".tj__product-icon-love").on('click', function () {
          $(".tj__successfully-addedin-wishlist").show(500);
          $("#tj__anywhere-home").addClass("active");
        });

        $("#tj__anywhere-home").on('click', function () {
          $(".tj__successfully-addedin-wishlist").hide(200);
          $("#tj__anywhere-home").removeClass("active");
        });
      });
    },
    // End Successfully Add In Wishlist

    // Start Category Button Activation
    categoryButtonActivation: function () {
      $(document).ready(function () {
        $(".tj__category-dropdown-btn").on("click", function () {
          $(".tj__category-nav").slideToggle();
        });
      });
    },
    // End Category Button Activation

    //  Start Custom Country Selection
    customCountrySelection: function () {
      $(document).ready(function () {
        // Toggle dropdown when clicking on the language selector
        $('.selected-language').click(function (e) {
          e.stopPropagation();
          $('.language-dropdown').toggle();
        });

        // Close dropdown when clicking elsewhere on the page
        $(document).click(function () {
          $('.language-dropdown').hide();
        });

        // Change selected language when clicking on an option
        $('.language-option').click(function () {
          const lang = $(this).data('lang');
          const flagSvg = $(this).find('.flag').html();
          const langName = $(this).find('.language-name').text();

          // Update the selected language
          $('.selected-language .flag').html(flagSvg);
          $('.selected-language .language-name').text(langName);

          // Hide dropdown
          $('.language-dropdown').hide();

          // You can add additional code here to handle language change
          console.log('Language changed to: ' + lang);
        });
      });
    },
    //  End Custom Country Selection

    // Start Inline Css Activation
    inlineCssActivation: function () {
      $(document).ready(function () {
        $("[data-background]").each(function () {
          $(this).css(
            "background-image",
            "url( " + $(this).attr("data-background") + "  )"
          );
        });
      });
    },
    // End Inline Css Activation

    // Start Nice Select Activation
    niceSelections: function () {
      $(document).ready(function () {
        $(".tj__lang-home-three, .tj__carency-home-three").niceSelect();
      });
    },
    // End Nice Select Activation

    // Start Swiper Slider
    swiperActivation: function () {

      // Start Team Area Home 1
      if ($(".tj__team-home-one").length > 0) {
        var brand = new Swiper(".tj__team-home-one", {
          slidesPerView: 4,
          spaceBetween: 24,
          loop: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
            },
            432: {
              slidesPerView: 1,
            },
            650: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 4
            }
          },
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // End Team Area Home 1

      // Start Testimonial Area Home 1
      if ($(".tj__testimonial-home-one").length > 0) {
        var brand = new Swiper(".tj__testimonial-home-one", {
          slidesPerView: 1,
          loop: true,
          effect: "fade",
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // End Testimonial Area Home 1

      // Start About Area Home 1
      if ($(".tj__about-home-two").length > 0) {
        var brand = new Swiper(".tj__about-home-two", {
          slidesPerView: 1,
          loop: true,
          effect: "fade",
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // End About Area Home 1

      // Start Project Area Home 2
      if ($(".tj__project-home-two").length > 0) {
        var brand = new Swiper(".tj__project-home-two", {
          slidesPerView: 5,
          spaceBetween: 24,
          loop: true,
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
          breakpoints: {
            320: {
              slidesPerView: 2,
            },
            767: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            991: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 5,
            }
          },
        });
      }
      // End Project Area Home 2

      // Start Testimonial Area Home 2
      if ($(".tj__testimonial-home-two").length > 0) {
        var brand = new Swiper(".tj__testimonial-home-two", {
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
          pagination: {
            el: ".tj__testimonial-home-two-paiganation",
            type: "fraction",
            formatFractionCurrent: function (number) {
              return number;
            },
            formatFractionTotal: function (number) {
              return number;
            },
          },
        });
      }
      // End Testimonial Area Home 2

      // Start Hero Area Home 3
      if ($(".tj__hero-home-three").length > 0) {
        var brand = new Swiper(".tj__hero-home-three", {
          slidesPerView: 1,
          loop: true,
          pagination: {
            el: ".tj__home-three-hero-pagination",
          },
          autoplay: {
            delay: 2000,
          },
        });
      }
      // End Hero Area Home 3

      // Start Popular Product Area Home 3
      if ($(".tj__popular-product-home-three").length > 0) {
        var brand = new Swiper(".tj__popular-product-home-three", {
          slidesPerView: 4,
          spaceBetween: 24,
          loop: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
            },
            432: {
              slidesPerView: 1,
            },
            650: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 3,
            },
            1199: {
              slidesPerView: 4,
            }
          },
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // Start Popular Product Area Home

      // Start Trending Product Area Home 3
      if ($(".tj__trending-product-home-three").length > 0) {
        var brand = new Swiper(".tj__trending-product-home-three", {
          slidesPerView: 3,
          spaceBetween: 24,
          loop: true,
          breakpoints: {
            320: {
              slidesPerView: 1,
            },
            432: {
              slidesPerView: 1,
            },
            650: {
              slidesPerView: 2,
            },
            991: {
              slidesPerView: 2,
            },
            1299: {
              slidesPerView: 3,
            }
          },
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // Start Trending Product Area Home

      // Start Testimonial Area Home 2
      if ($(".tj__testimonial-home-three").length > 0) {
        var brand = new Swiper(".tj__testimonial-home-three", {
          slidesPerView: 1,
          loop: true,
          navigation: {
            nextEl: ".tj__swiper-prev-arrow",
            prevEl: ".tj__swiper-next-arrow",
          },
        });
      }
      // End Testimonial Area Home 2
    },
    // End Swiper Slider

    // Start Sudo Code
    sudoCode: function () {

      // Start Responsvie Code For Home 3 Hero Area (Hide Containe From 1199px to 0px)
      $(document).ready(function () {
        $(window).resize(function () {
          if ($(window).width() <= 1199) {
            $(".tj__hero-area-home-3 .tj__container").removeClass("tj__container");
          } else {
            $(".tj__hero-area-home-3 .row").parent().addClass("tj__container");
          }
        }).resize();
      });
      // End Responsvie Code For Home 3 Hero Area (Hide Containe From 1199px to 0px)
    }
    // End Sudo Code 
  };

  tjJs.m();
})(jQuery, window);
