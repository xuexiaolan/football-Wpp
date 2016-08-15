var indexTel=require("../templates/index.string");
var util=require("../util/util.js");
//定义spa视图
SPA.defineView("index",{
	html:indexTel,
	plugins:["delegated"],//用于定义移动端的点击tap事件插件(delegated)
	//在主视图上定义子视图
	modules:[
		{
			name:"content",//子视图的名称，用于引用的句柄
			defaultTag:"home",
			views:["home","find","my","exit"],//定义子视图集
			container:".m-wrapper"//将子视图的内容渲染到主视图的容器中
		}
	],
	bindActions:{//绑定元素事件
		"switch.tabs":function(e,data){
			//底部导航高亮显示
			util.publicFn($(e.el));
			//切换视图
			this.modules.content.launch(data.tag);
		},
		"goto.my":function(){//点击我的进入我的页面
			SPA.open("my",{
				ani:{//进入我的直接跳出弹出框
					name:"dialog",
					width:280,
					height:200
				}
			})
		},
		"goto.exit":function(){//进入退出页
			SPA.open("exit");
		}
	}
})

