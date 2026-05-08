import JobDetails from "@/views/Career/JobDetails/JobDetails"; 
export async function generateMetadata({ params }) {
  return {
    title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} — Careers`,
    description: `Apply for the ${params.slug.replace(/-/g, " ")} position at Vyanwebs. Join our growing team of developers and designers.`,
    alternates: { canonical: `https://vyanwebs.com/careers/${params.slug}` },
  };
}

export default JobDetails;
