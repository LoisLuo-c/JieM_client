var h_num=0;
var homePhotos={
	config:{
		num:0,
		server: "http://loisluo.com",
		getList: "/admin/content/homepage_ph",
		uploadfile: "http://loisluo.com/uploadfile"
	},
	photoItem:function(list){
		
		
		var tpl=[
			'<li class="news_item ph_item" data-news_item = "{@id}">',
				'<div class="silder_img">',
					'<a target="_blank" href="http://loisluo.com/jiemian/article.html">',
					'<img src="{@img}" class="ph_img"/>',
					'</a>',
				'</div>',
				'<div class="silder_title">',
					'<h2>',
						'<a target="_blank" href="http://loisluo.com/jiemian/article.html">{@title}</a>',
					'</h2>',
				'</div>',
				'<div class="silder_footer">',
					'<span class="author">{@author}</span>',
					'<span>{@date}</span>',
					'<span class="click">{@click}</span>',
					'<span class="comment">{@comment}</span>',
				'</div>',
			'</li>'
		];
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
		return tpl.join("").replace("{@id}",list.id)
						   .replace("{@img}",list.titleImage)
						   .replace("{@title}",list.title)
						   .replace("{@author}",list.author)
						   .replace("{@date}",list.time)
						   .replace("{@click}",target_click)
						   .replace("{@comment}",target)
						   
	},
	
	createPosition:function(list){
		
		var ul=document.createElement('ul');
		ul.className="position_list";
		var li=null;
		for(var i=0;i<list.length;i++){
			li=document.createElement('li');
			li.className="position_item";
			li.setAttribute("data-position_item",i);
			
			ul.appendChild(li);
		}
//		$(ul).children().eq(0).css({"background-color":"red"})
		
		return ul;
	},
	createPhotoBox:function(list){
		var me=this;
		var btn_left=$('<div class="btn_left"><i class="iconfont icon-jiantou1"></i></div>');
		var btn_right=$('<div class="btn_right"><i class="iconfont icon-jiantou3"></i></div>');
		
		var photoList=$(".ph_list");
		photoList.empty();
		for(var i=0;i<6;i++){
			photoList.append(me.photoItem(list[i]));
		}
		photoList.append(photoList.children().eq(0).clone());
		photoList.append(photoList.children().eq(1).clone());
		var position_box=$('.position_box');
		position_box.append(me.createPosition(list));
		
	},
	getList:function(){
		var me=this;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getList,
			async:true,
			success:function(r){
				me.createPhotoBox(r);
			},
			error:function(){
				
			}
		});
	},
	btnleft:function(){
		var me=this;
		$(".btn_left").on("click",function(){
			
			me.config.num--;
			me.move();
			
		})
	},
	btnright:function(){
		var me=this;
		$(".btn_right").on("click",function(){
			me.config.num++;
			me.move();
			
		})
	},
	btnposition:function(){
		var me=this;
		$(document).on("click",".position_item",function(){
			var index=this.dataset.position_item;
			$(this).css({"background-color":"red"}).siblings().css({"background-color":"grey"})
			var ul=document.getElementsByClassName("ph_list");
			var ul_left=$(ul).css('left');
			var li=document.getElementsByClassName("ph_item");
			var length=li.length;
			ul_left=index*-470+"px";
			$(ul).animate({left:ul_left});
			me.config.num=index;
		});
	},
	move:function(){
		var me=this;
		var ul=document.getElementsByClassName("ph_list");
		var ul_left=$(ul).css('left');
		var li=document.getElementsByClassName("ph_item");
		var length=li.length;

		var ul_left=(me.config.num)*-470+"px";
		
		var index=me.config.num;
		if(index==6){
			index=0
		}else if(index==-1){
			index=5
		}else if(index==7){
			index=1;
		}
		
		if(me.config.num>=length-1){
			$(ul).css({"left":"0px"})
			ul_left=-470+"px"
			me.config.num=1;
		}else if(me.config.num<=-1){
			ul_left=(length-2)*-470+"px"
			$(ul).css({"left":ul_left})
			ul_left=(length-3)*-470+"px"
			me.config.num=length-3;
		}
		var po=document.getElementsByClassName("position_item");
		$(po).eq(index).css({"background-color":"red"}).siblings().css({"background-color":"grey"})
		$(ul).animate({left:ul_left});
		
	},
	autoPlay:function(){
		var me=this;
		console.log('ddd');
		var interval =function(){
			timer_home=setInterval(function(){
				me.config.num++;
				me.move();
			},3000);
		}
		interval();
		
//		$(document).on("mouseout",".ph_list",function(){
//			interval();
//		});
//		$(document).on("mouseover",".ph_list",function(){
//			clearInterval(timer_home);
//		});
		
		
	}
}
