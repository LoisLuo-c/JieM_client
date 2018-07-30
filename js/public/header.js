var data = {
	name: ["首页", "天下", "中国", "宏观", "娱乐", "体育", "时尚", "文化", "旅行", "生活", "游戏", "军事", "视频", "歪楼", "数据"],
	color: ["#f12b35", "#9e1d0a", "#009bff", "#323232", "#741884", "#3b900e", "#fff", "#8a9fb3",
		"#ffa300", "#fff", "#5ebdc7", "#4b7126", "#741884", "#8a9fb3"
	]
}
var header = {
	config:{
		server: "http://loisluo.com",
		getOne: "/admin/user/getone",
	},
	headerNavBox: function(list) {
		var tpl = [
			'<li class="nav1_list list1 list1_1" data-nav_item={@nav_data}>',
			'<a href="#">{@nav}</a>',
			'</li>'
		];
		return tpl.join("").replace("{@nav_item}", list.data)
			.replace("{@nav}", list.name)
	},
	createNavBox: function() {
		var me = this;
		var box = $(".nav1");
		for(var i = 0; i < data.name.length; i++) {
			box.append(me.headerNavBox(data.name[i]));
		}

	},
	changeColor: function() {
		$(".nav1 .index").on("click",function(){
			$(this).addClass("changecolor").siblings().removeClass("changecolor")
		})
		$(".nav1 .channel2").on("click",function(){
			$(this).addClass("changecolor").siblings().removeClass("changecolor")
		})
		$(".nav1 .channel3").on("click",function(){
			$(this).addClass("changecolor").siblings().removeClass("changecolor")
		})
		$(".nav1 .channel4").on("click",function(){
			$(this).addClass("changecolor").siblings().removeClass("changecolor")
		})
	},
	getList:function(){
		var me=this;
		var userId=sessionStorage.userId;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getOne,
			async:true,
			data:{id:userId},
			success:function(r){
				if(r[0].userImage==null){
					$(".logged .user_img").attr("src","./img/users/user.jpg");
				}else{
					$(".logged .user_img").attr("src",r[0].userImage);
				}
			}
		});
	},
	
}