import ForumHeader from '@/contents/forum/header'

export default function ForumLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ForumHeader />
      <main className="pt-[56px]"> {children}</main>
    </>
  )
}
