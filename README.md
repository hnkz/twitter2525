# twitterで2525しよう

## インストール方法

nodeがインストールされているのは前提として書いていきます。

```bash
# Electronをインストール
npm -g intall electron
# ライブラリ
npm install twitter
npm install node-twitter-api
# package.json作成
npm -y init
# 起動!
electron ./
# パッケージ化したい人(Mac)
electron-packager ./ twitter_2525 --platform=darwin --arch=x64 --version=1.6.2(electron -v の値)
# パッケージ化したい人(Windows)
electron-packager ./ twitter_2525 --platform=win32 --arch=x64 --version=1.6.2(electron -v の値)
```