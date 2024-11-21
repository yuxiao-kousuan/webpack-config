const path = require("path");
const paths = require('../path');
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js', //入口文件喜欢使用相对路径 相对于运行代码的路径，而不是这个文件位置的相对路径
    output: {
        // path: path.resolve(__dirname, 'dist') 是指当前文件夹的目录下 新建一个dist文件夹
        path: undefined, // 开发模式下没有输出
        //入口文件打包输出的文件名
        filename: 'static/js/main.js',
    },
    // 加载器 用于解析webpack无法解析的文件
    module: {
        rules: [
            // 各种loader的配置
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                ], //执行顺序从右到左 从下到上 与常理相反
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ],
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(png|jpe?g|gif|web|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 4 * 1024 // 4kb 
                    }
                },
                generator: {
                    // hash 文件内容生成唯一id 并制定hash位数, ext: 扩展名， query: url中携带其他参数
                    filename: "static/images/[hash:10][ext][query]"
                }
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/, //新资源，希望原封不动输出，直接加上就好
                type: "asset/resource", // 不进行base64转化 图标不要转化
                generator: {
                    // hash 文件内容生成唯一id 并制定hash位数, ext: 扩展名， query: url中携带其他参数
                    filename: "static/media/[hash:10][ext][query]"
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/, //排除那些文件不处理
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env'],  // 这就是预设，也可以在babel.config.js中写 可以编译es6语法
                  },
                },
            },
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // 指定生效范围
            context: path.resolve(__dirname, "../src"),
            // 指定检查的文件
            extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
            // 使用 react-dev-utils 提供的格式化工具，将 ESLint 输出美化，便于开发者阅读。
            formatter: require.resolve('react-dev-utils/eslintFormatter'),
            // 遇到错误是否终止构建
            failOnError: true,
            // ESLint 会缓存结果，避免重复检查未更改的文件。
            cache: true,
            // 指定缓存的位置
            cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache')
        }),
        new HtmlWebpackPlugin({
            // 以public/index.html文件为模版创建新的html文件： 1.结构和原来一致  2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html")
        })
    ],
    //服务器 开发服务器： 不会输出资源，在内存中编译，打包
    devServer: {
        host: "localhost", //服务器域名
        port: "3000",
        open: true  //是否自动打开浏览器
    },
    //模式
    mode: "development",
    devtool: "cheap-module-source-map"
}