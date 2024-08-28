import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";

export default function BreadcrumbComponent({ links }: { links: any }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((item: any, i: number) => (
          <React.Fragment key={i}>
            <BreadcrumbItem>
              {i !== links.length - 1 ? (
                <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              )}
            </BreadcrumbItem>

            {i !== links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}

        
      </BreadcrumbList>
    </Breadcrumb>
  );
}
