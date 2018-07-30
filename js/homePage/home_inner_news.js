var innerNews={
	config:{
		num:0,
		server: "http://loisluo.com",
		getList: "/admin/content/homepage_inner_news"
		
	},
	newsItem:function(list){
		var tpl=[
		'<div class="news_item content_{@cid}" data-news_item="{@id}">',
			'<div class="news_img">',
				'<a target="_blank" href="http://loisluo.com/jiemian/article.html">',
					'<img src="{@img}" alt="" />',
				'</a>',
			'</div>',
			'<div class="news_title">',
				'<h3>',
					'<a target="_blank" href="http://loisluo.com/jiemian/article.html">{@title}</a>',
				'</h3>',
			'</div>',
			'<div class="news_footer">',
				'<span class="news_author">{@author}</span>',
				'<span>{@time}</span>',
				'<span class="comments">{@comment}</span>',
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
						   .replace("{@id}",list.id)
						   .replace("{@cid}",list.id)
						   .replace("{@title}",list.title)
						   .replace("{@author}",list.author)
						   .replace("{@comment}",target)
						   .replace("{@time}",list.time);
	},
	createNews:function(list){
	
		var me=this;
		for(var i=0;i<list.length;i++){
		
			$(".inner_news_list").append(me.newsItem(list[i]));
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
				$(".loading").hide();
				me.createNews(r);
			},
			error:function(){
				
			}
		});
	}
}
