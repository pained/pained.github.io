# drewpaine.net

Personal site built with [Eleventy](https://www.11ty.dev/) and published to GitHub Pages by GitHub Actions on every push to `main`.

## Working locally

You need [Node.js](https://nodejs.org/) 20 or newer.

```sh
npm install     # once, after cloning
npm start       # preview at http://localhost:8080, reloads on save
npm run build   # build the published site into _site/
```

Run `npm run build` before opening a pull request. If it fails, the site won't publish.

## Where things live

| Path | What it is |
| --- | --- |
| `src/index.njk` | Home page |
| `src/blog/index.njk` | Blog page (lists posts automatically) |
| `src/blog/posts/` | Blog posts, one Markdown file each |
| `src/_data/authors.json` | Author names, bios, emails and photos |
| `src/_includes/layouts/base.njk` | Shared page wrapper: head, analytics, navigation, footer |
| `src/_includes/layouts/post.njk` | Blog post layout: title, lede, byline, author bio |
| `src/css/style.css` | All styles |
| `src/img/` | Images |
| `eleventy.config.js` | Build settings, date filters, sidebar/callout shortcodes |

Everything under `src/` is the site. `_site/` is generated output and isn't committed.

## Turning the blog on

The blog is currently off: the site is a single page, with no menu, and nothing under `src/blog/` is published. To turn it on, set `BLOG_ENABLED` to `true` at the top of `eleventy.config.js`. That publishes the blog page and posts and shows the Home / Blog menu on every page.

## Writing a blog post

1. Copy `src/blog/posts/example-post.md` to a new file in the same folder. The file name becomes the address, e.g. `my-topic.md` → `/blog/my-topic/`. Use lowercase words separated by hyphens.
2. Fill in the details at the top:

   ```yaml
   ---
   title: My Post Title
   lede: One or two sentences summarizing the post. Also shown on the blog page.
   author: drew          # a key from src/_data/authors.json
   date: 2026-10-01      # YYYY-MM-DD; sets the order on the blog page
   draft: true           # remove to publish
   ---
   ```

3. Write paragraphs in Markdown, separated by blank lines.
4. Add boxes where needed. The text inside can use Markdown:

   ```
   {% sidebar "Sidebar Title" %}
   Floats beside the text on wide screens, full width on phones.
   {% endsidebar %}

   {% callout "Callout Title" %}
   A highlighted, full-width box for key points.
   {% endcallout %}
   ```

5. Preview with `npm start`. Drafts appear in the preview but aren't published. Remove `draft: true` when the post is ready.

## Adding an author

Add an entry to `src/_data/authors.json`. The key (e.g. `"jane"`) is what posts use for `author:`.

```json
"jane": {
  "name": "Jane Doe",
  "bio": "is a ... (a few sentences, starting after the name)",
  "email": "jdoe - at - example - dot - org",
  "photo": "/img/authors/jane.jpg"
}
```

- Write the bio to follow the name: the page shows **Jane Doe** followed by the bio text.
- Write emails in the spelled-out form above so spam bots can't collect them.
- Use a square photo; it's shown as a small circle. `/img/author-placeholder.svg` works until a real photo is available.

## Adding a page

1. Create a Markdown file in `src/`, e.g. `src/talks.md`. The file name becomes the address: `/talks/`.
2. Start it with:

   ```yaml
   ---
   layout: layouts/base.njk
   title: Talks
   ---
   ```

3. Write the content in Markdown. HTML also works when you need more control.
4. To link it from the navigation, add a line to the `<nav>` in `src/_includes/layouts/base.njk`, following the Home and Blog links.

## Adding images and files

- Put images in `src/img/` (or a subfolder) and reference them with a leading slash: `![Description](/img/my-photo.jpg)` in Markdown, or `<img src="/img/my-photo.jpg" alt="Description">` in HTML.
- Always include alt text describing the image.
- Keep images reasonably small (under ~500 KB); resize large photos before adding them.
- To host other files such as PDFs, create a folder under `src/` and add it to `eleventy.config.js` with `eleventyConfig.addPassthroughCopy("src/your-folder");`.

## Styles

All styles are in `src/css/style.css`. Page content is centered and capped at 70% of the window width, widening to 90% on screens under 600px. Check any style change at both desktop and phone widths.

## Submitting changes

1. Create a branch from `main`.
2. Make your changes and check them with `npm start` and `npm run build`.
3. Open a pull request into `main`.
4. Once it's merged, GitHub Actions rebuilds and publishes the site. You can follow progress in the repo's **Actions** tab. Changes usually go live within a couple of minutes.
