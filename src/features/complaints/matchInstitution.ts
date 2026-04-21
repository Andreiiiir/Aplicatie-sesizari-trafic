import { institutions, Institution } from "../../data/institutions";

export function matchInstitution(issue: string): Institution | null {
  const normalizedIssue = issue.trim().toLowerCase();

  const foundInstitution = institutions.find((institution) =>
    institution.issues.some(
      (knownIssue) => knownIssue.toLowerCase() === normalizedIssue
    )
  );

  return foundInstitution ?? null;
}