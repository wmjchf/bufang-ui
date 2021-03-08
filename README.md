# 瞎折腾爬坑(webpack+react+typescript)

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

- husky 最新版本（5.1.3）不响应 hooks

```
摸索半天之后，我把版本降到了4.3.6，结果就可以了。
也有可能是最新版本的某些配置我没有配置，导致不响应hooks。（希望有大神能够指点指点）
```

- eslint 配置

#### 扩展（extends）

扩展就是直接使用别人已经写好的 lint 规则，方便快捷。扩展一般支持三种类型：

```
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "eslint-config-standard",
  ]
}
```

1、`eslint`: 开头的是 ESLint 官方的扩展，一共有两个：`eslint:recommended` 、`eslint:all`。
2、`plugin`: 开头的是扩展是插件类型，也可以直接在 `plugins` 属性中进行设置。
3、最后一种扩展来自 npm 包，官方规定 npm 包的扩展必须以 `eslint-config-` 开头，使用时可以省略这个头，上面案例中 `eslint-config-standard` 可以直接简写成 `standard`
如果你觉得自己的配置十分满意，也可以将自己的 lint 配置发布到 npm 包。

#### 插件（plugins）

虽然官方提供了上百种的规则可供选择，但是这还不够，因为官方的规则只能检查标准的 JavaScript 语法，如果你写的是 JSX 或者 Vue 单文件组件，ESLint 的规则就开始束手无策了。
这个时候就需要安装 ESLint 的插件，来定制一些特定的规则进行检查。ESLint 的插件与扩展一样有固定的命名格式，以 eslint-plugin- 开头，使用的时候也可以省略这个头。

```
npm install --save-dev eslint-plugin-vue eslint-plugin-react

{
  "plugins": [
    "react", // eslint-plugin-react
    "vue",   // eslint-plugin-vue
  ]
}
```

或者是在扩展中引入插件，前面有提到 plugin: 开头的是扩展是进行插件的加载。

```
{
  "extends": [
    "plugin:react/recommended",
  ]
}
```

对照上面的案例，插件名(pluginName) 为 react，也就是之前安装 eslint-plugin-react 包，配置名(configName)为 recommended。那么这个配置名又是从哪里来的呢？
可以看到 `eslint-plugin-react` 的源码

```
module.exports = {
  // 自定义的 rule
  rules: allRules,
  // 可用的扩展
  configs: {
    // plugin:react/recommended
    recomended: {
      plugins: [ 'react' ]
      rules: {...}
    },
    // plugin:react/all
    all: {
      plugins: [ 'react' ]
      rules: {...}
    }
  }
}
```

配置名是插件配置的 configs 属性定义的，这里的配置其实就是 ESLint 的扩展，通过这种方式即可以加载插件，又可以加载扩展。

#### 规则（rules）

根据实际团队或者项目情况，自定义 lint 规则，这里的规则会覆盖上面`extends`和`plugins`的规则，权重最大。

```
// 可以根据团队或者项目自己去扩展
rules: {
    "no-console": 1, // 不禁用console
    "react/jsx-uses-react": 2, // 防止反应被错误地标记为未使用
    "@typescript-eslint/no-var-requires": 0,
    quotes: [2, "double"],
    "linebreak-style": 0,
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    semi: ["error", "always"]
  },
```

- 为什么使用@babel/eslint-parser
  ESLint 的默认解析器和核心规则只支持最新的最终 ECMAScript 标准，不支持 Babel 提供的实验性（如新特性）和 non-standard（如流或 TypeScript 类型）语法。@babel/eslint-parser 是一个解析器，它允许 ESLint 在 Babel 转换的源代码上运行。ESLint 允许使用自定义解析器。使用此插件时，代码将由 Babel 的解析器（使用 Babel 配置文件中指定的配置）解析，并将生成的 AST 转换为 ESLint 可以理解的 ESTree 兼容结构。所有的位置信息，如行号，列也会被保留，这样您就可以轻松地跟踪错误。

具体的可看[npm 的描述](https://www.npmjs.com/package/@babel/eslint-parser)
