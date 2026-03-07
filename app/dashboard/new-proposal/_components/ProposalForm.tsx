"use client";

import { FileText, Loader2 } from "lucide-react";
import type { ProposalFormData } from "@/types/proposal";

const PROJECT_TYPES = [
  "Web Design",
  "Copywriting",
  "Social Media",
  "Consulting",
  "Video Production",
  "Other",
];

const TIMELINES = ["1 week", "2 weeks", "1 month", "3 months"];

const BUDGET_RANGES = [
  "$500 – $1,000",
  "$1,000 – $3,000",
  "$3,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition";

const selectClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition appearance-none cursor-pointer";

function Field({
  label,
  htmlFor,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
          {label}
        </label>
        {hint && <span className="text-xs text-gray-400">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

interface ProposalFormProps {
  form: ProposalFormData;
  loading: boolean;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function ProposalForm({
  form,
  loading,
  onChange,
  onSubmit,
}: ProposalFormProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <form onSubmit={onSubmit} className="space-y-6">
        {/* Row: Client Name + Your Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Client Name" htmlFor="clientName">
            <input
              id="clientName"
              name="clientName"
              type="text"
              value={form.clientName}
              onChange={onChange}
              placeholder="e.g. Acme Corp"
              maxLength={100}
              required
              className={inputClass}
            />
          </Field>

          <Field label="Your Name" htmlFor="yourName">
            <input
              id="yourName"
              name="yourName"
              type="text"
              value={form.yourName}
              onChange={onChange}
              placeholder="e.g. Jane Smith"
              maxLength={100}
              required
              className={inputClass}
            />
          </Field>
        </div>

        {/* Project Type */}
        <Field label="Project Type" htmlFor="projectType">
          <select
            id="projectType"
            name="projectType"
            value={form.projectType}
            onChange={onChange}
            required
            className={selectClass}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {PROJECT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </Field>

        {/* Project Scope */}
        <Field
          label="Project Scope"
          htmlFor="projectScope"
          hint={`${form.projectScope.length}/2000`}
        >
          <textarea
            id="projectScope"
            name="projectScope"
            value={form.projectScope}
            onChange={onChange}
            placeholder="Describe what needs to be done — goals, deliverables, any special requirements..."
            maxLength={2000}
            required
            rows={5}
            className={`${inputClass} resize-none`}
          />
        </Field>

        {/* Row: Timeline + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Field label="Timeline" htmlFor="timeline">
            <select
              id="timeline"
              name="timeline"
              value={form.timeline}
              onChange={onChange}
              required
              className={selectClass}
            >
              <option value="" disabled>
                Select a timeline
              </option>
              {TIMELINES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Budget Range" htmlFor="budgetRange">
            <select
              id="budgetRange"
              name="budgetRange"
              value={form.budgetRange}
              onChange={onChange}
              required
              className={selectClass}
            >
              <option value="" disabled>
                Select a budget
              </option>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="border-t border-gray-100" />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:bg-violet-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-semibold text-base py-3 rounded-xl shadow-md shadow-violet-100 transition-all hover:-translate-y-0.5 disabled:translate-y-0"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating Proposal...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Generate Proposal
            </>
          )}
        </button>
      </form>
    </div>
  );
}
