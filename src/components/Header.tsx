import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex flex-row justify-start fixed pl-10 w-full h-[100px] items-center gap-8 border-b-white border-b-4">
      <Link href="/" className="text-4xl">
        @mkelley33:
      </Link>
      <Link href="/blog">Blog</Link>
    </header>
  );
}
