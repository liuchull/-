  (function(){
  class EventBus{
      constructor(){
      //创建一个事件池{xxx:[],...}
     this.pond = {};
      }

    $on(type,func){
        //每一次加方法的时候，首先看着事件池中是否存在这个类型，不存在就创建
        let pond = this.pond;
        !(type in pond)? pond[type] = []:null;
        //增加方法(去重)
        let pondT = pond[type];
        //for (let i = 0;i<pondT.length;i++){
         // if(pondT[i] === func){
           //   return  }
          // pondT.push(func);
        !pondT.includes(func)?pondT.push(func):null;  
        

        };
        
  $off(type,func){
      let pondT = this.pond[type];
      if(!pondT) return;
      for (let i=0;i<pondT.length;i++){
       let item = pondT[i];
       if(item === func){
          //pondT.splice(i,1);
           //移除掉（因为追加的时候去重了，所以删除依次就够了，不需要在向后找了，为了不让数组塌陷，我们此处不使用pondT。splice（i，1）删除，我们给其赋值为null即可）
           pondT[i] = null;
           return
       }

      }

  };   
  
  $emit(type,...args){
     let pondT = this.pond[type]||[];
     for(let i = 0;i<pondT.length;i++){
        let func = pondT[i];
       // func.apply(this,args);
       if(typeof func !=="function"){
         pondT.splice(i,1);
         i--;
         continue;

       }
       func.apply(this,args);
     }


  }





}
 







window.EB = new EventBus();

  })()
















