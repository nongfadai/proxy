KISSY.add("module/user",
function(a, b) {
	var c = function() {};
	return c.sendBindMobileCode = function(a) {
		var a = a || {};
		return new b({
			type: "post",
			url: "/regist/send.htm", // 发送手机验证码请求
			data: a
		})
	},
	c.validators = {
		nfduser: function(b) {
			return this.msg("error") || this.msg("error", "用户名不能为空，可使用字母、数字、下划线，需以字母开头，6~18个字符"),
			"" === a.trim(b) ? !1 : 0 === a.trim(b).indexOf("kmlr_") ? !1 : /^[a-zA-Z]([\w]{5,17})$/.test(a.trim(b))
		},
		nfdrealname: function(b) {
			return this.msg("error") || this.msg("error", "真实姓名不能为空，只允许中文汉字"),
			"" === a.trim(b) ? !1 : 0 === a.trim(b).indexOf("kmlr_") ? !1 : /[\u4e00-\u9fa5]{2,}$/.test(a.trim(b))
		},
		nfdpwd: function(b) {
			return this.msg("error") || this.msg("error", "密码不能为空，区分大小写，6~20个字符"),
			"" === a.trim(b) ? !1 : /^[A-Za-z0-9\^\$\.\+\*_@!#%&amp;~=-]{6,20}$/.test(a.trim(b))
		},
		nfdverify: function(b) {
			return this.msg("error") || this.msg("error", "验证码格式不正确"),
			"" === a.trim(b) ? !1 : /^\d{6}$/.test(a.trim(b))
		},
		nfdcode: function(b) {
			return this.msg("error") || this.msg("error", "邀请码格式不正确"),
			"" === a.trim(b) ? !0 : /^[A-Za-z0-9]{0,6}$/.test(a.trim(b))
		},
		cnmobile: function(b) {
			return this.msg("error") || this.msg("error", "手机号码格式不正确"),
			"" == a.trim(b) ? !0 : /^[1][0-9]{10}$/.test(a.trim(b))
		},
		cnidcard: function(b) {
			return this.msg("error") || this.msg("error", "身份证格式不正确"),
			"" == a.trim(b) ? !0 : /(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(a.trim(b))
		}
	},
	c
},
{
	requires: ["io"]
});