/**
 * @varFn.js
 * @author Fu Xiaochun
 * @link   www.fuxiaochun.com
 * @date   2015-11-14
 */
function $(objStr){
    var objStr = trim(objStr);
    var obj = objStr.replace(/(\s)+/g,'$1');
    var objs = obj.split(' ');
    if(objs.length == 1){
        if(!objs[0].indexOf('#')){
            return document.getElementById(objs[0].substr(1));
        }
        if(!objs[0].indexOf('.')){
            return getChildElements(objs[0]);
        }
        if(objs[0].charAt(0) != '#' && objs[0].charAt(0) != '.'){
            return document.getElementsByTagName(objs[0]);
        }
    }
    // temp   暂时只有两级深度
    // $('#box .class') or $('.box li')
    if(objs.length == 2){
        if(!objs[0].indexOf('#')){
            var tempObj = document.getElementById(objs[0]);
            return getChildElements(objs[1],tempObj);
        }
        if(!objs[0].indexOf('.')){
            var objClassSet = getChildElements(objs[0]);
            var tempClassChilds = [];
            var objClassChilds = [];
            for(var i= 0,len=objClassSet.length; i<len; i++){
                tempClassChilds = getChildElements(objs[1],objClassSet[i]);
                for(var j= 0,jlen=tempClassChilds.length; j<jlen; j++){
                    objClassChilds.push(tempClassChilds[j]);
                }
            }
            return objClassChilds;
        }
        if(objs[0].charAt(0)!='#' && objs[0].charAt(0)!='.'){
            var objClassSet = getChildElements(objs[0]);
            var tempClassChilds = [];
            var objClassChilds = [];
            for(var i= 0,len=objClassSet.length; i<len; i++){
                tempClassChilds = getChildElements(objs[1],objClassSet[i]);
                for(var j= 0,jlen=tempClassChilds.length; j<jlen; j++){
                    objClassChilds.push(tempClassChilds[j]);
                }
            }
            return objClassChilds;
        }
    }
    // go on. for $('#box .class li a');

}
//通过标签或样式获取Elements
function getChildElements(classtag, parentObj){
    if(classtag.charAt(0)=='.'){
        classtag = classtag.substr(1);
        if(document.getElementsByClassName){
            if(parentObj){
                return parentObj.getElementsByClassName(classtag);
            }else{
                return document.body.getElementsByClassName(classtag);
            }
        }
        var objsByClass = [];
        var dom = null;
        if(parentObj){
            dom = parentObj.getElementsByTagName('*');
            return ieGetsClass();
        }else{
            dom = document.body.getElementsByTagName('*');
            return ieGetsClass();
        }
        function ieGetsClass(){
            for(var i= 0,len=dom.length; i<len; i++){
                var classArr = dom[i].className.split(' ');
                for(var j= 0,jlen=classArr.length; j<jlen; j++){
                    if(classArr[j] == classtag){
                        objsByClass.push(dom[i]);
                    }
                    break;
                }
            }
            return objsByClass;
        }
    }else{
        if(parentObj){
            return parentObj.getElementsByTagName(classtag);
        }else{
            return document.getElementsByTagName(classtag);
        }
    }

}

/**
 * 去除左右空格
 */
function ltrim(str){
    return str.replace(/^(\s+)/,'');
}
function rtrim(str){
    return str.replace(/(\s+)$/,'');
}
function trim(str){
    return str.replace(/^\s+|\s+$/g,'');
}

/**
 * 获取scroll的left和top
 * 使用方法： scroll().left;   scroll().top;
 */
function scroll(){
    if(window.pageXOffset != null){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){
        // 如果文档模式是标准模式，设置了<!DOCTYPE html>的。
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    // 没有设置DOCTYPE,则为怪异模式，直接返回body的scrollLeft或scrollTop
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

/**
 * 获取window的client的width和height
 */
function client(){
    if(window.innerWidth != null){
        return {
            width : window.innerWidth,
            height : window.innerHeight
        }
    }else if(document.compatMode === 'CSS1Compat'){
        return {
            width : document.documentElement.clientWidth,
            height : document.documentElement.clientHeight
        }
    }
    return {
        width : document.body.clientWidth,
        height : document.body.clientHeight
    }
}

/**
 * 阻止冒泡事件,需要传入事件参数
 */
function cancelBubble(event){
    event && event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}
/**
 * 事件传入目标对象的ID
 */
function targetId(event){
    return event && event.target ? event.target.id : event.srcElement.id;
}

/**
 * 获取样式属性值
 */
function getStyle(obj,cssAttr){
    if(obj.currentStyle){
        return obj.currentStyle[cssAttr];
    }else{
        return window.getComputedStyle(obj,null)[cssAttr];
    }
    return null;
}

/**
 * 事件绑定方法
 */
function on(obj,event,fn){
    if(obj.addEventListener){
        obj.addEventListener(event,fn);
    }else{
        obj.attachEvent('on'+event,fn);
    }
}
/* =======  框架结束  ====== */