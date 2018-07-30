var userBrowse = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/userbrowse/list",
		remove: "/admin/userbrowse/remove"
	},
	browseItem: function(list) {
		//1是文章，2是快讯，3是视频
		//快讯和视频的暂时不做
		var type=1;
		var contentId=list.contentId;
		if(list.contentId==null){
			type=3;
			contentId=list.videoId;
		}
		
		tpl = [
			'<li class="browse_item" >',
			'<div class="check_box" data-browse_id={@id}>',
			'<i class="iconfont icon-yduifuxuankuang"></i>',
			'</div>',
			'<span>{@time}</span>',
			'<div class="browse_content">',
			'<p data-article_id={@aid} onclick="userBrowse.toNews(event)" data-type="{@type}" data-article_data="{@article_id}">{@title}</p>',
			'</div>',
			'</li>'
		];
		return tpl.join("").replace("{@id}", list.browseId)
			.replace("{@aid}", list.browseId)
			.replace("{@time}", list.time)
			.replace("{@type}",type)
			.replace("{@article_id}",contentId)
			.replace("{@title}", list.title);
	},
	getList: function(currentPage) {
		var userId = sessionStorage.userId;
		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getList,
			async: true,
			data: {
				userId: userId,
				num:7,
				current_page:currentPage
			},
			success: function(r) {
				console.log(r)
				if(r.length<7){
					$(".browse_box .loadmore").hide();
					$(".browse_box .nomore").show();
				}
				var box = $(".browse_list");
				for(var i = 0; i < r.length; i++) {
					box.append(me.browseItem(r[i]));
				}
			}
		});
	},
	//删除历史记录
	doremove:function(selectid){
		var arr=selectid.join(',').toString();
		var me=this;
		$.ajax({
			type:"post",
			url: me.config.server + me.config.remove,
			async:true,
			data:{selectid:arr},
			success:function(){
				location.reload();
//				me.getList(1);
			}
		});
	
	},
	//选择列表
	selectItem: function() {
		var me=this;
		//全选
		var selectId = [];
		$(".browse_box .select_all").on("click", function() {

			if(selectId == "") {
				var checkBox = document.getElementsByClassName("check_box");
				$(checkBox).each(function(index, el) {
					$(checkBox).children().eq(index).removeClass("icon-yduifuxuankuang").addClass("icon-yduifuxuankuangxuanzhong")
					selectId.push($(checkBox).eq(index).data().browse_id);
				})
			} else {
				var checkBox = document.getElementsByClassName("check_box");
				$(checkBox).each(function(index, el) {
					$(checkBox).children().eq(index).removeClass("icon-yduifuxuankuangxuanzhong").addClass("icon-yduifuxuankuang")
					selectId = [];
				})
			}
			
		});

		//一个一个选择
		$(document).on("click", ".check_box", function() {
			if($(this).children().hasClass("icon-yduifuxuankuang")) {
				$(this).children().removeClass("icon-yduifuxuankuang").addClass("icon-yduifuxuankuangxuanzhong");
			} else {
				$(this).children().removeClass("icon-yduifuxuankuangxuanzhong").addClass("icon-yduifuxuankuang");
			}
		})
		$(".browse_box .remove_btn").on("click", function() {
			var checkBox = document.getElementsByClassName("check_box");
			//先把置空
			selectId=[]
			//把选择的标签的子集放在一个数组里，以便each
			var arr = [];
			$(checkBox).each(function(index, el) {
				arr.push($(checkBox).children().eq(index));
			})
			$(arr).each(function(index) {
				//把已选择的标签的browse_id存起来
				if($(arr).eq(index)[0].hasClass("icon-yduifuxuankuangxuanzhong")) {
					selectId.push($(arr).eq(index)[0].parent().data().browse_id);
				}
			})
			me.doremove(selectId);
		})
	},
	toNews:function(e){
		var data=e.target.dataset.article_data;
		var type=e.target.dataset.type;
		if(type==1){
			sessionStorage.setItem("article_id",data);
		sessionStorage.setItem("newsOrNot",true);
		window.open("http://loisluo.com/jiemian/article.html");  
		}else{
			sessionStorage.setItem("video_id",data);
		window.open("http://loisluo.com/jiemian/video.html");  
		}
		
	}
}