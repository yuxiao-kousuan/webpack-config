
module.exports = {
  extends: [
    "eslint:recommended"  // 继承eslink官网规则
  ],
  env: {
    node: true, //启用全局node变量
    browser: true //启用全局浏览器变量
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {  //可用于覆盖继承规则
    "no-var": 2  // 0 禁止  1 warning 2 error
  }

}