var msgNoti={
	config: {
		server: "http://loisluo.com",
		getList: "/admin/user/user_msg"
	},
	replyItem:function(list){
		//1是文章，2是快讯，3是视频
		//快讯和视频的暂时不做
		var type=1;
		tpl=[
		'<li class="item_reply">',
			
			'<div class="msgCon">',
				'<div class="header">',
					'<span class="user">{@username}</span>回复你',
				'</div>',
				'<div class="content">',
					'<span class="user">{@username} :&nbsp</span>',
					'<p class="reply_con">{@content}</p>',
				'</div>',
				'<div class="footer">',
					'<span class="time">{@time}</span>',
					
					'<p class="resource" onclick="msgNoti.toNews(event)" data-type="{@type}" data-article_data="{@article_id}">来自：{@resource}</p>',
					
				'</div>',
			'</div>',
		'</li>'
		];
		return tpl.join("").replace("{@username}",list.username)
							.replace("{@username}",list.username)
							.replace("{@content}",list.reply_text)
							.replace("{@time}",list.time)
							.replace("{@article_id}",list.content_id)
							.replace("{@resource}",list.title)
							.replace("{@id}",list.msgId)
							.replace("{@type}",type)
	},
	praiseItem:function(list){
		tpl=[
		'<li class="item_parise" >',
			
			'<div class="msgCon parise_msg">',
				'<div class="header">',
					'<span class="user">{@username}</span>赞了你',
				'</div>',
				'<div class="footer">',
					'<span class="time">{@time}</span>',
					
					'<span class="resource"  data-article_data="{@article_id}">来自：{@resource}</span>',
					
				'</div>',
			'</div>',
		'</li>'
		]
		return tpl.join("").replace("{@username}",list.username)
							.replace("{@time}",list.time)
							.replace("{@resource}",list.title)
							.replace("{@article_id}",list.content_id)
							.replace("{@id}",list.msgId)
	},
	getList:function(currentPage){
		
		var userId=sessionStorage.userId;
		var me=this;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getList,
			async:true,
			data:{userId:userId,num:7,current_page:currentPage},
			success:function(r){
				var box=$(".msg_list");
				console.log(r)
				if(r.length<7){
						$(".msg_box .loadmore").hide();
						$(".msg_box .nomore").show();
					}
				for(var i=0;i<r.length;i++){
					if(r[i].reply_text==0){
						box.append(me.praiseItem(r[i]));
						
					}else{
						box.append(me.replyItem(r[i]));
					}
				}
			}
		});
	},
	toNews:function(e){
		var data=e.target.dataset.article_data;
		sessionStorage.setItem("article_id",data);
		sessionStorage.setItem("newsOrNot",true);
		window.open("http://loisluo.com/jiemian/article.html");  
	}
}
