import { FeaturePage, featureMetadata } from "../_components/feature-page";

export const metadata = featureMetadata("reservations");

export default function Page() {
  return <FeaturePage slug="reservations" />;
}
