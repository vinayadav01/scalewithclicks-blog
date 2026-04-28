export default function Test({ params }) {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Route is working</h1>
      <pre>{JSON.stringify(params, null, 2)}</pre>
    </div>
  );
}
