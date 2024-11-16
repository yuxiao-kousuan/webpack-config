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


















