import Link from "next/link";

export default function Footer() {  
  return (
    <section className="container text-center pb-10">
      <p className="font-semibold text-lg">
        Do you like this profile? {" "}
        <Link href={"/register"} className="underline">
          You can create your own here.
      </Link>
      </p>
    </section>
  );
}
  