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
    // temp   ��ʱֻ���������
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
//ͨ����ǩ����ʽ��ȡElements
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
 * ȥ�����ҿո�
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
 * ��ȡscroll��left��top
 * ʹ�÷����� scroll().left;   scroll().top;
 */
function scroll(){
    if(window.pageXOffset != null){
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }else if(document.compatMode == 'CSS1Compat'){
        // ����ĵ�ģʽ�Ǳ�׼ģʽ��������<!DOCTYPE html>�ġ�
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    // û������DOCTYPE,��Ϊ����ģʽ��ֱ�ӷ���body��scrollLeft��scrollTop
    return {
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}

/**
 * ��ȡwindow��client��width��height
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
 * ��ֹð���¼�,��Ҫ�����¼�����
 */
function cancelBubble(event){
    event && event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
}
/**
 * �¼�����Ŀ������ID
 */
function targetId(event){
    return event && event.target ? event.target.id : event.srcElement.id;
}

/**
 * ��ȡ��ʽ����ֵ
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
 * �¼��󶨷���
 */
function on(obj,event,fn){
    if(obj.addEventListener){
        obj.addEventListener(event,fn);
    }else{
        obj.attachEvent('on'+event,fn);
    }
}
/* =======  ��ܽ���  ====== */