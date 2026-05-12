import ServiceDetails from "@/views/Services/ServiceDetails/ServiceDetails";

export async function generateMetadata({ params }) {
  const name = params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  return {
    description: `Vyanwebs offers professional ${name.toLowerCase()} services tailored to your business needs using modern technologies.`,
    alternates: { canonical: `https://vyanwebs.com/services/${params.slug}` },
  };
}

export default ServiceDetails;

