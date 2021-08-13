export type DeclarationImports = { default?: string; named: string[] };
export type Imports = Record<string, DeclarationImports>;

export type GlobalState = { imports: Imports; isCachingProject: boolean };

export type ImportType = "default" | "named";
export type ImportQuickPickItem = {
  label: string;
  description: string;
  type: ImportType;
};

export type OffsetRange = { start: number; end: number };
