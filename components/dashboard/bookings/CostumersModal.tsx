import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type CostumersModalProps = {
  booking: BookingWithRelations;
};

export default function CostumersModal({ booking }: CostumersModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size="xs"
          variant="outline"
          disabled={!booking.customer_profiles}
        >
          Lihat Customer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Customer</DialogTitle>
          <DialogDescription>
            Data lengkap profil customer untuk booking ini.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">ID</span>
            <span className="font-mono text-xs">
              {booking.customer_profiles?.id ?? "-"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Nama</span>
            <span className="font-medium">
              {booking.customer_profiles?.full_name ?? "-"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Nomor Telepon</span>
            <span className="font-medium">
              {booking.customer_profiles?.phone ?? "-"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Email</span>
            <span className="font-medium">
              {booking.customer_profiles?.email ?? "-"}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-muted-foreground">Status Verifikasi</span>
            <span className="font-medium">
              {booking.customer_profiles?.is_verified
                ? "Terverifikasi"
                : "Belum terverifikasi"}
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
