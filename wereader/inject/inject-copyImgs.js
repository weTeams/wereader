/*获取被标注的图片的Markdown文本数组，用于支持导出被标注的图片*/
//发送消息给后台
function setMesToBg(imgsArray){
    console.log("setMesToBg(imgsArray)：被调用，参数imgsArray：\n" + imgsArray)
    console.log("setMesToBg(imgsArray)：开始传递信息给后台")
    chrome.runtime.sendMessage({RimgsArr: imgsArray});
}

//遍历HTMLCollection检查图片是否加载完毕
/*因为可以通过img标签的data-src属性获取链接，故不再需要检查图片是否加载完毕，将此函数舍弃*/
/* function isOver(imgs){
    console.log("isOver(imgs)：被调用")
    for(var i=0,len=imgs.length;i<len;i++){
        if(imgs[i].className.indexOf("wr_pendingLoading") != -1){
            return false
        }
    }
    return true
} */

//获取imgs数组
function requestImgsArray(imgs,s0,s1,s2){
    console.log("requestImgsArray(imgs,s0,s1,s2)：被调用")
    var imgsArray = []
    //遍历imgs元素
    for(var i=0,len=imgs.length;i<len;i=i+1){
        var s = imgs[i].getAttribute("data-src")
        if(s == null || s == ""){
            console.log("inject-copyImgs.js => main() => requestImgsArray(imgs,s0,s1,s2)：图片链接获取失败")
            alert("inject-copyImgs.js => main() => requestImgsArray(imgs,s0,s1,s2)：图片链接获取失败。\n建议提交反馈到：https://github.com/liuhao326/wereader")
            return
        }
        var l = imgs[i].style.left
        var t = imgs[i].style.top
        var w = imgs[i].style.width
        var h = imgs[i].style.height
        var leftImg = parseFloat(l.substr(0, l.length - 2))
        var topImg = parseFloat(t.substr(0, t.length - 2))
        var widthImg = parseFloat(w.substr(0, w.length - 2))
        var heightImg = parseFloat(h.substr(0, h.length - 2))
        //依次遍历各级别标注
        for(var j=0,len2=s0.length;j<len2;j++){
            var leftDiv = parseFloat(s0[j].style.left.substr(0, s0[j].style.left.length - 2))
            var topDiv = parseFloat(s0[j].style.top.substr(0, s0[j].style.top.length - 2))
            var widthDiv = parseFloat(s0[j].style.width.substr(0, s0[j].style.width.length - 2))
            var heightDiv = parseFloat(s0[j].style.height.substr(0, s0[j].style.height.length - 2))
            if(Math.abs(leftImg - leftDiv)<=0.1 && Math.abs(topImg - topDiv)<=0.1 && Math.abs(widthImg - widthDiv)<=0.1 && Math.abs(heightImg - heightDiv)<=0.1){
                //console.log(s)
                imgsArray.push("![" + s.split("/").pop() + "](" + s + ")")
                break
            }
        }
        for(var j=0,len2=s1.length;j<len2;j++){
            var leftDiv = parseFloat(s1[j].style.left.substr(0, s1[j].style.left.length - 2))
            var topDiv = parseFloat(s1[j].style.top.substr(0, s1[j].style.top.length - 2))
            var widthDiv = parseFloat(s1[j].style.width.substr(0, s1[j].style.width.length - 2))
            var heightDiv = parseFloat(s1[j].style.height.substr(0, s1[j].style.height.length - 2))
            if(Math.abs(leftImg - leftDiv)<=0.1 && Math.abs(topImg - topDiv)<=0.1 && Math.abs(widthImg - widthDiv)<=0.1 && Math.abs(heightImg - heightDiv)<=0.1){
                //console.log(s)
                imgsArray.push("![" + s.split("/").pop() + "](" + s + ")")
                break
            }
        }
        for(var j=0,len2=s2.length;j<len2;j++){
            var leftDiv = parseFloat(s2[j].style.left.substr(0, s2[j].style.left.length - 2))
            var topDiv = parseFloat(s2[j].style.top.substr(0, s2[j].style.top.length - 2))
            var widthDiv = parseFloat(s2[j].style.width.substr(0, s2[j].style.width.length - 2))
            var heightDiv = parseFloat(s2[j].style.height.substr(0, s2[j].style.height.length - 2))
            if(Math.abs(leftImg - leftDiv)<=0.1 && Math.abs(topImg - topDiv)<=0.1 && Math.abs(widthImg - widthDiv)<=0.1 && Math.abs(heightImg - heightDiv)<=0.1){
                //console.log(s)
                imgsArray.push("![" + s.split("/").pop() + "](" + s + ")")
            }
        }
    }
    return imgsArray.length==0?["noImg"]:imgsArray //页面中没有图片则返回["noImg"]，否则返回imgsArray
}

//入口
function main(){
    console.log("main()：被调用");
    //图片是否加载完毕
    var imgs = document.getElementById("renderTargetContent").getElementsByTagName("img");
    /* if(isOver(imgs) == false){//图片未加载完毕则直接返回，最终imgArray为空
        alert("为了得到准确的图片，请滚动页面确保所有图片都已加载完毕~");
        return
    } */
    var s0 = document.getElementsByClassName("wr_underline s0");
    var s1 = document.getElementsByClassName("wr_underline s1");
    var s2 = document.getElementsByClassName("wr_underline s2");
    var imgsArray = requestImgsArray(imgs,s0,s1,s2);
    setMesToBg(imgsArray)
}

console.log("inject-copyImgs.js：被注入")
main()