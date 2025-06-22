"use client";

import React, { useState, useEffect } from "react";
import { phudu } from "@/lib/utils";
import { BoxPacket } from "../ui/box_packet";

interface ListItem {
  id: number;
  nama: string;
}

interface PacketData {
  id: number;
  image: string;
  price: number;
  nama: string;
  deskripsi: string;
  list: ListItem[];
}

interface ApiPackage {
  id_package: number;
  name: string;
  image_src: string;
  description: string;
  price: number;
  game_name: string;
  facilities: { id: number; name: string }[];
}

const PacketSection = () => {
  const [packages, setPackages] = useState<ApiPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [formattedData, setFormattedData] = useState<PacketData[]>([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const response = await fetch("/api/packages");
        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }
        const data = await response.json();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPackages();
  }, []);

  // Format API data to match PacketData structure expected by BoxPacket
  useEffect(() => {
    if (packages.length > 0) {
      // Filter packages by selected activity if needed
      const filteredPackages = selectedActivity
        ? packages.filter((pkg) =>
            pkg.game_name.toLowerCase().includes(selectedActivity.toLowerCase())
          )
        : packages;

      // Format the data
      const formatted = filteredPackages.map((pkg) => ({
        id: pkg.id_package,
        image: pkg.image_src || "/placeholder.jpg", // Use placeholder if image is missing
        price: pkg.price,
        nama: pkg.name,
        deskripsi: pkg.description,
        list:
          pkg.facilities && Array.isArray(pkg.facilities)
            ? pkg.facilities.map((facility) => ({
                id: facility.id,
                nama: facility.name,
              }))
            : [], // Default to empty array if facilities is null or not an array
      }));

      setFormattedData(formatted);
    }
  }, [packages, selectedActivity]);

  const handleActivityChange = (activity: string) => {
    if (activity === "semua") {
      setSelectedActivity(null);
    } else {
      setSelectedActivity(activity === selectedActivity ? null : activity);
    }
  };

  return (
    <div>
      <section>
        <div className="flex flex-col items-center">
          <h3
            className={`text-5xl font-extrabold tracking-tight leading-[28px] ${phudu.className}`}
          >
            Packet Activity
          </h3>
          <p className="md:w-[400px] mt-4 leading-[20px] text-center text-gray-500">
            Advenpark offers a variety of adventure activities starting from
            rafting, paintball, flying fox.
          </p>
        </div>
        <fieldset aria-label="Choose a paket adventure" className="mt-5 ">
          <ul className="flex w-full md:gap-4 gap-2 flex-wrap">
            <li>
              <input
                type="radio"
                id="semua"
                name="hosting"
                value="semua" // Tetap gunakan value "semua" untuk identifikasi, meskipun state-nya null
                className="hidden peer"
                checked={selectedActivity === null} // Centang jika selectedActivity adalah null (tidak ada filter spesifik)
                onChange={() => handleActivityChange("semua")}
              />
              <label
                htmlFor="semua"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                // onChange pada input sudah cukup, onClick pada label ini opsional tapi bisa dipertahankan
                onClick={() => handleActivityChange("semua")}
              >
                <div className="block">
                  <p>Semua</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="rafting"
                name="hosting"
                value="rafting"
                className="hidden peer"
                checked={selectedActivity === "rafting"}
                onChange={() => handleActivityChange("rafting")}
              />
              <label
                htmlFor="rafting"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("rafting")}
              >
                <div className="block">
                  <p>Rafting</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="outbond"
                name="hosting"
                value="outbond"
                className="hidden peer"
                checked={selectedActivity === "outbond"}
                onChange={() => handleActivityChange("outbond")}
              />
              <label
                htmlFor="outbond"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("outbond")}
              >
                <div className="block">
                  <p>Outbond</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="atv"
                name="hosting"
                value="atv"
                className="hidden peer"
                checked={selectedActivity === "atv"}
                onChange={() => handleActivityChange("atv")}
              />
              <label
                htmlFor="atv"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("atv")}
              >
                <div className="block">
                  <p>ATV</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="offroad"
                name="hosting"
                value="offroad"
                className="hidden peer"
                checked={selectedActivity === "offroad"}
                onChange={() => handleActivityChange("offroad")}
              />
              <label
                htmlFor="offroad"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("offroad")}
              >
                <div className="block">
                  <p>Offroad</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="paintball"
                name="hosting"
                value="paintball"
                className="hidden peer"
                checked={selectedActivity === "paintball"}
                onChange={() => handleActivityChange("paintball")}
              />
              <label
                htmlFor="paintball"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("paintball")}
              >
                <div className="block">
                  <p>Paint Ball</p>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="penginapan"
                name="hosting"
                value="penginapan"
                className="hidden peer"
                checked={selectedActivity === "penginapan"}
                onChange={() => handleActivityChange("penginapan")}
              />
              <label
                htmlFor="penginapan"
                className="inline-flex items-center px-3 py-2 text-sm text-gray-500 bg-white border rounded-full cursor-pointer dark:border-gray-700 dark:peer-checked:text-gray-900 peer-checked:bg-gray-800 dark:peer-checked:bg-white peer-checked:text-white dark:text-gray-400 dark:bg-gray-800"
                onClick={() => handleActivityChange("penginapan")}
              >
                <div className="block">
                  <p>Penginapan</p>
                </div>
              </label>
            </li>
          </ul>
        </fieldset>
      </section>
      <div className="mt-10 flex justify-center">
        {loading ? (
          <p>Loading packages...</p>
        ) : formattedData.length > 0 ? (
          <BoxPacket data={formattedData} />
        ) : (
          <p>No packages found.</p>
        )}
      </div>
    </div>
  );
};

export default PacketSection;
