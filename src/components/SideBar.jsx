import { Home, Flame, Clock, Youtube } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
export default function SideBar() {
    const categories = [
      { name: "Principal", icon: <Home size={20} />, path: "/" },
      { name: "Tendencias", icon: <Flame size={20} />, path: "/trending" },
      {
        name: "Suscripciones",
        icon: <Youtube size={20} />,
        path: "/subscriptions",
      },
      { name: "Historial", icon: <Clock size={20} />, path: "history" },
    ];
    return (
      <aside className="">
        <nav>
          {categories.map((item) => {
            return (
              <Link
                className={"text-white flex items-center gap-3 px-3 py-2 rounded-md hover:bg-zinc-800 transition" }
                key={item.name}
                to={item.path}
              >
                {item.icon}
                <span className="text-sm">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    );
    }
