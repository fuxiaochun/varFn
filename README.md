
这里是我自己写的一些js库。

#varfn.js

varFn 是学习原生js框架的累积，从一个个var的function开始，封装常用的方法，后期将改成面向对象版，并优化。形成自己的js框架。

#ajax.varfn.js

仿jQuery封装的ajax框架。
$.get(url, data, fn, type);
$.post(url, data, fn, type);

#cookie.varfn.js

封装了cookie相关操作的js库。
setCookie(key,value,iday); // 设置cookie
getCookie(key); // 获取cookie
unsetCookie(key);  // 删除cookie
