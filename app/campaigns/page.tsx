import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("campaigns");

export default function Page() {
  return <FeaturePage slug="campaigns" />;
}
