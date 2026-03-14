import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type PaymentDetailsProps = {
  payment: Payment;
};

export function PaymentDetails({ payment }: PaymentDetailsProps) {
  const paidAt = payment.paid_at
    ? new Date(payment.paid_at).toLocaleString("id-ID")
    : "-";
  const createdAt = new Date(payment.created_at).toLocaleString("id-ID");
  const details = payment.payment_details;
  const vaNumbers = details?.va_numbers;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Detail Pembayaran</DialogTitle>
          <DialogDescription>
            Informasi lengkap untuk transaksi pembayaran ini.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Informasi Umum
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
              <span className="text-muted-foreground">ID Pembayaran</span>
              <span className="font-mono break-all">{payment.id}</span>

              <span className="text-muted-foreground">ID Booking</span>
              <span className="font-mono break-all">{payment.booking_id}</span>

              <span className="text-muted-foreground">Status</span>
              <span className="capitalize font-medium">{payment.status}</span>

              <span className="text-muted-foreground">Metode</span>
              <span className="capitalize">{payment.method ?? "-"}</span>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Nominal
            </p>
            <p className="text-lg font-semibold">
              Rp{" "}
              {payment.amount.toLocaleString("id-ID", {
                minimumFractionDigits: 0,
              })}
            </p>
          </div>

          {details && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Detail Pembayaran (Gateway)
              </p>
              <div className="space-y-1 text-xs">
                {details.payment_type && (
                  <p>
                    <span className="text-muted-foreground">Tipe</span>:{" "}
                    <span className="font-medium capitalize">
                      {details.payment_type.replace("_", " ")}
                    </span>
                  </p>
                )}
                {details.transaction_id && (
                  <p>
                    <span className="text-muted-foreground">
                      Transaction ID
                    </span>
                    : <span className="font-mono">{details.transaction_id}</span>
                  </p>
                )}
                {details.transaction_time && (
                  <p>
                    <span className="text-muted-foreground">
                      Waktu Transaksi
                    </span>
                    : <span>{details.transaction_time}</span>
                  </p>
                )}
                {details.gross_amount && (
                  <p>
                    <span className="text-muted-foreground">Gross Amount</span>:
                    <span className="ml-1">
                      Rp{" "}
                      {Number(details.gross_amount).toLocaleString("id-ID", {
                        minimumFractionDigits: 0,
                      })}
                    </span>
                  </p>
                )}
                {details.fraud_status && (
                  <p>
                    <span className="text-muted-foreground">Fraud Status</span>:
                    <span className="ml-1 capitalize">
                      {details.fraud_status}
                    </span>
                  </p>
                )}
              </div>

              {vaNumbers && vaNumbers.length > 0 && (
                <div className="space-y-1 text-xs">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Virtual Account
                  </p>
                  <div className="space-y-1 rounded-md border bg-muted/40 p-2">
                    {vaNumbers.map((va) => (
                      <div
                        key={`${va.bank}-${va.va_number}`}
                        className="flex items-center justify-between gap-2"
                      >
                        <span className="uppercase font-semibold">
                          {va.bank}
                        </span>
                        <span className="font-mono text-[11px] md:text-xs break-all">
                          {va.va_number}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Waktu
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
              <span className="text-muted-foreground">Dibuat</span>
              <span>{createdAt}</span>

              <span className="text-muted-foreground">Dibayar</span>
              <span>{paidAt}</span>
            </div>
          </div>
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  );
}