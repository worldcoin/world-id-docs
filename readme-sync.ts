/**
 * This script syncs the READMEs of all World ID repositories so all of them have the same contextual information.
 * The content from SHARED-README.md is added to all World ID repositories.
 */

import fetch from "node-fetch";
const fs = require("fs");

const matchRegex =
  /<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->(\r\n|\r|\n|.)*<!-- WORLD-ID-SHARED-README-TAG:END -->/;
const sharedReadme: string = fs.readFileSync("SHARED-README.md", "utf8");
const readmeSubstitution = `<!-- WORLD-ID-SHARED-README-TAG:START - Do not remove or modify this section directly -->\n${sharedReadme}\n<!-- WORLD-ID-SHARED-README-TAG:END -->`;

const localSync = async () => {
  // Local sync
  const localReadme: string = fs.readFileSync("README.md", "utf8");

  const newReadme = localReadme.replace(matchRegex, readmeSubstitution);

  if (newReadme !== localReadme) {
    fs.writeFileSync("README.md", newReadme, { encoding: "utf8", flag: "w" });
    console.log("✏️ Updated local README.");
  } else {
    console.log("✅ Local README is up-to-date.");
  }
};

interface RepositoryInterface {
  name: string;
  url: string;
}
interface RepositoriesInterface {
  description: string;
  list: RepositoryInterface[];
}

const remoteSync = async () => {
  console.log("Starting remote sync ...");

  const repositories: RepositoriesInterface = require("./repositories.json");

  for (const repository of repositories.list) {
    console.log(`Starting check for ${repository.name}`);
    const response = await fetch(
      `${repository.url}/blob/main/README.md?raw=true`
    );

    if (!response.ok) {
      throw new Error(
        `Error fetching README for repository ${repository.name}`
      );
    }

    const currentReadme: string = await response.text();

    if (currentReadme.indexOf("WORLD-ID-SHARED-README-TAG:START") === -1) {
      throw new Error(
        `${repository.name} repository does not have the shared README tag.`
      );
    }

    const newReadme = currentReadme.replace(matchRegex, readmeSubstitution);
    if (newReadme !== currentReadme) {
      console.log(`Updating ${repository.name}`);
    }
  }
};

if (require.main === module) {
  if (process.argv[2] === "remote") {
    remoteSync();
  } else {
    localSync();
  }
}
