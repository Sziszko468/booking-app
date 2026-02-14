import "../styles/globals.scss";
import type { ReactNode } from "react";

export const metadata = {
  title: "Booking Admin",
  description: "Appointment booking dashboard"
};

export default function RootLayout({
  children
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
