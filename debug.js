try {
  const tailwindPlugin = require("eleventy-plugin-tailwindcss-4");
  console.log("eleventy-plugin-tailwindcss-4 exports:", tailwindPlugin);
} catch (e) {
  console.error("eleventy-plugin-tailwindcss-4 failed:", e.message);
}
