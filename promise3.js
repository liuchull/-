const { resolve } = require("./myPromise");

class myPromise{
    constructor(executor){
        this.status = "pending";
        this.value = "undefined";
        this.resolvedArr = [];
        this.rejectArr = [];
     let resolve = result=>{
         let delayTimer = setTimeout(()=>{
             clearTimeout(delayTimer);
             if(this.status != pending)
             return;
             this.status = "resolved";
             this.value = result;
             this.resolvedArr.forEach(item=>(typeof item !== "function"? item(this.value):null))
         },0)
     } ; 
     let reject = reason=>{
        let delayTimer = setTimeout(()=>{
            clearTimeout(delayTimer);
            if(this.status != pending)
            return;
            this.status = "rejected";
            this.value = reason;
            this.rejectedArr.forEach(item=>(typeof item !== "function"? item(this.value):null))
        },0)
    } ;   
     try{
         executor(resolve,reject)
     }catch(error){
         reject(error)
     };




    }
 then(resolveFn,rejectFn){
     if(typeof resolveFn !== "function"){
         resolveFn = result=>{
             resolve(result)
         }
     };
     if(typeof rejectFn !== "function"){
        rejectFn = reason=>{
            return myPromise.reject(reason)
        
        }
    };
    return new myPromise((resolve,reject)=>{
        this.resolvedArr.push(result=>{
            try{
                let x = resolveFn(result);
                if(x instanceof myPromise){
                    x.then(resolve,reject);
                    return;
                }
                resolve(x);
            }catch(err){
                reject(err.meassage);
            }
        });
        this.rejectdArr.push(reason=>{
            try{
                let x = resolveFn(reason);
                if(x instanceof myPromise){
                    x.then(resolve,reject);
                    return;
                }
                resolve(x);
            }catch(err){
                reject(err.meassage);
            }
        })
    })
};
 static resolve(result){
    return new myPromise(resolve=>{
        resolve(result)
    })
     }
     static resolve(result){
        return new myPromise(resolve=>{
            resolve(result)
        })
         }

 static all(arr){
     return new myPromise((resolve,reject)=>{
         let index = 0;
         let results = [];
         for(let i=0;i<arr.length;i++){
             item = arr[i];
             if(!(item instanceof Promise)) continue;
             item.then(result=>{
                 index++;
                 results[i]=result;
                 if(index === arr.length){
                     resolve(result);
                 }
             }).catch(reason=>{
                 reject(reason)
             })
            }
             


     })
 }        
     
 }




