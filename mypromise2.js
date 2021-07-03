const { all, resolve, reject } = require("./myPromise");
const myPromise = require("./myPromise")


static all(arr){
     return new myPromise((reslove,reject)=>{
       let index = 0,
           results = [];
        for( let i = 0;i<arr.length;i++){
            let item = arr[i];
           if(!(item instanceof mypromise)) continue;
           item.then(result=>{
               index++;
               results[i] = result;
               if(index === arr.length){
                   reslove(results);
               }
           }).catch(reason=>{
               reject(reason)
           })
        }   






     })






}













static all(arr){
    return new mypromise((reslove,reject)=>{
        let index = 0,
            result = [];
        for(let i=0;i<arr.length;i++){
            item = arr[i];
            if(!(item instanceof mypromise))continue;
         item.then(result =>{
             index++;
             results[i] = result;
             if(index === arr.length){
                 reslove(results);
             }
         }).catch(reject=>{
             reject(reason);
         })   
            
        }   



    })
}







static all(arr){
    return new mypromise((reslove,reject)=>{
       let index = 0,
           results = [];
        for(let i=0;i<arr.length;i++){
            item = arr[i];
            if(!(item instanceof mypromise)) continue;
           item.then(result=>{
               index++;
               results[i] = result;
             if(index === arr.length){
                 resolve(results);
             }  
           }).catch(reject=>{
               reject(reason);
           }) 
        }



    })
}
if(typeof resolveFn !== "function"){
    resolveFn = result =>{
        return result;
    }
}

if (typeof rejectFn !== "function"){
    resolveFn = reject => {
         return mypromise.reject(reason);
    }
}

 if (typeof rejectFn !== "function"){
     rejectFn = reject=>{
         return mypromise.reject(reason)
     }
 }

static resolve(result){
    return new mypromise(resolve=>{
        resolve(result);
    })
};
static reject(reason){
    return new mypromise(_,reject=>{
        reject(reason)
    })
}




return new mypromise((reslove,reject)=>{
    this.resolvedArr.push(
        result =>{
            try{
                let x = resloveFn(result);
                if(x instanceof mypromise){
                    x.then(reslove,reject);
                    return
                };
                reslove(x);
            }catch(err){
                reject(err.message)
            }
        }
    )



})







return new mypromise((resolve,reject)=>{
      this.resolvedArr.push(
        result=>{
            try{
                let x = resolveFn(result);
                if(x instanceof mypromise){
                    x.then(resolve,reject)
                    return
                };
                reslove(x);
            }catch(err){
                reject(err.message)
            }
        }
      )

})
return new mypromise((reslove,reject)=>{
    this.resolvedArr.push(
        result=>{
            try{
            let x = resolveFn(result);
            if(x instanceof mypromise){
                x.then(resolve,reject);
                return
            };
            resolve(x)
        }catch(err){
            reject(err.message)
        }
    }
    )
})


return new mypromise((resolve,reject)=>{
    this.resolvedArr.push(
        result=>{
            try{
                let x = resolveFn(reselt);
                if(x instanceof mypromise){
                    x.then(resolveFn,reject);
                    return
                }
                resolve(x);
            }catch(err){
                reject(err.message)
            }
        }
    )
})



static all(arr){
    return new mypromise((reslove,reject)=>{
        let index = 0,
           results = [];
           for(let i=0;i<arr.length;i++){
               item = arr[i];
               if(!(item instanceof mypromise)) continue;
               item.then(result=>{
                   index++;
                   results[i]=result;
                   if(index === arr.length){
                       resolve(results)
                   }
               }).catch(reason=>{
                   reject(reason)
               })
           }
    })
}



static resolve(result){
    return new mypromise(reslove=>{
        resolve(result)
    })
}


static reject(reason){
    return new mypromise(reject=>{
        return mypromise(reject(result))
    })
}









class myPromise{
    constructor(executor){
        this.status = "pending";
        this.value = "undefined";
        this.resolvedArr=[];
        this.rejectedArr=[];
        let resolve = result=>{
            let delayTimer = setTimeout(()=>{
              clearTimeout(delayTimer
                );
                if(this.status !== "pending")
                 return;
                 this.status = "resloved";
                 this.value = result;
                 this.resolvedArr.forEach(item=>(typeof item === "function"? item(this.value):null))



            },0);
            try{executor(resolve,reject);}catch(error){
                reject(error);
            }
        }
    }
}
then(resloveFn,rejectFn){
    
}