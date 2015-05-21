// JavaScript Document
require.config({
	baseUrl:"/js"
//	paths:{
//		//"db":"db/db_core"
//		"zepto":"../lib/zepto/zepto",
//		"iscroll":"../lib/iscroll/iscroll",
//	},
//	shim:{
//		"zepto":{
//           "exports": "Zepto"
//		},
//		"iscroll":{
//           "exports": "IScroll"
//		},
//	}
});
require(["mod/common"],function(common){

	function initBanner(){
		//banner
		var bullets,bannerLength;	
		bullets = document.getElementById('banner_btn').getElementsByTagName('span');
		bannerLength=bullets.length>2?true:false;
		
		window.mySwipe = Swipe(document.getElementById("nfd-slide"),{
			auto:3000,
			continuous:true,
			stopPropagation:false,
			callback:function(pos){
				 var on=document.getElementsByClassName("ws-selected");
				 if(on.length){
					 on[0].className="";
				 }
				 pos=bannerLength?pos:pos%2;
				 bullets[pos].className = 'ws-selected';
			}
		});
		//$("#nfd-slide").find("img").show();
	}
	
	function init(){
		common.init();
		initBanner();
	}
	init();/*首页模块初始化*/
});