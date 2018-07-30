var photosBox=function(photos){
	console.log(photos);
	this.photos=[];
	this.points=[];
	this.photo_box=null;
	this.activeIndex=0;
	this.prevIndex=0;
	
	var createBox=function(){
		var me=this;
		var box=document.createElement('div');
		box.className="photo_box";
		//往box里添加ul
		
		//添加两个按钮
		var btn=document.createElement('div');
		btn.className="button p_btn_left";
		btn.addEventListener("click",function(){
			me.goPrev();
		});
		var i=document.createElement('i');
		i.className="iconfont icon-jiantou1";
		btn.appendChild(i);
		
		box.appendChild(btn);
		
		var box1=document.createElement('div');
		box1.className="photos_v";
		
		box1.appendChild(createPhotos.call(this,photos));
		console.log(photos);
		box.appendChild(box1);
		
		btn=document.createElement('div');
		btn.className="button p_btn_right";
		btn.addEventListener("click",function(){
			me.goNext();
		});
		var i=document.createElement('i');
		i.className="iconfont icon-jiantou3";
		btn.appendChild(i);
		box.appendChild(btn);
		
		box.appendChild(createPosition.call(this,photos));
		return box;
		
	}
	//创建ul
	var createPhotos=function(photos){
		console.log(photos);
		var ul=document.createElement('ul');
		ul.className="photo_items";
		
		var li=null;
		for(var i=0;i<photos.length;i++){
			li=createPhotoItem(photos[i]);
			this.photos.push(li);
			console.log(photos);
			ul.appendChild(li);
		}
		return ul;
	}
	//创建li
	var createPhotoItem=function(img){
		var li=document.createElement('li');
		li.className="photo_item";
		
		var a=document.createElement('a');
		a.setAttribute("href",img.url);
		
//		浏览器总在一个新打开、未命名的窗口中载入目标文档
		a.setAttribute("target","_blank");
		
		var i=document.createElement('img');
		i.setAttribute("src",img.src);
		i.setAttribute("alt",img.alt);
		
		a.appendChild(i);
		li.appendChild(a);
		
		return li;
	}
	//创建停靠点
	var createPosition=function(photos){
		var me=this;
		var ul=document.createElement('ul');
		ul.className="position_point";
		var li=null;
		for(var i=0;i<photos.length;i++){
			li=document.createElement('li');
			li.className="point";
			//一般我们往标签里存数据的时候，用data-开头，传一个i
			li.setAttribute("data-index",i);
			li.addEventListener("click",function(e){
				//回调函数默认传一个参数
				me.pointClick(e);
			})
			this.points.push(i);
			ul.appendChild(li);
		}
		return ul;
	}
	this.goIndex=function(index){
		this.photos[this.prevIndex].className="photo_item";
		this.prevIndex=index;
	
		this.photos[this.prevIndex].className="photo_item prev";
		this.photos[this.activeIndex].className="photo_item active";
		
		this.points[this.prevIndex].className="point";
		this.points[this.activeIndex].className="point active";
	}
	this.goPrev=function(){
		if(this.activeIndex>0){
			this.goIndex(this.activeIndex-1);
		}else{
			this.goIndex(this.photos.length-1);
		}
	}
	this.goNext=function(){
		if(this.activeIndex<this.photos.length-1){
			this.goIndex(this.activeIndex+1);
		}else{
			this.goIndex(0);
		}
	}
	this.pointClick=function(e){
		this.goIndex(parseInt(e.target.getActiveAttrib("data-index")));
	}
	var create=function(){
		this.photo_box = createBox.call(this);
		this.photos[this.activeIndex].className = "photo_item active";
		this.points[this.prevIndex].className = "point active";
	}
	this.fill=function(targetId){
		document.getElementById(targetId).innerHTML="";
		document.getElementById(targetId).appendChild(this.photo_box);
	}
	create.call(this);
}
var createPhotos=function(targetId){
	var div=document.createElement('div');
	div.className="photos_view";
	debugger;
	var photos=new photoBox();
	div.appendChild(photos.createBox());
	document.getElementById(targetId).appendChild(div);
	
}
