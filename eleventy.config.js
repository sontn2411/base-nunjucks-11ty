const eleventySass = require("eleventy-sass");
const eleventyPluginTailwindcss = require("eleventy-plugin-tailwindcss-4");

module.exports = function (eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(eleventyPluginTailwindcss, {
    input: "assets/styles/tailwind.css",
    output: "assets/styles/tailwind.css",
    minify: false, // Set to true for production if needed
    watchOutput: true,
  });



  // Passthrough copy for images or other assets
  // Passthrough copy for images, fonts, and js
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  // Do NOT copy src/assets/css as it is handled by the tailwind plugin

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    templateFormats: ["html", "njk", "md", "scss"],
  };
};
