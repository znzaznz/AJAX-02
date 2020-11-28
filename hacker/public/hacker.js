const script = document.createElement("script");
const num = parseInt(Math.random()*10)+1;
script.src = `http://localhost:8889/friends.js?callback=JSONP${num}`
document.head.appendChild(script)
script.onload = ()=>{
    script.remove()
}
window[`JSONP${num}`] = (data)=>{
    console.log(data);
}