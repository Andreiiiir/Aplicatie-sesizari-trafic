export type Institution = {
  id: string;
  title: string;
  issues: string[];
  instructions: string[];
  email: string;
  publicEmails: string[];
};

export const institutions: Institution[] = [
  {
    id: "politia-locala",
    title: "Poliția Locală București",
    issues: [
      "parcare neregulamentară",
      "ocupare trotuar",
      "mașină abandonată",
      "blocare acces",
    ],
    instructions: [
      "Descrie locația exactă (stradă, reper).",
      "Menționează ora aproximativă.",
      "Atașează poze clare.",
      "Include numărul de înmatriculare dacă este posibil.",
    ],
    email: "politialocala@pmb.ro",
    publicEmails: ["politialocala@pmb.ro"],
  },

  {
    id: "brigada-rutiera",
    title: "Brigada Rutieră București",
    issues: [
      "conducere agresivă",
      "trecere pe roșu",
      "neacordare prioritate",
      "blocare intersecție",
    ],
    instructions: [
      "Descrie incidentul clar.",
      "Menționează locația și ora.",
      "Include numărul de înmatriculare.",
      "Atașează dovezi dacă există.",
    ],
    email: "brigada.rutiera@b.politiaromana.ro",
    publicEmails: ["brigada.rutiera@b.politiaromana.ro"],
  },

  {
    id: "administratia-strazilor",
    title: "Administrația Străzilor București",
    issues: [
      "marcaj rutier necorespunzător",
      "lipsă marcaje",
      "lipsă stâlpișori",
      "organizare trafic defectuoasă",
      "groapă",
      "indicator lipsă",
      "semafor defect",
    ],
    instructions: [
      "Descrie problema cât mai clar.",
      "Explică cum afectează traficul.",
      "Menționează locația exactă.",
      "Atașează poze relevante.",
    ],
    email: "office@aspmb.ro",
    publicEmails: ["office@aspmb.ro"],
  },

  {
    id: "stb",
    title: "STB (Transport Public București)",
    issues: [
      "blocare linie tramvai",
      "probleme transport public",
    ],
    instructions: [
      "Descrie situația exactă.",
      "Menționează linia de transport.",
      "Atașează dovezi dacă există.",
    ],
    email: "relatiipublice@stbsa.ro",
    publicEmails: ["relatiipublice@stbsa.ro"],
  },

  {
    id: "primaria",
    title: "Primăria Municipiului București",
    issues: [
      "alte probleme trafic",
      "sesizare generală",
    ],
    instructions: [
      "Descrie problema în detaliu.",
      "Menționează locația.",
      "Atașează dovezi dacă există.",
    ],
    email: "contact@pmb.ro",
    publicEmails: ["contact@pmb.ro"],
  },
];