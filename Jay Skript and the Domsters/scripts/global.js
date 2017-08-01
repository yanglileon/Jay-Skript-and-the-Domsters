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

// 添加选中状态函数
addLoadEvent(highlightPage);