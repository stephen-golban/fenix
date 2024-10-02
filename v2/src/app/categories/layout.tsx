import React from "react";

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-16 xl:px-32 relative flex flex-col">
      {children}
    </div>
  );
}
