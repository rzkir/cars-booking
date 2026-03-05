//==================================== Cars ====================================//
type CarCreateInput = {
  name: string;
  slug?: string;
  description?: string;
  price_per_day: number;
  price_with_driver_per_day?: number;
  transmission: "manual" | "matic";
  capacity: number;
  fuel_type?: string;
  year?: number;
  rental_type?: "self_drive" | "with_driver";
  facilities?: string[];
  status?: "available" | "rented" | "maintenance";
};

type CarUpdateInput = Partial<CarCreateInput>;

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
