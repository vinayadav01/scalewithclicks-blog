export default function Page({ params }) {
  return (
    <div>
      <h1>DYNAMIC WORKING</h1>
      <p>{JSON.stringify(params)}</p>
    </div>
  );
}
