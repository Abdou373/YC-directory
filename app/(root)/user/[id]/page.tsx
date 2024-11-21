import { auth } from "@/auth";
import { Session } from "@/utils/type";
import axios from "axios";
import { DOMAIN } from "@/utils/constant";
import { AuthorType } from "@/utils/type";
import Image from "next/image";
import StartupCard from "@/components/StartupCard";




export default async function Profile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const session = await auth() as Session;

  const response = await axios.get(`${DOMAIN}/api/author/${id}`)

  const user = await response.data as AuthorType;

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>

          <Image
            src={user.image}
            alt={user.name}
            height={220}
            width={220}
            className="profile_image"
            priority
          />
          <p className="text-30-extrabold mt-7 text-center">@{user.username}</p>
          <p className="mt-1 text-center text-14-normal">{user.bio}</p>
        </div>
        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.id === parseInt(id) ? "Your" : "All"} Startups
          </p>
          <ul className="card_grid-sm">
            {user.startup.length > 0 ? user.startup.map((s, i) => (
              <StartupCard key={i} startup={s} />
            )) : (
              <p className="no-result">No post yet</p>
            )}
          </ul>
        </div>
      </section>
    </>
  )
}