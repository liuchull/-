(function(){
   class EventBus{
     constructor(){

        this.pond = {}
     }
     $on(type,func){
      let  pond = this.pond;
      !(type in pond)? pond[type] = []:null;
      let pondT = this.pond[type];
      for(i=0;i<pondT.length;i++){
          if(pondT[i]===func) return
      }
      pondT.push[func];
      pondT.includes(func)? null: pondT.push[func];

     }
     $off(type,func){
         let pondT = this.pond[type];
         if(!pondT) return;
         for(i=0;i<pondT.length;i++){
             let item = pond[i];
             if(item === func){
                 pondT[i]=null;
                 return;
             }
         }
         

     }
     $emit(type,...args){
         let pondT = this.pond[type]||[];
         for(i=0;i<pondT.length;i++){
             let func = pondT[i];
         
         if(typeof func !== "function"){
             pondT.splice(i,1);
             i--
             continue;
         }
      func.apply(this,...args)

     }



   }


   }



   window.EB = new EventBus();



})()









