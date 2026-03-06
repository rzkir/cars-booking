import { Fragment } from "react";

import CallToAction from "@/components/content/Call-to-action/CallToAction";

import FeaturesCars from "@/components/content/Features-cars/FeaturesCars";

import FeaturesSection from "@/components/content/Features-section/FeaturesSection";

import BookingSearch from "@/components/content/Booking-search/BookingSearch";

import HeroSection from "@/components/content/Hero-section/HeroSection";

import { fetchCars } from "@/lib/useCars";

export default async function Page() {
  const { data: cars } = await fetchCars();
  return (
    <Fragment>
      <HeroSection />
      <BookingSearch />
      <FeaturesSection />
      <FeaturesCars cars={cars} />
      <CallToAction />
    </Fragment>
  );
}
