var channelEmerg={
	config:{
		num:0,
		server: "http://loisluo.com",
		getList: "/admin/isEmergencies/list",
		
	},
	msgItem:function(list){
		tpl=[
		'<div class="isemg_item" data-news_item="{@id}">',
			'<div class="msg_header">',
				'<h3>',
					'<a target="_blank" href="http://loisluo.com/jiemian/article.html">{@title}</a>',
				'</h3>',
			'</div>',
			'<div class="msg_footer">',
				'<span class="date">{@time}</span>',
			'</div>',
		'</div>'
		];
		
		return tpl.join("").replace("{@title}",list.title)
							.replace("{@time}",list.time)
							.replace("{@id}",list.id)
	},
	createMsg:function(list){
		var me=this;
		var box=$(".isemg_list");
		for(var i=0;i<list.length;i++){
			box.append(me.msgItem(list[i]));
		}
	},
	getList:function(){
		var me=this;
		var channel=sessionStorage.getItem("nav_item");
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getList,
			async:true,
			data:{channel:channel},
			success:function(r){
				
				me.createMsg(r);
			},
			error:function(){
				
			}
		});
	}

}
