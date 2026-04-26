export default async function Page({ params }) {
  const { slug } = await params;

  return <h1>Slug: {slug}</h1>;
}
