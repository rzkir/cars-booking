import BookingsTransactiont from "@/components/bookings/BookingsTransactiont";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <BookingsTransactiont bookingId={id} />;
}
