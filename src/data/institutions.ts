export type Institution = {
  id: string;
  title: string;
  issues: string[];
  instructions: string[];
  contactHint: string;
  email: string;
  publicEmails: string[];
};

export const institutions: Institution[] = [
  {
    id: "politia-locala",
    title: "Poliția Locală",
    issues: [
      "parcare neregulamentară",
      "ocupare trotuar",
      "mașină abandonată",
      "blocare acces",
    ],
    instructions: [
      "Descrie locația exactă.",
      "Menționează data și ora.",
      "Atașează poze clare din care se vede situația.",
      "Menționează, dacă se poate, numărul de înmatriculare.",
    ],
    contactHint: "Verifică datele de contact ale Poliției Locale din orașul tău.",
    email: "adresa1@exemplu.com",
    publicEmails: ["adresa1@exemplu.com"],
  },
  {
    id: "brigada-rutiera",
    title: "Brigada Rutieră",
    issues: [
      "conducere agresivă",
      "trecere pe roșu",
      "blocare intersecție",
      "neacordare prioritate",
    ],
    instructions: [
      "Descrie incidentul cât mai clar.",
      "Menționează strada, sensul de mers și ora aproximativă.",
      "Atașează dovezi foto sau video dacă există.",
      "Include numărul de înmatriculare dacă îl ai.",
    ],
    contactHint: "Verifică site-ul Poliției Române sau al Brigăzii Rutiere competente.",
    email: "adresa2@exemplu.com",
    publicEmails: ["adresa2@exemplu.com"],
  },
  {
    id: "administrator-drum",
    title: "Administratorul drumului / Primăria",
    issues: [
      "groapă",
      "semafor defect",
      "indicator lipsă",
      "marcaj șters",
    ],
    instructions: [
      "Descrie problema exactă.",
      "Menționează locația cât mai precis.",
      "Atașează poze relevante.",
      "Spune dacă problema afectează siguranța rutieră.",
    ],
    contactHint: "Verifică Primăria sau administratorul drumului pentru zona respectivă.",
    email: "adresa1@exemplu.com",
    publicEmails: ["adresa1@exemplu.com"],
  },
];