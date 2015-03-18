/*// 对象式通过ID、name、tagname获取元素
var Base={
	getId:function(id){
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElementsByName(name);
	},
	getTagName:function(tag){
		return document.getElementsByTagName(tag);
	}
};
*/





// 实现连缀
//创建一个匿名函数实现每次调用都创建一个新的Base对象,前台调用
var $ =function(args)
{
	return new Base(args);
}; 
// 创建一个类 CSS选择器
function Base(args){
	//创建一个数组存储所获取的节点或者节点数组
	this.elements=[];

	if(typeof args == 'string'){
		// CSS模拟
		if(args.indexOf(' ')!=-1){
			var elements=args.split(' ');//将节点拆分 
			var childElements=[];//临时数组，避免覆盖
			var node=[];//存放父节点
			for(var i=0;i<elements.length;i++)
			{
				if(node.length==0) node.push(document);//如果没有父节点，那父节点就是document
				switch(elements[i].charAt(0))
				{
					case '#':
						childElements=[];//清理临时节点数组
						var temps=this.getId(elements[i].substring(1));
						for(var j=0;j<temps.length;j++)
						{
							childElements.push(temps[j]);
						}
						
						node=childElements;//保存父节点
						break;
					case '.':
						childElements=[];//清理临时节点数组
						for(var j=0;j<node.length;j++)
						{
							var temps=this.getClass(elements[i].substring(1),node[j]);
							for(var k=0;k<temps.length;k++)
							{
								childElements.push(temps[k]);
							}
						}
						node=childElements;//保存父节点
						break;
					default:
						childElements=[];//清理临时节点数组
						for(var j=0;j<node.length;j++)
						{
							var temps=this.getTags(elements[i],node[j]);
							for(var k=0;k<temps.length;k++)
							{
								childElements.push(temps[k]);
							}
						}
						node=childElements;//保存父节点
						break;
				}
			}
			this.elements=childElements;

		}else{
			// find模拟
			switch(args.charAt(0)){
				case '#':
					this.elements=this.getId(args.substring(1));

					break;
				case '.':
					this.elements=this.getClass(args.substring(1));
					break;
				default:
					this.elements=this.getTags(args);
					break;
			}
		
		}
	}else if(typeof args=='object'){
		if(args!=undefined){
			this.elements[0]=args;
		}
	}else if(typeof args=='function'){
		this.ready(args);
	}
}
//加载DOM
Base.prototype.ready=function(fn){
	addDomLoaded(fn);
};

// 寻找已获取元素的子节点
Base.prototype.find=function(str){
	var childElements=[];
	for(var i =0; i<this.elements.length;i++){
		switch(str.charAt(0)){
			case '#':
				var temps=this.getId(str.substring(1));
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
			case '.':
				/*var tags=this.elements[i].getElementsByTagName('*');
				for(var j=0;j<tags.length;j++){
					if(tags[j].className==str.substring(1)){
						childElements.push(tags[j]);
					}
				}*/

				var temps=this.getClass(str.substring(1),this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
			default:
				/*var tags=this.elements[i].getElementsByTagName(str);
				for(var j=0;j<tags.length;j++){
					childElements.push(tags[j]);
				}*/
				var temps=this.getTags(str,this.elements[i]);
				for(var j=0;j<temps.length;j++){
					childElements.push(temps[j]);
				}
				break;
		}
	}
	this.elements=childElements;
	return this;
};

//获取ID节点
	Base.prototype.getId=function(id){
		var temps=[];
		temps.push(document.getElementById(id));
		return temps;
	};

	//获取元素节点
	Base.prototype.getTags=function(tag,parentName){
		var temps=[];
		var node=null;
		if(parentName!=undefined){
			node=parentName;
		}else{
			node=document;
		}
		var tags=node.getElementsByTagName(tag);
		for(var i=0;i<tags.length;i++){
			temps.push(tags[i]);
		}
		return temps;
	};

	//获取className元素
	Base.prototype.getClass=function(className,parentName){
		var temps=[];
		var node=null;
		if(parentName!=undefined){
			node=parentName;
		}else{
			node=document;
		}
		var all=node.getElementsByTagName('*');
		for(var i=0;i<all.length;i++){
			// if(all[i].className==className)
			if((new RegExp('(\\s|^)'+className+'(\\s|$)')).test(all[i].className))
			{
				temps.push(all[i]);
			}
		}

		return temps;
	};

// 添加Base修改CSS方法  需要加prototype 
Base.prototype.css=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			//return this.elements[i].style[attr];		//这种智能获取行内和内联样式，不能获取链接样式
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr]=value;
	}
	return this;
};

