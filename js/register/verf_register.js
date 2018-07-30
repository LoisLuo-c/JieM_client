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

function verfRegister(){
	//用户名验证
	$(".reg_username input").focus(function(){
		if($(this).val()==""){
			$(".reg_username .prompt").show().siblings().hide();
		}
	});
	$(".reg_username input").blur(function(){
		
		if($(this).val()=="请输入用户名"){
			$(".reg_username .empty").show().siblings().hide();
		}else if($(this).val().length>16||$(this).val().length<3){
			$(".reg_username .error").show().siblings().hide();
		}else{
			$(".reg_username .correct").show().siblings().hide();
		}
	});
	//密码验证
	$(".reg_password input").focus(function(){
		
		if($(this).val()==""){
			$(".reg_password .prompt").show().siblings().hide();
		}
	});
	$(".reg_password input").blur(function(){
		reg=/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,16}$/;
		if($(this).val()=="请输入密码"||$(this).val()==""){
			$(".reg_password .empty").show().siblings().hide();
		}
		else if(!reg.test($(".reg_password input").val())){
			$(".reg_password .error").show().siblings().hide();
		}
		else{
			$(".reg_password .correct").show().siblings().hide();
		}
	});
	//确认密码验证
	$(".comfirm_pw input").blur(function(){
		var pw=$(".reg_password input").val();
		
		if($(this).val()=="确认密码"||$(this).val()==''){
			$(".comfirm_pw .empty").show().siblings().hide();
		}
		else if($(this).val()!=pw){
			$(".comfirm_pw .error").show().siblings().hide();
		}else{
			$(".comfirm_pw .correct").show().siblings().hide();
		}
	});
	//检验验证码
	$(".verf_code input").blur(function(){
		var verf_code=sessionStorage.getItem("verf_code");
		if($(this).val()=="请输入验证码"||$(this).val()==""){
			$(".verf_code .empty").show().siblings().hide();
		}
		else if($(this).val().toLowerCase()!=verf_code.toLowerCase()){
			$(".verf_code .error").show().siblings().hide();
		}
		else{
			$(".verf_code .correct").show().siblings().hide();
		}
	});
}
