export type Article = {
  label: string;
  to: string;
  name?: never;
  children?: never;
};

export type Section = {
  name: string;
  children: Array<Article>;
  label?: never;
  to?: never;
};

export const docsNavigation: Array<Section | Article> = [
  { label: "Introduction", to: "/docs" },
  { label: "Quick Start", to: "/docs/quick-start" },

  {
    name: "About World ID",
    children: [
      { label: "Protocol Overview", to: "/docs/about/protocol" },
      { label: "Glossary", to: "/docs/about/glossary" },
      { label: "Privacy", to: "/docs/about/privacy" },
      { label: "Testing", to: "/docs/about/testing" },
    ],
  },

  {
    name: "JS Widget",
    children: [
      { label: "JS Introduction", to: "/docs/js/js-intro" },
      { label: "JS Reference", to: "/docs/js/js-reference" },
      { label: "Error Handling", to: "/docs/js/error-handling" },
      { label: "Telemetry", to: "/docs/js/telemetry" },
    ],
  },

  {
    name: "Advanced",
    children: [
      {
        label: "Proof of Personhood",
        to: "/docs/advanced/proof-of-personhood",
      },
      {
        label: "Zero-knowledge proofs",
        to: "/docs/advanced/zero-knowledge-proofs",
      },
      { label: "Advanced signals", to: "/docs/advanced/advanced-signals" },
      { label: "Verified actions", to: "/docs/advanced/verified-actions" },
      {
        label: "Custom Integrations",
        to: "/docs/advanced/custom-integrations",
      },
      { label: "Roadmap", to: "/docs/advanced/roadmap" },
      { label: "Protocol Internals", to: "/docs/advanced/protocol-internals" },
    ],
  },

  { label: "Hackathons & workshops", to: "/docs/hackathons" },
];
