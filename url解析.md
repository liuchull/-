###  1.解析输入的url地址
> http://www.zhufengpeixun.cn:80/index.html?lx=teacher#video


- 传输协议（把信息在客户端和服务器端进行交换，类似于快递小哥）
  + http 超文本传输协议（传输的内除了文本，还有可能使其他类型，二进制编码，base64码，文件流等等）
  + https 比http更加安全的传输协议（传输通道设置加密算法ssl），一般支付类网站都是https协议
  + ftp 资源上传协议，一般应用于把本地文件直接上传到服务器端


  —域名  zhufengpeixun.cn
   + 一级域名 www.zhufengpeixun.cn
   + 二级域名 video。zhufengpeixun.cn
   + 三级域名 webG.video.zhufengpeixun.cn
   + 常用域名性质：.com国际/ .cn中国 /.gov政府 /.org官方 /.net系统


  —端口号（根据端口号，找到当前服务器上指定的服务）
   + 0~65535之间
   + 不同协议有自己默认的端口号（我们自己不写，浏览器会帮我们加上）
   + http => 80
   + https => 443
   + ftp => 21
   + 除了这几个在书写的时候可以省略，其余的不能盛

  — 请求资源的路径和名称
   + /stu/index.html
      + 一般情况下，如果我们访问的是index.html等，可以省略不写（因为服务器般会设置index.html为默认文档，当然可以自定义）
    + 伪url
       + seo优化 https://item.jd.com/100006038463.html(搜索引擎抓取)
       + 数据请求的接口地址   /users/list

    静态地址
    https://item.jd.com/100006038463.html(搜索引擎抓取)

    动态页面地址，真实地址
    https://item.jd.com/detail.php?id=100006048463 需要把这样的地址重写为上述的静态地址（url伪重写技术）    

   - 问号传参部分 ？xxx=xxx
     + 客户端基于get系列请求，把信息传递会给服务器，一般都会基于问号传参的模式
     + 页面之间跳转，信息的一些通信也可以基于问号传参的方式(单页面组件和组件跳转之间的信息通信，也可能基于问号传参)
     https：//sports.qq.com/kbswev/game.htm?mid=10000:54431210
     https：//sports.qq.com/kbswev/game.htm?mid=10000:54431209
     + 关于传递的内容需要进行编码处理（处理特殊字符和中文）
      + encodeURI/decodeURI(只能把空格和中国文字进行编码和解码，所以一般这种应用这种模式处理整个URL的编码)
      + encodeURIcomponent / decodeURIcomponent（汇报所有的特殊字符和汉字都进行编码，一般不会整个url编码，只会给传递的每一个参数值单独编码）
      + secape / unescape（这种方式不一定所有的后台都有，所以一般只应用于客户端自己内部编码，例如：储存cookie信息，把存储的中文进行编码和解码）
         console.log(escape("珠峰培训"))
      +...
      let str = "http://www.zhufengpeixun.cn:80/index.html?lx=teacher#video"
      console.log(encodeURI(str))