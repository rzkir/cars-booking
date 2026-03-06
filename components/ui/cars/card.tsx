import { Fuel, Settings2 } from "lucide-react";

type CarCardProps = {
  image: string;
  title: string;
  subtitle: string;
  price: string;
  transmission: string;
  fuel: string;
  status: string;
  slug: string;
};

import Image from "next/image";

export function CarCard({
  image,
  title,
  subtitle,
  price,
  transmission,
  fuel,
  status,
  slug,
}: CarCardProps) {
  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-16/10 overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {status && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">
            {status}
          </div>
        )}
      </div>
      <div className="p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h4 className="text-2xl font-black">{title}</h4>
            <p className="text-gray-400 font-medium">{subtitle}</p>
          </div>
          <span className="text-[#FF9500] font-black text-xl">
            {price}
            <span className="text-gray-400 text-sm font-normal tracking-normal">
              /hari
            </span>
          </span>
        </div>
        <div className="flex items-center gap-4 text-gray-500 font-bold text-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <Settings2 className="w-4 h-4" />
            <span>{transmission}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg">
            <Fuel className="w-4 h-4" />
            <span>{fuel}</span>
          </div>
        </div>
        <a
          href={`/daftar-mobil/${slug}`}
          id={`car-detail-${slug}`}
          className="block w-full text-center bg-[#1a1a1a] text-white py-4 rounded-xl font-black text-sm hover:bg-black transition-colors"
        >
          Lihat Detail
        </a>
      </div>
    </div>
  );
}
