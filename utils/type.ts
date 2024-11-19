export type StartupType = {
  id: number,
  title: string,
  createdAt: Date,
  views: number,
  Author: {
    id: number,
    name: string,
    username: string,
    image: string
  }
  description: string,
  image: string,
  category: string,
  authorid: number;
}


export type CreatingStartupType = {
  title: string,
  description: string,
  image: string,
  category: string,
  authorid: number
}

export type AuthorType = {
  id: number,
  name: string,
  username: string,
  image: string,
  email: string,
  bio: string,
  startup: StartupType[]
}

export type CreatingAuthorType = {
  id: string
  name: string,
  username: string,
  image: string,
  email: string,
  bio: string,
}