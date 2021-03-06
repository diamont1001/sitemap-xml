# sitemap-xmls

`sitemap-xmls` is a high-level sitemap-generating framework that makes creating sitemap XML files easy.

## Installation

```bash
npm install sitemap-xmls --save
```

## Usage

```js
const smXml = require('sitemap-xmls');

const sitemapXml = new smXml('demo', 'https://demo.com/sitemap/',{
  releasePath: './release/'
});

// add a sitemap with type of 'apps'
sitemapXml.addSitemapType('apps', 'monthly', 0.8);

sitemapXml.addLine('apps', 'https://demo.com/apps-demo-1.html');
sitemapXml.addLine('apps', 'https://demo.com/apps-demo-2.html');
sitemapXml.addLine('apps', 'https://demo.com/apps-demo-3.html', {
  lastmod: '2018-10-01',
  changefreq: 'daily',
  priority: 0.6
});

// important: don't forget the 'end()'
sitemapXml.end('apps');


// add another sitemap with type of 'topics'
sitemapXml.addSitemapType('topics', 'daily', 0.9);

sitemapXml.addLine('topics', 'https://demo.com/topics-demo-1.html');
sitemapXml.addLine('topics', 'https://demo.com/topics-demo-2.html');
sitemapXml.addLine('topics', 'https://demo.com/topics-demo-3.html');

// important: don't forget the 'end()'
sitemapXml.end('topics');


// finally, generate the index file
sitemapXml.createIndex();
```

after that, it will generator sitemap just like in `./release/demo/`:

- `demo/index.json`
- `demo/index.xml`
- `demo/apps_10000.xml.gz`
- `demo/topics_10000.xml.gz`

【demo/index.json】

```json
{"index":"demo/index.xml","files":["demo/apps_10000.xml.gz","demo/topics_10000.xml.gz"]}
```

【demo/index.xml】

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<sitemap>
<loc>https://demo.com/sitemap/demo/apps_10000.xml.gz</loc>
<loc>https://demo.com/sitemap/demo/topics_10000.xml.gz</loc>
</sitemap>
</sitemapindex>
```

【demo/apps_10000.xml.gz】

```xml
<?xml version="1.0" encoding="UTF-8"?><urlset>
<url>
<loc>https://demo.com/apps-demo-1.html</loc>
<lastmod>2018-07-18</lastmod>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://demo.com/apps-demo-2.html</loc>
<lastmod>2018-07-18</lastmod>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
<url>
<loc>https://demo.com/apps-demo-3.html</loc>
<lastmod>2018-10-01</lastmod>
<changefreq>daily</changefreq>
<priority>0.6</priority>
</url>
</urlset>
```

【demo/topics_10000.xml.gz】

```xml
<?xml version="1.0" encoding="UTF-8"?><urlset>
<url>
<loc>https://demo.com/topics-demo-1.html</loc>
<lastmod>2018-07-18</lastmod>
<changefreq>daily</changefreq>
<priority>0.9</priority>
</url>
<url>
<loc>https://demo.com/topics-demo-2.html</loc>
<lastmod>2018-07-18</lastmod>
<changefreq>daily</changefreq>
<priority>0.9</priority>
</url>
<url>
<loc>https://demo.com/topics-demo-3.html</loc>
<lastmod>2018-07-18</lastmod>
<changefreq>daily</changefreq>
<priority>0.9</priority>
</url>
</urlset>
```

## Params

### changefreq

- always
- hourly
- daily
- weekly
- monthly
- yearly
- never

### priority

0.0 ~ 1.0

### mobile

```xml
<mobile:mobile type="mobile"/> ：移动网页      
<mobile:mobile type="pc,mobile"/>：自适应网页
<mobile:mobile type="htmladapt"/>：代码适配
```

无该上述 `mobile` 标签表示为PC网页。

## 附：相关文档

- [百度 sitemap](https://ziyuan.baidu.com/college/courseinfo?id=267&page=2#04)
- [sitemaps.org](https://www.sitemaps.org/index.html)
