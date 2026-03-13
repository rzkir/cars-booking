type ConnectionResponse = {
  status?: string;
  whatsappConnected?: boolean;
  error?: string;
  name?: string | null;
  phoneNumber?: string | null;
  lastSeen?: string | null;
  ip?: string | null;
  hostname?: string | null;
};

type QrResponse = {
  whatsappConnected?: boolean;
  qrDataUrl?: string | null;
  error?: string;
};

type InboxItem = {
  jid: string;
  name: string | null;
  phoneNumber: string | null;
  lastMessage: string | null;
  lastMessageAt: string | null;
  lastMessageType?:
    | "text"
    | "image"
    | "video"
    | "sticker"
    | "document"
    | "other";
  lastMessageImageUrl?: string | null;
  unreadCount: number;
  isGroup: boolean;
};

type InboxResponse = {
  status?: string;
  error?: string;
  count?: number;
  items?: InboxItem[];
};
