export default function Page({ params }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Slug:</h1>
      <p>{params?.slug}</p>
    </div>
  );
}
