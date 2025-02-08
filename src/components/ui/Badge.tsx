export const Badge = ({
    children,
    variant = "default",
  }: React.PropsWithChildren<{
    variant?: "default" | "success" | "destructive";
  }>) => {
    const variantClasses = {
      default: "bg-gray-200 text-gray-800",
      success: "bg-green-500 text-white",
      destructive: "bg-red-500 text-white",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-all ${variantClasses[variant]}`}
      >
        {children}
      </span>
    );
  };  