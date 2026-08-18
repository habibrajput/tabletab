import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("analytics");

export default function Page() {
  return <FeaturePage slug="analytics" />;
}
