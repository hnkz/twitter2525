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

// アクセストークン
var twitter_accessToken;
var twitter_accessTokenSecret;

/**
 * Window
 */
var mainWindow;
var loginWindow;
var tweetWindow;

/**
 * アプリ起動
 */
app.on('ready', function() {
    var size = electron.screen.getPrimaryDisplay().size;

    // メインウィンドウ
    mainWindow = new BrowserWindow({
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
    mainWindow.loadURL('file://' + __dirname + '/../index.html');

    mainWindow.on('closed', function() {
        mainWindow = null;
    });

    // ロード終了時
    mainWindow.webContents.on('did-finish-load', function() {});

    const { ipcMain } = require('electron');
    ipcMain.on('message', (event, message) => {
        mainWindow.webContents.send('message', message);
    })

    // ログインウィンドウ
    loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: { webSecurity: false }
    });

    twitterProcess();
});

app.on('window-all-closed', function() {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

/*
 * Twitter process
 * getting a request token
 */
function twitterProcess() {
    twitter.getRequestToken((error, requestToken, requestTokenSecret, results) => {
        if (error) {
            console.log(error);
        } else {
            var url = twitter.getAuthUrl(requestToken);
            loginWindow.webContents.on('will-navigate', (event, url) => {
                var matched;
                if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/)) {

                    // getting an access token
                    twitter.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret, results) => {
                        // make stream connection
                        client = new twitterAPI({
                            consumer_key: 'T0Lc4YbGmR7E074sjOIqZrjnk',
                            consumer_secret: 'PZ2h4yToCKWjJ8NnWxpDqjEg9Q81PKEQ4pIvxPKqkDfNEYttfd',
                            access_token_key: accessToken,
                            access_token_secret: accessTokenSecret,
                        });
                        // start stream
                        var streams = client.stream('user', (stream) => {
                            stream.on('data', function(tweet) {
                                mainWindow.webContents.send('message', tweet.user.name + " : " + tweet.text);
                            })
                            stream.on('error', function(e) {
                                console.log(e)
                            })
                        });
                    });
                }
                // window close
                event.preventDefault();
                loginWindow.close();
            });
            loginWindow.loadURL(url);
        }
    });
}