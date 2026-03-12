"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type SendResult = {
  ok: boolean;
  status: number;
  data: unknown;
};

export default function WhatsAppGetStartedPage() {
  const [to, setTo] = useState("");
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [sendResult, setSendResult] = useState<SendResult | null>(null);

  const onSend = useCallback(async () => {
    setSending(true);
    setSendResult(null);
    try {
      const res = await fetch("/api/whatsapp/send", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ to, text }),
      });

      const data = await res.json();
      setSendResult({ ok: res.ok, status: res.status, data });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Gagal mengirim";
      setSendResult({ ok: false, status: 0, data: { error: message } });
    } finally {
      setSending(false);
    }
  }, [to, text]);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
          <CardDescription>
            Kirim pesan via endpoint bot <code>/send</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <div className="grid gap-2">
            <div className="text-sm font-medium">Nomor tujuan</div>
            <Input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="contoh: 62812xxxxxxx"
              inputMode="numeric"
            />
          </div>

          <div className="grid gap-2">
            <div className="text-sm font-medium">Pesan</div>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis pesan..."
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              onClick={onSend}
              disabled={sending || !to || !text}
            >
              {sending ? "Mengirim..." : "Kirim"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setTo("");
                setText("");
                setSendResult(null);
              }}
              disabled={sending}
            >
              Reset
            </Button>
          </div>

          {sendResult ? (
            <pre className="max-h-56 overflow-auto rounded-md border bg-muted/30 p-3 text-xs">
              {JSON.stringify(sendResult, null, 2)}
            </pre>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}
