# twitterで2525しよう

## インストール方法

nodeがインストールされているのは前提として書いていきます。

```bash
# Electronをインストール
npm -g intall electron
npm install electron --save
# ライブラリ
npm install twitter --save
npm install node-twitter-api --save
# package.json作成
npm -y init
# 起動!
electron ./
```