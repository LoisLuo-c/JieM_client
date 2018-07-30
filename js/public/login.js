var login = {
	state: {
		token: "",
		userId: ""
	},
	config: {
		server: "http://loisluo.com",
		login: "/admin/login"
	},
	//已登录要显示的图片
	loggedImg: function(list) {
		var str = "";
		if(list[0].titleImage.length < 1) {
			str = "img/users/user.jpg";
		} else {
			str = list[0].titleImage;
		}
		var img = '<img src="{@img}"/>';
		img.replace("{@img}", str)

		$(".logged").append($(img));
	},
	//已登录把鼠标放在图片上要显示的栏目
	loggedList: function() {

	},
	doLogin: function() {
		var me = this;
		var data = {}
		var fromdata = $(".fm_login").serializeArray();
		$.each(fromdata, function(i, item) {
			data[item.name] = item.value;
		})

		$.ajax({
			type: "post",
			url: me.config.server + me.config.login,
			async: true,
			data: data,
			success: function(r) {
				if(r.userId.length < 1) {
					$(".error span").show();
				} else {
					$(".error span").hide();
					me.state.token = r.token;
					me.state.userId = r.userId[0].id;
					sessionStorage.setItem("token", r.token);
					sessionStorage.setItem("userId", r.userId[0].id);
					if(window.location.pathname == "/jiemian/loginPage.html") {
						window.location.href = "/jiemian/index.html"
					} else {
						me.closeLoginModal();
						me.isLogin();
					}
				}
			},
			error: function(e) {
				$(".loginBoxErr").css({"visibility":"visible"});
				console.log(e);
			}
		});

	},
	logout: function() {
		var tpl = [
			'<ul class="list">',
			'<li class="user_msg">消息</li>',
			'<li class="user_setup">帐号设置</li>',
			'<li class="logout">退出登录</li>',
			'</ul>'
		];

	},
	//判断是否登录
	logOrnot: function() {
		var me = this;
		console.log(sessionStorage.getItem("token"))
		if(sessionStorage.getItem("token") != null) {
			
			me.isLogin();
		} else {
			me.noLogin();
		}
	},
	doLogout:function(){
		var me=this;
		$(document).on("click",".logoutBtn",function(){
			sessionStorage.removeItem("userId");
			sessionStorage.removeItem("token");
			me.noLogin();
			var drop = document.getElementsByClassName("logged_box");
			$(drop).hide();
			showdrop=true;
		})
	},
	showLoginModal: function() {
		$(".login_box").show();
	},
	closeLoginModal: function() {
		$(".login_box").hide();
	},
	//登录显示图片
	isLogin: function() {

		$(".logged").show().siblings().hide();
	},
	//没登陆显示文字
	noLogin: function() {
		$(".log_box").show().siblings().hide();
	},
	showDropdown: function(showdrop) {
		$(".logged").click(function() {
			var drop = document.getElementsByClassName("logged_box");
			if(showdrop==true){
				$(drop).show();
				showdrop=false;
			}else{
				$(drop).hide();
				showdrop=true;
			}
			
		});
	}
	

		
	
		

	
}