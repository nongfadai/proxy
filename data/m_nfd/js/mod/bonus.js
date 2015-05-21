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
	
	function makeTab(dom){
		dom.find(".hd a").on("click",tabClick);
		
		function tabClick(e){
			var target=$(e.target);
			console.log(target);
			if(target.hasClass("selected")){
				console.log("haveClass");
			}
			else{/**/
				dom.find(".selected").removeClass("selected");
				//target.addClass("selected");
				dom.find("."+target.attr("data-tab")).addClass("selected");
			}
		}
		
	}
	
	//nfd-tab
	
	function init(){
		common.init();
		makeTab($("#nfd-investments"));
		
		$(".bonus_extra").on("click",function(){
				var $this=$(this).parent().parent();
				$this.find(".bonus_bottom").toggle();
			});

	}
	init();/*首页模块初始化*/
});