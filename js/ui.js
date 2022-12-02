$(function () {

	var breakpointWidth = 1217,
		breakpointHeight = 500;

	var agent = navigator.userAgent.toLowerCase();

	/* [s] 아이폰 사파리 브라우저 감지 */
	var ua = window.navigator.userAgent;
	var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
	var webkit = !!ua.match(/WebKit/i);
	var iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
	var scrollOv;
	/* [e] 아이폰 사파리 브라우저 감지 */

	if (iOSSafari) {
		scrollOv = false;
	} else {
		scrollOv = true;
	}

	$("#fullpage").fullpage({
		anchors: ["firstPage", "secondPage", "3rdPage", "4thpage", "lastPage"],
		navigationTooltips: ['INTRODUCTION', 'WORKS', '', 'ABOUT', 'CONTACT'],
		showActiveTooltip: true,
		navigation: false,
		menu: '#menu',
		//scrollOverflow: scrollOv,
		//scrollingSpeed: 700,
		//스크롤로 바꾸는 기능
		//autoScrolling: true,
		//fitToSection: false,
		responsiveWidth: breakpointWidth,
		responsiveHeight: breakpointHeight,


		// 반응형 바뀔 때
		afterResponsive: function (isResponsive) {
			$(".sec03").removeClass('fp-noscroll')
			if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
				$('body').off('scroll touchmove mousewheel');
			} else {
				$('body').off('scroll touchmove wheel');
			}
		},


		// 구역을 떠나면 콜백이 실행됩니다.
		onLeave: function (origin, destination, direction) {
			var leavingSection = this;

			if (destination == "1") {
				$('.gnb_wrap .top').addClass('first');
				$('body').off('scroll touchmove wheel mousewheel');
				setTimeout(function () {
					$('body').off('scroll touchmove wheel mousewheel');
				}, 500)
			}

			if (destination == "2") {
				$('.gnb_wrap .top').removeClass('first');
				if ($(".item_wrap").hasClass('open')) {
					// IE 
					// if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
					// 	$('body').on('scroll touchmove mousewheel', function (event) {
					// 		event.preventDefault();
					// 		event.stopPropagation();
					// 		return false;
					// 	});

					// } else { // other browser
					// 	$('body').on('scroll touchmove wheel', function (event) {
					// 		event.preventDefault();
					// 		event.stopPropagation();
					// 		return false;
					// 	});
					// }
					//sec02scrollTrans();
				}
			}

			if (destination == "3") {
				// $('body').off('scroll touchmove wheel mousewheel');
				// setTimeout(function () {
				// 	$('body').off('scroll touchmove wheel mousewheel');
				// }, 500)

				var delay;
				var yPos;

				if (Mobile()) { // 모바일
					delay = 0;
					yPos = -296;
				} else { // PC
					delay = 0.5;
					yPos = -1900;
				}

				gsap.to(".bg_ani", {
					y: yPos,
					delay: delay,
					duration: 2.3
				});

				gsap.to(".we", {
					//opacity: 1
				});

				section3Gsap();
			}

			if (destination == "4") {
				section4Gsap();
			}

			if (destination == "5") {
				section5Gsap();

			}

		},

		// 구역을 불러오고 나서 스크롤이 끝나면 콜백이 실행됩니다.
		afterLoad: function (origin, destination, direction) {
			if (destination == "3") {
				//	$(".branding .we").addClass('active')
			} else {
				//				$(".branding .we").removeClass('active')
			}
			if (destination == "2") {
				//swiper.mousewheel.enable()
			}
		}

	});


	var secHeight,
		scrollerHeight,
		scrollerTop,
		translate3d;

	function logoPosition() {
		// 초기 로고 position 설정
		// var secHeight = $(".sec02 .fp-tableCell").outerHeight() / 2;
		// var scrollerHeight = $(".sec03 .we").outerHeight() / 2;
		// var scrollerTop = secHeight - scrollerHeight
		// var translate3d = 'translate3d(0px, ' + scrollerTop + 'px, 0px)';
		// $(".sec03 .we").css('transform', translate3d)
	}
	//logoPosition()



	function mobileClassActive() {
		$("html").removeClass("desktop").addClass("mobile");
		$(".sec03 .we").removeAttr('style')
	}

	function pcClassActive() {
		$("html").removeClass("mobile").addClass("desktop");
		logoPosition()
	}

	// desktop, mobile 구분
	if ($(this).width() < breakpointWidth || $(this).outerHeight() < breakpointHeight) {
		mobileClassActive()
		//$.fn.fullpage.setAutoScrolling(false)
	} else {
		pcClassActive()
		$.fn.fullpage.setAutoScrolling(true)
	}

	// reSize
	function reSize() {
		$(window).resize(function () {
			if (this.resizeTO) {
				clearTimeout(this.resizeTO);
			}
			this.resizeTO = setTimeout(function () {
				$(this).trigger('resizeEnd');
			}, 100);
		});

		$(window).on("resizeEnd", function () {
			if ($(this).width() < breakpointWidth || $(this).outerHeight() < breakpointHeight) {
				// mobile
				mobileClassActive()
				//$.fn.fullpage.setAutoScrolling(false)
			} else {
				// pc
				pcClassActive()
				$.fn.fullpage.setAutoScrolling(true)

			}
		})
	}
	reSize()


	// sec02

	swiper = new Swiper(".item_wrap", {
		slidesPerView: 3,
		freeMode: false,
		scrollbar: {
			el: '.swiper-scrollbar',
			draggable: true,
			dragSize: '123px',
		},
		// mousewheel: true,
		on: {
			scroll: function () {
				//sec02scrollTrans()
			},

			touchMove: function () {
				//sec02scrollTrans()
				$('.svg_icon').hide();
			},

			reachEnd: function () {
				setTimeout(function () {
					$.fn.fullpage.setAllowScrolling(true);
				}, 500);
			}
		},

		breakpoints: {
			1217: { //1217 이하일 경우
				slidesPerView: 2,
				freeMode: true,
				loop: true,
				pagination: {
					el: ".swiper-pagination",
					type: "fraction",
					clickable: true,
				},
			},
			1560: { //1560 이하일 경우
				slidesPerView: 2,
			},

		}
	});


	var scrollbar,
		scrollX,
		scrollbarWidth = $(".sec02 .swiper-scrollbar-drag").width(),
		totalScrollX,
		scrollAreaWidth = parseInt($(".sec02 .swiper-scrollbar").width());

	function sec02scrollTrans() {

		setTimeout(function () {
			scrollbar = $(".sec02 .swiper-scrollbar-drag").css('transform');

			if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {

				// IE
				scrollX = scrollbar.substring(45, 50).replace(',', '');
				totalScrollX = Number(scrollX) + scrollbarWidth;
				if (totalScrollX >= scrollAreaWidth) {
					// 아래로 내리기
					$(".item_wrap").addClass('open');
					swiper.mousewheel.disable()
					$('body').off('scroll touchmove mousewheel');
					$('body').on('scroll touchmove mousewheel', function (event) {
						var E = event.originalEvent;
						var wheelDelta = E.wheelDelta
						if (wheelDelta < 0) {
							$.fn.fullpage.moveTo(3);
						}
						//event.preventDefault();
						//event.stopPropagation();
						return false;
					})
				} else if (!totalScrollX) {
					// 위로 올리기
					$(".item_wrap").addClass('open')
					swiper.mousewheel.disable()
					$('body').off('scroll touchmove mousewheel');
					$('body').on('scroll touchmove mousewheel', function (event) {
						var E = event.originalEvent;
						var wheelDelta = E.wheelDelta;
						if (wheelDelta > 0) {
							$.fn.fullpage.moveTo(1);
						}
						//event.preventDefault();
						//event.stopPropagation();
						return false;
					})
				}

			} else {

				// other browser
				scrollX = scrollbar.substring(19, 23).replace(',', '');
				totalScrollX = Number(scrollX) + scrollbarWidth;
				if (totalScrollX >= scrollAreaWidth) {
					// 아래로 내리기
					$(".item_wrap").addClass('open')
					$('body').off('scroll touchmove wheel mousewheel');
					$('body').on('scroll touchmove wheel mousewheel', function (event) {
						var E = event.originalEvent;
						var wheelDelta = E.wheelDelta
						if (wheelDelta < 0) {
							$.fn.fullpage.moveTo(3);
						}
						//event.preventDefault();
						//event.stopPropagation();
						return false;
					})


				} else if (!totalScrollX) {
					// 위로 올리기
					$(".item_wrap").addClass('open')
					$('body').off('scroll touchmove wheel mousewheel');
					$('body').on('scroll touchmove wheel mousewheel', function (event) {
						var E = event.originalEvent;
						var wheelDelta = E.wheelDelta;
						if (wheelDelta > 0) {
							$.fn.fullpage.moveTo(1);
						}
						//event.preventDefault();
						//event.stopPropagation();
						return false;
					})
				}
			}

		}, 500);
	}



	var slideIndex = 58;

	$("#more").click(function () {
		console.log(swiper)

		if (swiper) {
			itemLength = $(".item").length;
			$(".item").slice(0, slideIndex).css('display', 'block');

			if (slideIndex == itemLength) {
				$(".item_wrap").addClass('full');
			}

			$('.svg_icon').show();
			//$('.svg_icon, .btn_swiper').show();

			swiper.update();
			swiper.update();
			slideIndex = slideIndex + 3;
			//swiper.mousewheel.enable()
			//$.fn.fullpage.setAllowScrolling(false);
		}



		// var swiper02 = new Swiper(".item_wrap", {
		//     slidesPerView: 3,
		//     freeMode: false,
		//     scrollbar: {
		//         el: '.swiper-scrollbar',
		//         draggable: true,
		//         dragSize: '123px',
		//     },
		//     mousewheel: true,
		//     pagination: {
		//         el: ".swiper-pagination",
		//         type: "fraction",
		//         clickable: false,
		//     },
		//     on: {

		//         scroll: function () {
		//             var scrollbar,
		//                 scrollX,
		//                 scrollbarWidth = $(".sec02 .swiper-scrollbar-drag").width(),
		//                 totalScrollX,
		//                 scrollAreaWidth = parseInt($(".sec02 .swiper-scrollbar").width());
		//             setTimeout(function () {
		//                 scrollbar = $(".sec02 .swiper-scrollbar-drag").css('transform');
		//                 scrollX = scrollbar.substring(19, 23);
		//                 totalScrollX = Number(scrollX) + scrollbarWidth;
		//                 if (totalScrollX == scrollAreaWidth) {
		//                     // 아래로 내리기
		//                     $(".item_wrap").addClass('open')
		//                     $(".item_wrap").off('scroll touchmove wheel mousewheel');
		//                     $('body').off('scroll touchmove wheel mousewheel');
		//                 } else if (!totalScrollX) {
		//                     // 위로 올리기
		//                     $(".item_wrap").addClass('open')
		//                     $(".item_wrap").off('scroll touchmove wheel mousewheel');
		//                     $('body').off('scroll touchmove wheel mousewheel');
		//                 }
		//             }, 500);
		//         },
		//     },
		//     breakpoints: {
		//         1217: { //1217 이하일 경우
		//             slidesPerView: 2,
		//             freeMode: true,
		//             pagination: {
		//                 el: ".swiper-pagination",
		//                 type: "fraction",
		//                 clickable: true,
		//             },
		//         },
		//     }
		// });




		// IE 11 까지
		// if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
		// 	console.log('IE, body 스크롤일시정지')
		// 	$('body').on('scroll touchmove mousewheel', function (event) {
		// 		event.preventDefault();
		// 		event.stopPropagation();
		// 		return false;
		// 	});

		// } else {
		// 	console.log('body 스크롤일시정지')
		// 	$('body').on('scroll touchmove wheel', function (event) {
		// 		event.preventDefault();
		// 		event.stopPropagation();
		// 		return false;
		// 	});
		// }


	});




	// gnb
	var tl = gsap.timeline({
		paused: true
	});

	document.querySelector('.all_menu_btn').addEventListener('click', function () {
		this.classList.toggle('active');
	});

	$(".gnb>li>a").mouseover(function () {
		idx = $(this).parent('li').index()
		$(".menu_bg").addClass('bg' + idx)
	}).mouseleave(function () {
		idx = $(this).parent('li').index()
		$(".menu_bg").removeClass('bg' + idx)
	})

	$(".gnb_wrap .all_menu_btn").click(function () {
		$(".gnb_wrap").addClass('open');
		tl.reversed(!tl.reversed());
		// gsap.fromTo('.bg_menu span', {

		// 	width: "0",


		// }, {
		// 	duration: 1,
		// 	width: "100%",
		// 	stagger: 0.1,
		// 	ease: 'Expo.easeInOut'
		// });
	})

	tl.to('.gnb_box', {
		duration: 0,
		//display: "block",
		left: 0,
		ease: 'Expo.easeInOut',
	});

	tl.from('.bg_menu span', {
		duration: 0.7,
		width: "0",
		stagger: 0.1,
		onReverseComplete: function () {
			$(".gnb_wrap").removeClass('open');
		},
		ease: 'Expo.easeInOut'
	});

	tl.from('.gnb li a', {
		duration: 0.8,
		y: "100%",
		stagger: 0.2,
		ease: 'Expo.easeInOut'
	}, "-=0.5");

	tl.from('.menu_bg', {
		duration: 0.5,
		scale: 0,
		stagger: 0.3,
		ease: Back.easeOut.config(1.7)
	});

	tl.reverse();

	$(".gnb>li>a").click(function () {
		setTimeout(function () {
			$(".gnb_wrap").removeClass('open')
		}, 500);
	})






	$(window).on('scroll touchmove wheel', function (e) {
		// gnb
		var windowScrollTop = $(window).scrollTop()
		sectionTop02 = $(".sec02").offset().top;

		if (windowScrollTop >= sectionTop02) {
			$(".gnb_wrap .top").addClass('active')
		} else {
			$(".gnb_wrap .top").removeClass('active')
		}

		// if ($(window).width() < 1217) {
		// 	var logoHeight = $(".sec03 .we").outerHeight();

		// 	sectionTop03 = $(".sec03").offset().top - 60;
		// 	sectionTop04 = $(".sec04").offset().top - logoHeight - 500;


		// 	if (sectionTop03 <= windowScrollTop) {
		// 		$(".sec03 .we").addClass('active')
		// 	} else if (sectionTop03 >= windowScrollTop) {
		// 		$(".sec03 .we").removeClass('active')
		// 	}

		// 	if (windowScrollTop >= sectionTop04) {
		// 		$(".sec03 .we").removeClass('active')
		// 	}
		// } else {
		// 	$(".sec03").on('scroll touchmove wheel', function (e) {
		// 		var scroller = $(this).find(".fp-scroller")
		// 		secHeight = $(this).outerHeight() / 2;
		// 		scrollerHeight = $(".sec03 .we").outerHeight() / 2;
		// 		scrollerTop = Math.abs(scroller.offset().top) + secHeight - scrollerHeight;
		// 		translate3d = 'translate3d(0px, ' + scrollerTop + 'px, 0px)';
		// 		$(".sec03 .we").css('transform', translate3d)
		// 	})
		// }

	})

	$(".footer .top").on('click', function () {
		$('html, body').animate({
			scrollTop: 0
		}, '500');
		$.fn.fullpage.moveTo(1);
	})

	section1Gsap();
})

