window.onload=function(){
	waterfall('pic_main','pic_box');
	var dataInt = {'data':[{'src':'1.jpg'},{'src':'4.jpg'},{'src':'7.jpg'},{'src':'17.jpg'}]};
	window.onscroll=function(){
		if (checkScrollSlide) {
			var oparent = document.getElementById('pic_main');
			for(var i=0;i<dataInt.data.length;i++){
				var oBox=document.createElement('div');
				oBox.className='pic_box';
				oparent.appendChild(oBox);
				var oPic=document.createElement('div');
				oPic.className='pic';
				oBox.appendChild(oPic);
				var oImg=document.createElement('img');
				oImg.src='Pinterest_img/'+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('pic_main','pic_box');
		}
	}
};

function waterfall(parent,box){
	// 获取父元素pic_main
	var oparent = document.getElementById(parent);
	// 获取picbox数组
	var oboxs = getByClass(oparent,box);

	// 计算每个box的宽度
	var oboxw=oboxs[0].offsetWidth;
	// 计算列数
	var cols=Math.floor(document.documentElement.clientWidth/oboxw);
	// 设置main的宽度
	oparent.style.cssText='width:'+cols*oboxw+'px;margin:50px auto';

	// 存放第一列的高度
	var harray=[];
	for (var i=0; i<oboxs.length;i++){
		if(i<cols){
			harray.push(oboxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,harray);
			var index = getMinIndex(harray,minH);
			oboxs[i].style.position='absolute';
			oboxs[i].style.top=minH+'px';
			oboxs[i].style.left=index*oboxw+'px';
			harray[index]+=oboxs[i].offsetHeight;
		}
	}

}

function getByClass(parent,className){
	var oelements=parent.getElementsByTagName('*');
	var boxArray=new Array();
	for (var i=0;i<oelements.length;i++){
		if(oelements[i].className==className){
			boxArray.push(oelements[i]);
		}
	}
	return boxArray;
}

function getMinIndex(array,min){
	for(var i=0;i<array.length;i++){
		if(min==array[i])
			return i;
	}
}

function checkScrollSlide(){
	var oparent = document.getElementById('pic_main');
	var oboxs = getByClass(oparent,'pic_box');
	var lastBoxH=oboxs[length-1].offsetTop+Math.floor(oboxs[length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight||document.documentElement.clientHeight;
	return (lastBoxH<scrollTop+height)?true:false;
}