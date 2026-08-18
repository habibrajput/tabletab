import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("promotions");

export default function Page() {
  return <FeaturePage slug="promotions" />;
}
