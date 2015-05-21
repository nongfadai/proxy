require.config({
	baseUrl: "/js"
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
require(["mod/common"], function(common) {
	//var min = 200;
	//var max = 500000;
	var amount = $("#money_order");

	var g_single_min = g_min; /*单笔最低金额*/
	var g_single_max = g_max; /*单笔最高限额*/

	var g_day_max = 50000; /*当日最高限额*/
	var g_month_max = 200000; /*当月最高限额*/

	var g_day_amt = g_day_recharge; //当日充值累计
	var g_month_amt = g_month_recharge; //当月充值累计

	var g_day_rest = 0; //当日剩余额度
	var g_month_rest = 0; //当月剩余额度


	function genData(single_max, day_max, month_max) {
		g_day_max=day_max;
		g_month_max=month_max;
		g_single_max = single_max;
		g_day_rest=day_max-g_day_amt;
		if(g_month_max){
			g_month_rest=g_month_max-g_month_amt;
		}
		console.log("g_day_max:"+g_day_max+",g_month_max:"+g_month_max);
	}

	function validateAmount(amt) {
		var result = "";
		if (amt < g_single_min) {
			result = "单笔充值金额不能低于" + money2String(g_single_min) + "";
		}
		if (!result && amt > g_single_max) {
			result = "单笔充值金额不能高于" + money2String(g_single_max) + "";
		}
		if (!result && amt > g_day_rest) {
			result = "您今天已充值" + money2String(g_day_amt) + "，剩余可充金额" + money2String(g_day_rest);
		}
		if (!result &&g_month_rest&& amt > g_month_rest) {
			result = "您本月已充值" + money2String(g_month_amt) + "，剩余可充金额" + money2String(g_month_rest);
		}

		return result;
	}

	function money2String(money) {
		var result = "";
		if (money <= 0) {
			result = money;
		} else if (money % 10000 === 0) { /*万元的整数倍*/
			result = money / 10000 + "万元";
		} else if (money > 1000) { /*转换成字符串加上千位符号*/
			var moneyStr = "" + money;
			var moneyArr = moneyStr.split("").reverse();
			//console.log("moneyArr", moneyArr);
			var moneyArr2 = [];
			for (var i = 0; i < moneyArr.length; i++) {
				moneyArr2.push(moneyArr[i]);
				if (i % 3 == 2 && i < moneyArr.length - 1) { //最后一个千分符号舍弃掉
					moneyArr2.push(",");
				}
			}
			//console.log("moneyArr2", moneyArr2);
			result = moneyArr2.reverse().join("") + "元";
		} else {
			result = "" + money;
		}
		return result;
	}

	function test() {
		function test_validateAmount() {
			console.log(validateAmount(100));
			console.log(validateAmount(200));
			console.log(validateAmount(50000));
			console.log(validateAmount(50001));
			console.log(validateAmount(10000));
		}

		function test_money2String() {
			console.log(money2String(100));
			console.log(money2String(1000));
			console.log(money2String(10000));
			console.log(money2String(130000));
			console.log(money2String(130022));
		}

		test_validateAmount();
		//test_money2String();
	}
	//test();

	//if (typeof($) == "undefined") {
	//	window.$ = function() {} //便于在node环境中直接测试
	//}

	function init2(){
		$("#rechargeBtn").on("click",sureRecharge);
		$.ajax({
			type: "GET",
			url: "/pay/lianlian/queryBankLimitServlet.htm",
			dataType: "json",
			async: false,
			success: function(data) {
				if (data) {
					var bankHtml = new Array();
					var len = data.length,
						datai;
					for (var i = 0; i < len; i++) {
						datai = data[i];
						bankHtml.push('<input type="hidden" id="' + datai['F02'] + '" value="' + datai['F06'] + '" day="' + datai['F07'] + '" month="' + datai['F08'] + '"/>');
					}
					$("#nfd-recharge-c").after(bankHtml.join(''));
					var bank_code = $("#bank_code").val();
					var bankValue = $("#" + bank_code).val();
					if (bankValue) {
						var bk_value = parseFloat(bankValue);
						var dr_value = parseFloat(datai['F07']);
						var dy_value = parseFloat(datai['F08']);
						genData(bk_value, dr_value,dy_value);

						var money_dw = "元";
						if (bk_value > 10000) {
							bk_value = bk_value / 10000;
							money_dw = "万元";
						}
						$("#singleRecharge").html("&nbsp;&nbsp;单笔限额" + bk_value + money_dw + ",当日限额" + (dr_value / 10000) + "万元，<br>&nbsp;&nbsp;通过电脑或线下充值方式无上限。");
					}
				}
			}
		});
		amount.on("focus",function() {
			var msg_wrapper = amount.parent().find(".msg-wrapper");
			if (msg_wrapper.css("display") == 'block') {
				msg_wrapper.hide();
				$("#b_v").show();
			}
		});
		amount.on("input",function() {
			var bank_code = $("#bank_code").val();
			var bankValue = $("#" + bank_code).val();
			if (bankValue && (parseFloat(amount.val()) > parseFloat(bankValue))) {
				//amount.val(bankValue);
			}
			var atoc = Arabia_to_Chinese(amount.val());
			$("#b_v").html(atoc);
			console.log(atoc);
		});
	};
	//验证充值金额
	function validate() {
			var validateResult = true;
			var amountValue = amount.val();
			var msg_wrapper = amount.parent().find(".msg-wrapper");
			var errMsg = null;
			var noMax = g_max / 10000;
			if (!amountValue) {
				errMsg = amount.attr("required-msg");
			} else {
				var bank_code = $("#bank_code").val();
				var bankValue = $("#" + bank_code).val();
				var errMsg = validateAmount(parseFloat(amountValue));
			}
			if (errMsg) {
				msg_wrapper.html('<p class="auth-msg auth-error">' + errMsg + '。</p>');
				validateResult = false;
				msg_wrapper.show();
				$("#b_v").hide();
			}
			//alert("validateResult"+validateResult);
			return validateResult;
		}
		//确定充值
	function sureRecharge(evt) {
		var result=validate();
		if (result) {
			console.log($("#nfd-recharge-form-f").serialize());
			$("#nfd-recharge-form-f").submit();
		}
		evt.preventDefault();
		return false;
	}

	function init() {
		common.init();
		//bindEvent();
		init2();
	}

	init();
});