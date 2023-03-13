const fs = require("fs");
const path = require("path");

function copyDir(sourceDir, destDir) {
  try {
    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir);
    }

    // Get a list of files and directories in the source directory
    const files = fs.readdirSync(sourceDir);

    // Loop through each file/directory and copy it to the destination directory
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);

      // If the file is a directory, recursively copy it
      if (fs.statSync(sourcePath).isDirectory()) {
        copyDir(sourcePath, destPath);
      } else {
        fs.copyFileSync(sourcePath, destPath);
      }
    }

    console.log(`Successfully copied '${sourceDir}' to '${destDir}'`);
  } catch (err) {
    throw new Error(`Error copying '${sourceDir}' to '${destDir}': ${err}`);
  }
}

module.exports = { copyDir };
