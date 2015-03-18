$(function(){
	// 个人中心下拉菜单
	$('#header .member').hover(function(){
		$(this).css('background','url(images/up.png) no-repeat 55px center');
		$('#header .member_ul').css('display','block');
	},function(){
		$(this).css('background','url(images/down.png) no-repeat 55px center');
		$('#header .member_ul').css('display','none');
	});

	// 遮罩画布
	var screen=$('#screen');

	// 登陆框
	var login=$('#login');
	// 登录框显示
	$('#header .login').click(function(){
		login.css('display','block');
		screen.lock().animate({
			attr:'o',
			target:30
		});
	});
	//登陆框关闭
	$('#login .close').click(function(){
		login.css('display','none');
		screen.unlock().animate({
			attr:'o',
			target:0
		});
	});
	// 登录框居中
	login.center(350,250).resize(function(){
		login.center(350,250);
	});

	$().resize(function(){
		login.center(350, 250);
		if(login.css('display')=='block'){
			$('#screen').lock();
		}
	});
	// login.drag();
	login.drag($('#login h2').last());
	// alert($().getTags('span').getElement(0).innerHTML);


	// 注册框
	var reg=$('#reg');
	$('#header .reg').click(function(){
		reg.css('display','block');
		screen.lock().animate({
			attr:'o',
			target:30
		});
	});
	$('#reg .close').click(function(){
		reg.css('display','none');
		screen.unlock().animate({
			attr:'o',
			target:0
		});
	});
	reg.center(600,550).resize(function(){
		reg.center(600,550);
	});

	$().resize(function(){
		reg.center(600, 550);
		if(reg.css('display')=='block'){
			$('#screen').lock();
		}
	});
	reg.drag($('#reg h2').last());


	// 百度分享初始化位置
	$('#share').css('top',getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2+'px');

	// 实现拉动滚动条时分享侧栏始终保持在中间部位
	/*addEvent(window, 'scroll', function(){
		$('#share').animate({
			attr:'y',
			target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
		});
	});*/

	$(window).bind('scroll',function(){
		setTimeout(function(){
			$('#share').animate({
				attr:'y',
				target:getScroll().top+(getInner().height-parseInt(getStyle($('#share').first(),'height')))/2
			});	
		}, 100);
	})

	// 百度分享收缩效果
	$('#share').hover(function(){
		$(this).animate({
			'attr':'x',
			'target':0
		});
	}, function(){
		$(this).animate({
			'attr':'x',
			'target':-211
		});
	});


	// 滑动导航
	$('#nav .about li').hover(function(){
		var target=$(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr:'x',
			target:target+20,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:-target
				});
			}
		});
	}, function(){
		$('#nav .nav_bg').animate({
			attr:'x',
			target:20,
			fn:function(){
				$('#nav .white').animate({
					attr:'x',
					target:0
				});
			}
		});
	});

	// 左侧菜单
	$('#sidebar h2').toggle(function(){
		$(this).next().animate({
			attr:'height',
			target:0
		});
	},function(){
		$(this).next().animate({
			attr:'height',
			target:150
		});
	});


	// 表单验证


	// 用户名验证
	$('form').form('user').bind('focus', function(){
		$('#reg .info_user').css('display','block');
		$('#reg .error_user').css('display','none');
		$('#reg .succ_user').css('display','none');
	}).bind('blur', function(){
		if(trim($(this).value())==''){
			$('#reg .info_user').css('display','none');
		}else if(!check_user()){
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','block');
			$('#reg .succ_user').css('display','none');
		}else{
			$('#reg .info_user').css('display','none');
			$('#reg .error_user').css('display','none');
			$('#reg .succ_user').css('display','block');
		}
	});
	// 用户检测
	function check_user() {
		if (/^[\w]{2,20}$/.test($('form').form('user').value())) return true;
	}


	// 密码验证
	$('form').form('pass').bind('focus', function(){
		$('#reg .info_pass').css('display','block');
		$('#reg .error_pass').css('display','none');
		$('#reg .succ_pass').css('display','none');
	}).bind('blur', function(){
		if(trim($(this).value())==''){
			$('#reg .info_pass').css('display','none');
		}else {
			if(check_pass(this)){
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','none');
				$('#reg .succ_pass').css('display','block');
			}else{
				$('#reg .info_pass').css('display','none');
				$('#reg .error_pass').css('display','block');
				$('#reg .succ_pass').css('display','none');
			}
		}
	});

	// 密码强度验证
	$('form').form('pass').bind('keyup', function(){
		check_pass();
	});


	// 密码验证函数
	function check_pass(){

		var value=trim($('form').form('pass').value());
		var value_length=value.length;
		var code_length=0;

		// 第一个   6-20之间
		if(value_length>=6&&value_length<=20){
			$('#reg .info_pass .q1').html('●').css('color', 'green');
		}else{
			$('#reg .info_pass .q1').html('○').css('color', '#666');
		}

		// 第二个	
		if(value_length>0&&!/\s/.test(value)){
			$('#reg .info_pass .q2').html('●').css('color', 'green');
		}else{
			$('#reg .info_pass .q2').html('○').css('color', '#666');
		}

		// 第三个	
		if(/[\d]/.test(value)){
			code_length++;
		}

		if(/[a-z]/.test(value)){
			code_length++;
		}

		if(/[A-Z]/.test(value)){
			code_length++;
		}

		if(/[^\w]/.test(value)){
			code_length++;
		}

		if(code_length>=2){
			$('#reg .info_pass .q3').html('●').css('color', 'green');
		}else{
			$('#reg .info_pass .q3').html('○').css('color', '#666');
		}

		// 安全级别
		if(value_length>=10&& code_length>=3){
			alert(1);
			$('#reg .info_pass .s1').css('color','green');
			$('#reg .info_pass .s2').css('color','green');
			$('#reg .info_pass .s3').css('color','green');
			$('#reg .info_pass .s4').html('高').css('color','green');
		}else if(value_length>=8&& code_length>=2){
			$('#reg .info_pass .s1').css('color','#f60');
			$('#reg .info_pass .s2').css('color','#f60');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('中').css('color','#f60');
		}else if(value_length>=1){
			$('#reg .info_pass .s1').css('color','maroon');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('低').css('color','maroon');
		}else{
			$('#reg .info_pass .s1').css('color','#ccc');
			$('#reg .info_pass .s2').css('color','#ccc');
			$('#reg .info_pass .s3').css('color','#ccc');
			$('#reg .info_pass .s4').html('');
		}

		if(value_length>=6&&value_length<=20&&!/\s/.test(value)&& code_length>=2){
			return true;
		}
		return false;
	}

	// 密码确认
	$('form').form('notpass').bind('focus', function(){
		$('#reg .info_notpass').css('display','block');
		$('#reg .error_notpass').css('display','none');
		$('#reg .succ_notpass').css('display','none');
	}).bind('blur', function(){
		if(trim($(this).value())==''){
			$('#reg .info_notpass').css('display','none');
		}else if(check_notpass()){
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','none');
			$('#reg .succ_notpass').css('display','block');
		}else{
			$('#reg .info_notpass').css('display','none');
			$('#reg .error_notpass').css('display','block');
			$('#reg .succ_notpass').css('display','none');
		}
	});
	// 确认密码检测
	function check_notpass() {
		if (trim($('form').form('pass').value()) ==
		trim($('form').form('notpass').value())) return true;
	}

	// 回答
	$('form').form('ans').bind('focus', function(){
		$('#reg .info_ans').css('display','block');
		$('#reg .error_ans').css('display','none');
		$('#reg .succ_ans').css('display','none');
	}).bind('blur', function(){
		if(trim($(this).value())==''){
			$('#reg .info_ans').css('display','none');
		}else if(check_ans()){
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','none');
			$('#reg .succ_ans').css('display','block');
		}else{
			$('#reg .info_ans').css('display','none');
			$('#reg .error_ans').css('display','block');
			$('#reg .succ_ans').css('display','none');
		}
	});

	//检测问答
	function check_ans() {
		if (trim($('form').form('ans').value()).length >= 2 &&
		trim($('form').form('ans').value()).length <= 30) return true;
	}

	//提问
	$('form').form('ques').bind('change', function () {
		if ($(this).value() != 0) $('#reg .error_ques').css('display', 'none');
	});

	// 检测提问
	function check_ques() {
		if ($('form').form('ques').value() != 0) return true;
	}

	// 电子邮件
	$('form').form('email').bind('focus', function(){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').css('display','block');	
		}
		

		$('#reg .info_email').css('display','block');
		$('#reg .error_email').css('display','none');
		$('#reg .succ_email').css('display','none');
	}).bind('blur', function(){
		$('#reg .all_email').css('display','none');

		if(trim($(this).value())==''){
			$('#reg .info_email').css('display','none');
		}else if(check_email()){
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','none');
			$('#reg .succ_email').css('display','block');
		}else{
			$('#reg .info_email').css('display','none');
			$('#reg .error_email').css('display','block');
			$('#reg .succ_email').css('display','none');
		}
	});

	//邮件检测
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.
		test(trim($('form').form('email').value()))) return true;
	}

	// 电子邮件补全键入
	$('form').form('email').bind('keyup', function(event){
		if($(this).value().indexOf('@')==-1){
			$('#reg .all_email').css('display','block');
			$('#reg .all_email li span').html($(this).value());	
		}else{
			$('#reg .all_email').css('display','none');
		}


		// 使用键盘选择选项
		if (event.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#reg .all_email li').length() - 1) {
				this.index = 0;
			} else {
				this.index ++;
			}
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('coloe','#666');
			$('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('#reg .all_email li').length() -1;
			} else {
				this.index --;
			}
			$('#reg .all_email li').css('background','none');
			$('#reg .all_email li').css('coloe','#666');
			$('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		if (event.keyCode == 13) {
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').css('display', 'none');
			this.index = undefined;
		}
		
	});

	// 电子邮件点击获取
	$('#reg .all_email li').bind('mousedown',function(){
		$('form').form('email').value($(this).text());
	});

	// 电子邮件补全鼠标移入移出效果
	$('#reg .all_email li').hover(function(){
		$(this).css('background','#e5edf2');
		$(this).css('coloe','#369');
	}, function(){
		$(this).css('background','none');
		$(this).css('coloe','#666');
	})

	// 年月日
	var year = $('form').form('year');
	var month = $('form').form('month');
	var day = $('form').form('day');

	// 注入年
	for (var i = 1950; i <= 2015; i ++) {
		year.first().add(new Option(i, i), undefined);
	}

	// 注入月
	for (var i = 1; i <=12; i ++) {
		month.first().add(new Option(i, i), undefined);
	}

	// 注入日
	var day30 = [4, 6, 9 ,11];
	var day31 = [1, 3, 5, 7, 8, 10, 12];

	//判断某一值是否存在某个数组里
	function inArray(array, value) {
		for (var i in array) {
			if (array[i] == value) return true;
		}
		return false;
	}
	// 注入日的函数
	function select_day() {
		if (month.value() != 0 && year.value() != 0) {
			var cur_day = 0;
			if (inArray(day31, parseInt(month.value()))) {
				cur_day = 31;
			} else if (inArray(day30, parseInt(month.value()))) {
			cur_day = 30;
			} else {
				if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0)
					|| parseInt(year.value()) % 400 == 0) {
					cur_day = 29;
				} else {
					cur_day = 28;
				}
			}
			day.first().options.length = 1;
			for (var i = 1; i <= cur_day; i ++) {
				day.first().add(new Option(i, i), undefined);
			}
		} else {
			day.first().options.length = 1;
		}
	}

	year.bind('change', select_day);
	month.bind('change', select_day);

	//年月日检测
	function check_birthday() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}

	//选择日后自动消失
	day.bind('change', function () {
		if (check_birthday()) $('#reg .error_birthday').css('display', 'none');
	});

	// 备注
	$('form').form('ps').bind('keyup', function(){
		setTimeout(check_ps, 50);
	});
	//清尾
	$('#reg .ps .clear').click(function () {
		$('form').form('ps').value($('form').form('ps').value().substring(0, 200));
		check_ps();
	});


	// 检查字符长度的函数
	function check_ps(){
		var num = 200 - $('form').form('ps').value().length;
		if (num >= 0) {
			$('#reg .ps').eq(0).css('display', 'block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display', 'none');
		} else {
			$('#reg .ps').eq(1).css('display', 'block');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color', 'red');
			$('#reg .ps').eq(0).css('display', 'none');
		}
	}

	//提交表单
	$('form').form('sub').click(function () {
		var flag = true;
		if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			flag = false;
		}
		if (!check_pass()) {
			$('#reg .error_pass').css('display', 'block');
			flag = false;
		}

		if (!check_notpass()) {
			$('#reg .error_notpass').css('display', 'block');
			flag = false;
		}
		if (!check_ques()) {
			$('#reg .error_ques').css('display', 'block');
			flag = false;
		}
		if (!check_ans()) {
			$('#reg .error_ans').css('display', 'block');
			flag = false;
		}

		if (!check_email()) {
			$('#reg .error_email').css('display', 'block');
			flag = false;
		}

		if (!check_birthday()) {
			$('#reg .error_birthday').css('display', 'block');
			flag = false;
		}
		if (!check_ps()) {
			flag = false;
		}

		if (flag) {
		//提交表单
			alert('表单检测完毕，提交表单！');
			$('form').first().submit();
		}
	});
	/*
	//直接更换图片进行轮播
	$('#banner img').css('display','none');
	$('#banner img').eq(0).css('display','block');
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	// 轮播计数器
	var banner_index=1;
	// alert( $('#banner ul li').length());
	var banner_timer=setInterval(banner_fn, 2000);//自动轮播

	$('#banner ul li').hover(function(){//手动轮播
		clearInterval(banner_timer);
		banner(this);
	}, function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn, 2000);
	});

	function banner_fn(){//实现轮播的跳转
		if(banner_index>= $('#banner ul li').length()) banner_index=0;
		banner($('#banner ul li').eq(banner_index).first());
		banner_index++;
	}

	function banner(obj){//轮播
		$('#banner img').css('display','none');
		$('#banner ul li').css('color','#999');
		$('#banner img').eq($(obj).index()).css('display','block');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
	}
	*/

	//设置图片的透明度进行轮播
	$('#banner img').opacity(0);
	$('#banner ul li').eq(0).css('color','#333');
	$('#banner img').eq(0).opacity(100);
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));

	// 轮播计数器
	var banner_index=1;
	//轮播类型
	var banner_type=1;//1表示透明度轮播，2表示上下轮播
	var banner_timer=setInterval(banner_fn, 2000);//自动轮播

	$('#banner ul li').hover(function(){//手动轮播
		clearInterval(banner_timer);
		// alert($(this).css('color'));
		if($(this).css('color')!='rgb(51, 51, 51)'&&$(this).css('color')!='#333')
			banner(this,banner_index==0?$('#banner ul li').length()-1:banner_index-1);
	}, function(){
		banner_index=$(this).index()+1;
		banner_timer=setInterval(banner_fn, 2000);
	});

	function banner_fn(){//实现轮播的跳转
		if(banner_index>= $('#banner ul li').length()) banner_index=0;
		banner($('#banner ul li').eq(banner_index).first(),banner_index==0?$('#banner ul li').length()-1:banner_index-1);
		banner_index++;
	}

	function banner(obj,prev){//轮播
		$('#banner ul li').css('color','#999');
		$(obj).css('color','#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));

		if(banner_type==1){
			$('#banner img').eq(prev).animate({
				attr:'o',
				target:0
			}).css('zIndex',1);
			$('#banner img').eq($(obj).index()).animate({
				attr:'o',
				target:100
			}).css('zIndex',2);			
		}else if(banner_type==2){
			$('#banner img').eq(prev).animate({
				attr:'y',
				target:446
			}).css('zIndex',1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr:'y',
				target:0
			}).css('top','-446px').css('zIndex',2).opacity(100);	
		}

	}	

	//延迟加载
	// $('.wait_load').eq(0).attr('src',$('.wait_load').eq(0).attr('xsrc'));
	// alert(offsetTop($('.wait_load').first()));
	var wait_load=$('.wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll',_wait_load);
	$(window).bind('resize',_wait_load);

	function _wait_load(){
		setTimeout(function(){
			for(var i=0;i<wait_load.length();i++){
				var _this=wait_load.ge(i);
				if(getInner().height+getScroll().top>=offsetTop(_this)){
					$(_this).attr('src',$(_this).attr('xsrc')).animate({
						attr:'o',
						target:100
					});
				}
			}
		
		}, 100);
	}


	// 预加载大图，图片弹窗
	var photo_big=$('#photo_big');
	$('#photo dl dt img').click(function(){
		photo_big.center(620,511).css('display','block');

		screen.lock().animate({
			attr:'o',
			target:30
		});

		// 预加载之图片加载

		var temp_img= new Image();//创建一个临时区域的图片对象，可以在后台加载完成后再显示出来
		
		$(temp_img).bind('load', function(){
			$('#photo_big .big img').attr('src',temp_img.src).animate({
				attr:'o',
				target:100
			}).css('width','600px').css('height','450px').css('top','0').opacity(0);
		});
		//IE需要将src放在load的后面
		temp_img.src=$(this).attr('bigsrc');

		var children=this.parentNode.parentNode;
		prev_next_img(children);

	});
	$('#photo_big .close').click(function(){
		photo_big.css('display','none');
		screen.unlock().animate({
			attr:'o',
			target:0
		});
		$('#photo_big .big img').attr('src','images/loading.gif').css('width','200px').css('height','200px').css('top','120px');
	});
	photo_big.center(620,511).resize(function(){
		photo_big.center(620,511);
	});

	$().resize(function(){
		photo_big.center(620, 511);
		if(photo_big.css('display')=='block'){
			$('#screen').lock();
		}
	});
	photo_big.drag($('#photo_big h2').last());

	// 鼠标划过大图展示区的左右两边
	// 左边
	$('#photo_big .big .left').hover(function(){
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:50
		});
	}, function(){
		$('#photo_big .big .sl').animate({
			attr:'o',
			target:0
		});
	});

	// 右边
	$('#photo_big .big .right').hover(function(){
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:50
		});
	}, function(){
		$('#photo_big .big .sr').animate({
			attr:'o',
			target:0
		});
	});	

	// 点击左右滑动  选择上一张和下一张
	// 上一张
	 $('#photo_big .big .left').click(function(){
	 	$('#photo_big .big img').attr('src','images/loading.gif').css('width','200px').css('height','200px').css('top','120px');
	 	var current_img=new Image();
	 	$(current_img).bind('load', function(){
		 	$('#photo_big .big img').attr('src', current_img.src).animate({
		 		attr:'o',
		 		target:100
		 	}).opacity(0).css('width','600px').css('height','450px').css('top','0');
		 });
	 	current_img.src=$(this).attr('src');
	 	var children=$('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
		prev_next_img(children);	 	
	 });

	// 下一张
	$('#photo_big .big .right').click(function(){
	 	$('#photo_big .big img').attr('src','images/loading.gif').css('width','200px').css('height','200px').css('top','120px');
	 	var current_img=new Image();
	 	$(current_img).bind('load', function(){
		 	$('#photo_big .big img').attr('src', current_img.src).animate({
		 		attr:'o',
		 		target:100
		 	}).opacity(0).css('width','600px').css('height','450px').css('top','0');
		 });
	 	current_img.src=$(this).attr('src');
	 	var children=$('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
	 	// var children=nextIndex($('#photo_big .big img').attr('index'),$('#photo').first());
	 	// alert(children);
		prev_next_img(children);	 	
	 });

	function prev_next_img(children){
		var prev=prevIndex($(children).index(),children.parentNode);
		var next=nextIndex($(children).index(),children.parentNode);

		var prev_img= new Image();
		var next_img= new Image();
		prev_img.src=$('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src=$('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src', prev_img.src);
		$('#photo_big .big .right').attr('src', next_img.src);
		$('#photo_big .big img').attr('index', $(children).index());

		$('#photo_big .big .index').html(parseInt($(children).index())+1+'/'+$('#photo dl dt img').length());
	}	

	

});





