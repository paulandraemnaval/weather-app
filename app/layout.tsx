import "../styles/styles.css";
import GlobalContext from "@/Context/GlobalProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="h-[100vh] w-full flex bg-black/20 ">
        <GlobalContext>
          <div className="flex flex-col w-full h-full">{children}</div>
        </GlobalContext>
      </body>
    </html>
  );
}
