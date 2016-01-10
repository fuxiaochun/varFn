#分享到组件

此组件是已原生js通过面向对象封装的，不依赖框架，不带样式和图片，只提供分享按钮的功能。因此在页面中使用，分享到的按钮样式等需要自定义，在页面中写好。

写此组件也是因为之前做项目，常遇到自定义效果的分享到功能，网上的一些第三方组件又自带样式图片等，不方便。

##使用方法

需要使用的页面中，在对应的位置设置id="varfn_share_box"，id元素内放含有属性data-vfsevt='vfs-*'的a标签。因为考虑到分享的是当前的一个页面，所以直接用id来获取里面的分享到按钮。

eg:
```
<div id="varfn_share_box">
    分享到：
    <a data-vfsevt="vfs-weibo" href="#">新浪微博</a>
    <a data-vfsevt="vfs-tqq" href="#">腾讯微博</a>
    <a data-vfsevt="vfs-kaixin" href="#">开心网</a>
    <a data-vfsevt="vfs-douban" href="#">豆瓣</a>
    <a data-vfsevt="vfs-renren" href="#">人人网</a>
    <a data-vfsevt="vfs-tieba" href="#">百度贴吧</a>
    <a data-vfsevt="vfs-qq" href="#">QQ好友</a>
    <a data-vfsevt="vfs-qzone" href="#">QQ空间</a>
    <a data-vfsevt="vfs-twitter" href="#">twitter</a>
    <a data-vfsevt="vfs-fb" href="#">facebook</a>
</div>
<script type="text/javascript" src="share.varfn.js"></script>
```

目前分享到的网站就案例中的这10个，也是常用的几个。后续再改进吧。学习中。