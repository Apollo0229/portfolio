import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="font-display text-8xl font-extrabold text-gradient">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">This route isn&apos;t deployed.</h1>
      <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-8 rounded-xl bg-ink px-5 py-3 font-semibold text-white transition hover:-translate-y-0.5">
        Back home
      </Link>
    </section>
  );
}
