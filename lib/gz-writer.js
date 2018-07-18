/**
 * 创建一个 gz 包，并提供写入方法
 */

'use strict';

const fs = require('fs');
const zlib = require('zlib');

class GzWriter {
  constructor(path) {
    this.outs = fs.createWriteStream(path);
    this.zouts = zlib.createGzip();
    this.outs.on('error', handleWriteError);
    this.zouts.pipe(this.outs);
  }

  write(data) {
    this.zouts.write(data);
  }

  end(cb) {
    (typeof cb !== 'function') && (cb = function() {});
    this.zouts.on('end', cb);
    this.zouts.on('error', cb);
    this.zouts.end();
    this.zouts = null;
  }
}

function handleWriteError(err) {
  console.error('写入文件失败:' + err);
}

module.exports = GzWriter;
