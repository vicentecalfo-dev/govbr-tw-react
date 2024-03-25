import { GovBRLogo } from ".";

export default {
  component: GovBRLogo,
  title: "Gov.BR Logo",
};

export const Default = () => (
  <>
    <GovBRLogo className="p" />
  </>
);

export const Negative = () => (
  <>
    <GovBRLogo variant="negative" className="bg-govbr-blue-warm-vivid-90 p-5" />
  </>
);
