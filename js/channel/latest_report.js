var connectList = {
	serverAdd: "",
	getList: "/getList"
}
var app = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/content/list"
		
	},
	
	createLReportItem: function(list) {
		var Item = ['<div class="LR_item" data-new_list="{@id}">',
			'<div class="LR_img_box">',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html">',
			'<img src="{@LR_img}" alt="" class="LR_img" />',
			'</a>',
			'</div>',
			'<div class="LR_news_con">',
			'<div class="LR_news_tags">{@news_tags}',
			'</div>',
			'<div class="LR_news_header">',
			'<h2>',
			'<a target="_blank" href="http://loisluo.com/jiemian/article.html" class="">{@title}</a>',
			'</h2>',
			'</div>',
			'<div class="LR_news_footer">',
			'<p>',
			'<span class="LR_author">{@author}</span>',
			'<span class="LR_data">{@date}</span>',
			'<span class="click">{@click}</span>',
			'<span class="comment">{@comment}</span>',
			'</p>',
			'</div>',
			'</div>',
			'</div>'
		];
		//把分类拆成数组放入span中
			var sort=list.sort.split(",");
			var tag='<a target="_blank" href="http://loisluo.com/jiemian/article.html" class=""><span>{@tags}</span></a>';
			var arr=[];
			
			for(var i=0;i<sort.length;i++){
				var s=tag.replace("{@tags}",sort[i]);
				arr.push(s);
			}
			var tags=arr.join(" ");
		//若是还没有评论，则把图标隐藏起来
		var arr='<i class="iconfont icon-iconfontpinglun"></i>{@tar}';
		var target="";
		if(list.comment==null||list.comment==0){
			target=""
		}else{
			target=arr.replace("{@tar}",list.comment);
		}
		//若是还没有点击，则把图标隐藏起来
		var arr_click='<i class="iconfont icon-liulan"></i>{@tar_click}';
		var target_click="";
		if(list.clicks==null||list.clicks==0){
			target_click=""
		}else{
			target_click=arr_click.replace("{@tar_click}",list.clicks);
		}
		return Item.join("").replace("{@LR_img}", list.titleImage)
			.replace("{@news_tags}", tags)
			.replace("{@click}", target_click)
			.replace("{@comment}", target)
			.replace("{@title}", list.title)
			.replace("{@author}", list.author)
			.replace("{@date}", list.time)
			.replace("{@article_id}",list.id)
			.replace("{@id}",list.id);

	},
	createLReportBox: function(list) {
		var me = this;
		var div_box = $("#LR_list_sub");
		for(var i = 0; i < list.length; i++) {
			div_box.append(me.createLReportItem(list[i]));
			
		}
	},
	getList: function(current_page) {
		var me = this;
		var nav_item=sessionStorage.getItem("nav_item");
		if(nav_item=="中国"){
			$(".content_inner").css("background-color","#009bff")
		}else if(nav_item=="宏观"){
			$(".content_inner").css("background-color","#4b7126")
		}
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data:{num:4,current_page:current_page,channel:nav_item},
			success: function(r) {
				$(".loading").hide();
				if(r.length > 0) {
					me.createLReportBox(r);
					
				} else if(r.length<4){
					$(".loadmore").hide();
					$(".nomore").show();
				}
			},
			error: function() {
				console.log("获取数据失败");
			},
			complete: function() {}
		});
		
	}

}
//$(document).ready(function() {
//
//	
//})