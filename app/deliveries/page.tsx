import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("deliveries");

export default function Page() {
  return <FeaturePage slug="deliveries" />;
}
