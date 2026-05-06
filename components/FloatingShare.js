"use client";

export default function FloatingShare() {
  return (
    <div className="hidden md:flex flex-col gap-3 fixed left-6 top-1/2 -translate-y-1/2 z-40">

      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
      >
        🔗
      </a>

      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
      >
        🐦
      </a>

      <a
        href="#"
        className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
      >
        💼
      </a>

    </div>
  );
}
