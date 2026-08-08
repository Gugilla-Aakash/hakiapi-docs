import { InlineCode } from "../code/InlineCode";

interface Parameter {
  name: string;
  type: string;
  default?: string;
  description: string;
}

interface APISignatureProps {
  name: string;
  signature: string;
  returns?: string;
  parameters?: Parameter[];
}

export function APISignature({
  name,
  signature,
  returns,
  parameters = [],
}: APISignatureProps) {
  return (
    <div className="my-6 overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
      <div className="border-b border-[var(--border)] bg-[var(--code-bg)] p-4 font-mono text-sm text-[var(--brand-primary)] font-bold">
        {name}
        <span className="text-[var(--text-secondary)]">{signature}</span>
        {returns && <span className="text-[var(--text-muted)] font-normal"> -&gt; {returns}</span>}
      </div>

      {parameters.length > 0 && (
        <div className="p-4 overflow-x-auto">
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">
            Parameters
          </p>
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] font-mono">
                <th className="pb-2 font-semibold">Name</th>
                <th className="pb-2 font-semibold">Type</th>
                <th className="pb-2 font-semibold">Default</th>
                <th className="pb-2 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {parameters.map((p) => (
                <tr key={p.name} className="text-[var(--text-secondary)]">
                  <td className="py-2.5 font-mono font-bold text-[var(--text-primary)]">
                    {p.name}
                  </td>
                  <td className="py-2.5">
                    <InlineCode>{p.type}</InlineCode>
                  </td>
                  <td className="py-2.5 font-mono text-[var(--text-muted)]">
                    {p.default || "—"}
                  </td>
                  <td className="py-2.5 leading-relaxed">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
