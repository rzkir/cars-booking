"use client";

import { useState } from "react";
import { Clock, MapPin } from "lucide-react";

const cardShadow =
  "shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] border border-gray-100";

type Office = {
  id: string;
  name: string;
  address: string;
  mapLabel: string;
  mapUrl: string;
};

const offices: Office[] = [
  {
    id: "jakarta",
    name: "Jakarta Office",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    mapLabel: "Sudirman, Jakarta Selatan",
    mapUrl:
      "https://www.google.com/maps?q=Jl.%20Sudirman%20No.%20123%20Jakarta%20Selatan&output=embed",
  },
  {
    id: "surabaya",
    name: "Surabaya Office",
    address: "Jl. Ahmad Yani No. 456, Surabaya",
    mapLabel: "Jl. Ahmad Yani, Surabaya",
    mapUrl:
      "https://www.google.com/maps?q=Jl.%20Ahmad%20Yani%20No.%20456%20Surabaya&output=embed",
  },
  {
    id: "bandung",
    name: "Bandung Office",
    address: "Jl. Diponegoro No. 789, Bandung",
    mapLabel: "Jl. Diponegoro, Bandung",
    mapUrl:
      "https://www.google.com/maps?q=Jl.%20Diponegoro%20No.%20789%20Bandung&output=embed",
  },
];

export function OfficeMapSection() {
  const [selectedOffice, setSelectedOffice] = useState<Office>(offices[0]);

  return (
    <section className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-7 bg-gray-100 rounded-[2.5rem] overflow-hidden card-shadow min-h-[500px] lg:min-h-full relative group border border-gray-100">
          <iframe
            src={selectedOffice.mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full grayscale contrast-110 brightness-90 transition-[filter] duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100"
          />
          <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20 pointer-events-none transition-opacity group-hover:opacity-0">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#FF9500]">
              Main Headquarters
            </p>
            <p className="font-black text-sm">{selectedOffice.mapLabel}</p>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
          <div className={`bg-white p-8 rounded-[2.5rem] ${cardShadow}`}>
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <Clock className="text-[#FF9500] w-5 h-5" />
              Jam Operasional
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="font-bold text-gray-500">Senin - Jumat</span>
                <span className="font-black">08:00 - 19:00</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                <span className="font-bold text-gray-500">Sabtu</span>
                <span className="font-black">09:00 - 18:00</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-500">Minggu</span>
                <span className="text-red-500 font-black">Tutup</span>
              </div>
            </div>
          </div>

          <div
            className={`bg-white p-8 rounded-[2.5rem] ${cardShadow} space-y-6 flex-1`}
          >
            <h3 className="text-xl font-black mb-2 flex items-center gap-3">
              <MapPin className="text-[#FF9500] w-5 h-5" />
              Lokasi Kantor
            </h3>
            <div className="space-y-6">
              {offices.map((office) => {
                const isActive = office.id === selectedOffice.id;

                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => setSelectedOffice(office)}
                    className={`flex w-full text-left gap-4 group cursor-pointer ${
                      isActive ? "bg-orange-50/40 rounded-2xl px-3 py-2" : ""
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-orange-50"
                          : "bg-gray-50 group-hover:bg-orange-50"
                      }`}
                    >
                      <MapPin
                        className={`w-5 h-5 ${
                          isActive
                            ? "text-[#FF9500]"
                            : "text-gray-400 group-hover:text-[#FF9500]"
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-black text-lg">{office.name}</p>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed">
                        {office.address}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

