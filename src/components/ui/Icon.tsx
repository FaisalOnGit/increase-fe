import {
  BarChart3,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  Banknote,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Repeat,
  Menu,
  X,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Eye,
  LayoutDashboard,
  BookOpen,
  Target,
  Calendar,
} from "lucide-react";

const icons = {
  BarChart3,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  Banknote,
  CheckCircle,
  Clock,
  TrendingUp,
  Star,
  Repeat,
  Menu,
  X,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  Eye,
  LayoutDashboard,
  BookOpen,
  Target,
  Calendar,
};

interface IconProps {
  name: keyof typeof icons;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({
  name,
  className = "",
  size = 20,
}) => {
  const IconComponent = icons[name];

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} size={size} />;
};
