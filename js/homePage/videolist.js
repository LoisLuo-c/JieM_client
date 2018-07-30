var video_list = {

	config: {
		server: "http://loisluo.com",
		getList: "/admin/video/homepage_list",
	},
	videoBox:function(list){
		var tpl=[
			'<div class="video_item content_video{@cid}" data-video_item="{@id}">',
				'<div class="video_img">',		
				'<a target="_blank" href="http://loisluo.com/jiemian/video.html" class="">',
					'<img src="{@img}" alt="" />',	
					'<div><i class="iconfont icon-shipin2"></i></div>',
				'</a>',
				'</div>',
				'<div class="video_title"><a target="_blank" href="http://loisluo.com/jiemian/video.html">{@title}</a></div>',
				'<div class="video_footer">',
					'<span>{@time}</span>',
					'<span class="comment_video">{@comment}</span>',
				'</div>',
			'</div>'
		];
		
		//若是还没有评论，则把图标隐藏起来
		var arr='<i class="iconfont icon-iconfontpinglun"></i>{@tar}';
		var target="";
		if(list.comment==null||list.comment==0){
			target=""
		}else{
			target=arr.replace("{@tar}",list.comment);
		}
		return tpl.join("").replace("{@img}",list.titleImage)
						   .replace("{@title}",list.title)
						   .replace("{@time}",list.time)
						   .replace("{@id}",list.id)
						   .replace("{@cid}",list.id)
						    .replace("{@comment}",target)
	},
	createVideoBox:function(list){
		var me=this;
		var box=$(".index_right");
		for(var i=0;i<list.length;i++){
			
			box.append(me.videoBox(list[i]));
		}
		
	},
	getList:function(current_page){
		var me=this;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getList,
			async:true,
			data:{num:7,current_page:current_page},
			success:function(r){
				console.log(r);
				me.createVideoBox(r);
			},
			error:function(e){
				console.log(e);
			}
		});
	}

}