/**
 * 扩展gzwriter服务，写入标准的xml服务，提供单行xml写入方法
 */

'use strict';

const GzWriter = require('./gz-writer');

class SitemapXmlGen {
  constructor(path) {
    this.outs = new GzWriter(path);
    this.outs.write('<?xml version="1.0" encoding="UTF-8"?><urlset>\n');
  }

  /**
   * 单行写入
   * @param {object} data eq. {loc: 'http://xxx', lastmod: '2017-06-03'}
   */
  writeItem(data) {
    let strXml = '<url>\n';

    strXml += '<loc>' + data.loc + '</loc>\n';

    if (data.mobile) {
      strXml += '<mobile:mobile type=' + data.mobile + '/>\n';
    }
    if (data.lastmod) {
      strXml += '<lastmod>' + data.lastmod + '</lastmod>\n';
    }
    if (data.changefreq) {
      strXml += '<changefreq>' + data.changefreq + '</changefreq>\n';
    }
    if (data.priority) {
      strXml += '<priority>' + data.priority + '</priority>\n';
    }
    strXml += '</url>\n';
    
    this.outs.write(strXml);
  }

  end(cb) {
    this.outs.write('</urlset>');
    this.outs.end(cb);
    this.outs = null;
  }
}

module.exports = SitemapXmlGen;
