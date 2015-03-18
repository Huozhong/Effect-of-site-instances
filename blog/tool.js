/*
// 跨浏览器添加事件  前者是W3C 后者是IE
function addEvent(obj,type,fn){
	if (obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	} else if(obj.attachEvent){
		obj.attachEvent('on'+type,function(){
			fn.call(obj,window.event);//对象冒充的方法，解决低版本的IE会出现将this识别为window的问题
			//call的原理：将第一个参数传递给函数的this中,另外低版本的IE此后就无法标准化event对象  所以传入第二个参数window.event
		});
	};
}

// 移除事件
function removeEvent(obj,type,fn){
	if (obj.removeEventListener) {
		obj.removeEventListener(type,fn,false);
	} else{
		obj.detachEvent('on'+type,fn);
	};
}
*/
// 浏览器检测
(function(){
	window.sys={};
	var ua=navigator.userAgent.toLowerCase();
	var s;
	/*alert(ua);
	if((/msie ([\d.]+)/).test(ua)){
		s=ua.match(/msie ([\d.]+)/);
		sys.ie=s[1];	
	}
	if((/firefox\/([\d.]+)/).test(ua))
	{
		s=ua.match(/firefox\/([\d.]+)/);
		sys.firefox=s[1];
	}
	if((/chrome\/([\d.]+)/).test(ua))
	{
		s=ua.match(/chrome\/([\d.]+)/);
		sys.chrome=s[1];
	}*/

	(s=ua.match(/msie ([\d.]+)/))? sys.ie=s[1]:
	(s=ua.match(/firefox\/([\d.]+)/))?sys.firefox=s[1]:
	(s=ua.match(/chrome\/([\d.]+)/))?sys.chrome=s[1]:
	(s=ua.match(/opera\/.*version\/([\d.]+)/))?sys.opera=s[1]:
	(s=ua.match(/version\/([\d.]+).*safari/))?sys.safari=s[1]:
	(s=ua.match(/webkit\/([\d.]+)/))?sys.webkit=s[1]:0;

	
})();

// DOM加载

function addDomLoaded(fn){
	var isReady=false;
	var timer=null;
	function doReady(){
		if(timer) clearInterval(timer);
		if(isReady)return;
		isReady=true;
		fn();
	}

	// 判断非主流浏览器
	if((sys.opera&&sys.opera<9)||(sys.firefox&&sys.firefox<3)||(sys.webkit&&sys.webkit<525)){
		timer=setInterval(function(){
			if (/loaded|complete/.test(document.readyState)) {
				doReady();
			}
		}, 1);
	}else if(document.addEventListener)//W3C
	{
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else if(sys.ie&&sys.ie<9){
		var timer=null;
		timer=setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				doReady();
			}catch(e){

			};
		},1);
	}
}

// 解决低版本IE浏览器添加事件后执行时无法按照顺序执行
// 为每一个被添加的事件添加一个ID(只要加一个计数器就可以)
addEvent.ID=1;
// 跨浏览器添加事件  前者是W3C 后者是IE
function addEvent(obj,type,fn){
	if (obj.addEventListener) {
		obj.addEventListener(type,fn,false);
	} else{
		// 创建一个哈希表存放事件
		if(!obj.events){
			obj.events={};
		}
		// 创建一个存放事件的数组
		if(!obj.events[type]){
			obj.events[type]=[];
			// 将第一个事件存储
			if(obj['on'+type]) obj.events[type][0]=fn;
		}else{
			if(addEvent.equal(obj.events[type],fn)){
				return false;
			}
		}
		// 存储后面的事件
		obj.events[type][addEvent.ID++]=fn;
		// 执行
		obj['on'+type]=addEvent.exec;
	}

}
// 执行函数
addEvent.exec=function (){
	var e=event||window.event;
	var es=this.events[e.type]
	for(var i in es){
			es[i].call(this,e);
		}
};

//同一个函数屏蔽
addEvent.equal=function(es,fn){
	for(var i in es){
		if(es[i]==fn) return true;
	}
	return false;
} ;

// 移除事件
function removeEvent(obj,type,fn){
	if (obj.removeEventListener) {
		obj.removeEventListener(type,fn,false);
	} else{
		for(var i in obj.events[type]){
			if(obj.events[type][i]==fn){
				delete obj.events[type][i];
			}
		}
	}
}

// 跨浏览器获取视口大小
function getInner(){
	if(typeof window.innerWidth =='number'){
		return{
			width : window.innerWidth,
			height : window.innerHeight
		}
	}else{
		return{
			width : document.documentElement.clientWidth,
			height : document.documentElement.clientHeight
		}
	}
}

// 获取滚动条的位置
function getScroll(){
	return {
		top:document.documentElement.scrollTop||document.body.scrollTop,
		left:document.documentElement.scrollLeft||document.body.scrollLeft
	}
}

// 获取event
function getEvent(e){
	return e||window.event;
}

// 阻止默认行为 
function preDef(e){
	var e=e||window.event;
	if(typeof e.preventDefault!='undefined'){
		e.preventDefault();
	}else{
		e.returnValue=false;
	}
}

// 获取style
function getStyle(element,attr){
	if(typeof window.getComputedStyle!='undefined'){//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle!='undefined'){//IE
		return element.currentStyle[attr];
	}
}

// 删除前后空格
function trim(str){
	return str.replace(/(^\s*)(\s*$)/g,'');
}

// 返回元素离网页顶端的距离
function offsetTop(element){
	var top=element.offsetTop;
	var parent=element.offsetParent;
	while(parent!=null){
		top+=parent.offsetTop;
		parent=parent.offsetParent;
	}
	return top;
}

// 获取某一节点的上一个节点的索引
function prevIndex(current,parent){
	var length=parent.children.length;
	if(current==0) return length-1;
	return parseInt(current)-1;
}

// 获取某一节点的下一个节点的索引
function nextIndex(current,parent){
	var length=parent.children.length;
	if(current== length-1) return 0;
	return parseInt(current)+1;
}

// 滚动条固定
function fixedScroll(){
	window.scrollTo(fixedScroll.left, fixedScroll.top);
}

// 跨浏览器获取innerText
function getInnerText(element){
	return (typeof element.textContent=='string')?element.textContent:element.innerText;
}

// 跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent=='string'){
		element.textContent=text;
	}else{
		element.innerText=text;
	}
	
}