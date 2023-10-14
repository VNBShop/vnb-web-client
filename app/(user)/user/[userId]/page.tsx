export type UserPageProps = {
  params: {
    userId: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return <section className="mt-10">{params.userId}</section>
}
