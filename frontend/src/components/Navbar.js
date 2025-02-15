// filepath: /c:/myProjects/projectThanos/frontend/src/components/Navbar.js
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">
          <Link href="/">Hydrology App</Link>
        </div>
        <div>
          <Link href="/cuencas" className="mr-4">Cuencas</Link>
          <Link href="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}