var util={
	publicFn:function(el){
		el.addClass("active").siblings().removeClass("active");
	},
	setFocus:function(){
		console.log("football");
	},
	addFn:function(){
		console.log("add");
	}
}

//使用module.exports这个方法将util暴漏出去(全局来使用相当于函数中的return)
module.exports=util;