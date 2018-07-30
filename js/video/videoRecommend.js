var videoRecommend={
	config:{
		server: "http://loisluo.com",
		getlist:"/admin/video/recommend",
		
	},
	newsItem:function(list){
		var tpl=[
		'<li class="video_re_item" data-video_id="{@id}">',
		'<a href="">',
			'<div class="news_img">',
					'<img src="{@img}"/>',
			'</div>',
			'<div class="news_content">',
				'<span class="news_title">{@title}</span>',
				'<span class="news_date">{@time}</span>',
			'</div>',
			'</a>',
		'</li>'
		];
		return tpl.join("").replace("{@img}",list.titleImage)
							.replace("{@title}",list.title)
							.replace("{@author}",list.author)
							.replace("{@time}",list.time)
							.replace("{@id}",list.id)
							.replace("{@clickVideo}","videoRecommend.toVideo(event)")
							
	},
	createNews:function(list){
		var me=this;
		var box=$(".recommend_list");
		box.empty();
		for(var i=0;i<list.length;i++){
			box.append(me.newsItem(list[i]));
		}
	},
	getList:function(sort){
		var me=this;
		console.log(sort)
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getlist,
			async:true,
			data:{sort:sort},
			success:function(r){
				me.createNews(r);
				console.log(r);
			},
			error:function(){
				
			}
		});
	},
	toVideo:function(e){
		$(document).on("click",".video_re_item",function(){
			var id=this.dataset.video_id;
			sessionStorage.setItem("video_id",id);
			video.getVideo(id);
			
		})
	}
}
