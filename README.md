# 组件库的使用

#### 安装

```
npm install bufang-ui --save
```

#### 按需引入

首先下载`babel-plugin-import`插件

```
npm install babel-plugin-import -D
```

然后在`.babelrc`配置如下：

```
{
  "plugins": [
    ["import", {
         {
            "libraryName": "bufang-ui",
            "style": "css"
         }
      }
    ]
  ]
}
```
