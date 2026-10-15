"use client";

import type { ToolProps } from "@jimkit/sdk";
import { useHost } from "@jimkit/sdk/react";
import { Area, Btn, Pane, ToolFrame, toast } from "@jimkit/ui";
import { useState } from "react";
import { count, type Counts } from "./count";

const rows: [keyof Counts, string][] = [["words", "Words"], ["characters", "Characters"], ["lines", "Lines"], ["minutes", "Minutes to read"]];

export default function Tool({ tool, hue, onClose, mobile }: ToolProps) {
  const host = useHost();
  const [text, setText] = useState("");
  const [fromServer, setFromServer] = useState<Counts | null>(null);
  const now = count(text);

  async function askServer() {
    const res = await host.api("word-count", "count", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ text }) });
    if (!res.ok) { toast.error("The server couldn't count that."); return; }
    setFromServer((await res.json()) as Counts);
  }

  return (
    <ToolFrame title={tool.name} icon={tool.icon} hue={hue} onClose={onClose} mobile={mobile} subtitle={`${now.words} words`}>
      <div className="flex min-h-0 flex-1 flex-col gap-3 bg-surface p-3 text-fg">
        <Pane title="Text" className="min-h-0 flex-1 rounded-xl border border-line"><Area label="Text" value={text} onChange={(t) => { setText(t); setFromServer(null); }} /></Pane>
        <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {rows.map(([key, label]) => (
            <div key={key} className="rounded-xl border border-line px-3 py-2"><dt className="text-[12px] text-faint">{label}</dt><dd className="text-[18px] font-semibold tabular-nums">{now[key]}</dd></div>
          ))}
        </dl>
        <div className="flex items-center gap-3">
          <Btn onClick={() => void askServer()} disabled={!text}>Count on the server</Btn>
          {fromServer && <span className="text-[13px] text-dim">The server counted {fromServer.words} words.</span>}
        </div>
      </div>
    </ToolFrame>
  );
}
