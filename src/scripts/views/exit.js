var exitTel=require("../templates/exit.string");
SPA.defineView("exit",{
	html:exitTel,
	bindEvents:{
		"show":function(){
			//获取滚动区域带有exitScroll的属性
			var fxScroll=this.widgets.exitScroll;
			fxScroll.on("scroll",function(scroll){
				//判断如果滚动的区域大于等于200时，导航就添加固定定位
				if(Math.abs(this.y)>=200){
					//首先克隆一个导航并且添加到最大盒子的后面，导航就添加固定定位
					//兄弟节点：after before
					//判断最大盒子的兄弟节点导航这个盒子存不存在
					if($(".m-exit").siblings(".m-menu").length>0){//存在不克隆
						;
					}else{//不存在
						$(".m-exit").after($(".m-menu").clone(true).addClass("fix"));
					}
					
				}else{
				 	$(".m-menu.fix").remove();
				}
			})
		}
	}
	
})