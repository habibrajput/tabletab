import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("notifications");

export default function Page() {
  return <FeaturePage slug="notifications" />;
}
