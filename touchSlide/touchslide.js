/**
 * 带触摸滑动的轮播图
 * @author Fu Xiaochun
 * @link   www.fuxiaochun.com    github.com/fuxiaochun/varfn/touchSlide
 * @param  {[type]} selector [轮播图盒子选择器]
 * @param  {[type]} speed    [轮播速度，默认3s]
 */
var varfn = {
	touchslide: function (selector, speed){
		var slider = document.querySelector(selector);
		var Ul = slider.children[0];
		var lis = Ul.children;
		var lisLen = lis.length;
		var LiW = Ul.children[0].offsetWidth;  // 图片width
		var LiH = Ul.children[0].offsetHeight; // 图片height
		var Ol = slider.children[1];  // 小原点父盒子

		// ul内前后克隆图片
		Ul.insertBefore(Ul.children[lis.length-1].cloneNode(true), Ul.children[0]);
		Ul.appendChild(Ul.children[1].cloneNode(true));

		// 获取新的li个数
		var lisNewLen = Ul.children.length;

		// 设置ul高度，宽度
		Ul.style.height = LiH + 'px';
		Ul.style.width = LiW * Ul.children.length + 'px';
		Ul.style.transform = 'translateX(-'+LiW+'px)';
		Ul.style.webkitTransform = 'tanslateX(-'+LiW+'px)';

		// 设置li宽度
		for(var i=0; i<lisNewLen; i++){
			Ul.children[i].style.width = LiW + 'px';
		}

		// 添加小按钮
		for(var i=0;i<lisLen;i++){
			var oli = document.createElement('li');
			oli.index = i;
			if(!i){
				oli.className = 'on';
			}
			Ol.appendChild(oli);
		}

		//////////////////////
		//初始化结束，交互动画开始// // //
		//////////////////////

		var timer = null;
		var tspeed = '.3s';
		var speed = speed ? speed : 3000;
		var index = 1;
		var startX = 0, moveX = 0, endX = 0;
		var sTime = 0, eTime = 0;

		// 设置要变换的位置
		function setTransform(v){
			Ul.style.transform = 'translateX('+v+'px)';
			Ul.style.webkitTransform = 'translateX('+v+'px)';
		}
		// 添加动画
		function transition(s){
			Ul.style.transition = 'all '+s+' ease';
			Ul.style.webkitTransition = 'all '+s+' ease';
		}
		// 删除动画
		function removeTransition(){
			Ul.style.transition = 'none';
			Ul.style.webkitTransition = 'none';
		}

		// 给UL绑定touchstart事件，当触摸时，清除自动滑动的定时器
		Ul.addEventListener('touchstart',function(e){
			sTime = new Date().getTime();
			startX = e.touches[0].clientX;
			clearInterval(timer);
			timer = null;
		});
		// UL触摸移动，ul移动的距离和手指触摸移动的方向距离相同
		Ul.addEventListener('touchmove',function(e){
			moveX = e.touches[0].clientX - startX;
			setTransform(-index*LiW + moveX);
		});
		// 触摸结束，判断如果移动超过了盒子1/3的距离，就完成当前这一张的滑动，否则回到原位
		Ul.addEventListener('touchend',function(e){
			eTime = new Date().getTime();
			var msTime = eTime - sTime;
			endX = e.changedTouches[0].clientX;
			if(Math.abs(moveX) > (LiW / 3) && moveX != 0){
				moveX < 0 ? index++ : index--;
			}

			setTransform(-index*LiW);
			if(msTime < 300){
				transition(msTime/2+'ms');
			}
			transition(tspeed);
			radio(); // 设置小按钮效果
		});
		// UL每次滑动结束都判断一下，当前index的位置，是否是第一张或最后一张（效果上是第一张，克隆的）；
		// 如果滑到最后一张结束，则清除动画，立即把变换的位置换到第二张（效果上是第一张）；
		// 如果往前滑到第一张结束（效果上是最后一张，克隆追加的），则立即把变换的位置换到倒数第二张的位置上（效果上就是最后一张）。
		// 变换位置重置好后，重新开启定时器，自动轮播。
		Ul.addEventListener('webkitTransitionEnd',function(e){
			if(index >= lisNewLen-1){
				index = 1;
			}else if(index <= 0){
				index = lisNewLen-2;
			}
			removeTransition();
			setTransform(-LiW*index);
			if(!timer){
				timer = setInterval(animate,speed);
			}
		});

		// 定时器轮播
		clearInterval(timer);
		timer = setInterval(animate,speed);

		function animate(){
			index++;
			setTransform(-LiW*index);
			transition(tspeed);
			radio();
		}

		// 小按钮效果设置
		// ul>li比ol>li前后多一个，所以不能同步；
		// ol>li的索引要比ul>li的索引小1；
		// 如果ul-li的索引index大于等于最后一张图的索引，即克隆的第一张图的索引，radio的索引curIndex为0；
		// 如果ul-li左滑，索引为0，则索引定位到展示效果的最后一张图的位子上。
		function radio(){
			var curIndex = index-1;
			if(index >= lisNewLen-1){
				curIndex = 0;
			}else if(index < 1){
				curIndex = lisNewLen - 3;  // 犹豫ul前后都添加了克隆的li，要去掉；
			}
			for(var i=0; i<lisLen; i++){
				Ol.children[i].className = '';
			}
			Ol.children[curIndex].className = 'on';
		}

	}
};
