export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#232f48] bg-background-dark py-8 text-center text-sm text-gray-500">
      <p>© {year} Juan José García. Engineered with precision.</p>
    </footer>
  );
}
