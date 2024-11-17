const path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin'); // 所有的插件都需要引入

module.exports = {
    entry: './src/main.js', //入口文件喜欢使用相对路径
    output: {
        // path: path.resolve(__dirname, 'dist') 是指当前文件夹的目录下 新建一个dist文件夹
        path: path.resolve(__dirname, 'dist'), // 这里喜欢使用绝对路径
        //入口文件打包输出的文件名
        filename: 'static/js/main.js',
        clean: true  // 打包前将path目录清空
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
            }
        ]
    },
    // 插件
    plugins: [
        new ESLintPlugin({
            // 检查哪些文件
            context: path.resolve(__dirname, "src")
        })
    ],
    //模式
    mode: "development"
}