export type SectorContact = {
  sector: string;
  email: string;
  phone: string;
};

export type Institution = {
  id: string;
  title: string;
  issues: string[];
  instructions: string[];
  email?: string;
  phone?: string;
  publicEmails: string[];
  sectors?: SectorContact[]; // DOAR pentru poliția locală
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
      "Include numărul / numerele de înmatriculare (dacă este cazul).",
    ],
    publicEmails: [],
    sectors: [
      { sector: "Sector 1", email: "registratura@primarias1.ro", phone: "0219540" },
      { sector: "Sector 2", email: "infopublice@ps2.ro", phone: "0219941" },
      { sector: "Sector 3", email: "secretariat.dgpl@primarie3.ro", phone: "0219543" },
      { sector: "Sector 4", email: "sesizari@politialocala4.ro", phone: "0219441" },
      { sector: "Sector 5", email: "primarie@sector5.ro", phone: "0319451. 031.9885." },
      { sector: "Sector 6", email: "contact@politia6.ro", phone: "0219546" },
    ],
  },

  {
    id: "brigada-rutiera",
    title: "Brigada Rutieră București",
    issues: [
      "blocaj circulație",
      "pericole trafic",
    ],
    instructions: [
      "Descrie speța clar.",
      "Menționează locația și ora.",
      "Include numărul / numerele de înmatriculare (dacă este cazul).",
      "Atașează poze / documente (dacă este cazul).",
    ],
    email: "bpr@b.politiaromana.ro",
    phone: "0219544",
    publicEmails: ["bpr@b.politiaromana.ro"],
  },

  {
    id: "administratia-strazilor",
    title: "Administrația Străzilor București",
    issues: [
      "marcaje șterse",
      "problemă carosabil",
      "indicatoare lipsă/căzute",
    ],
    instructions: [
      "Descrie problema cât mai clar.",
      "Menționează locația exactă.",
      "Atașează poze / documente relevante.",
    ],
    email: "office@aspmb.ro",
    phone: "0213151219",
    publicEmails: ["office@aspmb.ro"],
  },

  {
    id: "primaria",
    title: "Primăria Municipiului București",
    issues: [
      "infrastructură siguranță rutieră",
      "reamenajări trafic",

      ],
    instructions: [
      "Descrie problema în detaliu.",
      "Menționează locația.",
      "Atașează poze/documente relevante",
      "Indică o soluție (opțional).",
    ],
    email: "relatiipublice@pmb.ro",
    phone: "0319898",
    publicEmails: ["relatiipublice@pmb.ro"],
  },
];