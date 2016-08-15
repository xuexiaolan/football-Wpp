var registerTpl=require("../templates/register.string");
SPA.defineView("register",{
	html:registerTpl,
	plugins:["delegated"],
	bindEvents:{
		"show":function(){
			var phone=$("#phone").val();
			$("#phone").on("blur",function(){
				console.log(phone)
			})
		}
	},
	bindActions:{
		"tap.cancel":function(){
			this.hide();
			SPA.open("index");
		}
	}
})