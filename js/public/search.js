var search = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/content/search"

	},
	searchItem: function(list) {
		tpl = [
			'<li class="news_item" data-news_item="{@id}">',

			'<div class="news_title">',
			'<h3><a target="_blank" href="http://loisluo.com/jiemian/article.html" class="title_text">{@title}</a></h3>',
			'</div>',
			'<div class="news_text">',
			'<a class="con_text">{@text}</a>',

			'</div>',
			'<div class="news_footer">',
			'<span class="news_author">{@author}</span>',
			'<span class="news_date">{@time}</span>',
			'</div>',
			'</li>'
		];
		return tpl.join("").replace("{@title}", list.title)
			.replace("{@text}", list.contentText)
			.replace("{@author}", list.author)
			.replace("{@time}", list.time)
			.replace("{@id}", list.id)

	},
	createSearch: function(list) {
		var me = this;
		var box = $(".search_list");
		for(var i = 0; i < list.length; i++) {
			box.append(me.searchItem(list[i]));
		}
	},
	getList: function(current_page) {
		var me = this;
		var keyword = sessionStorage.getItem("search_keyword");

		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data: {
				keyword: keyword,
				current_page: current_page,
				num: 5
			},
			success: function(r) {
				
				if(r.length<5){
					$(".search_load .loadmore").hide().siblings().show();
				}
				me.createSearch(r);
				me.turnRed();
				$(".loading").hide();
			},
			error: function(r) {
				console.log(r);
			}
		});
	},
	
	doSearch: function(search_page) {
		var me=this;
		$(document).on("click", ".btn_search", function() {
			var inp = $(this).parent().siblings();
			var val = $(inp).val();
			sessionStorage.setItem("search_keyword", val);
			me.getList(search_page);
		});
	},
	turnRed: function() {

		var keyword = sessionStorage.getItem("search_keyword");
		var reg = new RegExp("" + keyword + "", "g");
		//查找文章题目中是否含有关键字
		var con_title = document.getElementsByClassName("title_text");
		for(var i = 0; i < con_title.length; i++) {
			var str = $(con_title[i]).text();
			var result = str.replace(reg, "<font style='color:#F00;font-weight:700;'>" + keyword + "</font>");
			$(con_title[i]).html(result)
		}
		//查找文章是否含有关键字
		var con_text = document.getElementsByClassName("con_text");

		for(var i = 0; i < con_text.length; i++) {
			var str = $(con_text[i]).text();
			var index = str.indexOf(keyword);
			var lastIndex = str.lastIndexOf(keyword);
			var val = "";
			//	如果文章中查到
			if(index >= 0) {
				//如果文章中只有一个
				if(index == lastIndex) {
					if(index == 0) {
						val = str.substring(index, index + 200);
					} else if(index > 0 && index < 50) {
						val = str.substring(index, index + 100);
					} else if(index >= 50) {
						val = str.substring(index, index + 100);
					}
				} else {
					if(lastIndex - index <= 50) {
						val = str.substring(index - 40, lastIndex + 100);
					} else {
						val = str.substring(index - 50, index + 50) + "..." + str.substring(lastIndex - 50, lastIndex + 30);
					}
				}

			} else {

				val = str.substring(0, 150);
			}
			var result = val.replace(reg, "<font style='color:#f0411e;font-weight:700;'>" + keyword + "</font>");

			$(con_text[i]).html(result)

		}

	}
}