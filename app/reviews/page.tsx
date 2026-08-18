import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("reviews");

export default function Page() {
  return <FeaturePage slug="reviews" />;
}
