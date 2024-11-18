import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { auth, signIn, signOut } from "@/auth";
import { Session } from "@/app/(root)/page";




export default async function NavBar() {
  const session = await auth() as Session
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {session && session.user ? (
            <>
              <Link href={"/startup/create"} className="">
                <span>Create</span>
              </Link>
              <form action={async () => {
                "use server";
                await signOut({ redirectTo: "/" })
              }}>
                <button>Logout</button>
              </form>
              <Link href={`/user/${session?.id}`}>
                <span>{session.user.name}</span>
              </Link>
            </>
          ) : (
            <form action={async () => {
              "use server";
              await signIn("github")
            }}>
              <button>Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  )
}