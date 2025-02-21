const http = require('http');
const { dataSource } = require('./data.json');
const mergeHelper = require('../dist/cjs/merge-helper');
function main() {
  try {
    const mergedData = mergeHelper.getMergedData({
      mode: mergeHelper.Mode.Row,
      dataSource,
      mergeFields: ['name'],
      genSort: true,
    });

    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(mergedData));
    });
    server.listen(3000, () => {
      console.log('Server is running on http://localhost:3000');
    });
  } catch (e) {
    console.error(e);
  }
}

main();
