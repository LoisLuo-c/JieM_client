var video={
	config: {
		server: "http://loisluo.com",
		getList: "/admin/video/list",
		//更新视频点击
		updateClick: "/admin/video/update_clicks",
		getOne:"/admin/video/getone",
		uploadfile: "http://loisluo.com/uploadfile"
	},
	videoBox:function(list){
		tpl=[
			'<div class="title"><h1>{@title}</h1></div>',
			'<div class="video_item">',
				'<video id="my-video" class="video-js" controls preload="auto" width="740" height="400">',
					'<source src="{@video}" type="video/mp4">',
				'</video>',
			'</div>'
		];
		return tpl.join("").replace("{@title}",list.title)
						   .replace("{@video}",list.video)
	},
	createVideo:function(list){
		var me=this;
		var box=$('.video_main');
		box.empty();
		box.append(me.videoBox(list));
	},
	getVideo:function(id){
		console.log(id);
		var me=this;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getOne,
			data:{id:id},
			async:true,
			success: function(r) {
				if(r.length > 0) {
					me.createVideo(r[0]);
				}
				console.log(r[0].sort);
				var str=r[0].sort;
				var sort=str.split(",")[0];
				$(".comment_num").text(r[0].comment);
				//推荐列表
				videoRecommend.getList(sort);
				//更新文章的被点击量
				$.ajax({
					type: "post",
					url: me.config.server + me.config.updateClick,
					async: true,
					data: {id: id}
				});
				$(".loading").hide();
				
			},
			error:function(e){
				console.log(e);
			}
		});
	}
}
