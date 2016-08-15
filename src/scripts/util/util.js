var util={
	publicFn:function(el){
		el.addClass("active").siblings().removeClass("active");
	}
}

//使用module.exports这个方法将util暴漏出去(全局来使用相当于函数中的return)
module.exports=util;