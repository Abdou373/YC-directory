import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const { query } = await searchParams;

  const posts = [
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Abdou mes" },
      _id: 1,
      description: 'This is description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfl7waoD9_h3puWXZ8HIKo57FHBpZ658HBw&s",
      category: 'Rebots',
      title: 'We Robots'
    },
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Abdou mes" },
      _id: 1,
      description: 'This is description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfl7waoD9_h3puWXZ8HIKo57FHBpZ658HBw&s",
      category: 'Rebots',
      title: 'We Robots'
    },
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Abdou mes" },
      _id: 1,
      description: 'This is description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfl7waoD9_h3puWXZ8HIKo57FHBpZ658HBw&s",
      category: 'Rebots',
      title: 'We Robots'
    },
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Abdou mes" },
      _id: 1,
      description: 'This is description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfl7waoD9_h3puWXZ8HIKo57FHBpZ658HBw&s",
      category: 'Rebots',
      title: 'We Robots'
    },
    {
      _createdAt: new Date(),
      views: 50,
      author: { _id: 1, name: "Abdou mes" },
      _id: 1,
      description: 'This is description',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNfl7waoD9_h3puWXZ8HIKo57FHBpZ658HBw&s",
      category: 'Rebots',
      title: 'We Robots'
    }
  ]
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
          {query ? `Search Result for : ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post, i) => [
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
