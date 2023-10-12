export default function Footer() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t-2 border-t-black pt-5 text-center absolute bottom-0">
      <p>
        Copyright &copy; {copyrightYear} Michaux Kelley. All rights reserved.
      </p>
    </footer>
  );
}
