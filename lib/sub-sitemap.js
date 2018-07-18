/**
 * XML格式地图文件
 *
 * @author 材主<diamont1001@163.com>
 */

'use strict';

const path = require('path');
const mkdirp = require('mkdirp');
const SitemapXmlGen = require('./sitemap-xml-gen');
const Utils = require('./utils');

// 分文件
class SubSitemap {

  /**
   * 构造函数
   * @param  {String} filePath  生成的地图文件保存路径
   * @param  {String} type  URL类型（要保证惟一性），比如应用详情页可以type=apps
   * @param {String} changefreq 更新频率（always,hourly,daily,weekly,monthly,yearly,never）
   * @param {Number} priority 权重（0.0 - 1.0）
   * @return {void} -
   */
  constructor(filePath = './sitemap/', type = '', changefreq, priority) {
    this.type = type;
    this.filePath = filePath;

    this.changefreq = changefreq;
    this.priority = priority;

    this.files = []; // 生成的分文件列表
    this.lineIndex = 0; // 目前所在URL行数
    this.lineLimit = 50000; // 每个文件不超过 50000 条URL，不超过 10M 大小

    mkdirp.sync(this.filePath); // 生成路径
    this.newXml(); // 建立一个新文件
  }

  newXml() {
    // 结束现有的
    this.writerHandle && this.writerHandle.end();

    let file = (10000 + this.files.length) + '.xml.gz';
    if (this.type) {
      file = this.type + '_' + file;
    }
    this.files.push(file);

    this.writerHandle = new SitemapXmlGen(path.join(this.filePath, file));
  }

  addLine(url) {
    if (this.lineIndex >= this.lineLimit) {
      this.lineIndex = 0;
      this.newXml();
    }

    this.lineIndex++;
    this.writerHandle.writeItem({
      loc: url,
      lastmod: Utils.stampFormat2Date('Y-m-d', Date.now()),
      changefreq: this.changefreq,
      priority: this.priority
    });
  }

  end() {
    this.writerHandle && this.writerHandle.end();
    this.writerHandle = null;
  }

  getFiles() {
    return this.files;
  }
}

module.exports = SubSitemap;