// 添加Base修改innerhtml方法  需要加prototype 
Base.prototype.html=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML=str;
	}
	return this;
};

// // 添加Base修改innerTest方法  需要加prototype 
Base.prototype.text=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i],str);
	}
	return this;
};

// 添加Base修改click方法  需要加prototype 
Base.prototype.click=function(fn){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].onclick=fn;
	}
	return this;
};

// 获取集合后再获取其中的某一个元素,返回该节点对象
Base.prototype.ge=function(num){
	return this.elements[num];
};

// 获取集合后再获取其中的某一个元素,返回Base
Base.prototype.eq=function(num){
	var element=this.elements[num];
	this.elements=[];
	this.elements[0]=element;
	return this;
};

// 获取集合后再获取其中的第一个元素,返回该节点对象
Base.prototype.first=function(){
	return this.elements[0];
};

// 获取集合后再获取其中的最后一个元素,返回该节点对象
Base.prototype.last=function(){
	return this.elements[this.elements.length-1];
};

// 获取当前节点的下一个元素节点
Base.prototype.next=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].nextSibling;
		if(this.elements[i]==null) throw new Error('找不到下一个同级元素节点!');
		if(this.elements[i].nodeType==3) this.next();
	}
	return this;
};

// 获取当前节点的上一个元素节点
Base.prototype.prev=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i].previousSibling;
		if(this.elements[i]==null) throw new Error('找不到上一个同级元素节点!');
		if(this.elements[i].nodeType==3) this.prev();
	}
	return this;
};


// 给元素添加class
Base.prototype.addClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(!this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className+=' '+className;
		}
	}
	return this;
};

// 给元素移除class
Base.prototype.removeClass=function(className){
	for(var i=0;i<this.elements.length;i++){
		if(this.elements[i].className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))){
			this.elements[i].className=this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
};

// 添加link或者style的CSS规则
Base.prototype.addRule=function(num,selectorText,cssText,position){
	var sheet=document.styleSheets[num];//确定添加规则的位置  哪一个link或者style
	if(typeof sheet.insertRule!='undefined'){//W3C
		sheet.insertRule(selectorText+'{'+cssText+'}',position);
	}else if(typeof sheet.addRule!='undefined'){//IE
		sheet.addRule(selectorText,cssText,position);
	}
	return this;
};

// 移除link或者style的CSS规则
Base.prototype.deleteRule=function(num,position){
	var sheet=document.styleSheets[num];//确定添加规则的位置  哪一个link或者style
	if(typeof sheet.insertRule!='undefined'){//W3C
		sheet.deleteRule(position);
	}else if(typeof sheet.addRule!='undefined'){//IE
		sheet.removeRule(position);
	}
	return this;
};

// 鼠标移入移出方法
Base.prototype.hover=function(over,out){
	for(var i=0;i<this.elements.length;i++){
		// this.elements[i].onmouseover=over;
		// this.elements[i].onmouseout=out;
		addEvent(this.elements[i], 'mouseover', over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};

// 显示方法
Base.prototype.show=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='block';
	}
	return this;
};

// 隐藏方法
Base.prototype.hide=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
	}
	return this;
};

