const Image = require("@11ty/eleventy-img")
const path = require('path')
const htmlmin = require("html-minifier");

// https://www.brycewray.com/posts/2021/04/using-eleventys-official-image-plugin/
async function imageShortcode(src, alt) {
  let sizes = "(min-width: 1024px) 100vw, 50vw"
  let srcPrefix = `src/img-org/`

  src = srcPrefix + src
  
  console.log(`Generating image(s) from:  ${src}`)
  
  if (alt === undefined) {
    throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`)
  }

  let metadata = await Image(src, {
    widths: [200],
    formats: ['webp', 'jpeg'],
    urlPath: "/img/",
    outputDir: "dist/img/",
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}w.${format}`
    }
  })

  let lowsrc = metadata.jpeg[0]
  let highsrc = metadata.jpeg[metadata.jpeg.length - 1]

  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`
    }).join("\n")}
    <img
      src="${lowsrc.url}"
      width="${highsrc.width}"
      height="${highsrc.height}"
      alt="${alt}"
      loading="lazy"
      decoding="async">
  </picture>`
}

(async () => {
  await Image('src/img-org/logo.svg', {
    widths: [300],
    formats: ['jpeg'],
    outputDir: 'dist/img/',
    filenameFormat: function (id, src, width, format, options) {
      const extension = path.extname(src)
      const name = path.basename(src, extension)
      return `${name}-${width}.${format}`
    }
  })
})()

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/img")
  eleventyConfig.addPassthroughCopy("src/css")
  
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode)
  eleventyConfig.addLiquidShortcode("image", imageShortcode)
  // === Liquid needed if `markdownTemplateEngine` **isn't** changed from Eleventy default
  eleventyConfig.addJavaScriptFunction("image", imageShortcode)

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath && outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })

      return minified
    }

    return content
  })

  return {
    dir: {
      input: "src",
      output: "dist"
    }
  }
}
