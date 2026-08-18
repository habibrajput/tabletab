import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("online-store");

export default function Page() {
  return <FeaturePage slug="online-store" />;
}
