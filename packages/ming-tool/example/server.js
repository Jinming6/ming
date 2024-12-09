const { Option } = require('../dist/cjs/ming-tool.min');
const http = require('http');
const {
  getMergedData,
  Mode,
} = require('../../merge-helper/dist/cjs/merge-helper.min');

const list = [
  { id: 0, name: '张三', address: '山东省青岛市', tagValue: '1' },
  { id: 1, name: '李四', address: '山东省青岛市', tagValue: '1' },
  { id: 2, name: '王五', address: '山东省青岛市', tagValue: '2' },
];

const tagOpts = new Option({
  dataSource: [
    { label: '标签A', value: '1' },
    { label: '标签B', value: '2' },
  ],
});

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const fmtList = list.map((item) => {
    return {
      ...item,
      tagLabel: tagOpts.getLabel({ key: item.tagValue }),
    };
  });
  const mergedData = getMergedData({
    mode: Mode.Row,
    dataSource: fmtList,
    mergeFields: ['address'],
  });
  res.end(JSON.stringify(mergedData, null, 2));
});

server.listen(3000, () => {
  console.log('http://localhost:3000');
});
