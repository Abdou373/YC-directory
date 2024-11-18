import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { StartupType } from "@/utils/type";
import { DOMAIN } from "@/utils/constant";
import { auth } from "@/auth";
import { User } from "next-auth";

export interface Session {
  id: number,
  expires: string,
  user: User
}

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;


  const session = await auth() as Session | null


  let response: Response = await fetch(`${DOMAIN}/api/startup?query=${query}`, { cache: 'no-store' });
  if (query === undefined) {

    response = await fetch(`${DOMAIN}/api/startup`, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error()
    }
  }


  const startups = await response.json() as StartupType[]

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Pith your startup,<br />connect with entrepreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Compitation.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search Result for : '${query} '` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {startups?.length > 0 ? (
            startups.map((post, i) => [
              <StartupCard key={i} post={post} />
            ])
          ) :
            <p className="no-result">no startup found</p>
          }
        </ul>
      </section>
    </>
  );
}
