import Link from "next/link";
import { HomeIcon } from "components";
export default function Navbar() {
  return (
    <nav
      className="navbar
        navbar-expand-lg
        navbar-light relative
        flex
        w-full
        flex-wrap
        items-center
        gap-x-5
        border-b py-4 px-1
        shadow-lg
        dark:border-slate-300/70
        "
    >
      <Link href="/">
        <HomeIcon />
      </Link>
      <Link href="/todos">Todos</Link>
    </nav>
  );
}
