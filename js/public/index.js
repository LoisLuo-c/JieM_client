var index = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/content/search",
		user:"/admin/user/update",
		userBrowse:"/admin/userbrowse/create",
		

	},
	//点击新闻卡片
	toArticle: function() {
		var me=this;
		$(document).on("click", ".news_item", function() {
			
			var contentId=this.dataset.news_item;
			sessionStorage.setItem("article_id",contentId );
			//文章要显示的是不是快讯的，
			sessionStorage.setItem("newsOrNot",true);
			//把浏览历史存储起来
			var userId=sessionStorage.userId;
			$.ajax({
				type:"post",
				url:me.config.server+me.config.userBrowse,
				async:true,
				data:{userId:userId,contentId:contentId},
				success:function(r){
				}
			});
			if(window.channel_timer!=undefined){
				clearInterval(channel_timer);
			}
		})
	},
	//点击视频卡片
	toVideo: function() {
		var me=this;
		$(document).on('click', '.video_item', function() {
			
			
			var videoId=this.dataset.video_item
			sessionStorage.setItem("video_id", videoId);
			var userId=sessionStorage.userId;
			$.ajax({
				type:"post",
				url:me.config.server+me.config.userBrowse,
				async:true,
				data:{userId:userId,videoId:videoId},
				success:function(r){
					
				}
			});
			if(window.channel_timer!=undefined){
				clearInterval(channel_timer);
			}
		})
	},
	//点击快讯
	toIsEmg:function(){
		
		var me=this;
		$(document).on("click", ".isemg_item", function() {
			
			var isEmgId=this.dataset.news_item;
			sessionStorage.setItem("isemg_id",isEmgId );
			//文章要显示的是快讯的，
			sessionStorage.setItem("newsOrNot",false);
			//把浏览历史存储起来
			var userId=sessionStorage.userId;
			$.ajax({
				type:"post",
				url:me.config.server+me.config.userBrowse,
				async:true,
				data:{userId:userId,isEmgId:isEmgId},
				success:function(r){
					
				}
			});
			if(window.channel_timer!=undefined){
				clearInterval(channel_timer);
			}
			
		})
	},
	//点击导航栏加载相应channel的内容
	saveChannel: function() {
		$(document).on("click", ".nav1_list", function() {
			sessionStorage.setItem("channel_data", this.dataset.channel_data);
		})
	}

}
