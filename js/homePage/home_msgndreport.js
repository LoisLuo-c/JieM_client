var msgAndReport = {
	config: {
		num: 0,
		server: "http://loisluo.com",
		getList: "/admin/isEmergencies/home_list",
		getNewsList: "/admin/content/homepage_newslist"
	},
	msgItem: function(list) {
		tpl = [
			'<ul class="isemg_item" data-news_item="{@id}">',
			'<li>',
			'<span class="msg_date">10:46</span>',
			'<span class="msg_title">',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html"><div>{@title}</div></a>',
			'</span>',
			'</li>',
			'</ul>'
		];
		return tpl.join("").replace("{@date}", list.time)
			.replace("{@title}", list.title)
			.replace("{@id}", list.id)
	},
	newsItem: function(list) {
		
		var tpl = [
			'<div class="news_item content_{@cid}" data-news_item="{@id}">',
			'<div class="news_img">',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html">',
			'<img src="{@img}"/>',
			'</a>',
			'</div>',
			'<div class="news_title">',
			'<h2><a target="_blank" href="http://loisluo.com/jiemian/article.html">{@title}</a></h2>',
			'</div>',
			'<div class="news_subtitle">',
			'<p>{@subtitle}</p>',
			'</div>',
			'<div class="news_footer">',
			'<span class="news_author">{@author}</span>',
			'<span>{@date}</span>',
			'<span class="comment">{@comment}</span>',
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
		return tpl.join("").replace("{@img}", list.titleImage)
			.replace("{@title}", list.title)
			.replace("{@subtitle}", list.subTitle)
			.replace("{@author}", list.author)
			.replace("{@date}", list.time)
			.replace("{@id}", list.id)
			.replace("{@cid}", list.id)
			.replace("{@comment}", target)
	},
	createMsg: function(list) {
		var me = this;
		var box = $(".news_m");
		$(box).empty();
		for(var i = 0; i < list.length; i++) {
			box.append(me.msgItem(list[i]))
		}
		return box;
	},
	createNews: function(list) {
		var me = this;
		var box = $(".news_reports");
		for(var i = 0; i < list.length; i++) {
			box.append(me.newsItem(list[i]));
		}

		return box;
	},
	getMsg: function() {
		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			success: function(r) {
				me.createMsg(r);
			}
		});
	},
	getNews: function(current_page) {
		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getNewsList,
			async: true,
			data:{num:3,current_page:current_page},
			success: function(r) {
				me.createNews(r);
			},
			error: function(e) {
				console.log(e);
			}
		})
	}

}