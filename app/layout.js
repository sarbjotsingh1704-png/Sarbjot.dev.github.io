import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/caveat";
import "./globals.css";
import Providers from "@/components/Providers";
import { site } from "@/data/site";

export const metadata = {
  metadataBase: new URL(site.url),
  title: `${site.name} | ${site.owner} · ${site.role}`,
  description:
    "Portfolio of Sarbjot Singh, a full-stack developer and AI/ML enthusiast building modern web applications and intelligent solutions.",
  openGraph: {
    title: `${site.name} | ${site.owner}`,
    description: site.role,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f5f6ff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
