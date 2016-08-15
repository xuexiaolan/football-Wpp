var myTel=require("../templates/my.string");
SPA.defineView("my",{
	html:myTel,
	styles:{background:"transparent!important"},//设置我的页面中弹出框的样式,!important优先级高
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			
		}
	},
	bindActions:{
		"tab.close":function(){//点击确定按钮关闭遮罩层
			this.hide();
		},
		"goto.register":function(){//点击注册进入注册页面
			SPA.open("register");
		}
	}
})