module.exports = {
    mode: "development",

    entry: {
        // xử lí phần chơi 
        main: "./src/frontend/App.ts",
        // xử lí phần người chơi
        user: "./src/frontend/UserApp.ts"
    },
    // kết quả người chơi
    output:{
    // tên
    filename: "[name].bundle.js",
    chunkFilename: '[name].chunk.js',
    path: __dirname + "/dist/frontend", // chỉ định đường dẫn đến thư mục
    publicPath: "/assets/" // xác định URL
    },

    devtool: "source-map",

    //xác định phần mở rộng .ts .js .tsx
    resolve: {
        extensions: [".ts",".js",".tsx"]
    },

    //chứa các quy tắc rules
    module: {
        rules: [
            {
                // xử lý tệp typesciprts
                test: /\.tsx?$/,
                loader: "ts-loader" 
            },

            {
                // áp dụng source-map-loader cho tệp js
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                //xử lý css
                test: /\.css$/,
                use: [{
                    loader: "style-loader"
                },{
                    loader: "css-loader"
                }]
            }
        ]
    },
    optimization: {
        // cho phép chia nhỏ split
        splitChunks: {
            chunks: "all"
        },
        // loại bỏ các xuất bản
        usedExports: true
    }
}