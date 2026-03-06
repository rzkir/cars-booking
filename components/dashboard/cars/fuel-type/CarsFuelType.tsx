"use client";

import { useState } from "react";
import { CircleDot, Pencil, Plus, Trash2 } from "lucide-react";
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
  useFuelTypesQuery,
  useCreateFuelTypeMutation,
  useUpdateFuelTypeMutation,
  useDeleteFuelTypeMutation,
} from "@/services/cars.service";

export default function CarsFuelType() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<FuelType | null>(null);
  const [name, setName] = useState("");
  const [toDelete, setToDelete] = useState<FuelType | null>(null);

  const { data: fuelTypes = [], isLoading } = useFuelTypesQuery();
  const createMutation = useCreateFuelTypeMutation();
  const updateMutation = useUpdateFuelTypeMutation();
  const deleteMutation = useDeleteFuelTypeMutation();

  const openAdd = () => {
    setEditing(null);
    setName("");
    setDialogOpen(true);
  };

  const openEdit = (f: FuelType) => {
    setEditing(f);
    setName(f.name);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditing(null);
    setName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = name.trim();
    if (!val) {
      toast.error("Nama bahan bakar wajib diisi");
      return;
    }
    if (
      !editing &&
      fuelTypes.some((f) => f.name.toLowerCase() === val.toLowerCase())
    ) {
      toast.error(`Bahan bakar "${val}" sudah ada`);
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
            <CardTitle className="text-2xl md:text-3xl">Bahan Bakar</CardTitle>
            <p className="text-sm text-muted-foreground">
              Kelola tipe bahan bakar mobil (bensin, diesel, electric, dll)
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
          ) : fuelTypes.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CircleDot className="h-6 w-6" />
                </EmptyMedia>
                <EmptyTitle>Belum ada bahan bakar</EmptyTitle>
                <EmptyDescription>
                  Tambah tipe bahan bakar untuk digunakan saat menambah mobil.
                </EmptyDescription>
              </EmptyHeader>
              <Button onClick={openAdd}>Tambah Bahan Bakar</Button>
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
                {fuelTypes.map((f) => (
                  <TableRow key={f.id}>
                    <TableCell className="font-medium capitalize">
                      {f.name}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(f)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setToDelete(f)}
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
              {editing ? "Edit Bahan Bakar" : "Tambah Bahan Bakar"}
            </DialogTitle>
            <DialogDescription>
              Masukkan nama tipe bahan bakar (contoh: bensin, diesel, electric).
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
                  placeholder="Contoh: bensin, diesel, electric"
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
            <DialogTitle>Hapus bahan bakar</DialogTitle>
            <DialogDescription>
              Yakin hapus &quot;{toDelete?.name}&quot;? Mobil yang memakai bahan
              bakar ini mungkin terpengaruh.
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
