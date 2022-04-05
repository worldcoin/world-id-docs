import React from "react";
import clsx from "clsx";
import styles from "./homePageFeatures.module.scss";

type FeatureItem = {
  title: string;
  image?: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Prove unique-humaness",
    image: "/img/illu-home-personhood.png",
    description: (
      <>
        Prevent spam, bots, abuse and sybil attacks. Verify a unique human is
        performing an action only once.
      </>
    ),
  },
  {
    title: "Completely private",
    image: "/img/illu-home-private.png",
    description: (
      <>
        Personhood verification through the Orb can be completely private (zero
        PII). Further protected with ZKPs, it's impossible to know which actions
        an identity has performed.
      </>
    ),
  },
  {
    title: "Easy to integrate",
    image: "/img/illu-home-integrate.png",
    description: (
      <>
        Just a few lines of code and World ID protection can be added to any
        project. Both on-chain and off-chain.
      </>
    ),
  },
];

const UseCasesList: FeatureItem[] = [
  {
    title: "Democratic voting",
    description: <>On-chain voting, ensure 1 person = 1 vote</>,
  },
  {
    title: "Airdrops",
    description: <>A person receives an airdrop only once (goodbye bots)</>,
  },
  {
    title: "Quadratic funding",
    description: <>Fund projects based on the number of supporters</>,
  },
  {
    title: "Person-bound NFTs",
    description: (
      <>
        On-chain credentials, achievements, ... NFTs that always belong to the
        same human
      </>
    ),
  },
];

interface FeatureInterface extends FeatureItem {
  colSize?: number;
}

function Feature({ title, image, description, colSize = 4 }: FeatureInterface) {
  return (
    <div className={clsx("col", `col--${colSize}`)}>
      {image && (
        <div className="text--center">
          <img src={image} alt="" className={styles.featureImg} />
        </div>
      )}
      <div className="text--center padding-horiz--md">
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomepageUseCases(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {UseCasesList.map((props, idx) => (
            <Feature key={idx} {...props} colSize={3} />
          ))}
        </div>
      </div>
    </section>
  );
}
