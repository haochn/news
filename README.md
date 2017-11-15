# React-新闻资讯

> 一个基于 React + Webpack + es6 + Babel + ant-design 的新闻站点

项目主页 [github-news](https://github.com/haochn/news)

## 写在前面
本项目采用react实现数据绑定，ant design实现UI布局，自动化工具采用webpack,
其中采用了es6的语法，例如，let,map,箭头函数，需要安装bael ,对其进行转码，

数据交互采用featch替代ajax


## 效果图

待定



## 运行项目

**安装依赖**  
```shell
npm install
```
**查看效果**
```shell
npm run start
之后打开 localhost:3000 查看
```
!!! 需要配置node环境(可自行百度)


## [webpack](http://webpack.github.io/docs/)配置

> webpack是一款模块加载器兼打包 工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。

 react的组件功能很好用，在一个项目中，有些组件可能由不同的人所开发，所以时常需要引入其他的脚本文件，虽然可以用命名空间的办法来解决，但最后在html页面中通过script标签引入各类组件和文件时，还是会显着异常混乱，各模块之间的依赖，先后加载顺序都得人为控制，会极大的降低开发效率，而且项目中用到了es6的语法，需要用到babel来进行es6的转化，所以选择了webpack来进行前端自动化的管理

 webpack配置文件：webpack.config.js

 ```javascript

    const path = require("path");
    const htmlWebpackPlugin = require('html-webpack-plugin');
    const webpack = require('webpack');
    const ExtractTextPlugin = require("extract-text-webpack-plugin");
    const UglifyJSWebpack = require("uglifyjs-webpack-plugin");
    const CleanWebpackPlugin = require('clean-webpack-plugin');

  //定义参数

  var config = {
    context: path.resolve(__dirname),
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: 'js/dist.js'
    },
    module: {
      
      //#在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，同时链式loader(用!连接)只适用于module.loader
      //#同时-loader不可省略 

      rules: [{
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        }
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, "src/"),
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          publicPath: '../',
          use: [
            // 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            }, {
              loader: 'postcss-loader',
              // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer')({
                      broswers: ['last 5 versions']
                    })
                  ];
                }
              }
            }
          ]
        })
      }, {
        test: /\.(gif|png|jpg|svg)$/,
        include: path.resolve(__dirname, "src/"),
        use: {
          loader: 'file-loader',
          options: {
            name: 'images/[name]-[hash:5].[ext]'
          }
        }
      }, {
        test: /\.(htm|html)$/,
        include: path.resolve(__dirname, "src/"),
        //exclude: path.resolve(__dirname,"template.html"),
        use: {
          loader: 'html-loader'
        }
      }]
    },

  //#配置devServer各种参数

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    hot: true, // 配置HMR之后可以选择开启
    historyApiFallback: true, // 不跳转
    inline: true // 实时刷新
  },

  plugins: [
    new htmlWebpackPlugin({
      template: 'src/template.html',
      filename: 'index.html', //用一个div包裹起来，一起移动到htm里；
      inject: 'body',
      title: 'page Title',
      pageType: 'mobile',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new UglifyJSWebpack({
      comments: false,
      beautify: true
    }), // 压缩js
    new ExtractTextPlugin("css/[name]-[hash:5].css"), // 输出独立css文件
    new webpack.HotModuleReplacementPlugin(), // 热加载插件
    // new CleanWebpackPlugin(
    //  ['build/js/main-*.js', 'build/css/main-*.css'], {
    //    root: __dirname,
    //    verbose: true,
    //    dry: false
    //  }
    // )
  ]
  }


  //参数输出

  module.exports = config;

 ```
当运行`webpack`命令时会自动把文件打包在./src目录下


## [ANT DESIGN](https://ant.design/index-cn)


> 一个 UI 设计框架，采用 React 封装的一套 Ant Design 的组件库，比较好用，可快速构建一个样式丰富的站点

antd的组件使用，[详细官方文档](https://ant.design/index-cn)


* [ANT DESIGN - 一个ui设计语言](https://ant.design/index-cn)

* [React 中文文档](https://tianxiangbing.github.io/react-cn/docs/getting-started.html)

* [webpack 2.2 中文文档](http://www.css88.com/doc/webpack2/)

* [前端编码规范](https://giscafer.gitbooks.io/front-end-manual/content/) ：算是比较详细的，包含编码规范和优化等

* [阮一峰的es6入门](http://es6.ruanyifeng.com/)

