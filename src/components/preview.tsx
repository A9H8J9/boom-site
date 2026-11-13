import { cn } from "@/lib/utils";
import { tintStyle, type Accent } from "@/lib/accents";

export type PreviewKind =
  | "canvas"
  | "doc"
  | "board"
  | "table"
  | "timeline"
  | "list"
  | "wiki"
  | "gallery";

function Bar({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block rounded-full bg-foreground/10", className)}
    />
  );
}

function CanvasSketch() {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 dot-grid-sm opacity-50" />
      <div className="note-shadow absolute start-2 top-2 w-[38%] rotate-[-4deg] rounded-md tint-bg-strong p-2">
        <div className="mb-1 h-1 w-2/3 rounded-full bg-foreground/40" />
        <Bar className="mb-1 h-1 w-full bg-foreground/15" />
        <Bar className="h-1 w-3/4 bg-foreground/15" />
      </div>
      <div className="note-shadow absolute end-3 top-6 w-[34%] rotate-[3deg] rounded-md bg-card p-1.5 ring-1 ring-foreground/10">
        <span className="mb-1 block size-3 rounded-full tint-dot" />
        <Bar className="h-1 w-full" />
      </div>
      <div className="note-shadow absolute bottom-2 start-1/3 w-[40%] rotate-[2deg] rounded-md bg-card p-1.5 ring-1 ring-foreground/10">
        <Bar className="mb-1 h-1 w-1/2 bg-foreground/30" />
        <div className="flex gap-1">
          <Bar className="h-4 w-1/3" />
          <Bar className="h-4 w-1/3" />
          <Bar className="h-4 w-1/3" />
        </div>
      </div>
      <div className="absolute end-2 bottom-3 size-6 rotate-12 rounded-sm bg-highlight/80" />
    </div>
  );
}

function DocSketch() {
  return (
    <div className="space-y-1.5">
      <Bar className="h-2 w-2/3 bg-foreground/35" />
      <Bar className="h-1 w-full" />
      <Bar className="h-1 w-5/6" />
      <Bar className="h-1 w-full" />
      <div className="flex gap-1 pt-1">
        <span className="h-5 w-1/3 rounded-sm tint-bg-strong" />
        <span className="h-5 flex-1 rounded-sm bg-foreground/5" />
      </div>
      <Bar className="h-1 w-4/5" />
      <Bar className="h-1 w-2/3" />
    </div>
  );
}

function BoardSketch() {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {[0, 1, 2].map((column) => (
        <div key={column} className="space-y-1">
          <Bar className="h-1 w-2/3" />
          <div className="space-y-1 rounded-sm bg-foreground/[0.04] p-1">
            <span className="block h-4 rounded-sm bg-card ring-1 ring-foreground/5" />
            <span className="block h-4 rounded-sm bg-card ring-1 ring-foreground/5" />
            {column === 1 && (
              <span className="block h-4 rounded-sm tint-bg-strong" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function TableSketch() {
  return (
    <div className="space-y-1">
      <div className="grid grid-cols-[1.4fr_1fr_0.7fr] gap-1 rounded-sm bg-foreground/[0.05] p-1">
        <Bar className="h-1 bg-foreground/25" />
        <Bar className="h-1 bg-foreground/25" />
        <Bar className="h-1 bg-foreground/25" />
      </div>
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          className="grid grid-cols-[1.4fr_1fr_0.7fr] items-center gap-1 px-1 py-0.5"
        >
          <div className="flex items-center gap-1">
            <span className="size-1.5 rounded-full tint-dot opacity-70" />
            <Bar className={cn("h-1", row === 1 ? "w-4/5" : "w-full")} />
          </div>
          <Bar className="h-1 w-3/4" />
          <span className="h-2.5 w-full rounded-sm tint-bg" />
        </div>
      ))}
    </div>
  );
}

function TimelineSketch() {
  return (
    <div className="space-y-2">
      {[
        { w: "68%", offset: "0%" },
        { w: "46%", offset: "22%" },
        { w: "80%", offset: "8%" },
        { w: "38%", offset: "46%" },
      ].map((row, rowIndex) => (
        <div key={rowIndex} className="flex items-center gap-1.5">
          <span className="size-1 shrink-0 rounded-full bg-foreground/20" />
          <div className="h-2.5 w-full rounded-sm bg-foreground/[0.04]">
            <div
              className={cn(
                "h-full rounded-sm",
                rowIndex === 0 ? "tint-bg-strong" : "bg-foreground/15",
              )}
              style={{ width: row.w, marginInlineStart: row.offset }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function ListSketch() {
  return (
    <div className="space-y-1.5">
      {[0, 1, 2, 3].map((row) => (
        <div key={row} className="flex items-center gap-1.5">
          <span
            className={cn(
              "size-2.5 shrink-0 rounded-[3px] border",
              row === 0
                ? "tint-border tint-bg"
                : "border-foreground/15 bg-transparent",
            )}
          />
          <Bar className={cn("h-1", row % 2 === 0 ? "w-full" : "w-4/5")} />
        </div>
      ))}
      <div className="flex gap-1 pt-0.5">
        <span className="h-3 w-8 rounded-full tint-bg-strong" />
        <span className="h-3 w-6 rounded-full bg-foreground/10" />
      </div>
    </div>
  );
}

function WikiSketch() {
  return (
    <div className="flex gap-1.5">
      <div className="w-1/3 space-y-1 border-e border-foreground/10 pe-1.5">
        {[0, 1, 2, 3].map((row) => (
          <Bar
            key={row}
            className={cn("h-1", row === 0 ? "bg-foreground/30" : "w-4/5")}
          />
        ))}
      </div>
      <div className="flex-1 space-y-1.5">
        <Bar className="h-1.5 w-2/3 bg-foreground/25" />
        <Bar className="h-1 w-full" />
        <Bar className="h-1 w-5/6" />
        <Bar className="h-1 w-full" />
        <div className="h-4 w-full rounded-sm tint-bg" />
      </div>
    </div>
  );
}

function GallerySketch() {
  return (
    <div className="grid grid-cols-3 gap-1">
      {[0, 1, 2, 3, 4, 5].map((cell) => (
        <div
          key={cell}
          className={cn(
            "h-7 rounded-[3px] ring-1 ring-foreground/5",
            cell === 1 || cell === 5 ? "tint-bg-strong" : "bg-foreground/[0.05]",
          )}
        />
      ))}
    </div>
  );
}

const sketches = {
  canvas: CanvasSketch,
  doc: DocSketch,
  board: BoardSketch,
  table: TableSketch,
  timeline: TimelineSketch,
  list: ListSketch,
  wiki: WikiSketch,
  gallery: GallerySketch,
};

export function Preview({
  kind = "doc",
  accent = "clay",
  className,
  bare = false,
}: {
  kind?: PreviewKind;
  accent?: Accent;
  className?: string;
  bare?: boolean;
}) {
  const Sketch = sketches[kind];

  return (
    <div
      className={cn("relative overflow-hidden tint-cover", className)}
      style={tintStyle(accent)}
    >
      <div aria-hidden="true" className="absolute inset-0 dot-grid opacity-30" />
      {!bare && (
        <div className="relative flex h-full items-end justify-center px-4 pt-5">
          <div className="w-full max-w-[260px] rounded-t-lg bg-card/95 p-2.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.35)] ring-1 ring-foreground/8 backdrop-blur-sm">
            <Sketch />
          </div>
        </div>
      )}
    </div>
  );
}
