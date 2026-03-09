import { Fuel, Settings2 } from "lucide-react";

import { formatIdr, parseIdrInput } from "@/hooks/format-idr";

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

import Link from "next/link";

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
  const formattedPrice = formatIdr(parseIdrInput(price));

  return (
    <div className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all duration-300">
      <div className="relative aspect-16/10 overflow-hidden bg-gray-50">
        <Image
          src={image}
          alt={title}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl">
          <span className="text-[#FF9500] font-black text-base md:text-lg leading-none">
            {formattedPrice}
            <span className="text-gray-400 text-xs md:text-sm font-normal tracking-normal">
              /hari
            </span>
          </span>
        </div>
        {status && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider">
            {status}
          </div>
        )}
      </div>
      <div className="p-4 md:p-8 space-y-6">
        <div className="space-y-4">
          <h4 className="text-2xl max-w-full md:max-w-56 font-black">
            {title}
          </h4>
          <p className="text-gray-400 font-medium">{subtitle}</p>
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

        <Link
          href={`/daftar-mobil/${slug}`}
          id={`car-detail-${slug}`}
          className="block w-full text-center bg-[#1a1a1a] text-white py-4 rounded-xl font-black text-sm hover:bg-black transition-colors"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
