const path = require('path');

module.exports = {
    mode: 'development',
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            { test: /.tsx?$/, use: ['ts-loader'], exclude: /node_modules/ },
            { test:/\.(s*)css$/, use:['style-loader','css-loader'] },
            { test: /\.(png|jp(e*)g|svg|gif)$/, use: ['file-loader']},
        ]
    },
    watch: true,
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }, 
    
}