'use strict';

const path = require('path');
const fs = require('fs');
const getPublicUrlOrPath = require('react-dev-utils/getPublicUrlOrPath');

// 获取项目根目录的真实路径（解决符号链接的问题）
const appDirectory = fs.realpathSync(process.cwd());
/* 
  1. 创建一个函数 resolveApp，用于将项目中的相对路径转换为绝对路径。 
  2. 如果当前目录是 /Users/project/my-app，调用 resolveApp('src') 会返回 /Users/project/my-app/src 
*/

const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const publicUrlOrPath = getPublicUrlOrPath(
  process.env.NODE_ENV === 'development',
  require(resolveApp('package.json')).homepage,
  process.env.PUBLIC_URL
);

const buildPath = process.env.BUILD_PATH || 'build';

const moduleFileExtensions = [
  'web.mjs',
  'mjs',
  'web.js',
  'js',
  'web.ts',
  'ts',
  'web.tsx',
  'tsx',
  'json',
  'web.jsx',
  'jsx',
];

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find(extension =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

// config after eject: we're in ./config/
module.exports = {
    dotenv: resolveApp('.env'),  // 环境变量文件路径
    appPath: resolveApp('.'),   // 项目根目录路径
    appBuild: resolveApp(buildPath), // 构建输出目录
    appPublic: resolveApp('public'), // public 目录路径
    appHtml: resolveApp('public/index.html'), // HTML 模板文件路径
    appIndexJs: resolveModule(resolveApp, 'src/index'), // 应用入口文件路径
    appPackageJson: resolveApp('package.json'), // package.json 路径
    appSrc: resolveApp('src'), // 源代码目录路径
    appTsConfig: resolveApp('tsconfig.json'), // TypeScript 配置文件路径
    appJsConfig: resolveApp('jsconfig.json'), // JavaScript 配置文件路径
    yarnLockFile: resolveApp('yarn.lock'), // yarn.lock 文件路径
    testsSetup: resolveModule(resolveApp, 'src/setupTests'), // 测试设置文件路径
    proxySetup: resolveApp('src/setupProxy.js'), // 代理设置文件路径
    appNodeModules: resolveApp('node_modules'), // node_modules 路径
    appWebpackCache: resolveApp('node_modules/.cache'), // Webpack 缓存路径
    appTsBuildInfoFile: resolveApp('node_modules/.cache/tsconfig.tsbuildinfo'), // TypeScript 构建缓存路径
    swSrc: resolveModule(resolveApp, 'src/service-worker'), // 服务工作者路径
    publicUrlOrPath, // 静态资源根路径
  };
  
module.exports.moduleFileExtensions = moduleFileExtensions;
