// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "World ID",
  tagline:
    "Prove a human is doing an action only once without revealing any personal data",
  url: "https://world-id.worldcoin.org",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "throw",
  favicon: "img/favicon.ico",
  organizationName: "worldcoin", // GitHub org
  projectName: "world-id-docs", // Repo name

  plugins: [
    "docusaurus-plugin-sass",
    "posthog-docusaurus",
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "api",
        path: "api",
        routeBasePath: "api",
        sidebarPath: require.resolve("./sidebars.js"),
        editUrl: "https://github.com/worldcoin/world-id-docs/tree/main/",
        showLastUpdateTime: true,
      },
    ],
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/worldcoin/world-id-docs/tree/main/",
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.scss"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "World ID",
        logo: {
          alt: "World ID Logo",
          src: "img/logomark.svg",
          srcDark: "img/logomark-dark.svg",
        },
        items: [
          {
            type: "doc",
            docId: "index",
            position: "left",
            label: "Docs",
          },
          {
            type: "doc",
            docsPluginId: "api",
            docId: "index",
            position: "left",
            label: "API",
          },
          {
            to: "/examples",
            position: "left",
            label: "Examples",
          },
          {
            href: "https://developer.worldcoin.org",
            position: "right",
            label: "Developer Portal",
          },
          {
            to: "/feedback",
            label: "✨ Feedback",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "/docs",
              },
              {
                label: "Quick Start",
                to: "/docs/quick-start",
              },
              {
                label: "Javascript Integration",
                to: "/docs/js",
              },
              {
                label: "Examples",
                to: "/examples",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/worldcoin",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/worldcoin",
              },
              {
                label: "Hackathons",
                to: "/docs/hackathons",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: "https://github.com/worldcoin",
              },
              {
                label: "Worldcoin",
                href: "https://worldcoin.org",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tools for Humanity Corporation.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      posthog: {
        apiKey: "phc_QttqgDbMQDYHX1EMH7FnT6ECBVzdp0kGUq92aQaVQ6I", // cspell:disable-line
        appUrl: "https://app.posthog.com",
        enableInDevelopment: false,
        persistence: "localStorage",
        autocapture: false,
      },
      algolia: {
        appId: "O4JS38E98E",
        apiKey: "4ed94b4d8517278004c4fd8b4f5bf659", // Public API key: it is safe to commit it
        indexName: "worldcoin",
        contextualSearch: true,
        searchPagePath: "search",
      },
      announcementBar: {
        id: "eth_ny",
        content:
          '🗽 Are you coming to ETH NY? Check out our <a target="_blank" href="https://worldcoin.org/ethny">Hub</a> for full hackathon details, workshops and other amazing events.',
        backgroundColor: "#F0EDF9",
        textColor: "#29576B",
        isCloseable: true,
      },
    }),
};

module.exports = config;
