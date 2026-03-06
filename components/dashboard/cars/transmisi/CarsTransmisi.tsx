"use client";

import { useState } from "react";
import { Gauge, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
} from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useTransmissionsQuery,
  useCreateTransmissionMutation,
  useUpdateTransmissionMutation,
  useDeleteTransmissionMutation,
} from "@/services/cars.service";

export default function CarsTransmisi() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Transmission | null>(null);
  const [name, setName] = useState("");
  const [toDelete, setToDelete] = useState<Transmission | null>(null);

  const { data: transmissions = [], isLoading } = useTransmissionsQuery();
  const createMutation = useCreateTransmissionMutation();
  const updateMutation = useUpdateTransmissionMutation();
  const deleteMutation = useDeleteTransmissionMutation();

  const openAdd = () => {
    setEditing(null);
    setName("");
    setDialogOpen(true);
  };

  const openEdit = (t: Transmission) => {
    setEditing(t);
    setName(t.name);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = name.trim().toLowerCase();
    if (!val) {
      toast.error("Nama transmisi wajib diisi");
      return;
    }
    if (!editing && transmissions.some((t) => t.name === val)) {
      toast.error(`Transmisi "${val}" sudah ada`);
      return;
    }
    try {
      if (editing) {
        await updateMutation.mutateAsync({ id: editing.id, name: val });
      } else {
        await createMutation.mutateAsync({ name: val });
      }
      closeDialog();
    } catch {
      // Error handled by mutation
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await deleteMutation.mutateAsync(toDelete.id);
      setToDelete(null);
    } catch {
      // Error handled by mutation
    }
  };

  return (
    <section className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <CardTitle className="text-2xl md:text-3xl">Transmisi</CardTitle>
            <p className="text-sm text-muted-foreground">
              Kelola tipe transmisi mobil (manual, matic)
            </p>
          </div>
          <Button onClick={openAdd} className="w-fit">
            <Plus className="mr-2 h-4 w-4" />
            Tambah
          </Button>
        </CardHeader>
      </Card>

      <Card>
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : transmissions.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Gauge className="h-6 w-6" />
                </EmptyMedia>
                <EmptyTitle>Belum ada transmisi</EmptyTitle>
                <EmptyDescription>
                  Tambah transmisi untuk digunakan saat menambah mobil.
                </EmptyDescription>
              </EmptyHeader>
              <Button onClick={openAdd}>Tambah Transmisi</Button>
            </Empty>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead className="w-[120px] text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transmissions.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium capitalize">
                      {t.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(t)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setToDelete(t)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Transmisi" : "Tambah Transmisi"}
            </DialogTitle>
            <DialogDescription>
              Masukkan nama transmisi (misalnya manual, matic, cvt, dct). Nilai
              disimpan dalam huruf kecil.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Nama</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="manual atau matic"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Batal
              </Button>
              <Button
                type="submit"
                disabled={
                  !name.trim() ||
                  createMutation.isPending ||
                  updateMutation.isPending
                }
              >
                {editing ? "Simpan" : "Tambah"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!toDelete}
        onOpenChange={(open) => !open && setToDelete(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus transmisi</DialogTitle>
            <DialogDescription>
              Yakin hapus &quot;{toDelete?.name}&quot;? Mobil yang memakai
              transmisi ini mungkin terpengaruh.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setToDelete(null)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
