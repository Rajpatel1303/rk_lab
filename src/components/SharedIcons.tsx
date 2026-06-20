import React from "react";
import * as Icons from "lucide-react";

interface SharedIconProps extends React.ComponentProps<"svg"> {
  name: string;
  className?: string;
  size?: number;
  key?: React.Key;
}

export default function SharedIcon({ name, className = "", size = 20, ...props }: SharedIconProps) {
  // Safe mapping of name to Lucide components
  const IconComponent = (Icons as Record<string, React.FC<any>>)[name];

  if (!IconComponent) {
    // Return a fallback visual if the icon is not found
    return <Icons.HelpCircle className={className} size={size} {...props} />;
  }

  return <IconComponent className={className} size={size} {...props} />;
}
