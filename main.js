'use strict';

/**
 * Electron
 */
var electron = require('electron');
var app = electron.app;
var BrowserWindow = electron.BrowserWindow;

/**
 * Twitter
 */
var twitterAPI = require('twitter');
var client;

const twitterTokenAPI = require('node-twitter-api');
const twitter = new twitterTokenAPI({
    consumerKey: 'T0Lc4YbGmR7E074sjOIqZrjnk',
    consumerSecret: 'PZ2h4yToCKWjJ8NnWxpDqjEg9Q81PKEQ4pIvxPKqkDfNEYttfd',
    callback: 'https://www.google.co.jp/',
});

var twitter_accessToken;
var twitter_accessTokenSecret;

app.on('ready', function() {
    var size = electron.screen.getPrimaryDisplay().size;

    // メインウィンドウ
    var mainWindow = new BrowserWindow({
        left: 0,
        top: 0,
        width: size.width,
        height: size.height,
        frame: false,
        show: true,
        transparent: true,
        resizable: false,
    });
    mainWindow.setIgnoreMouseEvents(true);
    mainWindow.maximize();
    mainWindow.setAlwaysOnTop(true);
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // ロード終了時
    mainWindow.webContents.on('did-finish-load', function() {});

    const { ipcMain } = require('electron');
    ipcMain.on('message', (event, message) => {
        mainWindow.webContents.send('message', message);
    })

    // サブウィンドウ ログイン画面
    const subWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { webSecurity: false }
    });

    twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results) {
        if (error) {
            console.log(error);
        } else {
            var url = twitter.getAuthUrl(requestToken);
            subWindow.webContents.on('will-navigate', function(event, url) {
                var matched;
                if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {
                    console.log(matched);
                    twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], function(error, accessToken, accessTokenSecret, results) {
                        client = new twitterAPI({
                            consumer_key: 'T0Lc4YbGmR7E074sjOIqZrjnk',
                            consumer_secret: 'PZ2h4yToCKWjJ8NnWxpDqjEg9Q81PKEQ4pIvxPKqkDfNEYttfd',
                            access_token_key: accessToken,
                            access_token_secret: accessTokenSecret,
                        });

                        var stream = client.stream('user', function(stream) {
                            stream.on('data', function(tweet) {
                                mainWindow.webContents.send('message', tweet.user.name + " : " + tweet.text);
                            })
                            stream.on('error', function(e) {
                                console.log(e)
                            })
                        });
                    });
                }
                event.preventDefault();
            });
            subWindow.loadURL(url);
        }
    });

});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});