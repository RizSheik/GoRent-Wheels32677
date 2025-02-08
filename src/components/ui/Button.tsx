export const Button = ({
  children,
  onClick,
  variant = "default",
  className = "",
}: React.PropsWithChildren<{
  onClick?: () => void;
  variant?: "default" | "delete" | "demo";
  className?: string;
}>) => {
  const baseClasses =
    "h-10 px-4 rounded-md text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex items-center gap-1 justify-center";

  const variantClasses = {
    default: "bg-black text-white hover:bg-black/80",
    delete: "bg-red-600 text-white hover:bg-red-700",
    demo: "bg-blue-600 text-white hover:bg-blue-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};