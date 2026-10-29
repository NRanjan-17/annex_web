import { isValidElement, type ReactNode } from "react";
import { Code, Ui } from "@/components/docs-ui";

/** Reads the words out of a bit of docs JSX, as Markdown: app names and code in backticks, links as links.
 *  For the plain-text copies agents read (/llms-full.txt), so they always match the page. */
export function plainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(plainText).join("");
  if (!isValidElement<{ children?: ReactNode; href?: string }>(node)) return "";
  const inner = plainText(node.props.children);
  if (node.type === Ui || node.type === Code) return `\`${inner}\``;
  if (node.type === "a" && node.props.href) return `[${inner}](${node.props.href})`;
  return inner;
}
