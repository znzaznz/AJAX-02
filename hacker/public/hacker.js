function jsonp(url){
    return new Promise((resolve,reject)=>{
        const random = Math.random();
        window[random] = (data)=>{
            console.log(data);
            resolve()
        }
        const script = document.createElement("script")
        script.src = `${url}?callback=${random}`
        script.onload = ()=>{
            script.remove()
        }
        document.body.appendChild(script);
        script.onerror = ()=>{
            reject;
        }
    })
}

jsonp("http://xiaoznz.com:8888/friends.js")