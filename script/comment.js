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

    startCommentScroll(str) {
        var x = windowWidth;
        var y = Math.random() * windowHeight;
        while (y < 0 || (windowHeight - strHeight * 2) < y)
            y = Math.random() * windowHeight;

        // 要素の作成
        var element = document.createElement('div');
        element.className = "comment";
        element.innerHTML = str;
        element.style.top = y + "px";
        var objBody = document.getElementsByTagName("body").item(0);
        objBody.appendChild(element);

        // コメントスピードの設定
        var strLength = str.length;
        var v = strLength * this.commentSpeedRate;
        if (v > this.maxCommentSpeed)
            v = this.maxCommentSpeed;
        else if (v < this.minCommentSpeed)
            v = this.minCommentSpeed;

        autoScroll(x, v, strLength, element);
    }

    autoScroll(x, v, strLength, elm) {
        elm.style.left = x + "px";
        x -= v;
        if (x > -strLength * (this.animationInterval - 10)) {
            setTimeout(function() {
                autoScroll(x, v, strLength, elm);
            }, this.animationInterval);
        }
    }
}