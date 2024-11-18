import { auth } from "@/auth";
import { Session } from "@/app/(root)/page";





export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;


  const session = await auth() as Session

  return (
    <div>

      <h1>{session?.user?.name}</h1>
      <p>{session?.user?.email}</p>
      <img className="rounded-full" src={session?.user?.image || ""} alt="" />

      <h1>{session?.expires}</h1>
      <h1>{session?.id}</h1>
    </div>
  )
}