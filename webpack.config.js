module.exports = {
    entry: "./app/js/main.jsx",
    output: {
        path: __dirname + "/app/js/",
        filename: "bundle.js"
    },
    module: {
      rules: [
	{
      test: /\.js(x)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
	}
      ]
    }
}
