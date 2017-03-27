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

}