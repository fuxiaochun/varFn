/**
 * Ajax.varFn
 * @author Fu Xiaochun
 * @{@link  http://www.fuxiaochun.com}
 */
 (function(){

	 //getElementById
    var $ = function(id){
        return document.getElementById(id);
    }

	//创建ajax对象
    $.init = function(){
        try{ return new XMLHttpRequest() }catch(e){};
        try{ return new ActiveXObject('Microsoft.XMLHTTP') }catch(e){};
        console.log('Error');
    };

	/**
	 * get 方法
	 * @param  {[str]}   url  get请求地址
	 * @param  {[str]}   data get提交的数据
	 * @param  {Function} fn   ajax执行成功结束后回调函数
	 * @param  {[str]}   type ajax返回数据的格式
	 */
	$.get = function(url, data, fn, type){
		var xhr = $.init();
		var type = type || 'text';
		if(data != null){
			url = url+'?'+data;
		}
		xhr.open('get', url);
		xhr.setRequestHeader('If-Modified-Since', '0');
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				if(type == 'text'){
					fn(xhr.responseText);
				}
				if(type == 'xml'){
					fn(xhr.responseXML);
				}
				if(type == 'json'){
					fn(eval( '('+xhr.responseText+')'));
				}
			}
		}
		xhr.send(null);
	}

	/**
	 * post 方法
	 * @param  {[str]}   url  post请求地址
	 * @param  {[str]}   data post提交的数据
	 * @param  {Function} fn   ajax执行成功结束后回调函数
	 * @param  {[str]}   type ajax返回数据的格式
	 */
	$.post = function(url, data, fn, type){
		var xhr = $.init();
		var type = type || 'text';
		xhr.open('post', url);
		xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4 && xhr.status == 200){
				if(type == 'text'){
					fn(xhr.responseText);
				}
				if(type == 'xml'){
					fn(xhr.responseXML);
				}
				if(type == 'json'){
					fn(eval( '('+xhr.responseText+')'));
				}
			}
		}
		xhr.send(data);
	}

    window.$ = $;
 })();