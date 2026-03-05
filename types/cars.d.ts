type CarTransmission = "manual" | "matic";

type CarStatus = "available" | "rented" | "maintenance";

interface Car {
  id: string;
  account_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_per_day: number;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_images?: CarImage[];
}

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  created_at: string;
}
