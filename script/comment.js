'use strict';

// メインプロセスからのメッセージを受信
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('message', function(event, message) {
    startCommentScroll(message);
});

// コメントを生成
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

// コメントをスクロール
function autoScroll(x, strLength, elm) {
    elm.style.left = x + "px";
    var v = strLength * 0.7;
    if (v > 25)
        v = 25;
    else if (v < 10)
        v = 10;
    x -= v;
    if (x > -strLength * 50) {
        setTimeout(function() {
            autoScroll(x, strLength, elm);
        }, 70);
    }
}