import markdownIt from "markdown-it";

const md = markdownIt({ html: true });

// Set to true to publish the blog and show the site menu
const BLOG_ENABLED = false;

export default function (eleventyConfig) {
  // Files copied to the site as-is
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");
  eleventyConfig.addPassthroughCopy("src/CNAME");
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addGlobalData("blogEnabled", BLOG_ENABLED);

  // While the blog is off, nothing under src/blog/ is built
  eleventyConfig.addPreprocessor("blog-off", "*", (data) => {
    if (!BLOG_ENABLED && data.page.inputPath.startsWith("./src/blog/")) {
      return false;
    }
  });

  // Posts with `draft: true` show up in `npm start` previews but are left out of the published build
  eleventyConfig.addPreprocessor("drafts", "*", (data) => {
    if (data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
      return false;
    }
  });

  // "September 28, 2026"
  eleventyConfig.addFilter("readableDate", (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    })
  );

  // "2026-09-28", for <time datetime="">
  eleventyConfig.addFilter("isoDate", (date) =>
    new Date(date).toISOString().slice(0, 10)
  );

  // {% callout "Title" %}Markdown text{% endcallout %}
  eleventyConfig.addPairedShortcode("callout", (content, title) =>
    box("callout", content, title)
  );

  // {% sidebar "Title" %}Markdown text{% endsidebar %}
  eleventyConfig.addPairedShortcode("sidebar", (content, title) =>
    box("sidebar", content, title)
  );

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
  };
}

// Kept on few, unindented lines so the Markdown renderer doesn't treat the HTML as a code block
function box(className, content, title) {
  const heading = title ? `<h3>${md.utils.escapeHtml(title)}</h3>` : "";
  return `<aside class="${className}">${heading}${md.render(content.trim())}</aside>`;
}
