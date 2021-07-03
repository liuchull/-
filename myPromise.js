class myPromise {
    constructor(executor) {
        // 初始属性值
        this.status = "pending";
        this.value = undefined;
        this.resolvedArr = [];
        this.rejectedArr = [];

        // 改变状态的函数
        let resolve = result => {
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                if (this.status !== "pending")
                    return;
                this.status = "resolved";
                this.value = result;
                this.resolvedArr.forEach(item => (typeof item === "function" ? item(this.value) : null));
            }, 0);

        };
        let reject = reason => {
            let delayTimer = setTimeout(() => {
                clearTimeout(delayTimer);
                if (this.status !== "pending")
                    return;
                this.status = "rejected";
                this.value = reason;
                this.rejectedArr.forEach(item => (typeof item === "function" ? item(this.value) : null));

            }, 0);

            //异常捕获处理
            try {
                executor(resolve, reject);
            } catch (error) {
                reject(error);
            }
        };
    }

    then(resolveFn, rejectFn) {
        //如果传递的参数不是函数（null/不传递），我们让失败或者成功顺延
        if (typeof resolveFn !== "function") {
            resolveFn = result => {
                return result;
            };
        }
        if (typeof rejectFn !== "function") {
            rejectFn = reason => {
                return myPromise.reject(reason);
            };
        }





        return new myPromise((resolve, reject) => {
            this.resolvedArr.push(
                result => {
                    try {
                        let x = resolveFn(result);
                        if (x instanceof myPromise) {
                            x.then(resolve, reject);
                            return
                        }
                        resolve(x);
                    } catch (err) {
                        reject(err.message);
                    }
                })
            this.rejectArr.push(
                reason => {
                    try {
                        let x = rejectFn(reason);
                        if (x instanceof myPromise) {
                            x.then(resolve, reject);
                            return
                        }
                        resolve(x);
                    } catch (err) {
                        reject(err.message);
                    }
                })



        })
    }

    static resolve(result) {
        return new myPromise(resolve => {
            resolve(result);
        });

    };
    static reject(reason) {
        return new myPromise(_, reject => {
            reject(reason);
        });

    };
    static all(arr) {
        return new myPromise((resolve, reject) => {
            let index = 0,
                results = [];
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i];
                if (!(item instanceof myPromise)) continue;
                item.then(result => {
                    index++;
                    results[i] = result;
                    if (index === arr.length) {
                        resolve(results);
                    }
                }).catch(reason => {
                    reject(reason)
                });
            }





        }





        )
    }


}

module.exports = myPromise;




