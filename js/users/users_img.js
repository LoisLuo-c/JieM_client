var userImg = {
	config: {
		server: "http://loisluo.com",
		getList: "/admin/user/getone",
		uploadfile: "/admin/upload",
		updateUserImg:"/admin/user/update_img",
		
	},
	getList:function(){
		var me=this;
		var userId=sessionStorage.userId;
		$.ajax({
			type:"get",
			url:me.config.server+me.config.getList,
			async:true,
			data:{id:userId},
			success:function(r){
				if(r[0].userImage==null){
					$("#img_form .userImg").attr("src","./img/users/user.jpg");
				}else{
					$("#img_form .userImg").attr("src",r[0].userImage);
				}
			}
		});
	},
	showUpload: function() {
		var me = this;
		$(".userImg").on("click", function() {
			$("#img_upload").click();
			$("#img_upload").on("change", function() {
				var objUrl = me.getImgUrl(this.files[0]);
				if(objUrl) {
					$(".user_img").attr("src",objUrl)
				}
				var imgData=$(this).parent();
				$("#img_form").ajaxSubmit({
					type:"post",
					url:me.config.server+me.config.uploadfile,
					async:true,
					mimeType: "multipart/form-data",
					success:function(r){
						//成功后把图片添加到用户头像
						var userId=sessionStorage.userId;
						var res=JSON.parse(r)
						var titleImage=res.fileName;
						$.ajax({
							type:"post",
							url:me.config.server+me.config.updateUserImg,
							async:true,
							data:{id:userId,titleImage:titleImage},
							success:function(re){
								location.reload();
							}
						});
					},
					error:function(r){
						console.log(r);
					}
				})
			})
		})
	},
	getImgUrl: function(file) {
		var url = null;
		if(window.createObjectURL != undefined) { // basic
			url = window.createObjectURL(file);
		} else if(window.URL != undefined) { // mozilla(firefox)
			url = window.URL.createObjectURL(file);
		} else if(window.webkitURL != undefined) { // webkit or chrome
			url = window.webkitURL.createObjectURL(file);
		}
		return url;
	}

}