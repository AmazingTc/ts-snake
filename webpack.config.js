//引入path包
const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin')
const { CleanWebpackPlugin }=require('clean-webpack-plugin')
// webpack中所有的配置信息
module.exports={
  // 配置引用模块
  resolve: {
    extensions: ['.ts', '.js','...'], //让webpack解析ts
  },
  output:{  //打包文件所在目录
    path:path.resolve(__dirname,'dist'),//打包文件所在目录
    filename:"bundle.js",//打包后的文件
    // environment:{
    //   arrowFunction:false //不使用箭头函数
    // }
  },
  mode: "production", //development 开发模式 production:生产模式
  devtool: "source-map",//包含映射,是一个用来生成源代码与构建后代码一一映射的文件
  // 指定webpack打包时要使用的模块
  module:{
    rules:[ //指定要加载的规则
      {
        test: /\.ts$/,//指定规则生效的文件(正则)
        use:[//要使用的loader
            // 配置babel
          {
            loader:'babel-loader',//指定加载器
            options:{//配置预定义环境
              presets:[
                  [
                      "@babel/preset-env", //指定插件
                    {                      // 配置信息
                      targets:{  //要兼容的目标浏览器
                        "chrome":"58",
                        "ie":"11"
                      },
                      "corejs":"3",  //指定corjs版本
                      "useBuiltIns":"usage" //使用corejs的方式 按需加载
                    }
                  ]
              ]
            }
          },
          "ts-loader"
        ],
        exclude:/node-modules/, //要排除的文件
      },
        // less文件的处理
      {
        test:/\.less$/,
        use:[
            "style-loader",
            "css-loader",
            "less-loader"
        ]
      }
    ],
  },
  devServer: {  //开发者工具配置
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    //实例化html-webpack-plugin插件功能
    new HtmlWebpackPlugin({
      //html-webpack-plugin参数配置
      //指定打包HTML文件参照的模板HTML
      title:'myProject',
      template: './src/index.html',
      //生成的html文件名称
      filename: 'app.html',
      //定义打包的js文件引入在新html的哪个标签里
      inject: 'head'
    }),
    new CleanWebpackPlugin()
  ],
}