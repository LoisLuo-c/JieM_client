var recommend={
	config:{
		server: "http://loisluo.com",
		getlist:"/admin/content/recommend",
		
	},
	newsItem:function(list){
		var tpl=[
		'<li class="news_item" data-news_item="{@id}">',
			'<div class="news_img">',
				'<a href="">',
					'<img src="{@img}"/>',
				'</a>',
			'</div>',
			'<div class="news_title">',
				'<h3><a href="">{@title}</a></h3>',
			'</div>',
			'<div class="news_footer">',
				'<span class="news_author">{@author}</span>',
				'<span class="news_date">{@time}</span>',
			'</div>',
		'</li>'
		];
		return tpl.join("").replace("{@img}",list.titleImage)
							.replace("{@title}",list.title)
							.replace("{@author}",list.author)
							.replace("{@time}",list.time)
							.replace("{@id}",list.id)
							
	},
	createNews:function(list){
		var me=this;
		var box=$(".recommend_list");
		
		for(var i=0;i<list.length;i++){
			box.append(me.newsItem(list[i]));
		}
	},
	getList:function(sort){
		var me=this;
		
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getlist,
			async:true,
			data:{sort:sort},
			success:function(r){
				me.createNews(r);
			},
			error:function(){
				
			}
		});
	}
}
