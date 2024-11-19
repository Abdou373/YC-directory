import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
import { auth, signIn, signOut } from "@/auth";
import { Session } from "@/utils/type";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";




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
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>
              <form className="h-6" action={async () => {
                "use server";
                await signOut({ redirectTo: "/" })
              }}>
                <button>
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-6 sm:hidden text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                {/* <span>{session.user.name}</span> */}
                <Avatar className="size-10">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
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