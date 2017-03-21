'use strict';

const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('message', function(event, message) {
    startCommentScroll(message);
});

function startCommentScroll(str) {
    // 位置設定
    const windowHeight = window.parent.screen.height;
    const windowWidth = window.parent.screen.width;
    var x = windowWidth;
    var y = Math.random() * windowHeight;
    while (y < 0 || 800 < y)
        y = Math.random() * windowHeight;

    // 要素の作成
    var element = document.createElement('div');
    element.className = "comment";
    element.innerHTML = str;
    element.style.top = y + "px";
    var objBody = document.getElementsByTagName("body").item(0);
    objBody.appendChild(element);

    // 文字の長さ取得
    var strLength = str.length;
    autoScroll(x, strLength, element);
}

function autoScroll(x, strLength, elm) {
    elm.style.left = x + "px";
    var v = strLength * 0.5;
    if (v > 20)
        v = 20;
    x -= v;
    if (x > -strLength * 70) {
        setTimeout(function() {
            autoScroll(x, strLength, elm);
        }, 50);
    }
}