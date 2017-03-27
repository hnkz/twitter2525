window.onload = function() {
    'use strict';

    // モジュール
    const { ipcRenderer } = require('electron');

    // テキストフィールド
    let textField = document.getElementById("tweet_text");
    textField.addEventListener("input", changeButtonColorByInputChar, false);

    // ボタン
    let sendTweetButton = document.getElementById("tweet_button");
    sendTweetButton.addEventListener("click", sendTweetMessage, true);
    sendTweetButton.addEventListener("mouseover", changeButtonBackGroundByMouseover, true);
    sendTweetButton.addEventListener("mouseout", changeButtonBackGroundByMouseout, true);

    // カウンター
    let counter = document.getElementById("counter");

    // キーイベント
    document.onkeydown = pressKey;
    document.onkeyup = releaseKey;

    let command = false;
    let enter = false;

    /**
     * ツイートボタンのクリックイベント
     */
    function sendTweetMessage() {
        let message = textField.value;
        let textLength = message.length;

        if (textLength > 140) return false

        textField.value = "";
        sendTweetButton.style.backgroundColor = "#555";
        sendTweetButton.style.color = "#999";

        if (message !== "") {
            // ツイートを送る
            ipcRenderer.send('tweet', message);
        }
    }

    /**
     * ツイートボタンのインプットイベント
     */
    function changeButtonColorByInputChar() {
        let message = textField.value;
        let textLength = message.length;
        counter.innerHTML = textLength;

        if (textLength === 0) {
            sendTweetButton.style.backgroundColor = "#555";
            sendTweetButton.style.color = "#999";
            counter.style.color = "#999"
        } else if (textLength > 140) {
            sendTweetButton.style.backgroundColor = "#555";
            sendTweetButton.style.color = "#999";
            counter.style.color = "#f55"
        } else {
            sendTweetButton.style.backgroundColor = "#5ae";
            sendTweetButton.style.color = "#fff";
            counter.style.color = "#999"
        }
    }

    /**
     * ツイートボタンのマウスオーバーイベント
     */
    function changeButtonBackGroundByMouseover() {
        let message = textField.value;
        let textLength = message.length;
        counter.innerHTML = textLength;

        if (textLength !== 0 && textLength < 140) {
            sendTweetButton.style.backgroundColor = "#59e";
        }
    }

    /**
     * ツイートボタンのマウスアウトイベント
     */
    function changeButtonBackGroundByMouseout() {
        let message = textField.value;
        let textLength = message.length;
        counter.innerHTML = textLength;

        if (textLength !== 0 && textLength < 140) {
            sendTweetButton.style.backgroundColor = "#5ae";
        }
    }

    /**
     * キープレスイベント
     */
    function pressKey(e) {
        if (e.keyCode === 91) {
            command = true;
        } else if (e.keyCode === 13) {
            enter = true;
        }

        checkShortcutFunc();
    }

    /**
     * キーリリースイベント
     */
    function releaseKey(e) {
        if (e.keyCode == 91) {
            command = false;
        } else if (e.keyCode == 13) {
            enter = false;
        }
    }

    /**
     * ショートカット機能が機能するかチェック
     */
    function checkShortcutFunc() {
        if (command && enter) {
            sendTweetMessage();
        }
    }

}