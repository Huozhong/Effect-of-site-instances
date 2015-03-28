
var canvas = document.getElementById('canvas');
var cxt = canvas.getContext("2d");

var Brush = document.getElementById("means_Brush");
var Eraser = document.getElementById("means_Eraser");
var Paint = document.getElementById("means_Paint");
var Straw = document.getElementById("means_Straw");
var text = document.getElementById("means_text");
var Magnifier = document.getElementById("means_Magnifier");
var line = document.getElementById("shape_line");
var arc = document.getElementById("shape_arc");
var rect = document.getElementById("shape_rect");
var poly = document.getElementById("shape_poly");
var arcfill = document.getElementById("shape_arcfill");
var rectfill = document.getElementById("shape_rectfill");
var actions=[Brush,Eraser,Paint,Straw,text,Magnifier,line,arc,rect,poly,arcfill,rectfill];

var line1 = document.getElementById("linesize_line1px");
var line3 = document.getElementById("linesize_line3px");
var line5 = document.getElementById("linesize_line5px");
var line8 = document.getElementById("linesize_line8px");
var lines= [line1,line3,line5,line8];

var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var yellow = document.getElementById("yellow");
var white = document.getElementById("white");
var black = document.getElementById("black");
var pink = document.getElementById("pink");
var purple = document.getElementById("purple");
var cyan = document.getElementById("cyan");
var orange = document.getElementById("orange");
var colors=[red,green,blue,yellow,white,black,pink,purple,cyan,orange];

// 设置默认选项
drawBrush(0);
setLine(0);
setColor(black,5);

function saveImage(){
	var imagedata=canvas.toDataURL();
	var b64=imagedata.substring(22);
	var data=document.getElementById('data');
	data.value=b64;
	var form=document.getElementById('myform');
	form.submit();
}
function clearImage(){
	cxt.clearRect(0, 0, 880, 400);
}

function setStatus(Arr,num,type){//设置状态
	if(type){
		for(var i=0;i<Arr.length;i++){
			if(i==num){
				Arr[i].style.background="yellow";
			}else{
				Arr[i].style.background="#ccc";
			}
		}
	}else{
		for(var i=0;i<Arr.length;i++){
			if(i==num){
				Arr[i].style.borderColor="#fff";
			}else{
				Arr[i].style.borderColor="#000";
			}
		}
	}
	
}

