export type Institution = {
  id: string;
  title: string;
  issues: string[];
  instructions: string[];
};

export const institutions: Institution[] = [
  {
    id: "politia-locala",
    title: "Poliția Locală",
    issues: ["parcare neregulamentară", "ocupare trotuar", "mașină abandonată"],
    instructions: [
      "Descrie locația exactă.",
      "Atașează poze clare.",
      "Menționează data și ora.",
    ],
  },
  {
    id: "brigada-rutiera",
    title: "Brigada Rutieră",
    issues: ["blocare intersecție", "conducere agresivă", "trecere pe roșu"],
    instructions: [
      "Descrie incidentul cât mai clar.",
      "Menționează numărul de înmatriculare dacă îl ai.",
      "Atașează dovezi foto sau video dacă există.",
    ],
  },
];