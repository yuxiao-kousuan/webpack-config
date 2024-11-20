# webpack-config
wenbpack基础配置

2024-11-16
webpack输出的文件叫做bundle； 只能处理js语言
开发者模式：编译js代码
生产者模式：编译js代码 同时压缩代码

public存放资源不变的静态文件夹
main.js作为src下打包的入口文件
npm init-y 初始化一个webpack描述文件

修改npm依赖远程仓库地址 改为淘宝镜像
npm config set registry https://registry.npmmirror.com

npx webpack ./src/main.js --mode=development 指定打包的入口文件和模式 生成dist打包文件
------------------------------------------------------------------
webpack5核心概念
1. entry(入口) 会以一个或者多个文件作为入口进行打包， 确定打包的入口文件

2. output(出口) 指定webpack打包后的文件输出的位置，以及命名规则

3. loader(加载器) webpack只能处理js 和 json 等文件资源，其他资源需要借助loader， webpack才能解析

4. plugins（插件） 拓展webpack功能

5. mode（模式）开发者模式和生产者模式
生产者模式： 需要对打包后的代码进行各种优化

配置文件webpack.config.js在根目录下的，需要配置上述5种

配置完成之后，可以直接使用 npx webpack 命令执行打包，打包开始，会读取webpack.config.js文件，按照配置进行打包
------------------------------------------------------------------
开发者模式
开发者模式需要做以下事情
1. 编译代码，使用各种loader来解析各种样式/图片/html等资源，加载配置来编译这些资源

2. 构建代码质量检查，树立代码规范

3. 热更新模块 提高工作效率

处理样式资源： 参见官方文档： https://webpack.js.org/loaders/

处理图片资源

优化：1.将指定比较小的图片转化为base64格式的图片， 也就是将图片转化为字符串，下次不必请求资源，但是体积会变大； 一般只针对小图片（5kb之内）

------------------------------------------------------------------
修改打包资源的路径： js / 图片 / css
    output: {
        // path: path.resolve(__dirname, 'dist') 是指当前文件夹的目录下 新建一个dist文件夹
        path: path.resolve(__dirname, 'dist'), // 这里喜欢使用绝对路径
        //入口文件打包输出的文件名
        filename: 'static/js/main.js'
    },
这里filename对应的路径生成的main.js文件有两个特点
1. 只适用于js文件，以及js引入的模块
2. 不适用于非js资源，例如图片，因为webpage会单独处理这些模块

自动清空上次打包内容：claer: true

处理字体/图标资源

处理一些音视频资源

----------------------------------------------------------------------
处理js资源

为什么还需要处理js资源？
1. webpack 对js处理有限 只能处理es模块化语法，不能编译其他语法，例如一些es6语法，需要做一些兼容性处理；
2. 针对js的兼容性，通常使用babel处理；
3. 针对代码规范，通常使用Eslink处理；

Eslink
检查js和jsx语法
配置文件位置： 
1. 一般使用在根目录xAI，新建.eslintrc.js中配置
2. 或者在package.json中eslinkconfig写
详细剖析eslint9.0的深入实践

## 工程化 和 规范化 是为了解决什么问题？ 
1. 提高项目的可维护性/一致性/可读性 减少团队间协作沟通

细化：
- 文件结构
- 代码规范，变量命名，函数，风格统一， eslint + prettier + stylelint
- 提交规范
- 单词拼写规范

这些都需要以编译原理为基础。操作代码， 解析代码。

### js 规范化

eslint, 专门做语言质量检查。js ts vue，都能支持语言校验

-------------------------------------------------------------------------
### Babel 语法

作用： 将es6高级的语法，编译为低版本语法，例如es5语法，这样可以运行在旧版本的浏览器中

1.presets预设：就是一组Babel插件，用于扩展Babel功能： 
1. @babel/preset-env: 一个智能预设，允许使用最新的js
2. @babel/preset-react: 允许使用jsx语法
3. @babel/preset-typescript: 用来编译TypeScript语法的预设

npm install -D babel-loader @babel/core @babel/preset-env

----------------------------------------
### 处理html资源
现状： 需要手动引入js资源文件
希望自动引入打包的文件

npm install --save-dev html-webpack-plugin

引入插件plugin

此时打包的文件中，会包含一个html文件，并且自用引入main.js文件；

但是需要保留之前结构

-----------------------------------
### 热更新

npm install webpack-dev-server -D 开发环境的热更新

    devServer: {
        host: "localhost", //服务器域名
        port: "3000",
        open: true  //是否自动打开浏览器
    },

配置上述参数后，指令直接修改为 npx webpack serve

之后会自动监听，文件，就会出现热更新

此时只会在内存中编译打包了，不会输出新的打包文件；

### 搭建生产模式
目的： 
1. 优化代码运行性能
2. 优化代码打包速度

新建一个生产环境的配置文件,同时将文件移入 config文件中
运行开发环境配置文件： npx webpack serve --config ./config/webpack.dev.js
运行生产模式文件： npx webpack --config ./config/webpack.prod.js

考虑分别运行上述命令比较麻烦，可以在webpack中简单运行配置命令：



 



























