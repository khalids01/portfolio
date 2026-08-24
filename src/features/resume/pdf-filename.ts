import type { ResumeData } from "./schema";

function filenamePart(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_") || "resume";
}

export function createResumePdfFilename(resume: ResumeData, date = new Date()) {
  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(date)
    .replace(/ /g, "_");

  return `${filenamePart(resume.basics.name)}_${filenamePart(resume.basics.title)}_${formattedDate}.pdf`;
}
