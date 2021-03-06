/* 
发送Ajax请求有四步操作
   1.创建一个xhr对象
      + 不兼容xmlHTTPrequest的浏览器使用activeXObject创建
   2.打开请求连接（配置请求信息）
      + xhr.open（{method}，{url}，{async}，{user-name}，{use-pass}）
      + {method}请求方式
        +get系列：从服务器获取
        +post系列：向服务器发送信息
      + {async}是否为异步请求，默认是true，也就是异步，设置为false代表当前请求任务
      +{user-name}+{user-pass}向服务器发送请求所携带的用户名密码，只有再服务器设置了安全来宾账号的情况下需要（一般不用）
    3.监听请求状态，在不同状态中做不同的事情
    4.发送ajax请求（ajax任务开始，知道响应主体信息返回{ajax状态为4}代表当前任务结束）



    GET系列 vs post系列
      +不管是哪一种请求方式，客户端都可以把信息传递给服务器，服务器也可以把信息返回给客户端，只不过get偏向于拿（给少拿多），而post偏向于给（给的多拿的少）
      +{get系列}：get/head（只获取响应头的信息，不获取响应主体内容）/delete（删除，一般代指删除服务器上指定的文件）/options（试探性的请求，再cross跨域请求中，所有正常请求发送前，先发送一个试探请求，验证是否可以和服务器正常的建立连接）
      +{post系列}：post/put（新增，一般代指向服务器中新增文件）

     +基于get向服务器发送请求，传递给服务器的方式
      +基于请求头传递给服务器（比如想把本地的cookie信息传递给服务器）
      +请求url地址后面的问号传参（主要方式） xhr.open（"get","./data.json?id=2&lx=0")
     +基于post向服务器发送请求，传递给服务器的方式：
      +基于请求头传递给服务器
      +基于请求主体，把信息传递给服务器（主要方式）  xhr.open("post","./data.json");xhr.send(data);

      1.get请求传递给服务器的信息有大小的限制（因为它是基于地址问号传参方式传递信息，而url有长度的限制，ie浏览器只有2kb大小。。）而post请求理论上是没有大小限制的（事迹操作中也会给与限制）
      2.get请求相对post请求来说不太安全，也是因为传参是基于地址栏问好传参，会被别人基于url劫持的方式把信息获取到。。。所以真实项目中，涉及到安全的信息（例如：密码等）都是基于post方式传递的（互联网面前没有绝对的安全，我们需要更多的处理安全性）
      3.get请求容易产生缓存，原因是因为get是基于问号传参传递信息的，浏览器再每一次获取数据后，一般会缓存一下数据，下一次如果请求的地址和参数和上次一样，浏览器直接获取缓存中的数据，所以我们基于get发送请求，需要清楚缓存的时候，一般都会在地址栏中添加一个随机数
        xhr.open("get","./data.json?lx=1&name=zhufeng&_="+math.random()))

       
     +传递给服务器的数据格式：
      +application/x-www-form-urlencoded:xxx=xxx&xxx=xxx(最常用的方式，字符串)
      +multipart/form-data(也很常用，例如：表单提交或者文件上传)（对象）
      +raw（可以上传text，json，xml，html等格式的文本，富文本编辑器中的内容可以基于这种格式传递）
      +binary（上传二进制数据或者编码格式的数据） 




      ### 状态码：ajax状态码/服务器返回的http网络状态码（代表了服务器返回信息的状态）
        +{2开头的基本都是代表成功}
         +200 ok 正常返回数据
         
        +{3开头的一般也是成功了，只不过中间做了一些额外处理}
         +301 moved permanently 永久性转移/重定向   一般应用于网站域名更换，访问老域名，永久都跳转到新的域名上
         + 302 move temporarily 临时转移
         + 307 temporary redirect 临时重定向 一般应用于服务器的负载均衡
         +304 not modified 读取的是缓存中的数据  这个是客户端和服务器共建的协商缓存（把不经常更新，请求过的资源文件做缓存，后期再访问这些资源直接走缓存数据，除非服务器端更新了此资源，或者客户端强制清缓存刷新等）

        +{4开头的都是失败：失败的原因一啊不能都是客户端的原因}
          + 400 bad request 请求参数错误
          + 401 unauthorized 无权限访问
          + 404 not found 地址错误
          + 405 method not allowed 当前请求的方式服务器不支持

        + {5开头的都是失败，失败的原因一般都是服务器问题}
        +500 internal server error 未知服务器错误
        + 503 service unavailable 服务器超负荷


     +真实项目中，后天开发者可能不是按照这个规则来进行处理的，不管传参或者权限是否正确等，只要服务器接收到请求最后都返给200，在返回的json数据中，基于某一个字段（例如：code）来表示错误信息   
         {
          code：0，0成功 1无权限 2参数错误 3服务器错误。。。
           message:"" 当前状态的具体描述
         }
         







*/


let xhr = new XMLHttpRequest;
 xhr.open("get","./data.json")
 //xhr.timeout = 100 设置事件
 //xhr.withCredentials=true;跨域资源中，允许携带资源凭证
 //xhr.abort（）强制中断Ajax的请求
 //xhr.set requestHeader（）设置请求头信息（属性值不能是中文值和特殊字符）
