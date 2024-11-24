const path = require("path");
const paths = require('../path');
const os = require("os");
const ESLintPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserWebpackPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const threads = os.cpus().length;  //获取当前电脑的cpu核数

// 用来获取样式的loader
function geStyleLoader(otherLoader = []) {
    return [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {   
            loader: "postcss-loader",
            options: {
                postcssOptions: {
                    plugins: [
                        "postcss-preset-env" //解决大部分样式的兼容性问题
                    ]
                }
            }
        },
        ...otherLoader
    ].filter(Boolean);
}

module.exports = {
    entry: './src/main.js', //入口文件喜欢使用相对路径
    output: {
        // path: path.resolve(__dirname, 'dist') 是指当前文件夹的目录下 新建一个dist文件夹
        path: path.resolve(__dirname, '../dist'), // 这里喜欢使用绝对路径
        //入口文件打包输出的文件名
        filename: 'static/js/main.js',
        clean: true  // 打包前将path目录清空
    },
    // 加载器 用于解析webpack无法解析的文件
    module: {
        rules: [
           {
            oneOf: [
                // 各种loader的配置
                {
                    test: /\.css$/,
                    use: geStyleLoader(), //执行顺序从右到左 从下到上 与常理相反
                },
                {
                    test: /\.less$/,
                    use: geStyleLoader(["less-loader"]),
                },
                {
                    test: /\.s[ac]ss$/,
                    use: geStyleLoader(["sass-loader"]),
                },
                {
                    test: /\.styl$/,
                    use: geStyleLoader(["stylus-loader"]),
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
                    use: [
                        {
                           loader: "thread-loader", //开启多进程
                           options: {
                            works: threads //进程数量
                           }
                        },
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],  // 这就是预设，也可以在babel.config.js中写 可以编译es6语法
                                cacheDirectory: true, // 开启babel缓存
                                cacheCompression: false, // 关闭缓存文件压缩
                                plugins: ["@babel/plugin-transform-runtime"]
                            },
                        },
                    ]
                },
             ]
           }
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
            cacheLocation: path.resolve(paths.appNodeModules, '.cache/.eslintcache'),
            threads
        }),
        new HtmlWebpackPlugin({
            // 以public/index.html文件为模版创建新的html文件： 1.结构和原来一致  2.自动引入打包输出的资源
            template: path.resolve(__dirname, "../public/index.html")
        }),
        new MiniCssExtractPlugin({
            filename: "static/css/main.css"
        }),
        
    ],
    //单独制定压缩位置
    optimization: {
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserWebpackPlugin({
            parallel: threads
        }),
        new ImageMinimizerPlugin({
            minimizer: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: [
                    ['gifsicle', { interlaced: true }],
                    ['jpegtran', { progressive: true }],
                    ['optipng', { optimizationLevel: 5 }],
                    // Svgo configuration here https://github.com/svg/svgo#configuration
                    [
                      'svgo',
                      {
                        plugins:[
                            "preset-default",
                            "prefixIds",
                            {
                                name: "sortAttrs",
                                params: {
                                    xmlnsOrder: "alphabetical",
                                }
                            }
                        ]
                      }
                    ],
                  ],
              }
            },
        }),
      ]
    },
    //模式
    mode: "production",
    devtool: "source-map"
}