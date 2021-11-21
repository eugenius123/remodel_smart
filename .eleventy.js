module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("Source/img")
    eleventyConfig.addPassthroughCopy("Source/**/*.css")

    return {
        dir: {
            input: "Source",
            output: "Dist",
            layouts: "Layouts",
        }
    }
}
