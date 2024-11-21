import { formatDate } from "@/lib/utils"
import { DOMAIN } from "@/utils/constant"
import { StartupType } from "@/utils/type"
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it"

const md = markdownit()

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await axios.get(`${DOMAIN}/api/startup/${id}`)
  if (response.status === 404) {
    return notFound()
  }


  const startup = await response.data as StartupType;

  const pitch = md.render(startup.pitch)

  return (
    <>
      <section className="pink_container !max-h-[230px]">
        <p className="tag">{formatDate(startup.createdAt)}</p>
        <h1 className="heading">{startup.title}</h1>
        <p className="sub-heading !max-w-5xl">{startup.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={startup.image}
          alt="thumbmail"
          className="w-full h-auto rounded-xl"
          height={1500}
          width={1500}
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${startup.Author.id}`}
              className="flex gap-2 items-center mb-3">
              <Image src={startup.Author.image} alt={startup.Author.name}
                width={64} height={64}
                className="rounded-full drop-shadow-lg" />
              <div>
                <p className="text-20-medium">{startup.Author.name}</p>
                <p className="text-16-medium !text-black-300">@{startup.Author.username}</p>
              </div>
            </Link>
            <p className="category-tag">{startup.category}</p>
          </div>


          <h3 className="text-30-bold">Pitch Details</h3>
          {pitch ? (
            <article
              dangerouslySetInnerHTML={{ __html: pitch }}
              className="prose"
            />
          ) : <p className="no-result">No details provided</p>}
        </div>
      </section>



      <div className="view-container">
        <div className="view-text">{startup.views} views</div>
        <div className="flex justify-center items-center absolute top-0 right-0 ">
          <div className="absolute bg-primary bg-opacity-70 rounded-full w-3 h-3 animate-ping"></div>
          <div className="absolute bg-primary rounded-full w-3 h-3  z-10"></div>
        </div>
      </div>
    </>
  )
}