'use strict';

function sendMessage() {
    var textField = document.getElementById("comment_text");
    var message = textField.value;

    var { ipcRenderer } = require('electron');
    ipcRenderer.send('message', message);
}