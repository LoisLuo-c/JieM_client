$.fn.extend({
	txtaAutoHeight: function() {
		return this.each(function() {
			var $this = $(this);
			if(!$this.attr('initAttrH')) {
				$this.attr('initAttrH', $this.outerHeight());
			}
			setAutoHeight(this).on('input', function() {
				setAutoHeight(this);
			});
		});

		function setAutoHeight(elem) {
			var $obj = $(elem);
			return $obj.css({
				height: $obj.attr('initAttrH'),
				'overflow-y': 'hidden'
			}).height(elem.scrollHeight);
		}
	},

});

function gettime(createtime) {
	var time = Date.parse(createtime) / 1000;
	var now = Date.parse(new Date()) / 1000;
	var limit = now - time;
	var content = "";
	if(limit < 60) {
		content = "刚刚";
	} else if(limit >= 60 && limit < 3600) {
		content = Math.floor(limit / 60) + "分钟前";
	} else if(limit >= 3600 && limit < 86400) {
		content = Math.floor(limit / 3600) + "小时前";
	} else {
		content = createtime;
	}
	return content;
}
var comment = {
	config: {
		server: "http://loisluo.com",
		createComment: "/admin/comment/create",
		removeComment: "/admin/comment/remove",
		
		//全部的
		getCommentVideoList: "/admin/comment/list_video",
		getCommentContentList: "/admin/comment/list_content",
		
		//分页的
		getCommentVideo: "/admin/comment/page_video",
		getCommentContent: "/admin/comment/page_content",
		
		
		updateComment: "/admin/comment/update",
		updateReplyNum: "/admin/comment/update_reply",

		dopraise: "/admin/praise/create",
		updatePraise: "/admin/comment/update_praise",
		getpraise: "/admin/praise/list",

		//更新评论数量
		updateArtivleComment: "/admin/content/update_comment",
		updateVideoComment: "/admin/video/update_comment",

		createReply: "/admin/reply/create",
		removeReply: "/admin/reply/remove",
		getReply: "/admin/reply/list"
	},
	isLogin: function() {
		var token = sessionStorage.token;
		debugger;
		if(token == undefined) {
			
			$(".login_box").load("login.html");
			login.showLoginModal();
		}
	},
	//创建评论
	commentItem: function(list) {

		var praise = list.praise ? list.praise : 0;
		var reply = list.reply ? list.reply : 0;
		var time = gettime(list.time);

		tpl = [
			'<div class="comment_self comment{@cid}" data-comment_userId="{@uid}">',
			'<div>',
			'<div class="comment_img">',
			'<img src="http://loisluo.com/uploadfile/{@img}" alt="" />',
			'</div>',
			'<div class="comment_body">',
			'<span class="com_username">{@username}</span>',
			'<div class="comment_main">',
			'<p>{@comment}</p>',
			'</div>',
			'<div class="comment_footer" >',
			'<span class="com_date">{@time}</span>',
			'<div class="praise_reply">',
			'<span>',
			'<span class="praise" onClick="{@clickPraise}" data-praise_id="{@pid}"  data-comment_userid="{@ruid}">赞</span>',
			'<em class="praise_num" >({@praise_num})</em>',
			'</span>',
			'<span>',
			'<span class="reply_btn" data-reply_id="{@rid}">回复</span>',
			'<em class="reply_num reply_num{@rmid}">({@reply_num})</em>',
			'</span>',
			'<span class="reply_drop" data-reply_drop="{@did}">',
			'<i class="iconfont icon-jiantou2"></i>',
			'</span>',
			'</div>',
			'</div>',
			'</div>',
			'</div>',
			'</div>'
		];
		return tpl.join("").replace("{@img}", list.userImg)
			.replace("{@username}", list.username)
			.replace("{@comment}", list.comment_text)
			.replace("{@time}", time)
			.replace("{@rid}", list.id)
			.replace("{@uid}", list.userId)
			.replace("{@did}", list.id)
			.replace("{@cid}", list.id)
			.replace("{@pid}", list.id)
			.replace("{@rmid}", list.id)
			.replace("{@praise_num}", praise)
			.replace("{@reply_num}", reply)
			.replace("{@ruid}", list.userId)
			.replace("{@clickPraise}", "comment.clickPraise(event)");
	},
	//创建回复列表
	createReplyItem: function(list) {
		var me = this;
		var praise = list.praise ? list.praise : 0;
		var reply = list.reply ? list.reply : 0;

		var time = gettime(list.time);

		tpl = [
			'<div class="reply_view" data-reply_data="{@id}">',
			'<span class="com_username">{@username}</span>',
			'<div class="reply_main">',
			'<p>{@comment}</p>',
			'</div>',
			'<div class="reply_footer" >',
			'<span class="com_date">{@time}</span>',
			'</div>',
			'</div>',

		];
		return tpl.join("").replace("{@username}", list.username)
			.replace("{@id}", list.id)
			.replace("{@comment}", list.reply_text)
			.replace("{@time}", time)
			.replace("{@id}", list.id)
			.replace("{@praise_num}", praise)
			.replace("{@reply_num}", reply);

	},
	//创建回复框
	createReportBox: function() {
		tpl = [
			'<div class="report_box ">',
			'<div class="report_text">',
			'<textarea class="report_textarea" rows="1" name=""></textarea>',
			'</div>',
			'<div>',
			'<span class="reply_limit">回复不能少于2个字</span>',
			'<div class="report_btn_box">回复</div>',
			'</div>',
			'</div>',
		]
		return tpl.join("");
	},
	//点击评论
	doComment: function() {
		var me = this;
		var userId = sessionStorage.userId;
		var comment_text = $("#comment_text").val();
		var content_id = undefined;
		var video_id = undefined;
		//判断评论时文章的还是视频的
		if(window.location.pathname == "/jiemian/video.html") {
			video_id = sessionStorage.getItem("video_id");
		} else if(window.location.pathname == "/jiemian/article.html") {
			content_id = sessionStorage.getItem("article_id");
		}
		var data = {
			userId: userId,
			comment_text: comment_text,
			content_id: content_id,
			video_id: video_id
		};
		$.ajax({
			type: "post",
			url: me.config.server + me.config.createComment,
			async: true,
			data: data,
			success: function(r) {
				$("#comment_text").val("");
				me.updateComment();
				//如果评论的是文章
				if(content_id) {
					$.ajax({
						type: "post",
						url: me.config.server + me.config.updateArtivleComment,
						async: true,
						data: {
							id: content_id
						}
					});
				} else {
					$.ajax({
						type: "post",
						url: me.config.server + me.config.updateVideoComment,
						async: true,
						data: {
							id: video_id
						}
					});
				}
				//评论成功则评论总数加1
				var num=parseInt($(".comment_num").text())+1;
				$(".comment_num").text(num);
			},
			error: function() {
				console.log("error");
			}
		});
	},
	
	//更新评论内容
	updateComment: function() {
		var me = this;
		var id = "";
		var getComment = "";
		//判断评论是文章的还是视频的
		if(window.location.pathname == "/jiemian/video.html") {
			id = sessionStorage.getItem("video_id");
			getComment = me.config.getCommentVideoList;
		} else if(window.location.pathname == "/jiemian/article.html") {
			id = sessionStorage.getItem("article_id");
			getComment = me.config.getCommentContentList;
		}
		$.ajax({
			type: "get",
			url: me.config.server + getComment,
			async: true,
			data: {
				id: id
			},
			success: function(r) {
				if(r.length>0){
					$(".comment_show").prepend(me.commentItem(r[0]));
				}
				
				//更新文章的评论数量

			},
			error: function(err) {
				console.log(err)
			}
		});
	},
	getComment:function(current_page){
		
		var me = this;
		var id = "";
		var getComment = "";
		//判断评论是文章的还是视频的
		if(window.location.pathname == "/jiemian/video.html") {
			id = sessionStorage.getItem("video_id");
			getComment = me.config.getCommentVideo;
		} else if(window.location.pathname == "/jiemian/article.html") {
			id = sessionStorage.getItem("article_id");
			getComment = me.config.getCommentContent;
		}
		debugger;
		$.ajax({
			type: "get",
			url: me.config.server + getComment,
			async: true,
			data: {
				id: id,
				num:4,
				current_page:current_page
			},
			success: function(r) {
				
				for(var i = 0; i < r.length; i++) {
					$(".comment_show").append(me.commentItem(r[i]));
				}
				if(r.length<4){
					$(".load .nomore").show().siblings().hide();
				}
				me.checkPraise();
			},
			error: function(err) {
				console.log(err)
			}
		});
	},
	
	//	显示评论框
	showReportBox: function(el, data) {
		var me = this;
		var a = document.getElementsByClassName("comment_self");
		$(el).parent().parent().parent().parent().parent().append(me.createReportBox());

		//把回复每条评论的Id存下来，加载回复时，知道在相应那条评论的下边
		var b = document.getElementsByClassName("report_btn_box");
		$(b).data("reply_data", data);

	},
	closeReportBox: function(data) {
		var me = this;
		var a = document.getElementsByClassName("report_box");
		$(a).remove();
	},
	//提交回复
	doReply: function(rp_val, reply_data, comment_userid) {

		var me = this;
		//回复的用户id，即当前登录的用户id
		var userId = sessionStorage.userId;
		var data = {
			reply_text: rp_val,
			userId: userId,
			commentId: reply_data,
			commentUserId: comment_userid
		}
		$.ajax({
			type: "post",
			url: me.config.server + me.config.createReply,
			async: true,
			data: data,
			success: function(r) {
				var str="reply_num"+reply_data;
				var reply=document.getElementsByClassName(str)[0];
				var reNum=$(reply).text()
				var end=reNum.length-2;
				var num=parseInt(reNum.substr(1,end))+1;
				$(reply).text("("+num+")");
//				var num=parseInt((reply).text())+1;
//				$(reply).text(num);
				me.updateReply(reply_data);
				me.closeReportBox();
			},
			error: function(e) {
				console.log(e)
			}
		});
	},
	//	更新回复
	updateReply: function(comment_id) {

		var me = this;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getReply,
			async: true,
			data: {
				id: comment_id
			},
			success: function(r) {
				if(r.length>0){
					
				
				//根据commentid找到要回复的评论的classname
				var comment_id = r[0].commentId;
				var str = "comment" + comment_id;
				var box = document.getElementsByClassName(str);
				//需要先清空回复不然内容会重复
				$(box).children(".reply_view").remove();
				for(var i = 0; i < r.length; i++) {
					$(box).append(me.createReplyItem(r[i]));
				}
				//更新回复数量
				}
				$.ajax({
					type: "post",
					url: me.config.server + me.config.updateReplyNum,
					async: true,
					data: {
						id: comment_id
					},
					success: function(r) {
						//						me.updateComment();
					}
				});
				//更新被回复的用户的数据做消息通知
			},
			error: function(e) {
				console.log(e)
			}
		});
	},
	clickPraise: function(e) {

		if($(e.target).hasClass("praised")) {
			console.log("已点赞")
		} else {
			var me = this;
			var userId = sessionStorage.userId;
			var commentId = e.target.dataset.praise_id
			var commentUserId = e.target.dataset.comment_userid;
			var data = {
				userId: userId,
				commentId: commentId,
				commentUserId: commentUserId
			}
			$(e.target).addClass("praised");
			var str=$(e.target).siblings().text();
			var end=str.length-2;
			var num=parseInt(str.substr(1,end))+1;
			$(e.target).siblings().text("("+num+")");
			$.ajax({
				type: "post",
				url: me.config.server + me.config.dopraise,
				async: true,
				data: data,
				success: function(r) {
					$.ajax({
						type: "post",
						url: me.config.server + me.config.updatePraise,
						async: true,
						data: {
							id: commentId
						},
						success: function(r) {}
					});
					//更新被回复的用户的数据做消息通知
				},
				error: function(e) {
					console.log(e)
				}
			});

		}

	},
	//检查已登录的用户点赞了哪条comment，并改变点赞颜色
	checkPraise: function() {
		var me = this;
		var userId = sessionStorage.userId;
		$.ajax({
			type: "get",
			url: me.config.server + me.config.getpraise,
			async: true,
			success: function(r) {
				//拿到praise的表单，如果登录的用户有点赞行为，在表单中找到点赞的用户进行匹配
				for(var i = 0; i < r.length; i++) {
					if(r[i].userId == userId) {
						var praiseItem = document.getElementsByClassName("praise");
						for(var j = 0; j < praiseItem.length; j++) {
							if(praiseItem[j].dataset.praise_id == r[i].commentId) {
								$(praiseItem[j]).addClass("praised");
							}
						}
					}
				}
			},
			error: function(e) {
				console.log(e)
			}
		});
	}

}