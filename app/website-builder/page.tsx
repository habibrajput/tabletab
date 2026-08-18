import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("website-builder");

export default function Page() {
  return <FeaturePage slug="website-builder" />;
}
