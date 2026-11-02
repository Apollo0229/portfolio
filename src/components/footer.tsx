import { profile } from "@/data/profile";
import { GitHubIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · <span className="font-mono">@{profile.nickname.toLowerCase()}</span>
        </p>
        <div className="flex items-center gap-5">
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">
            {profile.email}
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-ink"
          >
            <GitHubIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
