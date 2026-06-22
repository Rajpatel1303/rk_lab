import React from "react";
import {
  Sun,
  Moon,
  Zap,
  X,
  Menu,
  ChevronRight,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  Globe,
  Layers,
  BrainCircuit,
  ShieldAlert,
  Figma,
  Search,
  LayoutGrid,
  Rocket,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Star,
  Check,
  UserCheck,
  Scissors,
  Sparkles,
  ShieldCheck,
  Code,
  FileCode,
  Terminal,
  Atom,
  Flame,
  Server,
  Database,
  BarChart3,
  Container,
  CloudLightning,
  GitMerge,
  PenTool,
  Paintbrush,
  Send,
  HelpCircle,
  Smartphone,
  Network,
  Camera,
  Cloud,
  Briefcase,
  Wrench
} from "lucide-react";

const ICON_MAP: Record<string, React.FC<any>> = {
  Sun,
  Moon,
  Zap,
  X,
  Menu,
  ChevronRight,
  ArrowUpRight,
  Cpu,
  CheckCircle2,
  Globe,
  Layers,
  BrainCircuit,
  ShieldAlert,
  Figma,
  Search,
  LayoutGrid,
  Rocket,
  // Social alias mapping to handle uppercase/lowercase variations
  Github,
  GitHub: Github,
  Linkedin,
  LinkedIn: Linkedin,
  Twitter,
  Mail,
  Email: Mail,
  Star,
  Check,
  UserCheck,
  Scissors,
  Sparkles,
  ShieldCheck,
  Code,
  FileCode,
  Terminal,
  Atom,
  Flame,
  Server,
  Database,
  BarChart3,
  Container,
  CloudLightning,
  GitMerge,
  PenTool,
  Paintbrush,
  Send,
  Smartphone,
  Network,
  Camera,
  Cloud,
  Briefcase,
  Wrench
};

interface SharedIconProps extends React.ComponentProps<"svg"> {
  name: string;
  className?: string;
  size?: number;
  key?: React.Key;
}

export default function SharedIcon({ name, className = "", size = 20, ...props }: SharedIconProps) {
  const IconComponent = ICON_MAP[name];

  if (!IconComponent) {
    // Return a fallback visual if the icon is not found in mapping
    return <HelpCircle className={className} size={size} {...props} />;
  }

  return <IconComponent className={className} size={size} {...props} />;
}
