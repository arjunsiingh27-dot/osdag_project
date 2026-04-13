interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-primary px-4 py-2 rounded-t-md">
      <h3 className="text-sm font-semibold text-section-header-foreground">{title}</h3>
      {children}
    </div>
  );
}
