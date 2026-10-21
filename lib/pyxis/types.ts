/**
 * Types of the Pyxis CMS Headless API (GET /api/pages/{slug}).
 * Docs: https://pyxis-cms-docs.vercel.app/pl/api/pages
 */

/** Image returned by the "image" field (and each item of the "gallery" field). */
export interface PyxisMedia {
  id: string;
  url: string | null;
  alt: string | null;
  title: string | null;
  width: number | null;
  height: number | null;
}

/** Page returned by the "page" field – only published, public pages. */
export interface PyxisPageLink {
  id: string;
  title: string;
  full_url: string;
}

/** Value of the "link" field. */
export interface PyxisLink {
  url: string | null;
  title: string | null;
  new_tab: boolean | null;
}

/** Values of one field group: field name → value. Narrow the type in your block components. */
export type PyxisFieldValues = Record<string, unknown>;

/** Flexible content block: one field group in the "block" mode. */
export interface PyxisBlock<TData extends PyxisFieldValues = PyxisFieldValues> {
  /** Slug of the field group. */
  type: string;
  data: TData;
}

export interface PyxisPage {
  id: string;
  title: string;
  /** Flexible content blocks, in the order set by the editor. */
  content: PyxisBlock[] | null;
  /** Static page fields, grouped by the field group slug. */
  fields: Record<string, PyxisFieldValues> | null;
  seo: Record<string, unknown> | null;
  full_url: string;
  published_at: string | null;
  is_password_protected: boolean;
  is_preview: boolean;
}