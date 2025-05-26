import { phudu } from "@/lib/utils";

export function MapSection() {
  return (
    <div className="w-full">
      <h1 className={`${phudu.className} text-center text-5xl font-extrabold`}>
        Location
      </h1>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.459918196236!2d106.81588339999999!3d-6.7135915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69cc089e2f04d1%3A0x764217df720c0029!2sSaung%20and%20Start%20Batok%20Rafting!5e0!3m2!1sen!2sid!4v1748216068878!5m2!1sen!2sid"
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
