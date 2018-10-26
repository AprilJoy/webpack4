const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require( "glob" )

function getVendors() {
    let globPath = `src/js/**/*.*`
	let files = glob.sync( globPath )
	let libsArr = []
	files.forEach( ( v, i ) => {
		libsArr.push( './' + v )
	} )
	return libsArr
}
let vendorsDir = getVendors()


/**
*
* @param {string}  globPath  文件的路径
* @returns entries
*/
function getView(globPath,flag){
    let files = glob.sync(globPath);

    let entries = {},
    entry, dirname, basename, pathname, extname;

    files.forEach(item => {
        entry = item;
        dirname = path.dirname(entry);//当前目录
        extname = path.extname(entry);//后缀
        basename = path.basename(entry, extname);//文件名
        pathname = path.join(dirname, basename);//文件路径
        if (extname === '.html') {
            entries[pathname] = './' + entry;
        } else if (extname === '.js') {
            entries[basename] = entry;
        }
    });
    return entries;
}

let entriesObj = getView('./src/pages/*/*.js');
let pages = Object.keys(getView('./src/pages/*/*html'));
let configure = { 
    entry: entriesObj,
    output: {
        path: path.resolve('dist'),
        publicPath: '/dist',
        filename: 'js/[name].js',            //每个页面对应的主js的生成配置
    },
    plugins: [],
    stats: {
        errors: false,
        errorDetails: false,
        colors: true,
        modules: false,
        children: false, 
        chunks: false,
        chunkModules: false
    },
    module: {
        rules: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style-loader!css-loader' }
        ]
    }  
}

configure.entry['vendors'] = vendorsDir
pages.forEach(pathname => {
    let htmlname = pathname.split('/').pop();
    let conf = {
        filename: `${htmlname}.html`,
        template: `${pathname}.html`,
        hash: true,
        inject: true,
        chunks:[htmlname, 'vendors']
    }
    configure.plugins.push(new HTMLWebpackPlugin(conf));
});

module.exports = configure