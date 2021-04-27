//我们把写好的方法扩展到内置的window。alert上/
//1.alert(你好世界)；=》弹出提升框，可以关闭，3秒后自动消失//
//2.alert（你好世界）=》支持自定义配置项  title：“系统温馨提示”，控制标题的提示内容 
// confirm:false,是否显示确认和取消按钮 handled:null 再点击确认、取消、按钮x的时候，触发的回调函数





window.alert = (function () {
    //Dialog:模态框类（每一个模态框都是创建这个类的实例）
    class all {
        constructor(content,options){
            this.content = content;
            this.options = options;
            //初始化
            this.init();

        }
         //创建元素
    create(type,cssText) {
        let element = document.createElement(type);
        element.style.cssText = cssText;
        return element;


    }
    createElement(){
        this.$all = this.create("div",`
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9998;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .8);
        user-select: none;
        opacity:0;

        transition: opacity .3s;
        `);
        this.$main = this.create("div",`
        position: absolute;
        top: 100px;
        left: 50%;
        margin-left: -200px;
        z-index: 9999;
        width: 400px;
        background: #fff;
        border-radius: 3px;
        overflow: hidden;
        transition: transform .3s;
        transform:translateY(-1000px);
       
        
        
        `);
        this.$header = this.create("div",`
        position: relative;
            box-sizing: border-box;
            padding: 0px 10px;
            height: 40px;
            line-height: 40px;
            background-color: skyblue;
            cursor: move;  
        
        
        `);
        this.$title = this.create("h3",`
        font-size: 18px;
            color: rgba(255, 255, 255, 0.5);
            font-weight: normal;
            margin: 0;
            padding: 0;


        
        `);
        this.$close = this.create("i",`
        position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            font: normal;
            color: snow;
            font-family: 'Courier New';
            cursor: pointer;
        
        `);
        this.$body = this.create("div",`
        padding: 30px 10px;
            line-height: 30px;
            font-size: 16px;

        
        `);
        this.$footer = this.create("div",`
        text-align: right;
            padding: 10px 10px;
            border-top: 1px solid #eee;

        `);
        this.$confirm = this.create("button",` margin: 0 5px;
        padding: 0 15px;
        height: 28px;
        line-height: 28px;
        border: none;
        font-size: 14px;
        cursor: pointer;
        color: #000;
        background: #2299ee;
        `);
        this.$cancel = this.create("button",`
        padding: 0 15px;
        height: 28px;
        line-height: 28px;
        border: none;
        font-size: 14px;
        cursor: pointer;
        color: #000;
        background-color: #ddd;

        
        `);
    //把创建的元素按照层级合成（从里向外合成）
    let {
      title,
      confirm} = this.options;
     this.$title.innerHTML = title;
     this.$close.innerHTML =  'X';
     this.$header.appendChild(this.$title);
     this.$header.appendChild(this.$close);
     this.$body.innerHTML = this.content;
     this.$main.appendChild(this.$header);
     this.$main.appendChild(this.$body);
     if (confirm){
        //显示底部确定和取消按钮
        this.$confirm.innerHTML = "确定";
        this.$cancel.innerHTML = "取消";
        this.$footer.appendChild(this.$confirm);
        this.$footer.appendChild(this.$cancel);
        this.$main.appendChild(this.$footer);
    }
    this.$all.appendChild(this.$main);
    document.body.appendChild(this.$all);
    }
    //显示模态框
    show(){
     this.$all.style.opacity = 1;
     this.$main.style.transform = "translateY(0)";
     // 如果没有确定和取消按钮，让其显示3000ms消失
    if (!this.options.confirm){
       this.$timer = setTimeout(()=>{
           this.hide();
           clearTimeout(this.$timer);
       },3000);
    
    }
}
    //隐藏模态框
    hide(lx = "cancel"){
      this.$main.style.transform = "translateY(-1000px)";
      this.$all.style.opacity = 0;
      let fn = () =>{
           //移除创建的元素
           document.body.removeChild(this.$all);
           //触发handled回调函数执行
           if(typeof this.options.handled === "function"){
               this.options.handled.call(this,lx);
           }
           //当前方法只绑定一次
           this.$all.addEventListener("transitionend",fn);
      };
      this.$all.addEventListener("transitionend",fn);
    }
    //拖拽实现
     down(ev) {
        this.startX = ev.clientX;
        this.startY = ev.clientY;
        this.startT = this.$main.offsetTop;
        this.startL = this.$main.offsetLeft;
        this._MOVE = this.move.bind(this);
        this._UP = this.up.bind(this);
        document.addEventListener("mousemove", this._MOVE);
        document.addEventListener("mouseup", this._UP);


    }

     move(ev) {
        let curL = ev.clientX - this.startX + this.startL,
            curT = ev.clientY - this.startY + this.startT;
        let minL = 0,
            minT = 0,
            maxL = this.$all.offsetWidth - this.$main.offsetWidth,
            maxT = this.$all.offsetHeight - this.$main.offsetHeight;
        curL = curL < minL ? minL : (curL > maxL ? maxL : curL);
        curT = curT < minT ? minT : (curT > maxT ? maxT : curT);



        this.$main.style.left = curL + "px";
        this.$main.style.top = curT + "px";
        this.$main.style.marginLeft = 0;

    }

     up(ev) {
        document.removeEventListener("mousemove", this._MOVE);
        document.removeEventListener("mouseup", this._UP);

    }
    //执行init可以创建元素，让其显示，并且实现对应的逻辑操作
    init(){
     this.createElement();
     this.$all.offsetWidth;
     this.show();
     //基于事件委托实现关闭/确定/取消按钮的点击操作
     this.$all.addEventListener("click",ev => {
     let target = ev.target;
     if(/^(button|I)$/i.test(target.tagName)){
         //取消自动消失
        clearTimeout(this.$timer);
        this.hide(target.innerHTML === "确定"? "confirm":"cancel");
     } 
  


     });

     //实现拖拽效果
    this.$header.addEventListener("mousedown",this.down.bind(this)) ;

    
    }
   
    }

    //proxy: 就是alert执行的函数
    //=>插件封装的时候，如果需 要传递多个配置项，我们一般都让其传递一个对象，而不市单独一项项让其传递，这样处理的好处，不需要考虑是否必传以及传递信息的顺序了，方便后期的扩展和升级
    return function proxy(content,options={}){
        //传参验证
        if(typeof content === "undefined"){
            throw new Error("错误：提示内容必须传递！");
        }
        if(options === null||typeof options !=="object"){
            throw new Error("错误：参数配置必须是一个对象");

        }
    let _default = {
        title:"系统温馨提示",
        confirm:false,
        handled:null
    };
    for(let key in _default){
        if(!_default.hasOwnProperty(key)) break;
        _default[key] = options[key];

    }
    //参数默认值和替换（object.assign合并对象对象）
    options = Object.assign({
        title:"系统温馨提示",
        confirm:false,
        handled:null

    },options);    


    return new all(content,options);
    

    }
})();




