var channelLeft={
	list:[{"channel":"天下","sort1":"国际政治","sort2":"全球经济","sort3":"社会万象"},
	{"channel":"中国","sort1":"中国时政","sort2":"社会民生","sort3":"深度报道"},
	{"channel":"宏观","sort1":"财经要闻","sort2":"机构视点","sort3":"数据快报"}	
	],
	itemMsg:function(list){
		var tpl=[
		'<h2>',
			'<a >{@title}</a>',
		'</h2>',
		'<ul class="sort_list">',
			'<li class="sort_item">',
				'<a >{@sort1}</a>',
			'</li>',
			'<li class="sort_item">',
				'<a >{@sort2}</a>',
			'</li>',
			'<li class="sort_item">',
				'<a >{@sort3}</a>',
			'</li>',
		'</ul>'
		];
		return tpl.join("").replace("{@title}",list.channel)
							.replace("{@sort1}",list.sort1)
							.replace("{@sort2}",list.sort2)
							.replace("{@sort3}",list.sort3)
	},
	createMsg:function(){
		var me=this;
		var box=$(".content_left");
		
		var channel=sessionStorage.getItem("channel_data");
		
		box.append(me.itemMsg(me.list[channel]));
	}

}
