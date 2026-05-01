import ServiceDetails from "@/views/Services/ServiceDetails/ServiceDetails";

export default function ServiceSlugPage({ params }) {
  return <ServiceDetails slug={params.slug} />;
}
