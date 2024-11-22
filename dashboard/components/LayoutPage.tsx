export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="lg:w-3/4 container mx-auto p-4 lg:ml-48 mt-14 flex-1">
      {children}
    </div>
  );
}
