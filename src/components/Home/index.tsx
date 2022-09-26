import { Button } from "@/components/common/Button";
import { Fragment, memo } from "react";

import { Card } from "./Card";

export const Home = memo(function Home() {
  return (
    <Fragment>
      <div className="py-24 grid justify-center gap-y-4 justify-items-center bg-gradient-to-r from-ed7253 to-4940e0">
        <h1 className="text-48 font-bold text-ffffff dark:text-000000">
          World ID
        </h1>
        <p className="mb-1 font-mono text-20 text-center text-ffffff dark:text-000000">
          Prove a human is doing an action only once without revealing any
          personal data
        </p>
        <Button
          onClick={() => null}
          className="bg-ffffff rounded-full py-4 px-8 text-4940e0 text-18 font-medium hover:bg-ffffff/80 transition-colors"
        >
          Get started now
        </Button>
      </div>

      <div className="py-8 px-8 grid gap-y-12 2xl:px-[calc((100vw-1200px)/2)]">
        <div className="grid lg:grid-flow-col justify-between gap-x-8 gap-y-16">
          <Card
            image="/images/home/home-card-unique.png"
            heading="Prove unique-humaness"
            description="Prevent spam, bots, abuse and sybil attacks. Verify a unique human is performing an action only once."
          />

          <Card
            image="/images/home/home-card-private.png"
            heading="Completely private"
            description="Personhood verification through the Orb can be completely private (zero PII). Further protected with ZKPs, it's impossible to know which actions an identity has performed."
          />

          <Card
            image="/images/home/home-card-integrate.png"
            heading="Easy to integrate"
            description="Just a few lines of code and World ID protection can be added to any project. Both on-chain and off-chain."
          />
        </div>

        <div className="grid gap-y-12 justify-items-center">
          <h2 className="text-24 font-bold">Use cases</h2>

          <div className="grid lg:grid-flow-col justify-between gap-x-8 gap-y-16">
            <Card
              heading="Democratic voting"
              description="On-chain voting, ensure 1 person = 1 vote"
            />
            <Card
              heading="Airdrops"
              description="A person receives an airdrop only once (goodbye bots)"
            />
            <Card
              heading="Quadratic funding"
              description="Fund projects based on the number of supporters"
            />
            <Card
              heading="Person-bound NFTs"
              description="On-chain credentials, achievements, ... NFTs that always belong to the same human"
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
});
