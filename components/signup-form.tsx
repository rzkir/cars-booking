"use client";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";

import { Input } from "@/components/ui/input";

import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleSignupSubmit, signupIsLoading } = useAuth();

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirm-password") ?? "");

    await handleSignupSubmit(name, email, phone, password, confirmPassword);
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={onSubmit}
      {...props}
    >
      <FieldGroup>
        <h1 className="text-2xl font-bold text-center">Buat Akun Anda</h1>
        <Field>
          <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">No. HP</FieldLabel>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="081234567890"
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            name="confirm-password"
            type="password"
            required
          />
        </Field>
        <Field>
          <Button type="submit" disabled={signupIsLoading}>
            {signupIsLoading ? "Mendaftarkan..." : "Buat Akun"}
          </Button>
        </Field>
        <FieldSeparator>Sudah punya akun</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Kembali ke halaman{" "}
            <Link
              href="/signin"
              className="text-sm font-medium underline underline-offset-4"
            >
              Masuk
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
