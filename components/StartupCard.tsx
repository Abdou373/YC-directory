import { formatDate } from "@/lib/utils";
import { StartupType } from "@/utils/type";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";


export default function StartupCard({ post }: { post: StartupType }) {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup-card-date">
          {formatDate(post.createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.Author.id}`}>
            <p className="text-16-medium line-clamp-1">{post.Author.name}</p>
          </Link>
          <Link href={`/startup/${post.id}`}>
            <h3 className="text-26-semibold">{post.title}</h3>
          </Link>
        </div>
        <div>
          <Link href={`/user/${post.Author.id}`}>
            <Image priority src={post.Author.image} alt="placeholder" width={40} height={40} className="rounded-full" />
          </Link>
        </div>
      </div>
      <Link href={`/startup/${post.id}`}>
        <p className="startup-card_desc">{post.description}</p>

        <img src={post.image} alt="placeholder" className="startup-card_img" />
      </Link>
      <div className="flex-between gap3 mt-5">
        <Link href={`/?query=${post.category.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post.id}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  )
}