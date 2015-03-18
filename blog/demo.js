/*
$(function(){
	var box=document.getElementById('box');
	setInterval(function(){
		var left=parseInt(getStyle(box, 'left'));
		box.style.left=left+1+'px';
	},1);
});
*//*

	$('#btn').click(function(){
		$('#box').animate({
			'attr':'o',
			'target':100,
			'step':7,
			'type':0
		});
	});*/
$(function(){	
	$('#btn').toggle(function(){
		$('#box').css('background','blue');
	},function(){
		$('#box').css('background','red');
	});
});
