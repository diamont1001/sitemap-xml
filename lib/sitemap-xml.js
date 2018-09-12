/**
 * XML格式地图文件
 *
 * @author 材主<diamont1001@163.com>
 */

'use strict';

const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const mkdirp = require('mkdirp');
const sm = require('sitemap');
const SubSitemap = require('./sub-sitemap');

class SitemapXml {
  /**
    * 构造函数
    * @param  {String} name  地图标识，比如「wdj」（为了支持多个站点地图生成，这里需要使用name作为地图标识）
    * @param  {String} sitemapUrl 地图在目标服务器上的地址，比如'http://www.wandoujia.com/sitemap/'
    * @param  {Object} option {
    *                         releasePath: 地图保存路径
    *                         changefreq: 更新频率（always,hourly,daily,weekly,monthly,yearly,never）
    *                         priority: 权重（0.0 - 1.0）
    *                         mobile: 移动支持（pc,mobile,htmladapt）
    *                  }
    * @return {void} -
    */
  constructor(name, sitemapUrl, option) {
    this.name = name;
    this.subMaps = {};
    this.sitemapUrl = new URL(name, sitemapUrl).toString(); // 地图在目标服务器上的地址

    const releasePath = (option && option.releasePath) ? option.releasePath : './sitemap/';
    this.releasePath = path.join(releasePath, name); // 地图保存路径
    this.indexFile = path.join(this.releasePath, 'index.xml'); // 地图索引文件

    this.jsonFile = path.join(this.releasePath, 'index.json'); // 地图文件列表
    this.json = {
      index: path.join(name, 'index.xml'),
      files: []
    };

    this.changefreq = (option && option.changefreq) ? option.changefreq : undefined;
    this.priority = (option && option.priority !== undefined && option.priority !== null) ? option.priority : undefined;
    this.mobile = (option && option.mobile) ? option.mobile : undefined;

    mkdirp.sync(this.releasePath); // 生成路径
  }

  /**
    * 增加一种地图类型
    * @param {String} type 地图类型（要保证惟一性），比如应用详情页的地图类型可以设定为'apps'
    * @param {String} changefreq 更新频率（always,hourly,daily,weekly,monthly,yearly,never）
    * @param {Number} priority 权重（0-1）
    * @param {String} mobile 移动支持
    * @return {void} -
    */
  addSitemapType(type, changefreq, priority, mobile) {
    if (this.subMaps[type]) {
      return this.subMaps[type];
    }

    changefreq = changefreq ? changefreq : this.changefreq;
    priority = (priority !== undefined && priority !== null) ? priority : this.priority;
    mobile = mobile ? mobile : this.mobile;

    return this.subMaps[type] = new SubSitemap(this.releasePath, type, changefreq, priority, mobile);
  }

  addLine(type, url, option) {
    this.subMaps[type].addLine(url, option);
  }

  end(type) {
    this.subMaps[type].end();
  }

  // 生成索引文件
  createIndex() {
    const list = [];
    for (let item in this.subMaps) {
      if (item && this.subMaps.hasOwnProperty(item)) {
        const files = this.subMaps[item].getFiles();
        for (let i = 0; i < files.length; i++) {
          list.push(new URL(files[i], this.sitemapUrl).toString());
          this.json.files.push(path.join(this.name, files[i]));
        }
      }
    }

    const smi = sm.buildSitemapIndex({
      lastmodrealtime: true,
      urls: list
    });

    fs.writeFileSync(this.indexFile, smi.toString());
    fs.writeFileSync(this.jsonFile, JSON.stringify(this.json));

    return this.indexFile;
  }
}

module.exports = SitemapXml;
