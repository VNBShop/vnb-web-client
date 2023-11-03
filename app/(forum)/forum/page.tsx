import type { Metadata } from 'next'

import ForumSideBar from '@/contents/forum/sidebar'
import ForumSubbar from '@/contents/forum/subbar'
import ForumThreads from '@/contents/forum/threads'

export const metadata: Metadata = {
  title: 'Forum',
}
export default function Forum() {
  return (
    <>
      <div className="fixed inset-0 -z-[1] bg-[rgb(244,246,250)] bg-no-repeat lg:bg-[url('/forum/bg-tailwind.png')]" />
      <section className="mx-auto mt-5 grid w-full max-w-main grid-cols-4 gap-8 lg:px-4">
        <ForumSideBar />
        <ForumThreads />
        <ForumSubbar />
      </section>
    </>
  )
}
