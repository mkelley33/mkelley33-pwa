import Link from 'next/link';
export default function Footer() {
  const copyleftYear = new Date().getFullYear();

  return (
    <footer className="bg-black w-full border-t-2 border-t-slate-50 pt-5 text-center opacity-90">
      <p>
        <Link href="https://gnu.org/licenses/copyleft.en.html" target="copyleft" rel="noopener">
          (ↄ) {copyleftYear}
        </Link>{' '}
        Michaux Kelley.
      </p>
    </footer>
  );
}
