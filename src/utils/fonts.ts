import { Open_Sans, Inter } from "next/font/google";

export const inter = Inter({ subsets: ['latin'] })

export const openSans = Open_Sans({
    subsets: ["latin"],
    variable: "--font-open-sans",
    weight: ["300", "400", "500", "600", "700", "800"],
});
