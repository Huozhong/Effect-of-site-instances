$(function(){
	waterFull();
	var dataInt = {'data':[{'src':'1.jpg'},{'src':'4.jpg'},{'src':'7.jpg'},{'src':'17.jpg'}]};
	$(window).on('scroll',function(){
		if(checkScrollSlide){
			$.each(dataInt.data,function(key,value){
				var oBox = $('<div>').addClass('pic_box').appendTo($('#pic_main'));
				var oPic=$('<div>').addClass('pic').appendTo($(oBox));
				var oImg=$('<img>').attr('src','Pinterest_img/'+$(value).attr('src')) .appendTo($(oPic));
			});	
			waterFull();
		}
	});
});

function waterFull(){
	var $boxs=$('#pic_main>div');
	var boxW=$boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/boxW);

	$('#pic_main').width(cols*boxW).css('margin','0 auto');
	var hArr=[];
	$boxs.each(function(index,value){
		var h=$boxs.eq(index).outerHeight();
		if (index<cols) {
			hArr[index]=h;
		}else{
			var minH=Math.min.apply(null,hArr);
			var minHIndex=$.inArray(minH,hArr);
			$(value).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minHIndex*boxW+'px'
			});
			hArr[minHIndex]+=$boxs.eq(index).outerHeight();
		}
	});
}

function checkScrollSlide(){
	var $lastBox = $('pic_#main>div').last();
	var lasrBoxDis=$lastBox.offset().top+Math.floor($lastBox.outerHeight/2);
	var scrollTop = $(window).scrollTop();
	var documentH = $(window).height();
	return (lasrBoxDis<scrollTop+documentH)?true:false;
}