/**
 * 共享onload函数
 * @param {*} func 
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            oldonload();
            func();
        }
    }
}

/**
 * 将新节点添加到指定节点的后面
 * @param {*} newElement 
 * @param {*} targetElement 
 */
function insertAfter(newElement, targetElement) {
    var parent = targetElement.parentNode;
    if (parent.lastChild == targetElement) {
        parent.appendChild(newElement);
    } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
    }
}

/**
 * 添加class
 * @param {*} element 
 * @param {*} value 
 */
function addClass(element, value) {
    if (!element.className) {
        element.className = value;
    } else {
        var newClassName = element.className;
        newClassName += " ";
        newClassName += value;
        element.className = newClassName;
    }
}

/**
 * 设置导航选中状态
 */
function highlightPage() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    // 获取header标签组
    var headers = document.getElementsByTagName("header");
    if (headers.length == 0) return false;
    // 获取nav标签组
    var navs = headers[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    // 获取链接数组
    var links = navs[0].getElementsByTagName("a");
    if (links.length == 0) return false;
    var linkurl;
    for (var i = 0; i < links.length; i++) {
        linkurl = links[i].getAttribute("href");
        // 获取当前页面URL并判断URL中是否含有linkurl
        if (window.location.href.indexOf(linkurl) != -1) {
            // 如果包含则,设置class
            links[i].className = "here";
            var linktext = links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id", linktext);
        }
    }
}

/**
 * 准备幻灯片
 */
function prepareSlideshow() {
    // 检查浏览器支持DOM函数
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById) return false;
    // 确保元素存在
    if (!document.getElementById("intro")) return false;
    var intro = document.getElementById("intro");
    var slideshow = document.createElement("div");
    slideshow.setAttribute("id", "slideshow");
    var frame = document.createElement("img");
    frame.setAttribute("id", "frame");
    frame.setAttribute("src", "images/frame.gif");
    frame.setAttribute("alt", "");
    slideshow.appendChild(frame);
    var preview = document.createElement("img");
    preview.setAttribute("id", "preview");
    preview.setAttribute("src", "images/slideshow.gif");
    preview.setAttribute("alt", "a glimpse of what awaits you");
    slideshow.appendChild(preview);
    insertAfter(slideshow, intro);
    // 取得所有链接
    var links = document.getElementsByTagName("a");
    var destination;
    // 为mouseover事件添加动画
    for (var i = 0; i < links.length; i++) {
        links[i].onmouseover = function () {
            destination = this.getAttribute("href");
            if (destination.indexOf("index.html") != -1) {
                moveElement("preview", 0, 0, 5);
            }
            if (destination.indexOf("about.html") != -1) {
                moveElement("preview", -150, 0, 5);
            }
            if (destination.indexOf("photos.html") != -1) {
                moveElement("preview", -300, 0, 5);
            }
            if (destination.indexOf("live.html") != -1) {
                moveElement("preview", -450, 0, 5);
            }
            if (destination.indexOf("contact.html") != -1) {
                moveElement("preview", -600, 0, 5);
            }
        }
    }
}

/**
 * 幻灯片动画函数
 * @param {*} elementID 
 * @param {*} final_x 
 * @param {*} final_y 
 * @param {*} interval 
 */
function moveElement(elementID, final_x, final_y, interval) {
    if (!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if (elem.movement) {
        clearTimeout(elem.movement);
    }
    if (!elem.style.left) {
        elem.style.left = "0px";
    }
    if (!elem.style.top) {
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist = 0;
    if (xpos < final_x) {
        dist = Math.ceil((final_x - xpos) / 10);
        xpos += dist;
    }
    if (xpos > final_x) {
        dist = Math.ceil((xpos - final_x) / 10);
        xpos -= dist;
    }
    if (ypos < final_y) {
        dist = Math.ceil((final_y - ypos) / 10);
        ypos += dist;
    }
    if (ypos > final_y) {
        dist = Math.ceil((ypos - final_y) / 10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

// 添加选中状态函数
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);