var glob = require('glob');
var path = require('path');

const pages = {};
let entries;

try {
  entries = glob('src/pages/*/*.html', {sync: true});

} catch (error) {
  entries = [];
  throw error
}
//格式化生成入口
entries.forEach(file => {
  const fileSplit = file.split('/');
  const baseName = path.basename(file, path.extname(file));

  const pageHtml = file;
  const entryJS = fileSplit.slice(0,3).join('/') + '/' + baseName + '.js';

  pages[baseName] = {
    entry: entryJS,
    template: pageHtml,
    filename: `${baseName}.html`
  }
});

/*eslint-disable*/
console.log(pages);


//匹配入口的url
const devServer = {
  historyApiFallback: {
    rewrites: [
      // { from: /./, to: '/index.html'},
      { from: /^\/admin/, to: '/admin.html'}
    ]
  }
}

module.exports = {
  pages,
  devServer
}