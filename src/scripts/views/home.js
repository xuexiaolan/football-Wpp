var homeTel=require("../templates/home.string");
var util=require("../util/util.js");
SPA.defineView("home",{
	html:homeTel,
	plugins:["delegated",{
		name:"avalon",//引用avalon框架
		options:function(vm){//vm是个对象
			vm.livedata=[];//给vm这个对象添加了livedata属性，属性值是个数组
		}
	}],
	//初始化函数(定义全局变量)
	init:{
		getVm:null, //视图变量
       	livelistArr:[],//新的数组
		mySlider:null,
		hotSlider:null,
		index:0,
		formatData:function(data){
			var tempArr=[];
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				tempArr[i]=[];
				tempArr[i].push(data[2*i],data[2*i+1]);
			}
			return tempArr;
		}
	},
	bindEvents:{//绑定视图事件
		beforeShow:function(){//视图显示出来之前执行的回调函数
			var that=this;
			//获取vm
			that.getVm=this.getVM();
			$.ajax({
				url:"/api/getLivelist.php",
				data:{
					isRe:"origin"//原始的json数据
				},
				dataType:"json",
				success:function(e){
					that.livelistArr=e.data;
					that.getVm.livedata=that.formatData(e.data);//[]
				},
				error:function(){
					alert("请求失败！");
				}
			})
		},
		show:function(){//视图显示出来之后执行的回调函数
			var that = this;
			this.mySlider=new Swiper("#swiper-slide",{//首页的swiper滑动
				 onSlideChangeStart:function(swiper){//在滑动页面开始之前触发
				 	loop:false;
					//swiper这个参数是对new swiper出来的实例的引用
					var index=swiper.activeIndex;//获取切换页面索引
					var lis=$(".nav li");
					util.publicFn(lis.eq(index));
				}
			})
			this.hotSlider=new Swiper("#swiper-hot",{//热点关注的滑动
				 onSlideChangeStart:function(swiper){
				 	loop:false;
					var index=swiper.activeIndex;
					var lis=$(".hot li");
					util.publicFn(lis.eq(index));
				}
			})
			//上拉加载--下拉刷新
			var myScroll=this.widgets.homeListScroll;
			var scrollSize=30;
			myScroll.scrollBy(0,-scrollSize);
			var head=$(".head img"),
                topImgHasClass=head.hasClass("up");
            var foot=$(".foot img"),
            	bottomImgHasClass=head.hasClass("down");
			myScroll.on("scroll",function(){
	    		var y=this.y,
	        		maxY=this.maxScrollY-y;
	        	if(y>=0){
	             !topImgHasClass && head.addClass("up");
	              return "";
	        	}
	        	if(maxY>=0){
	             !bottomImgHasClass && foot.addClass("down");
	              return "";
	        	}
	  		})
    		myScroll.on("scrollEnd",function(){
    			if(this.y>=-scrollSize && this.y<0){
              		myScroll.scrollTo(0,-scrollSize);
              		head.removeClass("up");
        		}else if(this.y>=0){
              		head.attr("src","/img/ajax-loader.gif");
              		//请求下拉刷新数据
              		$.ajax({
              			url:"/api/getLivelist.php",
              			type:"get",
              			data:{
              				isRe:"refresh"//请求刷新数据
              			},
              			success:function(e){
              				that.livelistArr=e.data.concat(that.livelistArr);
                     		that.getVm.livedata=that.formatData(that.livelistArr);
                     		myScroll.scrollTo(0,-scrollSize);
	                  		head.removeClass("up");
	                  		head.attr("src","/img/arrow.png");
              			}
              		})
        		}

        		var maxY=this.maxScrollY-this.y;
        	 	var self=this;
                if(maxY>-scrollSize && maxY<0){
                   myScroll.scrollTo(0,self.maxScrollY+scrollSize);
                   foot.removeClass("down")
                }else if(maxY>=0){
    			   foot.attr("src","/img/ajax-loader.gif");
    			   //请求加载数据
    			   $.ajax({
	    			   url:"/api/getLivelist.php",
	    			   type:"get",
	    			   data:{
	    			   	  isRe:"more"//加载更多的json数据
	    			   },
	    			   success:function(e){
	    			   		that.livelistArr=that.livelistArr.concat(e.data);
                     		that.getVm.livedata=that.formatData(that.livelistArr);
                     		myScroll.refresh();
	    				    myScroll.scrollTo(0,self.y);
	    				    foot.removeClass("down");
	    				    foot.attr("src","/img/arrow.png");
	    			   }
    			   })
    		    }
    		})
    	}
	},
	bindActions:{//绑定某一元素事件
		"nav_slide":function(e){
			var index=$(e.el).index();//获取某个li的下标
			//slideTo滑到那个页面，参数为索引，速度，回调函数(false时就不触发onSlideChangeStart事件)
			this.mySlider.slideTo(index,1000,true);
		},
		"hot_slide":function(e){
			var index=$(e.el).index();
			this.hotSlider.slideTo(index,1000,true);
		},
		"goto.detail":function(e,data){//点击首页列表进入详细页
			SPA.open("detail",{//open是打开新的视图
				param:data  //跳转页面spa应用的传参
			})
		}
	}
})