import React from "react";

interface BreadcrumbProps {
  currentPage: string;
  currentHref: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  currentPage,
  currentHref,
}) => {
  return (
    <nav className="text-sm font-semibold text-primary">
      <a href="#" className="hover:text-gray-800">
        DASHBOARD
      </a>{" "}
      &gt;{" "}
      <a href={currentHref} className="hover:text-gray-800">
        {currentPage}
      </a>
    </nav>
  );
};
