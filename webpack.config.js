module.exports = {
    entry: "./app/js/main.js",
    output: {
        path: __dirname + "./app/js/",
        filename: "main.js"
    },
    module: {
        loaders: [
            { 
                test: /(\.jsx|\.js)$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {
                    presets: ['react', 'es2015']
                }
            }   
        ]
    }
};