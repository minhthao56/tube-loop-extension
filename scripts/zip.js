const fs = require("fs");
const archiver = require("archiver");

async function zipFolder(dir) {
  const output = fs.createWriteStream(`chrome.zip`);
  const archive = archiver("zip", {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.directory(dir, false);

  console.log("Zipping...");
  try {
    await archive.finalize();
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Done");
  }
}
zipFolder("build");
