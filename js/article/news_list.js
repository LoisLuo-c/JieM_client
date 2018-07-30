var newList = {
	config: {
		server: "http://loisluo.com",
		//新闻卡片
		getArtical: "/admin/content/getone",
		//更新文章点击
		updateClick: "/admin/content/update_clicks",
		//更新快讯点击
		updateClickEmg: "/admin/isEmergencies/update_clicks",
		//快讯
		getIsemg: "/admin/isEmergencies/getone",
		uploadfile: "http://loisluo.com/uploadfile"
	},

	//创建新闻列表
	createNewsList: function(list) {
		var str = list.sort;
		var arr = str.split(",");
		//把得到得分类数组拆开放到span里
		var box = $(".artical_container_con");
		var tag = document.createElement('div');

		tag.className = "article_tag";
		for(var i = 0; i < arr.length; i++) {
			var span = document.createElement('span');
			span.textContent = arr[i];
			tag.append(span);
		}
		box.append(tag);

		var Item = [

			'<div class="article_content">',
			'<div class="article_title">{@title}</div>',
			'<div class="article_subtitle">{@subtitle}</div>',
			'<div class="article_titleImg">',
			'<img src="http://loisluo.com/uploadfile/{@img}" alt="" />',
			'</div>',
			'<div class="article_info">',
			'<p>',
			'<span class="article_author">{@author}</span>',
			'<span >{@date}</span>',
			'<span class="article_clicks">浏览{@clicks}次</span>',
			'</p>',
			'</div>',

			'<div class="article_con_main">{@content}</div>',
			'</div>'

		];
		return Item.join("").replace("{@clicks}", list.clicks)
			.replace("{@title}", list.title)
			.replace("{@author}", list.author)
			.replace("{@date}", list.time)
			.replace("{@img}", list.titleImage)
			.replace("{@content}", list.contentText)
			.replace("{@subtitle}", list.subTitle);
	},
	//获取新闻列表数据
	news_list: function(list) {
		var me = this;
		var div_box = $(".artical_container_con");
		div_box.append(me.createNewsList(list));
	},
	//显示文章信息
	show_newslist: function(id) {

		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getArtical,
			data: {
				id: id
			},
			async: true,
			success: function(r) {
				
				if(r.length > 0) {
					me.news_list(r[0]);
				}
				
				var str=r[0].sort;
				var sort=str.split(",")[0];
				$(".comment_num").text(r[0].comment);
				//推荐列表
				recommend.getList(sort);
				//更新文章的被点击量
				$.ajax({
					type: "post",
					url: me.config.server + me.config.updateClick,
					async: true,
					data: {id: id}
				});
				$(".loading").hide();
			},
			error: function() {
				console.log("获取数据失败");
			},
			complete: function() {}
		});
	},
	//显示快讯新闻
	showIsemg: function(id) {

		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getIsemg,
			data: {
				id: id
			},
			async: true,
			success: function(r) {
				if(r.length > 0) {
					me.news_list(r[0]);
				}
				
				//更新文章的被点击量
				$.ajax({
					type: "post",
					url: me.config.server + me.config.updateClickEmg,
					async: true,
					data: {id: id}
				});
				$(".loading").hide();
			},
			error: function() {
				console.log("获取数据失败");
			},
			complete: function() {}
		});
	}

}