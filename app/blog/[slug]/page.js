export default function Page({ params }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Slug Test</h1>
      <p>{params?.slug}</p>
    </div>
  );
}
