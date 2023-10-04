import Banner from '@/common/banner'
import Header from '@/common/header'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Banner />
      <>
        <Header />
        {children}
      </>
    </>
  )
}
