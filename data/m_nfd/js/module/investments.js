!
function() {
    KISSY.use("event, dom, io, uri",
    function(a, b, c, d, e) {
        function f(b) {
            var b = b || "Repayment";
            c.removeClass(a.get("#nfd-investments .hd .selected"), "selected"),
            c.addClass("#nfd-investments .hd ." + b, "selected"),
            c.removeClass(a.get("#nfd-investments .bd .selected"), "selected"),
            c.addClass("#nfd-investments .bd ." + b, "selected")
			if(window.refreshScroll){
				console.log("refresh scroll");
				window.refreshScroll();
			}
        }
        var g = 10,
        h = 10,
        i = {
            Repayment: {
                skip: g,
                take: h
            },
            InSubscribe: {
                skip: g,
                take: h
            },
            Finished: {
                skip: g,
                take: h
            }
        };
        b.on("#nfd-investments .hd a", "click",
        function() {
            f(c.attr(this, "data-tab"))
        });
        var j = new e(window.location.href);
        f(j.getFragment()),
        b.on("#nfd-investments .more", "click",
        function() {
            var a = c.text(this),
            b = c.attr(this, "data-status"),
            e = this;
            c.text(this, "加载中..."),
            new d({
                type: "get",
                cache: !1,
                url: "/user/fund/investments",
                data: {
                    status: b,
                    skip: i[b].skip,
                    take: i[b].take,
                    fragment: !0
                }
            }).then(function(d) {
                d[0] ? (i[b].skip += i[b].take, c.append(c.create(d[0]), "#nfd-investments ." + b + " .projects"), c.text(e, a)) : c.hide(e)
            },
            function() {
                alert("加载已投项目异常，请重试！"),
                c.text(e, "加载更多")
            })
        })
    })
} ();

/**展示或隐藏详情**/
function showOrHideDetails(obj){
	$("#tzjj_"+obj).toggle();
	$("#tzxq_"+obj).toggle();
	var aId = $("#aDetail_"+obj);
	var aIdHtml = aId.html();
	if(aIdHtml=="展开详情"){
		aId.html("收起详情");
	}else{
		aId.html("展开详情");
	}
}