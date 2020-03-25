var isMobileChk = false;
var isToggleChk = true;

$(function(){
    //첫 로드시 모바일 체크
    fnMobileResizing();

    //헤더 드롭박스
    $(".btn__drop").on("click",function(){
        var $this = $(this);
        if(isMobileChk){//모바일일 경우
            if(isToggleChk){
                fnModalScrollStop();

                $this.addClass("active");
                $this.closest(".drop-box").addClass("on");
                isToggleChk = false;
            }else{
                fnModalScrollOn();

                $this.removeClass("active");
                $this.closest(".drop-box").removeClass("on");

                isToggleChk = true;
            }
        }else{
            $this.closest(".drop-box").toggleClass("on");
        }
    });

    //헤더 아코디언
    $('.drop__content ul.depth').closest("li").on('click','>p',  function() {
        var $this = $(this);
        var $hasCls = $this.closest("li").hasClass("active");
        $this.closest("li").find(".depth").addClass("on");
        $this.closest("ul").find("li").each(function(){
            $(this).removeClass("active");
            $(this).find(".depth").stop().removeClass("on");
        }).promise().then(function(){
            if(!$hasCls){
                $this.closest("li").addClass("active");
                $this.closest("li").find(".depth").addClass("on");
            }
        });
    });

    //서브 체크박스 리스트 토글
    $(".list-select").on("click",".list-select__toggle>p",function(){
        var $this = $(this);
        $this.closest(".list-select__toggle").toggleClass("open");
    });

    //공모 디테일 이미지 리스트
    $thumList = $("ul.thum-img__list>li");
    $thumList.on("click","span",function(){
        var $this = $(this);
        var getSrc = $this.attr("style");
        $thumList.removeClass("active");
        $this.closest("li").addClass("active");
        $(".jq__thumnail").attr("style", getSrc);
    });

    //탭 메뉴
    $(".tab-content").hide();
    $(".tab-content:first").show();
    $("ul.tab__list").on("click", "li", function () {
        var $this = $(this);
        $("ul.tab__list li").find("span").removeClass("active");
        $this.find("span").addClass("active");
        $this.closest(".shadow-box").find(".tab-content").hide();
        var activeTab = $this.attr("rel");
        $("#" + activeTab).fadeIn();
    });

});



function fnModalScrollStop(){
    var $rootScr = $("html").scrollTop() || $("body").scrollTop();
    var objWrapStyl = {
        position: 'fixed',
        minHeight: $(window).height()+$rootScr+'px',
        top: ($rootScr*-1)+'px',
        width: '100%',
    };
    $('.wrap').css(objWrapStyl).data("top", $rootScr);
}

function fnModalScrollOn(){
    var $previusScr = $(".wrap").data("top");
    $('.wrap').attr("style", "");
    $("html, body").animate({scrollTop: $previusScr}, 0);
}

/*******************************************************************
 * @name fnShowPop
 * @description #0001 모달 열기
 * @params sGetName -> 열기 위한 모달 컨테이너 id 값
 * #0001
 *******************************************************************/
function fnShowPop(sGetName){
    var $layer = $("#"+ sGetName);
    var mHeight = $layer.find(".m_content").outerHeight()/2;
    $layer.find(".m_content").css({'margin-top':-mHeight});
    $layer.addClass("on");
    fnModalScrollStop();
}

/*******************************************************************
 * @name fnHidePop
 * @description #0002 모달 닫기
 * @params sGetName -> 닫기 위한 모달 컨테이너 id 값
 * #0002
 *******************************************************************/
function fnHidePop(sGetName){
    $("#"+ sGetName).removeClass("on");
    fnModalScrollOn();
}

/*******************************************************************
 * @name fnMobileResizing
 * @description #0003 윈도우 리사이즈 체크
 * #0003
 *******************************************************************/
function fnMobileResizing(){
    var windowWidth = $(window).width();
    windowWidth <= 1024 ? isMobileChk = true : isMobileChk = false;
}

//윈도우 리사이즈시 한번 더 체크
$(window).resize(function(){
    fnMobileResizing();
});
