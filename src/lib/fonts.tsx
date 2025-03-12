import {
  Bricolage_Grotesque,
  Inter,
  Space_Grotesk,
  AR_One_Sans,
  Geist,
} from "next/font/google";

export const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });
export const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });
export const inter = Inter({ subsets: ["latin"] });
export const arOneSans = AR_One_Sans({ subsets: ["latin"] });
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
