import ChatDetail from "@/components/dashboard/whatsapp/inbox/ChatDetail";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function InboxChatPage({ params }: Props) {
  const { name } = await params;
  const jid = decodeURIComponent(name);

  return (
    <div className="flex flex-1 min-h-[calc(100vh-8rem)]">
      <ChatDetail jid={jid} />
    </div>
  );
}
