'use strict';

var Comment = require('my-module/Comment.js');
var comment = new Comment();

// メインプロセスからのメッセージを受信
const ipcRenderer = require('electron').ipcRenderer;
ipcRenderer.on('message', function(event, message) {
    comment.startCommentScroll(message);
});