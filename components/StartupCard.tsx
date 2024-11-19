import { formatDate } from "@/lib/utils";
import { StartupType } from "@/utils/type";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";


export default function StartupCard({ startup }: { startup: StartupType }) {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">
          {formatDate(startup.createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{startup.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${startup.Author.id}`}>
            <p className="text-16-medium line-clamp-1">{startup.Author.name}</p>
          </Link>
          <Link href={`/startup/${startup.id}`}>
            <h3 className="text-26-semibold">{startup.title}</h3>
          </Link>
        </div>
        <div>
          <Link href={`/user/${startup.Author.id}`}>
            <Image priority src={startup.Author.image} alt="placeholder" width={40} height={40} className="rounded-full" />
          </Link>
        </div>
      </div>
      <Link href={`/startup/${startup.id}`}>
        <p className="startup-card_desc">{startup.description}</p>

        <Image
          src={startup.image}
          alt="placeholder"
          className="startup-card_img"
          height={600}
          width={600}
        />
      </Link>
      <div className="flex-between gap3 mt-5">
        <Link href={`/?query=${startup.category.toLowerCase()}`}>
          <p className="text-16-medium">{startup.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${startup.id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}