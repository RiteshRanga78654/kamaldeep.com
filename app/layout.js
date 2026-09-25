import "./globals.css";

export const metadata = {
  title: "Kamaldeep Prajapati — Business Head at IREED India",
  description:
    "Kamaldeep Prajapati leads business operations and strategic partnerships at IREED India, working at the intersection of education, industry and innovation.",
  openGraph: {
    title: "Kamaldeep Prajapati — Business Head at IREED India",
    description:
      "Kamaldeep Prajapati leads business operations and strategic partnerships at IREED India, working at the intersection of education, industry and innovation.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kamaldeep Prajapati — Business Head at IREED India",
    description:
      "Kamaldeep Prajapati leads business operations and strategic partnerships at IREED India.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=Caveat:wght@500;600&display=swap"
          rel="stylesheet"
        />
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:bg-ink focus:text-cream focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}