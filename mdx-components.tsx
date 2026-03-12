import type { MDXComponents } from "mdx/types";
import { Badge } from "@/components/Badge";
import { DataTable } from "@/components/Table";
import { Callout } from "@/components/Callout";
import { Source } from "@/components/Source";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Badge,
    DataTable,
    Callout,
    Source,
    ...components,
  };
}
