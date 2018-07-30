var ChannelPhotos = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/content/channel_ph",
		num: 0

	},
	photoItem: function(list) {
		var tpl = [
			'<li class="photos_item news_item" data-news_item="{@id}">',
			'<div class="photos">',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html">',
			'<img src="{@img}" alt="" />',
			'</a>',
			'</div>',
			'<div class="info_box">',
			'<div class="photos_info">',
			'<div class="titie">',
			'<h3>',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html">{@title}</a>',
			'</h3>',
			'</div>',
			'<div class="footer">',
			'<span class="author">{@author}</span>',
			'<span class="time">{@date}</span>',
			'<span class="click">{@click}</span>',
			'<span class="comment">{@comment}</span>',
			'</div>',
			'</div>',
			'</div>',
			'</li>',
		];
		//若是还没有评论，则把图标隐藏起来
		var arr = '<i class="iconfont icon-iconfontpinglun"></i>{@tar}';
		var target = "";
		if(list.comment == null || list.comment == 0) {
			target = ""
		} else {
			target = arr.replace("{@tar}", list.comment);
		}

		//若是还没有点击，则把图标隐藏起来
		var arr_click = '<i class="iconfont icon-liulan"></i>{@tar_click}';
		var target_click = "";
		if(list.clicks == null || list.clicks == 0) {
			target_click = ""
		} else {
			target_click = arr_click.replace("{@tar_click}", list.clicks);
		}
		return tpl.join("").replace("{@id}", list.id)
			.replace("{@img}", list.titleImage)
			.replace("{@title}", list.title)
			.replace("{@author}", list.author)
			.replace("{@date}", list.time)
			.replace("{@click}", target_click)
			.replace("{@comment}", target);

	},
	createItem: function(r) {
		var me=this;
		var box = $(".photos_list");
		box.empty();
		for(var i = 0; i < r.length; i++) {
			box.append(me.photoItem(r[i]));
		}
		box.append(box.children().eq(0).clone());
		box.append(box.children().eq(1).clone());
		box.append(box.children().eq(2).clone());
	},
	getList: function() {

		var me = this;
		var channel = sessionStorage.getItem("nav_item");
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data: {
				channel: channel
			},
			success: function(r) {
				me.createItem(r);
			},
			error: function(r) {
				console.log("获取失败")
			}
		});
	},
	btnleft: function() {
		var me = this;
		$(".btn_left").on("click", function() {
			me.config.num--;
			me.move();
		})

	},
	btnright: function() {
		var me = this;
		$(".btn_right").on("click", function() {
			me.config.num++;
			me.move();
		})

	},
	move: function() {
		var me = this;
		var num = me.config.num
		var ul = document.getElementsByClassName("photos_list");
		var ul_left = $(ul).css('left');
		var li = document.getElementsByClassName("photos_item");
		var length = li.length;

		var ul_left = num * -700 - 510 + "px";
		if(num >= length - 2) {
			ul_left = -510 + "px";
			$(ul).css({
				"left": ul_left
			})
			ul_left = -1210 + "px";
			me.config.num = 1;
		} else if(num == -1) {
			//先到倒数第二张在到倒数第三章做一个动画效果
			ul_left = -(length - 3) * 700 - 510 + "px";
			$(ul).css({
				"left": ul_left
			})
			ul_left = (length - 4) * -700 - 510 + "px"
			me.config.num = length - 4;
		}
		$(ul).animate({
			left: ul_left
		}, 800);

		setTimeout(function(){
			$(ul).children().eq(num+1).addClass("active").siblings().removeClass("active");
		},1000);
		
		
	},
	autoPlay: function() {
		var me = this;
		
		var interval = function() {
			if(window.channel_timer!=undefined){
			clearInterval(channel_timer);
		}
			channel_timer = setInterval(function() {
				me.config.num++;
				me.move();
			}, 3000);
		}
		interval();
		$(document).on("mouseout", ".ph_box", function() {
			interval();
		});
		$(document).on("mouseover", ".ph_box", function() {
			clearInterval(channel_timer);
		});
	},
	showInfoa: function() {
//		var activeItem = document.getElementsByClassName("active");
//		
//		console.log(activeItem);
//		$(activeItem).find(".photos_info").show();
//		$(activeItem).find(".photos_info").animate({
//			left: "0"
//		})
$(ul).children().eq(num+1).addClass("active").siblings().removeClass("active");
	}
}