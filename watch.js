const fs = require("fs");
const path = require("path");
const open = require("open");

const WATCH_DIR = "/Users/fdb/Downloads/";
const TARGET_DIR = "/Users/fdb/StudentProjects/cato/pdf-generator/public/data/";

fs.watch(WATCH_DIR, (event, filename) => {
  console.log(`Event ${event}: ${filename}`);
  if (!filename) return;
  if (!filename.endsWith(".json")) return;

  if (filename.startsWith("links-for-images")) {
    const oldFilename = path.join(WATCH_DIR, filename);
    const newFilename = path.join(TARGET_DIR, "links-for-images.json");
    fs.renameSync(oldFilename, newFilename);
    open("http://localhost:3000/machines/1-image-fetcher");
    open("http://localhost:3000/machines/1-generate-links-book");
  }

  if (filename.startsWith("images-for-captions")) {
    const oldFilename = path.join(WATCH_DIR, filename);
    const newFilename = path.join(TARGET_DIR, "image-for-captions.json");
    fs.renameSync(oldFilename, newFilename);
    open("http://localhost:3000/machines/2-caption-fetcher");
  }
});
