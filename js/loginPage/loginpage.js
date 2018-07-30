function textFocus(el){
	if(el.defaultValue==el.value){
		el.value='',el.style.color='#333';
	}
}
function textBlur(el){
	if(el.value==''){
		el.value=el.defaultValue;el.style.color="#999"
	}
}
verfLogin();
function verfLogin(){
	//用户名验证
	
	$(".log_username input").blur(function(){
		
		if($(this).val()=="请输入用户名"||$(this).val()==""){
			$(".log_username .empty").show()
		}else{
			$(".log_username .empty").hide()
		}
	});
	//密码验证
	$(".log_password input").blur(function(){
		
		if($(this).val()=="请输入密码"||$(this).val()==""){
			$(".log_password .empty").show()
		}else{
			$(".log_password .empty").hide()
		}
	});
}
