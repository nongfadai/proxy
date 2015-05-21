!
function() {
	KISSY.use("event, dom, uri, cookie, module/user, gallery/auth/1.6.1/,gallery/auth/1.6.1/plugin/msgs/, gallery/auth/1.6.1/plugin/msgs/style.css",
	function(a, b, c, d, e, f, g, h) {
		function i() {
			c.attr("#captcha-img", "src", "http://www.nongfadai.com/user/loginVerify.htm?" + (new Date).getTime())
		}
		b.on("#captcha-img", "click",
		function() {
			i()
		}),
		b.on("#nfd-submit-btn", "click",
		function() {
			j.test().then(function() {
				var password = document.getElementById('password').value
				document.getElementById('password').value = hex_md5(password)
				j.get("target")[0].submit()
			}).fail(function() {
				console.info("failed to login")
			})
		});
		var j = new g("#nfd-user-login-form", {
			submitTest: !1
		});
		j.plug(new h),
		j.register("nfdverify", f.validators.nfdverify),
		j.render()
	})
} ();