//==================================== Cars ====================================//
type CarTransmission = string;

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

interface CarImageSummary {
  image_url: string;
  is_primary: boolean;
}

interface CarListItem {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  content?: string | null;
  price_per_day: number;
  price_with_driver_per_day: number | null;
  transmission: CarTransmission;
  capacity: number;
  fuel_type: string | null;
  year: number | null;
  rental_type: CarRentalType;
  facilities: string[] | null;
  colors: string[] | null;
  status: CarStatus;
  created_at: string;
  updated_at: string;
  car_images?: CarImageSummary | null;
  car_pricings?: CarPricingSummary[];
}

interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  is_primary: boolean;
  position: number;
  created_at: string;
}

interface Car {
  id: string;
  account_id: string;
  name: string;
  slug: string;
  color: string | null;
  description?: string | null;
  content?: string | null;
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

type CarsListResponse = {
  data: CarListItem[];
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    prevPage: number | null;
    hasNextPage: boolean;
    nextPage: number | null;
    totalPages: number;
  };
};

//==================================== Cars Search ====================================//

type CarSearchItem = CarListItem;

type CarsSearchResponse = {
  data: CarSearchItem[];
  pagination: CarsListResponse["pagination"];
};

//==================================== Cars Details ====================================//
interface CarDetails extends Car {
  description: string | null;
  content: string | null;
  car_images: CarImage[];
  car_pricings: CarPricing[];
  colors: string[] | null;
}

type CarDetailsResponse = {
  data: CarDetails;
};
