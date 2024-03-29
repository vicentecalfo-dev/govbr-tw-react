import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FeaturedTitle from ".";
import { faFire } from "@fortawesome/free-solid-svg-icons";

export default {
  component: FeaturedTitle,
  title: "Featured Title",
};

export const Default = () => (
  <div className="w-[400px] flex p-6">
    <FeaturedTitle>
      <FontAwesomeIcon icon={faFire} />
      <h1>Destaques</h1>
    </FeaturedTitle>
  </div>
);

export const Dark = () => (
  <div className="w-[400px] flex p-6 bg-govbr-blue-warm-vivid-90">
    <FeaturedTitle variant="dark">
      <FontAwesomeIcon icon={faFire} />
      <h1>Destaques</h1>
    </FeaturedTitle>
  </div>
);

export const Black = () => (
  <div className="w-[400px] flex p-6">
    <FeaturedTitle variant="black">
      <FontAwesomeIcon icon={faFire} />
      <h1>Destaques</h1>
    </FeaturedTitle>
  </div>
);

export const Aligns = () => (
  <div className="flex flex-col gap-10">
    <div className="w-[400px] flex p-6">
      <FeaturedTitle align="left">
        <FontAwesomeIcon icon={faFire} />
        <h1>Destaques</h1>
      </FeaturedTitle>
    </div>
    <div className="w-[400px] flex p-6">
      <FeaturedTitle align="center">
        <FontAwesomeIcon icon={faFire} />
        <h1>Destaques</h1>
      </FeaturedTitle>
    </div>
    <div className="w-[400px] flex p-6">
      <FeaturedTitle align="right">
        <FontAwesomeIcon icon={faFire} />
        <h1>Destaques</h1>
      </FeaturedTitle>
    </div>
  </div>
);

export const CustomSize = () => (
    <div className="w-[400px] flex p-6">
      <FeaturedTitle className="text-2xl">
        <FontAwesomeIcon icon={faFire} />
        <h1>Destaques</h1>
      </FeaturedTitle>
    </div>
  );