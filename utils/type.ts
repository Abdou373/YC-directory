export type StartupTypeCard = {
  _id: number,
  title: string,
  _createdAt: Date,
  views: number,
  author: {
    _id: number,
    name: string,
  }
  description: string,
  image: string,
  category: string,
}