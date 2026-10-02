// Illustrated, decorative previews so cards look finished before you have real screenshots.
// Replace by setting `image` on a project in data/projects.js.

function Frame({ children, label }) {
  return (
    <div
      role="img"
      aria-label={label}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-navy/10 bg-[#0c1124]"
    >
      {children}
    </div>
  );
}

function Store() {
  return (
    <Frame label="Illustrated preview of an online store with a sneaker on a New Arrivals banner">
      <div className="absolute inset-x-0 top-0 flex items-center gap-3 px-4 py-2 text-[9px] text-white/70">
        <span className="font-bold text-white">Swift &amp; Co.</span>
        <span>Home</span>
        <span>Men</span>
        <span>Women</span>
        <span>Sale</span>
        <span className="ml-auto h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-brand" />
      </div>
      <div className="absolute inset-x-3 bottom-3 top-8 overflow-hidden rounded-lg bg-gradient-to-br from-[#1b2140] to-[#0f1428]">
        <p className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-xl font-extrabold leading-6 text-white">
          New
          <br />
          Arrivals
          <span className="mt-2 block h-1 w-8 rounded bg-brand" />
        </p>
        <svg viewBox="0 0 190 100" className="absolute -right-3 top-1/2 h-[68%] -translate-y-1/2" aria-hidden="true">
          <defs>
            <linearGradient id="shoe" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#c9cfe8" />
            </linearGradient>
          </defs>
          <path d="M8 72c0-14 18-18 34-24l24-22c9-7 22-3 30 8 14 5 44 10 64 22 8 5 8 14-1 16H20c-9 0-12-3-12-8z" fill="url(#shoe)" />
          <path d="M10 76h170c4 6-2 12-10 12H24c-10 0-16-6-14-12z" fill="#e8ebf7" />
          <path d="M70 36l16 14M86 30l14 14M100 36l12 12" stroke="#7c86b8" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 66c30-6 60-4 100 8" stroke="#4338f5" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </Frame>
  );
}

function Chat() {
  const rows = [28, 22, 26, 20, 24];
  return (
    <Frame label="Illustrated preview of a chat application with conversation list and message bubbles">
      <div className="absolute inset-y-0 left-0 w-[30%] border-r border-white/10 bg-white/[0.03] p-2">
        <span className="mb-2 block h-2 w-10 rounded bg-white/30" />
        {rows.map((w, i) => (
          <div key={i} className={`mb-1.5 flex items-center gap-1.5 rounded-md p-1 ${i === 0 ? "bg-brand/70" : ""}`}>
            <span className="h-4 w-4 shrink-0 rounded-full bg-gradient-to-br from-[#ffb48a] to-[#c97b5d]" />
            <span className="h-1.5 rounded bg-white/40" style={{ width: `${w * 2}%` }} />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 right-0 w-[70%] p-3">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-4 w-4 rounded-full bg-gradient-to-br from-[#ffb48a] to-[#c97b5d]" />
          <span className="h-1.5 w-14 rounded bg-white/50" />
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
        <div className="space-y-2">
          <div className="h-5 w-[62%] rounded-lg rounded-tl-sm bg-white/15" />
          <div className="ml-auto h-7 w-[70%] rounded-lg rounded-tr-sm bg-brand" />
          <div className="h-4 w-[45%] rounded-lg rounded-tl-sm bg-white/15" />
          <div className="ml-auto h-5 w-[52%] rounded-lg rounded-tr-sm bg-brand" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-lg bg-white/10 p-1.5">
          <span className="h-1.5 flex-1 rounded bg-white/25" />
          <span className="h-4 w-4 rounded-full bg-brand" />
        </div>
      </div>
    </Frame>
  );
}

function Dashboard() {
  const bars = [30, 48, 36, 62, 54, 80, 70, 92];
  return (
    <Frame label="Illustrated preview of a machine learning prediction dashboard with charts">
      <div className="absolute inset-2 flex gap-2 rounded-lg bg-[#f6f7ff] p-2">
        <div className="w-[14%] rounded-md bg-white p-1.5 shadow-sm">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`mb-1.5 block h-1.5 rounded ${i === 1 ? "bg-brand" : "bg-navy/15"}`} />
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="grid grid-cols-3 gap-2">
            {["bg-brand", "bg-emerald-500", "bg-amber-400"].map((c) => (
              <div key={c} className="rounded-md bg-white p-1.5 shadow-sm">
                <span className="block h-1 w-8 rounded bg-navy/20" />
                <span className={`mt-1.5 block h-2 w-10 rounded ${c}`} />
              </div>
            ))}
          </div>
          <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-2">
            <div className="rounded-md bg-white p-1.5 shadow-sm">
              <svg viewBox="0 0 120 50" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 42 C20 38 28 20 48 26 S78 10 96 14 112 6 120 4" fill="none" stroke="#4338f5" strokeWidth="2" />
                <path d="M0 42 C20 38 28 20 48 26 S78 10 96 14 112 6 120 4 V50 H0z" fill="#4338f5" opacity="0.1" />
              </svg>
            </div>
            <div className="flex items-end gap-1 rounded-md bg-white p-1.5 shadow-sm">
              {bars.map((h, i) => (
                <span key={i} className="flex-1 rounded-sm bg-gradient-to-t from-brand to-[#8f86ff]" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
}

const previews = { store: Store, chat: Chat, dashboard: Dashboard };

export default function ProjectPreview({ kind }) {
  const Preview = previews[kind] || Dashboard;
  return <Preview />;
}
