window.alert = (function (){
    class all{
     constructor(content ,options){
         this.content = content;
         this.options = options;
         this.init();
    }
    create(type,cssText){
        let element = document.createElement(type);
        element.style.cssText=cssText;
        return element;


    }
    createElement(){
      this.$all = this.create("div",` position: fixed;
      top: 0;
      left: 0;
      z-index: 9998;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, .8);
      user-select: none;
      transition: opacity .3s;`);
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
            transform: translateY(-1000px);
      
      
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
      this.$title = this.create("div",`
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
      font-weight: normal;
      margin: 0;
      padding: 0;
      `);
      this.$close = this.create("div",`
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

      `)
      this.$confirm = this.create("button",`
      margin: 0 5px;
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
      let {title,confirm} = this.options;
      this.$title.innerHTML = title;
      this.$close.innerHTML = "X";
      this.$header.appendChild(this.$title);
      this.$header.appendChild(this.$cancel);
      this.$body.innerHTML = this.content;
      this.$main.appendChild=(this.$body);
      this.$main.appendChild=(this.$header);
       if(confirm){
        this.$confirm.innerHTML = "确定";
        this.$cancel.innerHTML = "取消";
        this.$footer.appendChild = (this.$confirm);
        this.$footer.appendChild = (this.$cancel);
        this.$main.appendChild = (this.$footer);
       }
       this.$all.appendChild = (this.$main);
       document.body.appendChild = (this.$all);
    }
    show(){
        this.$all.style.opacity=1;
        this.$main.style.transform = "translateY(0)";
        if(!this.options.confirm){
          this.$timer = setTimeout (()=>{
          this.hide();
          clearTimeout(this.$timer)
          },3000)

        }



    };
    hide(lx = "cancel"){
        this.$main.style.transform = "translateY(-1000px)";
        this.$all.style.opacity = 0;
        let fn= ()=>{
            document.body.removeChild(this.$all);
            if(typeof this.options.handled === "function"){
                this.options.handled.call(this,lx);

            }
            this.$all.addEventListener("transitionend",fn);

        };
        this.$all.addEventListener("transitionend",fn);








    }



    init(){
        this.createElement(); 
        this.$all.offsetWidth;
        this.show();
        this.$all.addEventListener("click",ev=>{
            let target = ev.target;
            if(/^(button|I)$/i.test(target.tagName)){
                clearTimeout(this.$timer);
                this.hide(target.innerHTML === "确定"? "confirm":"cancel");
            }
        })



        this.$header.addEventListener("click",this.down.bind(this))
    }
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


    }

    return function proxy(content,options={}){
        //传参验证
        if(typeof content === "undefined"){
            throw new Error("错误：提示内容必须传递！");
        }
        if(options === null||typeof options !=="object"){
            throw new Error("错误：参数配置必须是一个对象");

        }
    
    let _default = {
        titlle:"系统温馨提示",
        confirm:false,
        handled:null
    };
    for(let key in _default){
        if(!_default.hasOwnProperty(key)) break;
        _default[key] = options[key];
    }
    options = Object.assign({ titlle:"系统温馨提示",
    confirm:false,
    handled:null},
    options);

    return new all(content,options);







    }




})()