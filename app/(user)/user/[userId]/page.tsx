import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'

export type UserPageProps = {
  params: {
    userId: string
  }
}

export default function UserPage({ params }: UserPageProps) {
  return (
    <section className="mx-auto mt-10 flex max-w-secondary flex-col gap-4 md:px-4 lg:flex-row lg:items-start">
      <section className="bg-white p-4 py-3 md:rounded-md md:shadow-box lg:w-[38%]">
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
