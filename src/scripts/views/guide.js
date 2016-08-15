var guideTel=require("../templates/guide.string");
SPA.defineView("guide",{
	html:guideTel,
	plugins:["delegated"],
	modules:[
		{
			name:"content",
			defaultTag:"home",
			views:["home","find","my"],
			container:".m-main"
		}
	],
	bindEvents:{
		show:function(){
			var mySwiper=new Swiper('.swiper-container',{
							//可选选项，自动滑动
				loop:false  //不循环播发
			})
		}
	},
	bindActions:{
		"go_index":function(){
			SPA.open("index");
		}
	}
})