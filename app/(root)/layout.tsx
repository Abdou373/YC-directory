import NavBar from "@/components/NavBar";



export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="font-work-sans">
      <NavBar />
      {children}
    </div>
  )
}