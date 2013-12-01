/**
 * DocPad Configuration File
 * http://docpad.org/docs/config
 */

var docpadConfig = {
  templateData: {
    site: {
      title: "<%= _.slugify(appname) %>",
      url: "http://example.com",
      description: "When your website appears in search results in say Google, the text here will be shown underneath your website's title.",
      keywords: "place, your, website, keywoards, here",
      styles: [
        "main.css"
      ],
      scripts: [
        "main.js"
      ]
    }
  }
};

module.exports = docpadConfig;
