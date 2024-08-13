const path = require('path');

module.exports = {
  mode: 'development', // 可根据需要设置为 'production'
  entry: './src/index.ts', // 入口文件路径
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js', // 输出的文件名
    library: 'URLParams', // 库的全局变量名
    libraryTarget: 'umd', // 生成 UMD 格式
    globalObject: 'this', // 使 UMD 模块在 Node.js 和浏览器中都能运行
  },
  resolve: {
    extensions: ['.ts', '.js'], // 可解析的文件扩展名
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // 对所有以 .ts 结尾的文件使用 ts-loader
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
