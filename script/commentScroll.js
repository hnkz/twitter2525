'use strict';

/**
 * モジュールのインポート
 */
const Comment = require('my-module/Comment.js');
const Electron = require('electron');
const ipcRenderer = Electron.ipcRenderer;

// コメントクラスのインスタンス化
let comment = new Comment();

// メインプロセスからのコメント新規作成
ipcRenderer.on('message', function(event, message) {
    comment.startCommentScroll(message);
});