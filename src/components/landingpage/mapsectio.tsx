import { phudu } from "@/lib/utils";

export function MapSection() {
  return (
    <div className="w-full">
        <h1 className={`${phudu.className} text-center text-5xl font-extrabold`}>Location</h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.0034090731842!2d106.8159736745608!3d-6.704529093291093!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ceacd8fd93a1%3A0xcdad79cad0e5baf7!2sCENTRAL%20RAFTING%20BOGOR!5e1!3m2!1sen!2sid!4v1744968121745!5m2!1sen!2sid"
        width="600"
        height="450"
        className="w-full rounded-xl mt-10"
        // allowFullScreen=""
        loading="lazy"
        // referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
