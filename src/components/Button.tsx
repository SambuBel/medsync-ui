import React, { ReactNode } from "react";
import { FaSpinner } from "react-icons/fa";
import cn from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon,
  loading = false,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "btn flex items-center justify-center gap-2 transition-all";
  const sizeClasses = {
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };
  const variantClasses = {
    primary: "btn-primary text-white",
    secondary: "btn-secondary text-white",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };

  return (
    <button
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && "w-full",
        className
      )}
      disabled={loading}
      {...props}
    >
      {loading && <FaSpinner className="animate-spin" />}
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
