import Banner from '@/common/banner'
import Footer from '@/common/footer'
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
        <Footer />
      </>
    </>
  )
}
