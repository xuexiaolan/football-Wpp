var detailTpl=require("../templates/detail.string");
SPA.defineView("detail",{
	html:detailTpl,
	plugins:["delegated",{
		name:"avalon",//引用avalon框架传参
		options:function(vm){//借用vm这个视图
			vm.imgSrc=null;
			vm.title=null;
			vm.description=null;
			//判断loading加载中与渲染的详细页是否显示
			vm.isShowLoading=true;
		}
	}],
	bindEvents:{
		show:function(){
			//获取vm视图
			var vm=this.getVM();
			var id=this.param.id;//获取json中的id
			//请求详情页的json数据
			$.ajax({
				url:"/api/getLivelist.php",
				data:{
					id:id
				},
				success:function(e){
					var data=e.data;
					vm.imgSrc=data.imgSrc;
					vm.title=data.title;
					vm.description=data.description;
					setTimeout(function(){
						vm.isShowLoading=false;
					},500)
				}
			})
		}
	},
	bindActions:{
		"goto.index":function(){
			SPA.open("index");
		},
		"go.back":function(){//点击返回按钮返回首页
			SPA.open("index");
		}
	}
})