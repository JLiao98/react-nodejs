var path=require("path");

module.exports={
    entry:  "./public/javascripts/index.jsx",
    output: {
        path: path.join(__dirname,"./public/out"),
        filename: "bundle.js",
        publicPath: "./public/out/"
    },
    module: {
        rules: [
            {test: /\.js$/, loader: "babel-loader",exclude:/node_modules/,query: {presets: ['react','es2015']}},
            {test: /\.jsx$/,loader: 'babel-loader',exclude:/node_modules/,query: {presets: ['react', 'es2015']}},
            {test: /\.css$/, loader: "style-loader!css-loader"},
            {test: /\.(jpg|png|otf)$/, loader: "url-loader?limit=8192"},
            {test: /\.scss$/, loader: "style-loader!css-loader!sass-loader"}
        ]
    }
};