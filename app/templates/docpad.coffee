# DocPad Configuration File
# http://docpad.org/docs/config

docpadConfig = {
  templateData:
    site:
      # The default title of our website.
      title: "<%= appname %>"

      # The production url of our website.
      url: "http://example.com"

      # The website description (for SEO).
      description: """
        When your website appears in search results in say Google, the text here
        will be shown underneath your website's title.
        """

      # The website keywords (for SEO) separated by commas.
      keywords: """
        place, your, website, keywords, here
        """

      # The cascading stylesheets for the site.
      styles: [
        "main.css"
      ]

      # The JavaScript files for the site.
      scripts: [
        "main.js"
      ]

}

# Export the DocPad Configuration
module.exports = docpadConfig
