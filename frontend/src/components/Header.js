// filepath: /c:/myProjects/projectThanos/frontend/src/components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl">Análisis Hidrológico</h1>
      <nav>
        <ul className="flex space-x-4">
          <li><Link href="/">Inicio</Link></li>
          <li><Link href="/cuencas">Cuencas</Link></li>
          <li><Link href="/exportar">Exportar</Link></li>
        </ul>
      </nav>
    </header>
  );
}