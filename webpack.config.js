const path = require("path")

module.exports = {
    entry: './src/main.js', //入口文件喜欢使用相对路径
    output: {
        // path: path.resolve(__dirname, 'dist') 是指当前文件夹的目录下 新建一个dist文件夹
        path: path.resolve(__dirname, 'dist'), // 这里喜欢使用绝对路径
        filename: 'main.js'
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
                ], //执行顺序从左到右
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader", 
                    "css-loader",
                    "less-loader"
                ], //执行顺序从左到右
            }
        ]
    },
    // 插件
    plugins: [
      // 各种第三方插件 用于辅助开发，常见有热更新等功能
    ],
    //模式
    mode: "development"
}