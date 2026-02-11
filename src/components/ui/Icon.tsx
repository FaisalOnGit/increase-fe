import {
  BarChart3,
  ShoppingBag,
  Users,
  FileText,
  Settings,
  LogOut,
  Banknote,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Star,
  Repeat,
  Menu,
  X,
  Check,
  Bell,
  User,
  UserPlus,
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
  RotateCcw,
  List,
  GraduationCap,
  Plus,
  AlertTriangle,
  Info,
  Loader2,
  FileEdit,
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
  XCircle,
  Clock,
  TrendingUp,
  Star,
  Repeat,
  Menu,
  X,
  Check,
  Bell,
  User,
  UserPlus,
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
  RotateCcw,
  List,
  GraduationCap,
  Plus,
  AlertTriangle,
  Info,
  Loader2,
  Edit: FileEdit,
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
