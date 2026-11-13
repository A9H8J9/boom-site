import type { Metadata } from "next";
import { AiChat } from "@/components/ai-chat";

export const metadata: Metadata = { title: "دستیار هوش مصنوعی" };

export default function AiPage() {
  return <AiChat />;
}
