$(function () {
    var scroll = function () {

        var $nav = null,
            $sec = null,
            moveCnt = null,
            moveIndex = 0,
            moveCntTop = 0,
            winH = 0,
            time = false,
            lastpage;

        $(document).ready(function () {
            init();
            initEvent();
        });

        var init = function () {
            $("main").addClass("fullPage").find(">section").addClass("section");
            lastpage = $(".section").length;
            $sec = $(".section");
            $nav = $(".header a");
        };

        var initEvent = function () {
            $("html ,body").scrollTop(0);
            winResize();
            $(window).resize(function () {
                winResize();
            });
            $nav.on("click", function () {
                moveIndex = $(this).parent("li").index();
                moving(moveIndex);
                return false;
            });
            $sec.on("mousewheel", function (e) {
                if (time === false) { // time 변수가 펄스일때만 휠 이벤트 실행
                    wheel(e);
                }
            });
        };

        var winResize = function () {
            winH = $(window).height();
            $sec.height(winH);
            $("html ,body").scrollTop(moveIndex.scrollTop);
        };

        var wheel = function (e) {
            if (e.originalEvent.wheelDelta < 0) {
                if (moveIndex < 4) {
                    console.log('down')
                    moveIndex += 1;
                    moving(moveIndex);
                };
            } else {
                if (moveIndex > 0) {
                    moveIndex -= 1;
                    moving(moveIndex);
                };
            };
        };

        var moving = function (index) {
            time = true // 휠 이벤트가 실행 동시에 true로 변경
            moveCnt = $sec.eq(index);
            console.log(moveCnt)
            moveCntTop = moveCnt.offset().top;
            $("html ,body").stop().animate({
                scrollTop: moveCntTop
            }, 1000, function () {
                time = false; // 휠 이벤트가 끝나면 false로 변경
            });
            $nav.parent("li").eq(index).addClass("on").siblings().removeClass("on");
        };

    };

    scroll();
})