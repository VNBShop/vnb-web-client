import AddPost from '@/components/add-post'
import ProfilePosts from '@/contents/profile/profile-posts'
import UserInfo from '@/contents/profile/user-info'

export default function UserProfilePage() {
  return (
    <section className="mx-auto mt-10 flex max-w-secondary flex-col gap-4 md:px-4 lg:flex-row lg:items-start">
      <UserInfo />
      <section className="flex-1">
        <AddPost pageKey={'get-posts-profile'} />
        <ProfilePosts />
      </section>
    </section>
  )
}
