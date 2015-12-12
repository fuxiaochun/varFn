/**
 * cookie.varFn
 * @author Fu Xiaochun
 * @link http://www.fuxiaochun.com
 */
function setCookie(key,value,iday){
	var oTime = new Date();
	oTime.setDate(oTime.getDate()+parseInt(iday));
	document.cookie=key+"="+escape(value)+";expires="+oTime;
}
function getCookie(key){
	var arr = document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var arrs = arr[i].split('=');
		if( arrs[0] == key ){
			return unescape(arrs[1]);
		}
	}
	return '';
}
function unsetCookie(key){
	setCookie(key,'0',-1);
}
function destroyCookie(){
	var keys=document.cookie.match(/[^ =;]+(?=\=)/g);
	for(var i=0;i<keys.length;i++){
		setCookie(keys[i],0,-1);
	}
};
