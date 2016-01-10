/**
 * share.varfn.js
 * 只提供功能的分享到组件，前台页面样式自定义，此组件是独立的，并不依赖varfn框架
 * @author Fu Xiaochun
 * @link 	www.fuxiaochun.com 		www.varfn.com
 */
(function(){
	function Share(){
		this.id = 'varfn_share_box';
		this.title = document.title;
		this.url = window.location.href;
		this.description = this.getDescription();
		this.shareBtns = {
			"vfs-weibo":{
					"text":"新浪微博",
					"url":"http://v.t.sina.com.cn/share/share.php?url="+this.url+"&title="+encodeURIComponent(this.title)
				},
			"vfs-tqq":{
					"text":"腾讯微博",
					"url":"http://v.t.qq.com/share/share.php?url="+this.url+"&title="+encodeURIComponent(this.title)
				},
			"vfs-kaixin":{
					"text":"开心网",
					"url":"http://www.kaixin001.com/repaste/share.php?rurl="+this.url+"&rcontent="+this.description+"&rtitle="+encodeURIComponent(this.title)
				},
			"vfs-douban":{
					"text":"豆瓣",
					"url":"http://www.douban.com/recommend/?url="+this.url+"&title="+encodeURIComponent(this.title)
				},
			"vfs-renren":{
					"text":"人人网",
					"url":"http://share.renren.com/share/buttonshare.do?link="+this.url+"&title="+encodeURIComponent(this.title)
				},
			"vfs-tieba":{
					"text":"百度贴吧",
					"url":"http://tieba.baidu.com/f/commit/share/openShareApi?url="+this.url+"&title="+encodeURIComponent(this.title)+"&desc="+encodeURIComponent(this.description)+"&pic="
				},
			"vfs-qq":{
					"text":"QQ好友",
					"url":"http://connect.qq.com/widget/shareqq/index.html?title="+encodeURIComponent(this.title)+"&url="+this.url+"&desc="+encodeURIComponent(this.description)+"&pics="
				},
			"vfs-qzone":{
					"text":"QQ空间",
					"url":"http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+this.url+"&title="+encodeURIComponent(this.title)+"&desc="+encodeURIComponent(this.description)
				},
			"vfs-twitter":{
					"text":"Twitter",
					"url":"http://twitter.com/home?status="+this.url+" "+encodeURIComponent(this.title)
				},
			"vfs-fb":{
					"text":"Facebook",
					"url":"http://www.facebook.com/sharer.php?u="+this.url+"&t="+encodeURIComponent(this.title)
				}
		};
	};

	Share.prototype = {
		constructor: Share,

		init: function(){
			var tags = this.getBtns();
			var dataval;
			for(var i=0;i<tags.length;i++){
				dataval = tags[i].getAttribute('data-vfsevt');
				if(dataval){
					this.bindEvents(tags[i],dataval);
				}
			}
		},
		getDescription: function(){
			var metas = document.getElementsByTagName('meta');
			for(var i=0;i<metas.length;i++){
				if('description' == metas[i].name){
					return metas[i].content;
				}
			}
		},
		getBtns: function(){
			return document.getElementById('varfn_share_box').getElementsByTagName('a');
		},
		bindEvents: function(obj,dataval){
			var self = this;
			this.on(obj,'click',function(evt){
				var e = evt || window.event;
				e.preventDefault();
				if(self.shareBtns[dataval]){
					window.open(self.shareBtns[dataval].url);
				}
			});
		},
		on: function (obj,event,fn){
			if(obj.addEventListener){
			    obj.addEventListener(event,fn);
			}else{
			    obj.attachEvent('on'+event,fn);
			}
		}
	};

	Share.prototype.constructor = Share;

	var sharebar = new Share();
	sharebar.init();

})();