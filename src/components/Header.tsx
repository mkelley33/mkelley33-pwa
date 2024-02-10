import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row justify-start fixed pl-10 w-full h-[100px] items-center gap-8 border-b-white border-b-4">
      <Link href="/" className="md:text-4xl sm:text-2xl">
        @mkelley33:
      </Link>
      <nav>
        <ul className="list-none flex gap-10 ml-7 mb-0">
          <li className="mt-3">
            <Link href="/blog">Blog</Link>
          </li>
          <li className="mt-3">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
