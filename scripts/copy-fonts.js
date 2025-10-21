const fs = require("fs/promises");
const path = require("path");

async function copyFonts() {
  const srcDir = path.resolve(__dirname, "../src/fonts");
  const destDir = path.resolve(__dirname, "../dist/fonts");

  try {
    await fs.mkdir(destDir, { recursive: true });
    const entries = await fs.readdir(srcDir, { withFileTypes: true });

    await Promise.all(
      entries
        .filter((entry) => entry.isFile())
        .map((entry) =>
          fs.copyFile(
            path.join(srcDir, entry.name),
            path.join(destDir, entry.name)
          )
        )
    );
  } catch (error) {
    console.error("Failed to copy font assets:", error);
    process.exitCode = 1;
  }
}

copyFonts();
