export const social = [
  { url: "mailto:ledoantrung1999@gmail.com", name: "mail" },
  { url: "https://github.com/LeDoanTrung", name: "github" },
  { url: "https://www.linkedin.com/in/ledoantrung1999/", name: "linkedin" },
  { url: "https://www.facebook.com/le.doantrung99", name: "facebook" },
] as const satisfies { url: string; name: "mail" | "github" | "instagram" | "linkedin" | "facebook" }[];
