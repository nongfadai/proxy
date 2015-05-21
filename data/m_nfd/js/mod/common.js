// JavaScript Document
define([], function() {
	var f = !1;/*控制menu的显示状态  true代表显示*/
	var flag_isIphone=false;
	if(/iphone os/ig.test(window.navigator.userAgent)){/*如果是iphone 干掉这种双重头部特效*/
		flag_isIphone=true;
		//alert(document.getElementById("nfd-header2"));
		//document.getElementById("nfd-header2").style.display="none";
		//$("#nfd-header2")[0].style.display="none";
	};
	if(/iphone os[ ]*[6|7]/ig.test(window.navigator.userAgent)){/*如果是iphone 干掉这种双重头部特效*/
		$("#nfd-header").addClass("relative");
	};
		
		
	function bindEvent() { //绑定事件  主要指顶部菜单事件
		
		
		
		bindTopMenuEvent();
		bindScrollEvent();
		$(document.body).on("touchmove",touchEvent);
		document.getElementById("nfd-touch").style.webkitTransform = 'translate(0px,0)' + 'translateZ(0)';
		document.getElementById("scroller").style.webkitTransform = 'translate(0px,0)' + 'translateZ(0)';

		//alert(window.navigator.userAgent);
		

	}

	
	function touchEvent(e){
		if(f){
			e.stopPropagation();//禁用事件
			e.preventDefault();
		}
	}
	
	function disableScroll(){
		
	}
	
	function bindTopMenuEvent() { //绑定顶部菜单事件
		$(".nfd-header .menu").on("click",
			function() {
				if(f){/*如果显示菜单，则禁用滚动*/
					disableScroll();
				}
				else{
				}
				var a = f ? $.fn.removeClass: $.fn.addClass;
				f = !f,
				a.call($("#menus,#menu-mask"),"show");
				

		}),
		$("#menu-mask").on("click",
			function() {
				$("#menu-mask,#menus").removeClass("show");
				f = !1
		})
	}

	function onorientationChange(){
		//console.log("onorientationchange");
	}
	

	var g_keyborad_on=false;
	function onInputFocus(){/*输入框聚焦*/
		g_keyborad_on=true;
		//console.log("input focus");
		setTimeout(hideOrShowFooter,0);
	}
	function onInputBlur(){/*输入框失去焦点*/
		g_keyborad_on=false;
		//console.log("input hide");
		setTimeout(hideOrShowFooter,100);
	}
	
	function hideOrShowFooter(){/*隐藏或者显示底部菜单*/
		if(g_keyborad_on){
			$("#nfd-footer").addClass("hide");
			$(".modal-footer").hide();
		}
		else{
			$("#nfd-footer").removeClass("hide");
			$(".modal-footer").show();
		}
	}
	
	
	function bindFixedLayout(){
		/*固定布局模式下  当input focus事件发生时 要隐藏底部导航   focus会有一个事件   如果虚拟键盘消失 则延迟1s显示出来底部导航
			blur会有一个事件，延迟0.5s判断body的高度
		*/
		
		window.refreshScroll=function(){};/*空函数*/
		
		$("input").on("focus",onInputFocus);//
		$("input").on("blur",onInputBlur);//
		
	}
	
	function bindRelativeLayout(){/*绑定相对布局*/
		//console.log("start bind scroll event");
		
		var topHeight = 46;
		var footHeight = 48;
		var restHeight = document.body.clientHeight - topHeight - footHeight;
		//var myScroll;
		var scrollDom = document.getElementById("scroller");
		if (scrollDom && typeof(IScroll) != "undefined") {
			scrollDom.style.height = restHeight + "px";
			//console.log("bind scroll event succ");
			window.myScroll = new IScroll('#scroller', {
				scrollbars: false,
				mouseWheel: true,
				interactiveScrollbars: true,
				shrinkScrollbars: 'scale',
				fadeScrollbars: false,
				preventDefault: false
			});
			document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		}
		
		window.refreshScroll=function(){
			setTimeout(function(){
				//console.log("myScroll refresh");
				if(window.myScroll){
					window.myScroll.disable();
					window.myScroll.enable()
					window.myScroll.refresh();/*如果有iscroll对象 刷新  先disable 还原 然后enable 再接着refresh*/
				}
			},200);
		}
		
		$("input").on("focus,blur,click",window.refreshScroll);
		
	}

	function bindScrollEvent() { //绑定滚动事件
		/*
			默认使用fixed布局
			fixed模式下
		*/
		bindFixedLayout();
		
		//bindRelativeLayout();
	}

	
	function onscrollEvent(){
		//console.log("scrollTop="+document.body.scrollTop);

		if(document.body.scrollTop>0){
			$("#nfd-header2").hide();
		}
		if(document.body.scrollTop<=0){
			if(!flag_isIphone){/*如果是iphone 不显示第二菜单*/
				$("#nfd-header2").show();
			}
		}
		setTimeout(showHeader2,100)
		//var img=new Image();
		//img.src="http://www.baidu.com/favicon.ico?scrollTop=["+document.body.scrollTop+"]";
	}
	
	function showHeader2(){
		if(document.body.scrollTop<=0){
			if(!flag_isIphone){/*如果是iphone 不显示第二菜单*/
				$("#nfd-header2").show();
			}
		}
	}

	function init() {
		//console.log("common init");
		$(bindEvent);
		
		window.onscroll=onscrollEvent;
		
		window.onorientationchange = onorientationChange;
		//window.addEventListener("load",bindEvent,false);
		//window.onloadbindEvent();
	}

	return {
		init: init
	}
});