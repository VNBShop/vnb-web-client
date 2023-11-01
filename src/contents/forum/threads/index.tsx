import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'

export default function ForumThreads() {
  return (
    <section className="col-span-4 h-full lg:col-span-2 lg:px-10">
      <AddPost />

      <section className="mt-7">
        {Array.from('0123456789', Number).map((_: unknown, index) => (
          <PostItem key={index} />
        ))}
      </section>
    </section>
  )
}
