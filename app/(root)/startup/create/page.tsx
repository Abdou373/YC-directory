import { auth } from "@/auth";
import StartupForm from "@/components/StartupForm";
import { Session } from "@/utils/type";
import { redirect } from "next/navigation";




export default async function Page() {

  const session = await auth() as Session | null


  if (!session) redirect("/")

  return (
    <>
      <section className="pink_container !max-h-[239px]">
        <h1 className="heading">Submit your Startup</h1>
      </section>

      <StartupForm authorid={session.id} />
    </>
  )
}