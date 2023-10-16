import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'

export type UserPageProps = {
  params: {
    userId: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <section className="mx-auto mt-10 flex max-w-secondary items-start gap-4">
      <section className="w-[38%] rounded-md bg-white p-4 py-3 shadow-box">
        <h2 className=" font-medium">Information</h2>
      </section>
      <section className="flex-1">
        <AddPost />

        <section className="mt-5">
          <PostItem />
        </section>
      </section>
    </section>
  )
}
