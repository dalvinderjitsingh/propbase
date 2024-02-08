export default function Page({ params }: { params: { profileId: string } }) {
  // params.profileId = "hey";
  return <div>My Post: {params.profileId}</div>;
}
