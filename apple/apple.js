$(function(){
    $(".footer1").mousedown(function(e){
        e.preventDefault();
    });


    //当调整浏览器窗口的大小时，发生 resize 事件
    $(window).resize(function(){
        var clientW=$(window).width();
        console.log(clientW);
        if(clientW<=713){
            //footer
            //$(".add").next("div").removeClass("xianshi");
            $(".header1").css({display:"none"});
            $(".header2").css({display:"block"});
            $(".add").next("div").css({display:"none"});
            $(".add span").css({display:"block"});
        }else if(clientW<730){
            $(".header1").css({display:"none"});
            $(".header2").css({display:"block"});
            //footer
            //$(".add").next("div").addClass("xianshi");
            $(".add").next("div").css({display:"block"});
            $(".add span").css({display:"none"});
        }else{
            $(".header1").css({display:"block"});
            $(".header2").css({display:"none"});
            //footer
            //$(".add").next("div").addClass("xianshi");
            $(".add").next("div").css({display:"block"});
            $(".add span").css({display:"none"});
        }
        //if(clientW<){
        //
        //}else{
        //    $(".add").next("div").css({display:"block"});
        //}
    });
    $(window).resize();
    $(".menubtn").click(function(){
        $(".son").finish();//解决队列问题
        $(".son").slideToggle({display:"block"});
    });


    //小屏的时候才有下拉
    $(".add span").click(function(){
        var index=$(this).index(".add span");
        $(".add").next("div").eq(index).finish();
        $(".add").next("div").eq(index).slideToggle({display:"block"});
    });




//    轮播
    var num=0;
    var move=function(){
        num++;
        if(num==$(".box .list").length-1){
            $(".box").animate({marginLeft:-num*100+"%"},function(){
                $(".box").css({marginLeft:0});
            });
            num=0;
        }else{
            $(".box").animate({marginLeft:-num*100+"%"});
        }
        $(".circle").removeClass("cir1");
        $(".circle").eq(num).addClass("cir1");
    };
    var t= setInterval(move,2000);


    $(".box").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,2000);
    });

    $(".circle").hover(function(){
        clearInterval(t);
    },function(){
        t=setInterval(move,2000);
    });


    $(".circle").click(function(){
       var index=$(".circle").index(this);
        num=index;
        $(".circle").removeClass("cir1");
        $(this).addClass("cir1");
        $(".box").animate({marginLeft:-num*100+"%"});
    });





    //$(".ban")[0].addEventListener("touchstart",function(e){
    //    var obj=e.touches[0];
    //    console.log(obj.pageX);
    //
    //})


    //hold长按
    //tap 点击
    //doubletap 双击
    //touch.config({holdTime:2000});
    //touch.on(document,"hold",function(){
    //    alert(1);
    //})


    $(".box").mousedown(function(e){
        e.preventDefault();
    })
    //开始拖动
    var margin;
    touch.on(".box","dragstart",function(e){
        margin=$(".box")[0].offsetLeft;
        console.log(margin);
    });
    //拖动ing
    touch.on(".box","drag",function(e){
        //console.log(e.x);//距离  左--负
        $(".box").css({marginLeft: e.x+margin});
        //console.log("draging");
    });
    //拖动完成
    touch.on(".box","dragend",function(e){
        //console.log("end");
        //console.log(e.factor);//速率 快--小
        console.log(e.direction);
        $(".box").css({marginLeft: e.x+margin});
        if(Math.abs(e.x)>300 || e.factor<5){
            if(e.direction=="left") {
                num++;
                if (num == $(".box .list").length - 1) {
                    $(".box").animate({marginLeft: -num * 100 + "%"},function(){
                        $(".box").css({marginLeft: 0});
                    });
                    num = 0;
                }else {
                    $(".box").animate({marginLeft: -num * 100 + "%"});
                }
                $(".circle").removeClass("cir1");
                $(".circle").eq(num).addClass("cir1");

            }else if(e.direction=="right"){
                num--;
                if (num == -1) {//第一张的时候不能在向右拖动 ----- return
                    num = 0;
                    $(".box").animate({marginLeft: -num * 100 + "%"});//回到第一张
                    return;
                }else {
                    $(".box").animate({marginLeft: -num * 100 + "%"});
                }
            }
        }else{
            //num 不变 回到之前的状态
            $(".box").animate({marginLeft:-num*100+"%"});
        }

    });

//旋转
//    touch.on(".box","touchstart",function(e){
//        e.startRotate();
//    });
//    var startrotate=0;
//    touch.on(".box","rotate",function(e){
//        console.log(e.rotation);
//        var endrotate=startrotate+ e.rotation;
//        if(e.fingerStatus === 'end'){
//            startrotate = startrotate + e.rotation;
//        }
//        $(this).css({transform:"rotate("+endrotate+"deg)"});
//    });



})
