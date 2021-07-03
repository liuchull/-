const { resolve } = require("./myPromise");

class myPromise{
    constructor(executor){
      this.status = "pending";
      this.value = "undefinded";
      this.resloveArr = [];
      this.rejectArr = [];
     let resolve = result=>{
         let delayTimer = setTimeout(()=>{
             clearTimeout(delayTimer);
             if(this.status !== "pending") return;
         this.status = "resolved";
         this.value = result;
         this.resloveArr.forEach(item=>(typeof item !== "function"? item(this.value):null));
         },0)
         
         
        } 
        let reject = reason=>{
            let delayTimer = setTimeout(()=>{
                clearTimeout(delayTimer);
                if(this.status !== "pending") return;
            this.status = "rejected";
            this.value = reason;
            this.rejectArr.forEach(item=>(typeof item !== "function"? item(this.value):null));
            },0)
            
            
           } 
           try{executor(resolve,reject)}catch(err){
               reject(err)
           };

    }
    then(resolveFn,rejectFn){
       if(resolveFn !== "function"){
           resolveFn = result=>{
               resolve(result)
           }
       };
       if(rejectFn !== "function"){
        rejectFn = reason=>{
            return myPromise.reject(reason)
        }
    };

    return new myPromise((resolve,reject)=>{
      this.resloveArr.push(
          result=>{
              try{
                  let x = resolveFn(result);
                  if(x instanceof myPromise){
                      x.then(resolve,reject);
                      return
                  }
                  resolve(x);

              }catch(err){
                  reject(err.mesaage)
              }
          }
      );
      this.rejectArr.push(
        reason=>{
            try{
                let x = rejectFn(reason);
                if(x instanceof myPromise){
                    x.then(resolve,reject);
                    return
                }
                resolve(x);

            }catch(err){
                reject(err.mesaage)
            }
        }
    )







    })





    }




    static resolve(result){
        return new myPromise(resolve=>{
            resolve(result)
        })
    };
    static reject(reason){
        return new myPromise(reject=>{
            reject(reason)
        })
    }
    static all(arr){
        return new myPromise((resolve,reject)=>{
            let index = 0;
            let results = [];
            for(let i=0;i<arr.length;i++){
                item = arr[i];
                if(!(item instanceof myPromise)) continue;
                item.then(
                    result=>{
                        index++;
                        results[i] = result;
                        if(index === arr.length){
                            resolve(result)
                        }

                    }
                ).catch(reason=>{
                    reject(reason)
                })
            }
        })
    }

}