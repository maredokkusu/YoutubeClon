import { Home, Flame, Clock, Youtube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export default function SideBar() {
  const categories = [
    { name: "Principal", icon: <Home size={25} />, path: "/" },
    { name: "Tendencias", icon: <Flame size={25} />, path: "/trending" },
    {
      name: "Suscripciones",
      icon: <Youtube size={25} />,
      path: "/subscriptions",
    },
    { name: "Historial", icon: <Clock size={25} />, path: "history" },
  ];
  return (
  <aside className="sticky top-0 h-screen w-20 bg-zinc-900 p-4 text-white border-r border-gray-600">
  <nav className="flex flex-col items-center justify-center gap-5 h-11/12">
    {categories.map((item) => (
      <Link
        key={item.name}
        to={item.path}
        className="flex flex-col items-center gap-1 p-2 rounded hover:bg-zinc-800 transition"
      >
        {item.icon}
        <span className="text-xs text-center">{item.name}</span>
      </Link>
    ))}
  </nav>
</aside>
  );
}