// 设置居中
Base.prototype.center=function(width,height){
	var top=(document.documentElement.clientHeight-height)/2+getScroll().top;
	var left=(document.documentElement.clientWidth-width)/2+getScroll().left;
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.top=top+'px';
		this.elements[i].style.left=left+'px';
	}
	return this;
};

// 触发窗口resize事件
Base.prototype.resize=function(fn){
	for(var i=0; i<this.elements.length;i++){
		var element=this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			if(element.offsetLeft>getInner().width+getScroll().left-element.offsetWidth){
				element.style.left=getInner().width+getScroll().left-element.offsetWidth+'px';
			if(element.offsetLeft<=getScroll().left)
				element.offsetLeft=getScroll().left;
			}
			if(element.offsetTop>getInner().height+getScroll().top-element.offsetHeight){
				element.style.top=getInner().height+getScroll().top-element.offsetHeight+'px';
				if(element.offsetTop<=getScroll().top)
					element.offsetTop=getScroll().top;
			}

		});
	}
	return this;
};

// 锁屏事件
Base.prototype.lock=function(){
	for(var i=0;i<this.elements.length;i++){
		fixedScroll.left=getScroll().left;
		fixedScroll.top=getScroll().top;
		this.elements[i].style.height=getInner().height+getScroll().top+'px';
		this.elements[i].style.width=getInner().width+getScroll().left+'px';
		this.elements[i].style.display='block';
		parseFloat(sys.firefox)<4? document.documentElement.style.overflow='hidden':document.documentElement.style.overflow='hidden';
		addEvent(this.elements[i],'mousedown',preDef);		
		addEvent(this.elements[i],'mouseup',preDef);		
		addEvent(this.elements[i],'selectstart',preDef);	
		addEvent(window,'scroll',fixedScroll);	
	}
	return this;
};

// 解锁屏幕事件
Base.prototype.unlock=function(){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.display='none';
		parseFloat(sys.firefox)<4? document.documentElement.style.overflow='auto':document.documentElement.style.overflow='auto';
		removeEvent(this.elements[i],'mousedown',preDef);		
		removeEvent(this.elements[i],'mouseup',preDef);		
		removeEvent(this.elements[i],'selectstart',preDef);
		removeEvent(window,'scroll',fixedScroll);
	}
	return this;
};

// 插件入口
Base.prototype.extend=function(name,fn){
	Base.prototype[name]=fn;
};

