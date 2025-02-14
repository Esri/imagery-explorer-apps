// public-folder.spec.js
const fs = require("fs");
const path = require("path");
const config = require("../../src/config.json");

describe("Public folder should contain thumbnail image for each app", () => {
  // Get all app names except the ones that don't have thumbnails
  const appNames = Object
    .keys(config.apps)
    .filter(appName => {
      return appName !== "spectral-sampling-tool"
    });

  const requiredFiles = appNames.map(appName => `${appName}.jpg`);
  // console.log(requiredFiles)

  requiredFiles.forEach(file => {
    it(`should contain ${file}`, () => {
      const filePath = path.join(__dirname, "../thumbnails", file);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  });
});