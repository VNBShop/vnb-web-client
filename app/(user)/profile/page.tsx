import AddPost from '@/components/add-post'
import PostItem from '@/components/post/post-item'
import UserInfo from '@/contents/profile/user-info'

export default function UserProfilePage() {
  return (
    <section className="mx-auto mt-10 flex max-w-secondary flex-col gap-4 md:px-4 lg:flex-row lg:items-start">
      <UserInfo />
      <section className="flex-1">
        <AddPost />
        <section className="mt-5">
          <PostItem />
        </section>
        Us
      </section>
    </section>
  )
}
