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

/**
 * 设置about页面内部链接点击事件
 */
function prepareInternalnav() {
    if (!document.getElementById) return false;
    if (!document.getElementsByTagName) return false;
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var navs = articles[0].getElementsByTagName("nav");
    if (navs.length == 0) return false;
    var links = navs[0].getElementsByTagName("a");
    if (links.length == 0) return false;
    for (var i = 0; i < links.length; i++) {
        var sectionId = links[i].getAttribute("href").split("#")[1]
        if (!document.getElementById(sectionId)) continue;
        document.getElementById(sectionId).style.display = "none";
        links[i].destination = sectionId;
        links[i].onclick = function () {
            showSection(this.destination);
            return false;
        }
    }
}

/**
 * 设置显示section内容的函数
 * @param {*} id 
 */
function showSection(id) {
    var sections = document.getElementsByTagName("section");
    for (var i = 0; i < sections.length; i++) {
        if (sections[i].getAttribute("id") != id) {
            sections[i].style.display = "none";
        } else {
            sections[i].style.display = "block";
        }
    }
}

/**
 * 设置占位图和详情函数
 */
function preparePlaceholder() {
    if (!document.getElementById) return false;
    if (!document.getElementById("imagegallery")) return false;
    if (!document.createElement) return false;
    var imagegallery = document.getElementById("imagegallery");
    var placeholder = document.createElement("img");
    placeholder.setAttribute("id", "placeholder");
    placeholder.setAttribute("src", "images/placeholder.gif");
    placeholder.setAttribute("alt", "placeholder");
    var description = document.createElement("p");
    description.setAttribute("id", "description");
    var title = document.createTextNode("description");
    description.appendChild(title);
    insertAfter(placeholder, imagegallery);
    insertAfter(description, imagegallery);
}

/**
 * 设置点击事件函数
 */
function prepareGallery() {
    if (!document.getElementsByTagName) return false;
    if (!document.getElementById("imagegaller")) return false;
    var imagegallery = document.getElementById("imagegallery");
    var links = imagegallery.getElementsByTagName("a");
    if (links.length == 0) return false;
    for (var i = 0; i < links.length; i++) {
        links[i].onclick = function () {
            return !showPic(this);
        }
        links[i].lastChild.nodeValue = "";
        var img = document.createElement("img");
        var source = links[i].getAttribute("href");
        var sources = source.split("/");
        sources[2] = "thumbnail_" + sources[2];
        img.setAttribute("alt", sources[2]);
        source = sources.join("/");
        img.setAttribute("src", source);
        // console.log(img);
        links[i].appendChild(img);
    }
}

/**
 * 图片显示在占位图函数
 * @param {*} whichPic 
 */
function showPic(whichPic) {
    var source = whichPic.getAttribute("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
    var text = whichPic.getAttribute("title");
    var description = document.getElementById("description");
    description.lastChild.nodeValue = text ? text : "No details";
    return true;
}

/**
 * 设置表格行的class
 */
function stripeTables() {
    if (!document.getElementsByTagName) return false;
    var tables = document.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName("tr");
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], "odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
}

/**
 * 添加表格状态
 */
function highlightRows() {
    if (!document.getElementsByTagName) return false;
    var rows = document.getElementsByTagName("tr");
    for (var i = 0; i < rows.length; i++) {
        rows[i].oldClassName = rows[i].className;
        rows[i].onmouseover = function() {
            addClass(this, "highlight");
        }
        rows[i].onmouseout = function() {
            this.className = this.oldClassName;
        }
    }
}

/**
 * 列表清单函数
 */
function displayAbbreviations() {
    console.log("1");
    if (!document.createElement || !document.createTextNode || !document.getElementsByTagName) return false;
    var abbreviations = document.getElementsByTagName("abbr");
    if (abbreviations.length < 1) return false;
    var defs = new Array();
    for (var i = 0; i < abbreviations.length; i++) {
        var current_abbr = abbreviations[i];
        if (current_abbr.childNodes.length < 1) return false;
        var definition = current_abbr.getAttribute("title");
        var key = current_abbr.lastChild.nodeValue;
        defs[key] = definition;
    }
    var dist = document.createElement("dl");
    for (key in defs) {
        var definition = defs[key];
        var dtitle = document.createElement("dt");
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddesc = document.createElement("dd");
        var ddesc_text = document.createTextNode(definition);
        ddesc.appendChild(ddesc_text);
        dist.appendChild(dtitle);
        dist.appendChild(ddesc);
    }
    if (dist.childNodes.length < 1) return false;
    var header = document.createElement("h3");
    var header_text = document.createTextNode("Abbreviations");
    header.appendChild(header_text);
    var articles = document.getElementsByTagName("article");
    if (articles.length == 0) return false;
    var container = articles[0];
    container.appendChild(header);
    container.appendChild(dist);
}

// 添加选中状态函数
addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);