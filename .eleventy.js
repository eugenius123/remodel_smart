const fs = require('fs')
const path = require('path')
const Image = require('@11ty/eleventy-img')
const htmlmin = require('html-minifier')
const sizeOf = require('image-size')

async function createGalleryThumbnails() {
    const galleryDir = await fs.promises.opendir('Source/img/gallery')

    for await (const entry of galleryDir) {
        if (entry.isDirectory) {
            const projectName = entry.name
            const projectDir = await fs.promises.opendir(path.join(galleryDir.path, entry.name))
            console.log(`Generating thumbnails for ${projectName}`)
            for await (const file of projectDir) {
                if (file.isFile()) {
                    const imagePath = path.join(projectDir.path, file.name)
                    const dimensions = sizeOf(imagePath)

                    console.log(`Generating thumbnail for ${file.name}`)
                    await Image(imagePath, {
                        widths: [Math.min(dimensions.width, 200)],
                        formats: ["jpeg"],
                        outputDir: `Dist/img/gallery/${projectName}/thumbnails`,
                        filenameFormat: function (id, src, width, format, options) {
                            return file.name
                        }
                    })

                    console.log(`Optimizing image size for ${file.name}`)
                    await Image(imagePath, {
                        widths: [Math.min(dimensions.width, 2000)],
                        formats: ["jpeg"],
                        outputDir: `Dist/img/gallery/${projectName}`,
                        filenameFormat: function (id, src, width, format, options) {
                            return file.name
                        }
                    })
                }
            }
        }
    }
}

createGalleryThumbnails()

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("Source/img/services")
    eleventyConfig.addPassthroughCopy("Source/img/*.svg")
    eleventyConfig.addPassthroughCopy("Source/img/*.jpg")
    eleventyConfig.addPassthroughCopy("Source/**/*.css")

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
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
            input: "Source",
            output: "Dist",
            layouts: "Layouts",
        }
    }
}
