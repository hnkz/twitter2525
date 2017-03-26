'use strict';

/**
 * コメントクラス
 */
class Comment {
    constructor() {
        this.windowHeight = window.parent.screen.height;
        this.windowWidth = window.parent.screen.width;
        this.animationInterval = 70;
        this.maxCommentSpeed = 25;
        this.minCommentSpeed = 10;
        this.commentSpeedRate = 0.7;
        this.strHeight = 50;
    }

    /**
     * コメント生成
     * @param {*} str 
     */
    startCommentScroll(str) {
        var x = this.windowWidth;
        var y = Math.random() * this.windowHeight;
        while (y < 0 || (this.windowHeight - this.strHeight * 2) < y)
            y = Math.random() * this.windowHeight;

        // 要素の作成
        var element = document.createElement('div');
        element.className = "comment";
        element.innerHTML = str;
        element.style.top = y + "px";
        element.style.left = x + "px";
        var objBody = document.getElementsByTagName("body").item(0);
        objBody.appendChild(element);

        // コメントスピードの設定
        var strLength = str.length;
        var v = strLength * this.commentSpeedRate;
        if (v > this.maxCommentSpeed)
            v = this.maxCommentSpeed;
        else if (v < this.minCommentSpeed)
            v = this.minCommentSpeed;
        this.autoScroll(x, v, strLength, element);
    }

    /**
     * コメントを自動スクロール
     * @param {*} x 
     * @param {*} v 
     * @param {*} strLength 
     * @param {*} elm 
     */
    autoScroll(x, v, strLength, elm) {
        var own = this;
        elm.style.left = x + "px";
        x -= v;
        if (x > -strLength * (this.strHeight)) {
            console.log(x);
            setTimeout(
                function() {
                    own.autoScroll(x, v, strLength, elm)
                }, this.animationInterval
            );
        }
    }
}

// var Comment = require('Comment.js');
var comment = new Comment();

// メインプロセスからのメッセージを受信
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('message', function(event, message) {
    comment.startCommentScroll(message);
});