# 瞎折腾爬坑(webpack+react)

- error: Cannot find module 'webpack-cli/bin/config-yargs', webpack-cli 和 webpack-dev-server 不兼容。

![image](https://user-images.githubusercontent.com/36124772/110301011-90250f00-8032-11eb-907f-13ff23d7cb4d.png)

```
解决办法：
   1、修改package.json中的script
      "dev":"webpack serve --config config/webpack.development.js --open"
       配置文件路径自己修改
   2、降低webpack-cli的版本
      npm uninstall webpack-cli
      npm install webpack-cli@3.3.12 -D
```