function section1Gsap() {

	// gsap.fromTo(".sec01 .intro_box > .pc_conetent", {
	// 	scale: 1.5
	// }, {
	// 	scale: 1,
	// 	duration: 3
	// });
	gsap.to(".desktop .sec01 .intro_box > .pc_conetent", {
		scale: 1,
		duration: 3
	});

	gsap.to(".desktop .gnb_wrap", {
		x: 0,
		delay: 2,
		duration: 0.5,
		ease: Back.easeOut.config(1.5)
	});

	// gsap.fromTo(".txt_box", {
	// 	opacity: 0
	// }, {
	// 	x: 200,
	// 	y: 100,
	// 	opacity: 1,
	// 	duration: 1
	// });

	// gsap.to(".sec01 .intro_box > .pc_conetent", {
	// 	scale: 1.5
	// });
}

function section3Gsap() {
	gsap.to(".wave", {
		scale: 1,
		duration: 1,
		onComplete: function () {
			$('.wave').removeClass('paused');
		}
	});

	gsap.to(".sec03 .branding .we > p", {
		scale: 1,
		delay: 1,
		duration: 0.7,
	});
}

function section4Gsap() {

	var delay1;
	var delay2;
	var delay3;
	var delay4;
	var delay5;
	var delay6;

	if (Mobile()) { // 모바일
		delay1 = 0;
		delay2 = 0.5;
		delay3 = 1;
		delay4 = 1.2;
		delay5 = 1.6;
		delay6 = 2;
	} else { // PC
		delay1 = 1;
		delay2 = 1.5;
		delay3 = 2;
		delay4 = 2.5;
		delay5 = 3;
		delay6 = 3.5;
	}

	gsap.to(".sec04 .top_box .tit", {
		y: 0,
		delay: delay1,
		opacity: 1
	});

	gsap.to(".sec04 .top_box p", {
		y: 0,
		delay: delay2,
		opacity: 1
	});

	gsap.to(".we_list > li:nth-child(1)", {
		x: 0,
		delay: delay3,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".we_list > li:nth-child(2)", {
		x: 0,
		delay: delay4,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".we_list > li:nth-child(3)", {
		x: 0,
		delay: delay5,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".we_list > li:nth-child(4)", {
		x: 0,
		delay: delay6,
		duration: 0.5,
		opacity: 1
	});
}

function section5Gsap() {

	var delay1;
	var delay2;
	var delay3;
	var delay4;

	if (Mobile()) { // 모바일
		delay1 = 0;
		delay2 = 0.5;
		delay3 = 1;
		delay4 = 1.5;
	} else { // PC
		delay1 = 1;
		delay2 = 1.5;
		delay3 = 2;
		delay4 = 2.5;
	}

	gsap.to(".sec05 .sec_name", {
		y: 0,
		delay: delay1,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".sec05 .info_box .box", {
		y: 0,
		delay: delay2,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".sec05 .copy", {
		y: 0,
		delay: delay3,
		duration: 0.5,
		opacity: 1
	});

	gsap.to(".desktop .sec05 .footer", {
		x: 0,
		delay: delay4,
		duration: 0.5,
		opacity: 1,
		ease: Back.easeOut.config(1.5)
	});
}

function Mobile() {
	return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}