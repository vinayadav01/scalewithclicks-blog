export default function Page({ params }) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Slug Works</h1>
      <pre>{JSON.stringify(params)}</pre>
    </div>
  );
}
