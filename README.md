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
sitemapXml.addLine('apps', 'https://demo.com/apps-demo-3.html');

// important: don't forget the 'end()'
sitemapXml.end('apps');


// add another sitemap with type of 'topics'
sitemapXml.addSitemapType('topics', 'daily', 0.9);

sitemapXml.addLine('topics', 'https://demo.com/topics-demo-1.html');
sitemapXml.addLine('topics', 'https://demo.com/topics-demo-2.html');
sitemapXml.addLine('topics', 'https://demo.com/topics-demo-3.html');

// important: don't forget the 'end()'
sitemapXml.end('topics');


// finally, generator the index file
sitemapXml.createIndex();
```

after that, it will generator sitemap just like in `./release/demo/`:

- `index.xml`
- `apps_10000.xml.gz`
- `topics_10000.xml.gz`

【index.xml】

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<sitemap>
<loc>https:/www.wandoujia.com/sitemap/wdj/apps_10000.xml.gz</loc>
<loc>https:/www.wandoujia.com/sitemap/wdj/topics_10000.xml.gz</loc>
</sitemap>
</sitemapindex>
```

【apps_10000.xml.gz】

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
<lastmod>2018-07-18</lastmod>
<changefreq>monthly</changefreq>
<priority>0.8</priority>
</url>
</urlset>
```

【topics_10000.xml.gz】

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

## 附：相关文档

- [百度 sitemap](https://ziyuan.baidu.com/college/courseinfo?id=267&page=2#04)
- [sitemaps.org](https://www.sitemaps.org/index.html)
