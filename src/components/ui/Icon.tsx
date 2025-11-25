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
  ChevronDown,
  Eye,
  LayoutDashboard,
  BookOpen,
  Target,
  Calendar,
  Database,
  UserCog,
  Shield,
  Building,
  Award,
  Search,
  Trash2,
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
  ChevronDown,
  Eye,
  LayoutDashboard,
  BookOpen,
  Target,
  Calendar,
  Database,
  UserCog,
  Shield,
  Building,
  Award,
  Search,
  Trash2,
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
