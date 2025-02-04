console.log("inject-theme.js：被注入")

//添加主题切换按钮并绑定点击事件
function addThemeBtn(){
    console.log("inject-theme.js => addThemeBtn()：被调用")
    var theme = document.createElement("button")
    var btnDiv = document.getElementsByClassName("readerControls readerControls")[0]
    var dark_white = btnDiv.children[3]
    btnDiv.insertBefore(theme, dark_white)
    dark_white.style.display = "none"
    theme.setAttribute("title", "主题")
    theme.setAttribute("class","readerControls_item theme")
    var svg=document.createElementNS('http://www.w3.org/2000/svg','svg')
    svg.setAttribute("class","icon")
    svg.setAttribute("viewBox","0 0 1024 1024")
    svg.setAttribute("style","width: 30px; height: 30px;")
    //如果网页一开始为夜色模式，则需要将svg颜色设置为灰色，否则保持默认
    if(document.getElementsByClassName("readerControls_item white").length != 0){
        svg.innerHTML = '<path d="M512 853.333333c-55.466667 0-21.333333-38.4-85.333333-102.4-59.733333-64-256-25.6-256-238.933333 0-187.733333 153.6-341.333333 341.333333-341.333333s341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m256-341.333333c0-140.8-115.2-256-256-256s-256 115.2-256 256c0 68.266667 21.333333 89.6 81.066667 110.933333 4.266667 0 12.8 4.266667 21.333333 4.266667 4.266667 0 17.066667 4.266667 21.333333 8.533333 55.466667 17.066667 81.066667 29.866667 106.666667 55.466667 21.333333 21.333333 34.133333 42.666667 46.933333 64 0 4.266667 4.266667 8.533333 4.266667 12.8 128-12.8 230.4-123.733333 230.4-256z m-128-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m-119.466667-55.466667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666 42.666667 17.066667 42.666667 42.666666-17.066667 42.666667-42.666667 42.666667z m183.466667 162.133333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM392.533333 413.866667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m196.266667 298.666666c-34.133333 0-64-29.866667-64-64s29.866667-64 64-64 64 29.866667 64 64c-4.266667 34.133333-29.866667 64-64 64z" fill="#bbbbbd" p-id="2962"></path>'
    }else{
        svg.innerHTML = '<path d="M512 853.333333c-55.466667 0-21.333333-38.4-85.333333-102.4-59.733333-64-256-25.6-256-238.933333 0-187.733333 153.6-341.333333 341.333333-341.333333s341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m256-341.333333c0-140.8-115.2-256-256-256s-256 115.2-256 256c0 68.266667 21.333333 89.6 81.066667 110.933333 4.266667 0 12.8 4.266667 21.333333 4.266667 4.266667 0 17.066667 4.266667 21.333333 8.533333 55.466667 17.066667 81.066667 29.866667 106.666667 55.466667 21.333333 21.333333 34.133333 42.666667 46.933333 64 0 4.266667 4.266667 8.533333 4.266667 12.8 128-12.8 230.4-123.733333 230.4-256z m-128-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m-119.466667-55.466667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666 42.666667 17.066667 42.666667 42.666666-17.066667 42.666667-42.666667 42.666667z m183.466667 162.133333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM392.533333 413.866667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m196.266667 298.666666c-34.133333 0-64-29.866667-64-64s29.866667-64 64-64 64 29.866667 64 64c-4.266667 34.133333-29.866667 64-64 64z" fill="#696969" p-id="2962"></path>'
    }
    theme.appendChild(svg)
    
    //改变主题
    function changeTheme(){
        //如果当前主题为夜色模式
        if(document.getElementsByClassName("readerControls_item white").length != 0){
            //设置白色主题
            Flag=-1
            chrome.runtime.sendMessage({injectCss: "theme/white.css"})
            clickDarkOrWhite("readerControls_item white")
            //从黑色主题到白色主题恢复svg颜色
            svg.innerHTML = '<path d="M512 853.333333c-55.466667 0-21.333333-38.4-85.333333-102.4-59.733333-64-256-25.6-256-238.933333 0-187.733333 153.6-341.333333 341.333333-341.333333s341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m256-341.333333c0-140.8-115.2-256-256-256s-256 115.2-256 256c0 68.266667 21.333333 89.6 81.066667 110.933333 4.266667 0 12.8 4.266667 21.333333 4.266667 4.266667 0 17.066667 4.266667 21.333333 8.533333 55.466667 17.066667 81.066667 29.866667 106.666667 55.466667 21.333333 21.333333 34.133333 42.666667 46.933333 64 0 4.266667 4.266667 8.533333 4.266667 12.8 128-12.8 230.4-123.733333 230.4-256z m-128-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m-119.466667-55.466667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666 42.666667 17.066667 42.666667 42.666666-17.066667 42.666667-42.666667 42.666667z m183.466667 162.133333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM392.533333 413.866667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m196.266667 298.666666c-34.133333 0-64-29.866667-64-64s29.866667-64 64-64 64 29.866667 64 64c-4.266667 34.133333-29.866667 64-64 64z" fill="#696969" p-id="2962"></path>'
        }else if(Flag == 0){
            //设置绿色主题
            if(document.getElementsByClassName("readerControls_item white").length != 0){
                clickDarkOrWhite("readerControls_item white")
            }
            chrome.runtime.sendMessage({injectCss: "theme/green.css"})
        }else if(Flag == 1){
            //设置橙色主题
            if(document.getElementsByClassName("readerControls_item white").length != 0){
                clickDarkOrWhite("readerControls_item white")
            }
            chrome.runtime.sendMessage({injectCss: "theme/orange.css"})
        }else if(Flag == 2){
            //设置黑色主题
            chrome.runtime.sendMessage({injectCss: "theme/dark.css"})
            clickDarkOrWhite("readerControls_item dark")
            //更改svg图标颜色
            svg.innerHTML = '<path d="M512 853.333333c-55.466667 0-21.333333-38.4-85.333333-102.4-59.733333-64-256-25.6-256-238.933333 0-187.733333 153.6-341.333333 341.333333-341.333333s341.333333 153.6 341.333333 341.333333-153.6 341.333333-341.333333 341.333333z m256-341.333333c0-140.8-115.2-256-256-256s-256 115.2-256 256c0 68.266667 21.333333 89.6 81.066667 110.933333 4.266667 0 12.8 4.266667 21.333333 4.266667 4.266667 0 17.066667 4.266667 21.333333 8.533333 55.466667 17.066667 81.066667 29.866667 106.666667 55.466667 21.333333 21.333333 34.133333 42.666667 46.933333 64 0 4.266667 4.266667 8.533333 4.266667 12.8 128-12.8 230.4-123.733333 230.4-256z m-128-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m-119.466667-55.466667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666666 42.666667 17.066667 42.666667 42.666666-17.066667 42.666667-42.666667 42.666667z m183.466667 162.133333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666666zM392.533333 413.866667c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z m196.266667 298.666666c-34.133333 0-64-29.866667-64-64s29.866667-64 64-64 64 29.866667 64 64c-4.266667 34.133333-29.866667 64-64 64z" fill="#bbbbbd" p-id="2962"></path>'
        }
        //保存当前主题对应编号
        chrome.storage.sync.set({flag: Flag}, function() {
            console.log("addThemeBtn()：设置存储完毕，flag = " + Flag)
        })
    }
    //点击原网页的白色/黑色主题切换按钮
    function clickDarkOrWhite(classN){
        console.log("inject-theme.js => clickDarkOrWhite(classN)：被调用")
        try{
            document.getElementsByClassName(classN)[0].click();
        }catch(err){
            console.log("inject-theme.js => clickDarkOrWhite(classN) => err：\n" + err);
        }
    }


    
    //初始化
    setTimeout(function(){
        chrome.storage.sync.get(['flag'], function(result) {
            console.log("addThemeBtn() => window.onload => chrome.storage.sync.get => result.flag：" + result.flag)
            if(result.flag == 0){
                //设置绿色主题
                if(document.getElementsByClassName("readerControls_item white").length != 0){
                    clickDarkOrWhite("readerControls_item white")
                }
                chrome.runtime.sendMessage({injectCss: "theme/green.css"})
                Flag = 1
            }else if(result.flag == 1){
                //设置橙色主题
                if(document.getElementsByClassName("readerControls_item white").length != 0){
                    clickDarkOrWhite("readerControls_item white")
                }
                chrome.runtime.sendMessage({injectCss: "theme/orange.css"})
                Flag = 2
            }else{
                Flag = 0
            }
        })
    },1000)

    //绑定点击事件
    theme.addEventListener('click', function(){
        console.log("inject-theme.js：主题切换按钮被点击")
        changeTheme()
        Flag = Flag + 1
    },false)
}

var Flag = 0
addThemeBtn()
//因为某些时候会出现主题切换按钮生成失败的情况，故检查主题切换按钮是否生成成功，生成失败则重新生成
window.onload = function(){
    //分别尝试获取夜间模式/日渐模式切换按钮
    var dark_white = document.getElementsByClassName("readerControls_item white")[0]
    if(dark_white != undefined && dark_white.style.display != "none"){
        addThemeBtn()
    }
    dark_white = document.getElementsByClassName("readerControls_item dark")[0]
    if(dark_white != undefined && dark_white.style.display != "none"){
        addThemeBtn()
    }
}