import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-28 px-4 border-t pt-6">
      <section className="max-w-main mx-auto flex flex-wrap gap-5 gap-y-6 mb-10">
        <article className="lg:w-[calc(40%-15px)] md:w-[calc(60%-15px)] w-full">
          <h2 className="text-[18px] font-medium text-gray-600 mb-3">
            General Information
          </h2>
          <p className="text-sm mb-2">
            <strong>VNB Sports</strong> is a system of badminton stores with
            more than 50 branches nationwide, providing wholesale and retail of
            badminton equipment from movement to professional.
          </p>
          <p className="text-sm mb-2">
            <strong>Mission:</strong> &quot;VNB is committed to bringing the
            best quality products and services to sports players to improve
            their own health.&quot;
          </p>

          <p className="text-[14px]">
            <strong>Vision:</strong> &quot;Become a distributor and
            Vietnam&apos;s largest sports producer&quot;
          </p>
        </article>

        <article className="lg:w-[calc(60%/3-15px)] md:w-[calc(40%-15px)] w-full">
          <h2 className="text-[18px] font-medium text-gray-600 mb-3">
            Contact Informations
          </h2>
          <p className="text-sm mb-2">
            <strong>Hotline:</strong> 1900 636 636
          </p>
          <p className="text-sm mb-2">
            <strong>Email:</strong> info@gmail.com
          </p>

          <p className="text-[14px]">
            <strong>Franchise:</strong> 1900 636 636
          </p>

          <div className="flex items-center gap-2 mt-3">
            <Link
              href={'https://www.facebook.com/VNBSports'}
              className="w-[35px] h-[35px] border rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-bgGray"
              target="_blank"
            >
              <i className="fa-brands fa-facebook text-[#4267B2]"></i>
            </Link>
            <Link
              href={'https://www.youtube.com/@congdongvnb'}
              className="w-[35px] h-[35px] border rounded-full flex items-center justify-center hover:cursor-pointer hover:bg-bgGray"
              target="_blank"
            >
              <i className="fa-brands fa-youtube text-[#FF0000]"></i>
            </Link>
          </div>
        </article>

        <article className="lg:w-[calc(60%/3-15px)] md:w-[calc(100%/2-15px)] w-full">
          <h2 className="text-[18px] font-medium text-gray-600 mb-3">Policy</h2>
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Return Policy & Exchange
          </Link>{' '}
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Warranty Policy
          </Link>{' '}
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Shipping Policy
          </Link>
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Term of Use
          </Link>
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Privacy Policy
          </Link>
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Franchise policy
          </Link>
        </article>

        <article className="lg:w-[calc(60%/3-15px)] md:w-[calc(100%/2-15px)] w-full">
          <h2 className="text-[18px] font-medium text-gray-600 mb-3">Guides</h2>
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Guide to choosing a racquet for beginners
          </Link>{' '}
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Guide to payment methods
          </Link>{' '}
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Check warranty status
          </Link>
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Check order status
          </Link>
          <br />
          <Link href={'/'} className="text-sm mb-2 hover:underline">
            Shopping guide
          </Link>
        </article>
      </section>

      <article className="text-center pb-3">
        <p className="text-sm">
          Copy right &#169; 2023 VNB Sports | All rights reserved
        </p>
        <p className="text-sm">
          Clone and design by{' '}
          <Link
            className="font-medium text-colorPrimary"
            href={'https://www.facebook.com/jungjung.2601/'}
            passHref
            target="_blank"
          >
            DACNTT2 team
          </Link>
        </p>
      </article>
    </footer>
  )
}
