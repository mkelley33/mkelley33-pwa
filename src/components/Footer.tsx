export default function Footer() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="bg-black w-full border-t-2 border-t-slate-50 pt-5 text-center opacity-90">
      <p>
        Copyright &copy; {copyrightYear} Michaux Kelley. All rights reserved.
      </p>
    </footer>
  );
}
