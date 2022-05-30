/**
 * This script syncs the READMEs of all World ID repositories so all of them have the same contextual information.
 * The content from SHARED-README.md is added to all World ID repositories.
 */

const fs = require("fs");

const matchRegex =
  /<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->(\r\n|\r|\n|.)*<!-- WORLD-ID-SHARED-README-TAG:END -->/;

const main = async () => {
  const sharedReadme: string = fs.readFileSync("SHARED-README.md", "utf8");

  // Local sync
  const localReadme: string = fs.readFileSync("README.md", "utf8");
  const readmeSubstitution = `<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->\n${sharedReadme}\n<!-- WORLD-ID-SHARED-README-TAG:END -->`;

  const newReadme = localReadme.replace(matchRegex, readmeSubstitution);

  if (newReadme !== localReadme) {
    fs.writeFileSync("README.md", newReadme, { encoding: "utf8", flag: "w" });
    console.log("✏️ Updated local README.");
  } else {
    console.log("✅ Local README is up-to-date.");
  }
};

if (require.main === module) {
  main();
}
