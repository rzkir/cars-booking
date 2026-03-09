"use client";

import { useState } from "react";

import { Pencil, Palette, Plus, Trash2 } from "lucide-react";

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
  useColorsQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from "@/services/cars.service";

export default function CarsCollors() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Color | null>(null);
  const [name, setName] = useState("");
  const [toDelete, setToDelete] = useState<Color | null>(null);

  const { data: colors = [], isLoading } = useColorsQuery();
  const createMutation = useCreateColorMutation();
  const updateMutation = useUpdateColorMutation();
  const deleteMutation = useDeleteColorMutation();

  const openAdd = () => {
    setEditing(null);
    setName("");
    setDialogOpen(true);
  };

  const openEdit = (c: Color) => {
    setEditing(c);
    setName(c.name);
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
      toast.error("Nama warna wajib diisi");
      return;
    }
    if (
      !editing &&
      colors.some((c) => c.name.toLowerCase() === val.toLowerCase())
    ) {
      toast.error(`Warna "${val}" sudah ada`);
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
            <CardTitle className="text-2xl md:text-3xl">Warna</CardTitle>
            <p className="text-sm text-muted-foreground">
              Kelola warna mobil (Hitam, Putih, Silver, dll)
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
          ) : colors.length === 0 ? (
            <Empty className="py-12">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Palette className="h-6 w-6" />
                </EmptyMedia>
                <EmptyTitle>Belum ada warna</EmptyTitle>
                <EmptyDescription>
                  Tambah warna untuk digunakan saat menambah mobil.
                </EmptyDescription>
              </EmptyHeader>
              <Button onClick={openAdd}>Tambah Warna</Button>
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
                {colors.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.name}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEdit(c)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setToDelete(c)}
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
              {editing ? "Edit Warna" : "Tambah Warna"}
            </DialogTitle>
            <DialogDescription>
              Masukkan nama warna (contoh: Hitam, Putih, Silver).
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
                  placeholder="Contoh: Hitam, Putih, Silver"
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
            <DialogTitle>Hapus warna</DialogTitle>
            <DialogDescription>
              Yakin hapus &quot;{toDelete?.name}&quot;? Mobil yang memakai warna
              ini mungkin terpengaruh.
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