// 简单动画的实现
Base.prototype.animate=function(obj){
	for(var i=0;i<this.elements.length;i++){
		var element=this.elements[i];
		var attr=obj['attr']=='x'?'left':obj['attr']=='y'?'top':
				 obj['attr']=='w'?'width':obj['attr']=='h'?'height':
				 obj['attr']=='o'?'opacity':obj['attr']!=undefined?obj['attr']:'left';
		var start=obj['start']!=undefined?obj['start']:
				  obj['attr']=='opacity'?parseFloat(getStyle(element,attr))*100:
				  				parseInt(getStyle(element,attr));
		var alter=obj['alter'];//必选参数
		var target=obj['target'];//必选参数
		var step=obj['step']!=undefined?obj['step']:10;
		var speed=obj['speed']!=undefined?obj['speed']:6;
		var type=obj['type']==0?'constant':obj['type']==1?'buffer':'buffer';
		var mul=obj['mul'];
		var t=obj['t']!=undefined?obj['t']:50;

		if(alter!=undefined&&target==undefined){
			target=alter+start;
		}else if(alter==undefined&&target==undefined&&mul==undefined){
			throw new Error('alter 增量或 target 目标量或者 mul 同步动画必须传一个！');
		}
		if(start>target) step=-step;
		if(attr=='opacity'){
			element.style.opacity=parseInt(start)/100;
			element.style.filter='alpha(opacity='+start+')';
		}else{
			element.style[attr]=start+'px';
		}

		if(mul==undefined){
			mul={};
			mul[attr]=target;
		}
		clearInterval(element.timer);
		element.timer=setInterval(function(){

			var flag=true;
			// var left=parseInt(getStyle(element,attr));
			for(var i in mul){
				attr=i;
				target=mul[i];
				if(type=='buffer'){
					if(attr=='opacity'){
						step=(target-parseFloat(getStyle(element,attr))*100)/speed;
						step=step>0?Math.ceil(step):Math.floor(step);
					}else{
						step=(target-parseInt(getStyle(element,attr)))/speed;
						step=step>0?Math.ceil(step):Math.floor(step);
					}
				}


				if (attr=='opacity') {
					var temp=parseFloat(getStyle(element,attr))*100;
					if(step==0){
						setOpacity();
					}else if(step>0 && Math.abs(parseFloat(getStyle(element,attr))*100-target)<=step)
					{
						setOpacity();
					}else if(step<0 && parseFloat(getStyle(element,attr))*100-target<=Math.abs(step))
					{
						setOpacity();
					}else{
						element.style.opacity=parseInt(temp+step)/100;
						element.style.filter='alpha(opacity='+parseInt(temp+step)+')';
					}

					if(parseInt(target)!=parseInt(parseFloat(getStyle(element,attr))*100)) 
						flag=false;
				} else{
					if(step==0){
						setTarget();
					}else if(step>0 && Math.abs(parseInt(getStyle(element,attr))-target)<=step)
					{
						setTarget();
					}else if(step<0 && parseInt(getStyle(element,attr))-target<=Math.abs(step))
					{
						setTarget();
					}else{
						element.style[attr]=parseInt(getStyle(element,attr))+step+'px';
					}

					if(parseInt(target)!=parseInt(getStyle(element,attr))) 
						flag=false;
				}
			}

			if(flag)
			{
				clearInterval(element.timer);
				if(obj.fn){
					obj.fn();
				}
			}
		},t);

		function setTarget(){
			element.style[attr]=target+'px';
		}

		function setOpacity(){
			element.style.opacity=parseInt(target)/100;
			element.style.filter='alpha(opacity='+parseInt(target)+')';
		}
	}
	return this;
};

// 设置点击切换方法
Base.prototype.toggle=function(){
	for(var i=0;i<this.elements.length;i++){
		var args=arguments;
		(function(element,args){
			var count=0;
			addEvent(element,'click',function(){
				args[count++ % args.length].call(this);
			});	
		})(this.elements[i],args);
	}
	return this;
};

// 设置事件发生器
Base.prototype.bind=function(event,fn){
	for(var i =0;i<this.elements.length;i++){
		addEvent(this.elements[i],event,fn);
	}
	return this;
};

// 设置表单字段元素
Base.prototype.form=function(name){
	for(var i =0;i<this.elements.length;i++){
		this.elements[i]=this.elements[i][name];
	}
	return this;
};

// 添加Base修改innerhtml方法  需要加prototype 
Base.prototype.value=function(str){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==0){
			return this.elements[i].value;
		}
		this.elements[i].value=str;
	}
	return this;
};

//获取某一元素的属性
Base.prototype.attr=function(attr,value){
	for(var i=0;i<this.elements.length;i++){
		if(arguments.length==1){
			return this.elements[i].getAttribute(attr);
		}else{
			this.elements[i].setAttribute(attr, value);
		}
	}
	return this;
}

// 获取索引
Base.prototype.index=function(){
	var children=this.elements[0].parentNode.children;
	for(var i=0;i<children.length;i++){
		if(this.elements[0]==children[i]) return i;
	}
}

Base.prototype.length=function(){
	return this.elements.length;
}

// 设置节点的透明度
Base.prototype.opacity=function(num){
	for(var i=0;i<this.elements.length;i++){
		this.elements[i].style.opacity=num/100;
		this.elements[i].style.filter='alpha(opacity='+num+')';
	}
	return this;
}
