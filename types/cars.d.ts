type CarTransmission = "manual" | "matic";

type CarRentalType = "self_drive" | "with_driver";

type CarStatus = "available" | "rented" | "maintenance";

interface CarPricing {
  id: string;
  car_id: string;
  type: CarRentalType;
  price_per_day: number;
  created_at: string;
  updated_at: string;
}

interface CarPricingSummary {
  type: CarRentalType;
  price_per_day: number;
}

interface Car {
  id: string;
  account_id: string;
  name: string;
  slug: string;
  description: string | null;
  price_per_day: number;
  price_with_driver_per_day: number | null;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  year: number | null;
  rental_type: CarRentalType;
  facilities: string[] | null;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_pricings?: CarPricing[];
  car_images?: CarImage[];
}

interface CarImageSummary {
  image_url: string;
  is_primary: boolean;
}

interface CarListItem {
  id: string;
  name: string;
  slug: string;
  price_per_day: number;
  price_with_driver_per_day: number | null;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  year: number | null;
  rental_type: CarRentalType;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_pricings?: CarPricingSummary[];
  car_images?: CarImageSummary | null;
}

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  position: number;
  created_at: string;
}
