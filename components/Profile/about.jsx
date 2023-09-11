export default function About({ profileData }) {  
  return (
    <section className="container py-10">
    <h2 className="text-center font-semibold text-2xl mb-5">ABOUT ME</h2>
      { profileData.bio ? 
        <p className="">{profileData.bio}</p>
      :
        <p className="text-center mt-2">No description provided yet. Contact the user for more info.</p>
      }
    </section>
  );
}
  