function drawBrush(num){
	setStatus(actions,num,1);

	var flag=false;//检测鼠标是否按下
	canvas.onmousedown=function(e){
		e=e||window.event;
		var startX=e.pageX-this.offsetLeft;
		var startY=e.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX, startY);
		flag=true;
	}

	canvas.onmousemove=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		if(flag){
			cxt.lineTo(endX, endY);
			// cxt.closePath();
			cxt.stroke();
		}
	}

	canvas.onmouseup=function(e){
		flag=false;
	}
	canvas.onmouseout=function(e){
		flag=false;
	}
}
function drawEraser(num){
	setStatus(actions,num,1);
	var flag=false;//检测鼠标是否按下
	canvas.onmousedown=function(e){
		e=e||window.event;
		var eraserX=e.pageX-this.offsetLeft;
		var eraserY=e.pageY-this.offsetTop;
		cxt.clearRect(eraserX-cxt.lineWidth, eraserY-cxt.lineWidth, cxt.lineWidth*2, cxt.lineWidth*2);
		flag=true;
	}

	canvas.onmousemove=function(e){
		e=e||window.event;
		if(flag){
			var eraserX=e.pageX-this.offsetLeft;
			var eraserY=e.pageY-this.offsetTop;
			cxt.clearRect(eraserX-cxt.lineWidth, eraserY-cxt.lineWidth, cxt.lineWidth*2, cxt.lineWidth*2);
		}
	}

	canvas.onmouseup=function(e){
		flag=false;
	}
	canvas.onmouseout=function(e){
		flag=false;
	}
}
function drawPaint(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(e){
		e=e||window.event;
		var paintX=e.pageX-this.offsetLeft;
		var paintY=e.pageY-this.offsetTop;
		cxt.fillRect(paintX-cxt.lineWidth*6, paintY-cxt.lineWidth*6, cxt.lineWidth*12, cxt.lineWidth*12);
	};
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(e){
		e=e||window.event;
		var strawX=e.pageX-this.offsetLeft;
		var strawY=e.pageY-this.offsetTop;
		var obj=cxt.getImageData(strawX, strawY, 1, 1);
		var color='rbg('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		drawBrush(0);
	};
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawtext(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(e){
		e=e||window.event;
		var writeX=e.pageX-this.offsetLeft;
		var writeY=e.pageY-this.offsetTop;
		var text=window.prompt('请在此输入内容','文本');
		if(text!=null){
			// cxt.lineWidth=cxt.lineWidth*3;
			cxt.fillText(text, writeX, writeY);
			// cxt.lineWidth=cxt.lineWidth/3;
		}
	};
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawMagnifier(num){
	setStatus(actions,num,1);
	var scale=window.prompt('请在此输入放大的百分比','100');
	var scaleW=880*scale/100;
	var scaleH=400*scale/100;
	canvas.style.width=parseInt(scaleW)+'px';
	canvas.style.height=parseInt(scaleH)+'px';
}
function drawline(num){
	setStatus(actions,num,1);
	// var flag=false;//检测鼠标是否按下
	canvas.onmousedown=function(e){
		e=e||window.event;
		var startX=e.pageX-this.offsetLeft;
		var startY=e.pageY-this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX, startY);
		// flag=true;
	};

	canvas.onmousemove=null;
	// function(e){
	// 	e=e||window.event;
	// 	var endX=e.pageX-this.offsetLeft;
	// 	var endY=e.pageY-this.offsetTop;

	// 	if(flag){

	// 	cxt.clearRect(0, 0, 800, 400);
	// 		cxt.lineTo(endX, endY);
	// 		cxt.closePath();
	// 		cxt.stroke();
	// 	}
	// };

	canvas.onmouseup=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		cxt.lineTo(endX, endY);
		cxt.closePath();
		cxt.stroke();
		// flag=false;
	};
	canvas.onmouseout=null;
}
function drawarc(num){
	setStatus(actions,num,1);
	var arcX=null;
	var arcY=null;
	canvas.onmousedown=function(e){
		e=e||window.event;
		arcX=e.pageX-this.offsetLeft;
		arcY=e.pageY-this.offsetTop;
	};

	canvas.onmousemove=null;

	canvas.onmouseup=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		var a=endX-arcX;
		var b=endY-arcY;
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.stroke();
	};
	canvas.onmouseout=null;
}
function drawrect(num){
	setStatus(actions,num,1);
	var startX=null;
	var startY=null;
	canvas.onmousedown=function(e){
		e=e||window.event;
		startX=e.pageX-this.offsetLeft;
		startY=e.pageY-this.offsetTop;
	};

	canvas.onmousemove=null;

	canvas.onmouseup=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		var w=endX-startX;
		var h=endY-startY;
		cxt.strokeRect(startX, startY, w, h);
	};
	canvas.onmouseout=null;
}
function drawpoly(num){
	setStatus(actions,num,1);
	var polyX=null;
	var polyY=null;
	canvas.onmousedown=function(e){
		e=e||window.event;
		polyX=e.pageX-this.offsetLeft;
		polyY=e.pageY-this.offsetTop;
		cxt.moveTo(polyX, polyY);
	};

	canvas.onmousemove=null;

	canvas.onmouseup=function(e){
		e=e||window.event;
		var rbX=e.pageX-this.offsetLeft;
		var rbY=e.pageY-this.offsetTop;
		var lbX=2*polyX-rbX;
		var lbY=rbY;
		cxt.beginPath();
		cxt.lineTo(rbX, rbY);
		cxt.lineTo(lbX, lbY);
		cxt.lineTo(polyX, polyY);
		cxt.closePath();
		cxt.stroke();
	};
	canvas.onmouseout=null;
}
function drawarcfill(num){
	setStatus(actions,num,1);
	var arcX=null;
	var arcY=null;
	canvas.onmousedown=function(e){
		e=e||window.event;
		arcX=e.pageX-this.offsetLeft;
		arcY=e.pageY-this.offsetTop;
	};

	canvas.onmousemove=null;

	canvas.onmouseup=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		var a=endX-arcX;
		var b=endY-arcY;
		var c=Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX, arcY, c, 0, 360, false);
		cxt.closePath();
		cxt.fill();
	};
	canvas.onmouseout=null;
}
function drawrectfill(num){
	setStatus(actions,num,1);
	var startX=null;
	var startY=null;
	canvas.onmousedown=function(e){
		e=e||window.event;
		startX=e.pageX-this.offsetLeft;
		startY=e.pageY-this.offsetTop;
	};

	canvas.onmousemove=null;

	canvas.onmouseup=function(e){
		e=e||window.event;
		var endX=e.pageX-this.offsetLeft;
		var endY=e.pageY-this.offsetTop;
		var w=endX-startX;
		var h=endY-startY;
		cxt.fillRect(startX, startY, w, h);
	};
	canvas.onmouseout=null;
}


function setLine(num){
	setStatus(lines,num,1);
	switch(num){
		case 0:cxt.lineWidth=1;
			break;
		case 1:cxt.lineWidth=3;
			break;
		case 2:cxt.lineWidth=5;
			break;
		case 3:cxt.lineWidth=8;
			break;
		default:cxt.lineWidth=1;
	}
}

function setColor(obj,num){
	setStatus(colors,num,0);
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}