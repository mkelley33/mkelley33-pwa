export default function Footer() {
  const copyrightYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-t-black pt-5 text-center">
      <p>
        Copyright &copy; {copyrightYear} Michaux Kelley. All rights reserved.
      </p>
    </footer>
  );
}
