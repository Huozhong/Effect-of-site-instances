(function($){
	$(function(){//加载document之后运行
		var banner_audio=new Audio(),
			webm=isSupportWebM();//检查是否支持webm格式
		if (webm) {
			banner_audio.src='media/banner_sound.webm';
		} else{
			banner_audio.src='media/banner_sound.mp3';
		};

		$('.banner')
			.bind('mouseover focusin',function(){
				banner_audio.load();
				banner_audio.play();
			})
			.bind('mouseout focusout',function(){
				banner_audio.pause();
			})
	});
})(jQuery);

function isSupportWebM(){
	var tester=document.createElement('audio');
	return !!tester.canPlayType('audio/webm');
}