var users={
	config:{
		browseCurPage:2,
		msgCurPage:2,
	},
	loadmore:function(){
		var me=this;
		$(".browse_box .loadmore").on("click",function(){
			var curp=me.config.browseCurPage;
			userBrowse.getList(curp);
			me.config.browseCurPage++;
		});
		$(".msg_box .loadmore").on("click",function(){
			var curp=me.config.msgCurPage;
			msgNoti.getList(curp);
			me.config.msgCurPage++;
		});
	}
}
