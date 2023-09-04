export default function About({ profileData }) {  
  return (
    <section className="container py-10">
    <h2 className="text-center font-semibold text-2xl mb-5">ABOUT ME</h2>
      <p className="">{profileData.bio}</p>
    </section>
  );
}
  