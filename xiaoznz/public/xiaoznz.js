ajax = (url,requests="get",message)=>{
    return new Promise((resolve, reject)=>{
        const request = new XMLHttpRequest();
        request.open(requests,url)
        request.send(message)
        request.onreadystatechange = ()=>{
            if (request.readyState === 4){
                if (request.status === 200){
                    resolve(request.response)
                }else{
                    reject(request)
                }
            }
        }
    })
}
    ajax("./friends.json").then((response)=>{
        console.log(response);
    })
