var register={
	config: {
		server: "http://loisluo.com",
		doregister: "/admin/user/create"
	},
	doregister:function(){
		var me=this;
		var data=$("#register_box").serializeArray();
		$.ajax({
			type:"post",
			url:me.config.server+me.config.doregister,
			async:true,
			data:data,
			success:function(r){
				$(".success").show();
				$(".box1").hide();
			}
		});
	}
}
