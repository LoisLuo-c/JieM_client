var article = {
	//评论框输入长度控制 和进行回复	
	controlCommentLen: function() {
		$(".textarea_btn").on("click", function() {
			var val = $("#comment_text").val()
			//判断输入字符串是否为空
			if(val.match(/^\s*$/) || val.replace(/\s|\xA0/g, "").length < 5) {
				$(".text_info span").css({
					"color": "red"
				});
			} else {
				comment.doComment();
				$(".text_info span").css({
					"color": "black"
				});
			}
		})
	},
	//显示回复框
	showReportBox: function() {
		$(document).on("click", ".reply_btn", function() {
			var el = this;
			var data = this.dataset.reply_id;
			//要回复的是那条评论id存下来
			sessionStorage.setItem("comment_id", this.dataset.reply_id);
			
			if(i) {
				comment.showReportBox(el, data);
				i = false;
			} else {
				comment.closeReportBox(data);
				i = true;
			}
		});
	},
	//	点击回复按钮
	clickReplyBtn: function() {
		$(document).on("click", ".report_btn_box", function() {
			var rp_t = document.getElementsByClassName("report_textarea");
			//回复内容
			var rp_t_val = $(rp_t).val();
			//当前回复评论的id
			var reply_data = $(this).data("reply_data");
			//被回复的用户的id
			var str="comment"+reply_data;
			var comment_box=document.getElementsByClassName(str);
			
			var comment_userid=comment_box[0].dataset.comment_userid;
			
			if(rp_t_val.length < 2) {
				var a = document.getElementsByClassName("reply_limit");
				$(a).css({
					"display": "inherit"
				});
			} else {
				comment.doReply(rp_t_val, reply_data,comment_userid);
			}
		});
	},
	showMore:function(){
		$(".loadmore").on("click",function(){
			atricleCurrentPage++;
			comment.getComment(atricleCurrentPage)
		});
	}
	

}