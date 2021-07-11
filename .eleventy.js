module.exports = function (eleventyConfig) {

    const markdownIt = require('markdown-it');
    const markdownItOptions = {
        html: true,
        linkify: true
    };

    const md = markdownIt(markdownItOptions)
        .use(require('markdown-it-footnote'))
        .use(require('markdown-it-attrs'))
        .use(require('markdown-it-emoji'))
        .use(function (md) {
            // Recognize Mediawiki links ([[text]])
            md.linkify.add("[[", {
                validate: /^\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/,
                normalize: match => {
                    const parts = match.raw.slice(2, -2).split("|");
                    parts[0] = parts[0].replace(/.(md|markdown)\s?$/i, "");
                    match.text = (parts[1] || parts[0]).trim();
                    if (match.text === "Home") {
                        match.url = "/"
                    } else {
                        match.url = `/notes/${parts[0].trim()}/`
                    }

                }
            })
        })

    md.renderer.rules.table_open = function (tokens, idx, options, env, self) {
        return '<table class="table">\n';
    }

    eleventyConfig.addFilter("markdownify", string => {
        return md.render(string)
    })

    eleventyConfig.addFilter("sortByTitle", values => {
        let vals = [...values]
        return vals.sort((a, b) => a.data.title.localeCompare(b.data.title));
    })

    eleventyConfig.setLibrary('md', md);

    eleventyConfig.addCollection("notes", function (collection) {
        return collection.getFilteredByGlob(["notes/**/*.md", "index.md"]);
    });

    eleventyConfig.addPassthroughCopy('assets');

    return {
        useGitIgnore: false,
        dir: {
            input: "./",
            output: "_site",
            layouts: "layouts",
            includes: "includes",
            data: "_data"
        },
        passthroughFileCopy: true
    }
}