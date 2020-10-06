"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JSCCommon = {
	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".menu-mobile--js"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),
	modalCall: function modalCall() {
		$(".link-modal").fancybox({
			arrows: false,
			infobar: false,
			touch: false,
			type: 'inline',
			autoFocus: false,
			i18n: {
				en: {
					CLOSE: "Close",
					NEXT: "Forward",
					PREV: "Back" // PLAY_START: "Start slideshow",
					// PLAY_STOP: "Pause slideshow",
					// FULL_SCREEN: "Full screen",
					// THUMBS: "Thumbnails",
					// DOWNLOAD: "Download",
					// SHARE: "Share",
					// ZOOM: "Zoom"

				}
			}
		});
		$(".modal-close-js").click(function () {
			$.fancybox.close();
		});
		$.fancybox.defaults.backFocus = false;
		var linkModal = document.querySelectorAll('.link-modal');

		function addData() {
			linkModal.forEach(function (element) {
				element.addEventListener('click', function () {
					var modal = document.querySelector(element.getAttribute("href"));
					var data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							var el = modal.querySelector(elem);
							el.tagName == "INPUT" ? el.value = val : el.innerHTML = val; // console.log(modal.querySelector(elem).tagName)
						}
					}

					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				});
			});
		}

		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu: function toggleMenu() {
		var _this = this;

		if (this.btnToggleMenuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.addEventListener('click', function () {
					_this.btnToggleMenuMobile.forEach(function (element) {
						return element.classList.toggle("on");
					});

					_this.menuMobile.classList.toggle("active");

					document.body.classList.toggle("fixed");
					return false;
				});
			});
		}
	},
	closeMenu: function closeMenu() {
		if (this.menuMobile) {
			this.btnToggleMenuMobile.forEach(function (element) {
				element.classList.remove("on");
			});
			this.menuMobile.classList.remove("active");
			document.body.classList.remove("fixed");
		}
	},
	mobileMenu: function mobileMenu() {
		var _this2 = this;

		if (this.menuMobileLink) {
			this.toggleMenu();
			document.addEventListener('mouseup', function (event) {
				var container = event.target.closest(".menu-mobile--js.active"); // (1)

				if (!container) {
					_this2.closeMenu();
				}
			}, {
				passive: true
			});
			window.addEventListener('resize', function () {
				if (window.matchMedia("(min-width: 992px)").matches) {
					JSCCommon.closeMenu();
				}
			}, {
				passive: true
			});
		}
	},
	// /mobileMenu
	tabscostume: function tabscostume(tab) {
		var tabs = {
			Btn: [].slice.call(document.querySelectorAll(".".concat(tab, "__btn"))),
			BtnParent: [].slice.call(document.querySelectorAll(".".concat(tab, "__caption"))),
			Content: [].slice.call(document.querySelectorAll(".".concat(tab, "__content")))
		};
		tabs.Btn.forEach(function (element, index) {
			element.addEventListener('click', function () {
				if (!element.classList.contains('active')) {
					var siblings = element.parentNode.querySelector(".".concat(tab, "__btn.active"));
					var siblingsContent = tabs.Content[index].parentNode.querySelector(".".concat(tab, "__content.active"));
					siblings.classList.remove('active');
					siblingsContent.classList.remove('active');
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			});
		});
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this).addClass('active').siblings().removeClass('active').closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active').eq($(this).index()).fadeIn().addClass('active');
		});
	},
	// /inputMask
	ifie: function ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

		if (isIE11) {//$("body").prepend('<p   class="browsehappy container">Sorry, you are using an outdated browser. You are welcome, <a href="http://browsehappy.com/" target="_blank">refresh your browser</a>, to improve performance, display quality and improve safety.</p>')
		}
	},
	heightwindow: function heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		var vh = window.innerHeight * 0.01; // Then we set the value in the --vh custom property to the root of the document

		document.documentElement.style.setProperty('--vh', "".concat(vh, "px")); // We listen to the resize event

		window.addEventListener('resize', function () {
			// We execute the same script as before
			var vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', "".concat(vh, "px"));
		}, {
			passive: true
		});
	},
	animateScroll: function animateScroll() {
		$(" .top-nav li a, .scroll-link, .tabs__btn-inner").click(function () {
			var elementClick = $(this).attr("href");
			var destination = $(elementClick).offset().top;
			$('html, body').animate({
				scrollTop: destination
			}, 1100);
			return false;
		});
	},
	getCurrentYear: function getCurrentYear(el) {
		var now = new Date();
		var currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
var $ = jQuery;

function eventHandler() {
	var _defaultSl;

	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.ifie();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll(); // JSCCommon.CustomInputFile();

	function whenResize() {}

	window.addEventListener('resize', function () {
		whenResize();
	}, {
		passive: true
	});
	whenResize();
	var defaultSl = (_defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true
		},
		watchOverflow: true
	}, _defineProperty(_defaultSl, "spaceBetween", 0), _defineProperty(_defaultSl, "loop", true), _defineProperty(_defaultSl, "navigation", {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	}), _defineProperty(_defaultSl, "pagination", {
		el: ' .swiper-pagination',
		type: 'bullets',
		clickable: true // renderBullet: function (index, className) {
		// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
		// }

	}), _defaultSl);
	var swiper4 = new Swiper('.sBanners__slider--js', _objectSpread(_objectSpread({}, defaultSl), {}, {
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true
	})); // modal window
	//luckyoneJs
	//.burger-js

	$('.burger-js').click(function () {
		$('.mob-menu--js, .burger-js').toggleClass('active');
		document.body.classList.toggle("fixed");
	});
	$('.mob-menu--js .menu-item-has-children a').click(function () {
		event.preventDefault();
		var parent = this.parentElement;
		parent.classList.toggle('active');
		$(parent).find('.sub-menu').slideToggle(function () {
			$(this).toggleClass('active');
		});
	});
	window.addEventListener('resize', function () {
		if (window.matchMedia("(min-width: 1300px)").matches) {
			$('.mob-menu--js, .burger-js').removeClass('active');
			document.body.classList.remove("fixed");
		}
	}, {
		passive: true
	}); //sSliders

	var manSlider = new Swiper('.man-slider-js', {
		slidesPerView: 1,
		loop: true,
		navigation: {
			nextEl: '.man-slider-next',
			prevEl: '.man-slider-prev'
		},
		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 2
		}
	});
	$('.man-slider-next, .man-slider-prev').click(function () {
		var thisStyle = this.style;
		thisStyle.setProperty('--animation', 'none');
		thisStyle.setProperty('--animation', 'water-drop 1.3s 1 cubic-bezier(.29,.79,.29,.79)');
		window.setTimeout(function () {
			thisStyle.setProperty('--animation', 'none');
		}, 1300);
	});
	var logoesSlider = new Swiper('.logoes-slider-js', {
		slidesPerView: 'auto',
		autoplay: 4000,
		loop: true,
		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 6
		},
		//pagination
		pagination: {
			el: $(this).find('.logoes-pugin-js'),
			clickable: true
		}
	}); //hide when footer is visiable

	window.addEventListener('scroll', HideFixedBtn, {
		passive: true
	});
	window.setTimeout(HideFixedBtn, 30);
	var footer = document.querySelector('.footer');
	var BtnCont = document.querySelector('.fixed-btn-cont');

	function HideFixedBtn() {
		if (!footer || !BtnCont) return;
		var footerTop = $('.footer')[0].getBoundingClientRect().top + $(window)['scrollTop']();
		var windowHeight = calcVh(100); //console.log(footerTop, '//', window.scrollY+windowHeight);

		if (windowHeight + window.scrollY > footerTop) {
			$(BtnCont).addClass('invisible-item');
		} else {
			$(BtnCont).removeClass('invisible-item');
		}
	}

	function calcVh(v) {
		var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
		return v * h / 100;
	} //


	$('.fixed-btn-js, .mob-btn-js').click(function () {
		$('.fixed-btn-js').toggleClass('active');
		$('.fixed-btn-cont').toggleClass('active');
		$('body').toggleClass('fixed2');
	});
	$('.fixed-btn-cont').click(function () {
		if (this.classList.contains('active') && event.target === this) {
			$(this).removeClass('active');
			$(this).find('.fixed-btn-js').removeClass('active');
			$('body').removeClass('fixed2');
		}
	}); //

	var expectSlider = new Swiper('.expect-slider-js', {
		slidesPerView: 'auto',
		loop: true,
		spaceBetween: 20,
		//
		lazy: {
			loadPrevNext: true,
			loadPrevNextAmount: 5
		}
	}); //img-svg

	$('img.img-svg-js').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		$.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

			if (typeof imgClass !== 'undefined') {
				$svg = $svg.attr('class', imgClass + ' replaced-svg');
			} // Remove any invalid XML tags as per http://validator.w3.org


			$svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.

			if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
				$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
			} // Replace image with new SVG


			$img.replaceWith($svg);
		}, 'xml');
	}); // accordion
	//input with custom placeholder

	$('.custom-ph-js').blur(function () {
		if (this.value !== '') {
			$(this).addClass('not-empty');
		} else {
			$(this).removeClass('not-empty');
		}
	}); //end luckyoneJs
}

;

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}