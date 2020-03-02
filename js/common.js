
$(function(){
    //헤더 드롭박스
    $(".drop__btn").on("click",function(){
        var $this = $(this);
        $this.closest(".drop-box").toggleClass("on");
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

});