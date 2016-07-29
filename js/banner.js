$(function() {
	var sWidth = $(window).width(); //获取焦点图的宽度（显示面积）
	var len = $("#focus ul li").length; //获取焦点图个数
	var index = 0;
	var picTimer;
    
	//以下代码添加数字按钮和按钮后的半透明条，还有上一页、下一页两个按钮
	var btn = "<div class='btnBg'></div><div class='btn'>";
	for(var i=0; i < len; i++) {
		btn += "<span></span>";
	}
	$("#focus").append(btn);

	//为小按钮添加鼠标滑入事件，以显示相应的内容
	$("#focus .btn span").addClass("on").mouseover(function() {
		index = $("#focus .btn span").index(this);
		showPics(index);
	}).eq(0).trigger("mouseover");

	//本例为左右滚动，即所有li元素都是在同一排向左浮动，所以这里需要计算出外围ul元素的宽度
	$("#focus ul").css("width",sWidth * (len));
	
	//鼠标滑上焦点图时停止自动播放，滑出时开始自动播放
	$("#focus").hover(function() {
		clearInterval(picTimer);
	},function() {
		picTimer = setInterval(function() {
			showPics(index);
			index++;
			if(index == len) {index = 0;}
		},3000); //此4000代表自动播放的间隔，单位：毫秒
	}).trigger("mouseleave");
	
	//显示图片函数，根据接收的index值显示相应的内容
	function showPics(index) { //普通切换
		var nowLeft = -index*sWidth; //根据index值计算ul元素的left值
		$("#focus ul").stop(true,false).animate({"left":nowLeft},300); //通过animate()调整ul元素滚动到计算出的position
		//$("#focus .btn span").removeClass("on").eq(index).addClass("on"); //为当前的按钮切换到选中的效果
		$("#focus .btn span").stop(true,false).animate({"opacity":"0.4"},300).eq(index).stop(true,false).animate({"opacity":"1"},300); //为当前的按钮切换到选中的效果
	}
	//去除list最右边个右边距
	//$("#downlist li").eq(2).css({"margin-right":"0"});
	$.each($("#downlist li"),function(i,n){
		if(i%3==2){
			$(this).css({"margin-right":"0"});
		}
	});
	//tab切换
	$(".tab_main ul").eq(0).show();
	$(".tab_title h4").bind("click",function(){
		$(this).addClass("on");
		$(this).siblings().removeClass("on");
		var index = $(this).index();
		$(this).parents(".downTab").find(".tab_main ul").hide()
		$(this).parents(".downTab").find(".tab_main ul").eq(index).show();
	});    
	//初始化
    $("#focus").attr("style","width:"+sWidth+"px;");
    $("#focus ul li").attr("style","width:"+sWidth+"px;");
    $("#focus ul li a img").attr("style","margin-left:"+(sWidth-1600)/2+"px;");
    $("#focus .btn").attr("style","left:"+sWidth/2+"px");
    $("#focus .btnBg").attr("style","left:"+(sWidth/2-7)+"px");
});
