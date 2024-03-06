import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-28 border-t px-4 pt-6">
      <section className="mx-auto mb-10 flex max-w-main flex-wrap gap-5 gap-y-6">
        <article className="w-full md:w-[calc(60%-15px)] lg:w-[calc(40%-15px)]">
          <h2 className="mb-3 text-[18px] font-medium text-gray-600">
            General Information
          </h2>
          <p className="mb-2 text-sm">
            <strong>VNB Sports</strong> is a system of badminton stores with
            more than 50 branches nationwide, providing wholesale and retail of
            badminton equipment from movement to professional.
          </p>
          <p className="mb-2 text-sm">
            <strong>Mission:</strong> &quot;VNB is committed to bringing the
            best quality products and services to sports players to improve
            their own health.&quot;
          </p>

          <p className="text-[14px]">
            <strong>Vision:</strong> &quot;Become a distributor and
            Vietnam&apos;s largest sports producer&quot;
          </p>
        </article>

        <article className="w-full md:w-[calc(40%-15px)] lg:w-[calc(60%/3-15px)]">
          <h2 className="mb-3 text-[18px] font-medium text-gray-600">
            Contact Informations
          </h2>
          <p className="mb-2 text-sm">
            <strong>Hotline:</strong> 1900 636 636
          </p>
          <p className="mb-2 text-sm">
            <strong>Email:</strong> info@gmail.com
          </p>

          <p className="text-[14px]">
            <strong>Franchise:</strong> 1900 636 636
          </p>

          <div className="mt-3 flex items-center gap-2">
            <Link
              href={'https://www.facebook.com/VNBSports'}
              className="hover:bg-bgGray flex h-[35px] w-[35px] items-center justify-center rounded-full border hover:cursor-pointer"
              target="_blank"
            >
              <i className="fa-brands fa-facebook text-[#4267B2]"></i>
            </Link>
            <Link
              href={'https://www.youtube.com/@congdongvnb'}
              className="hover:bg-bgGray flex h-[35px] w-[35px] items-center justify-center rounded-full border hover:cursor-pointer"
              target="_blank"
            >
              <i className="fa-brands fa-youtube text-[#FF0000]"></i>
            </Link>
          </div>
        </article>

        <article className="w-full md:w-[calc(100%/2-15px)] lg:w-[calc(60%/3-15px)]">
          <h2 className="mb-3 text-[18px] font-medium text-gray-600">Policy</h2>
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Return Policy & Exchange
          </Link>{' '}
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Warranty Policy
          </Link>{' '}
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Shipping Policy
          </Link>
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Term of Use
          </Link>
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Privacy Policy
          </Link>
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Franchise policy
          </Link>
        </article>

        <article className="w-full md:w-[calc(100%/2-15px)] lg:w-[calc(60%/3-15px)]">
          <h2 className="mb-3 text-[18px] font-medium text-gray-600">Guides</h2>
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Guide to choosing a racquet for beginners
          </Link>{' '}
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Guide to payment methods
          </Link>{' '}
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Check warranty status
          </Link>
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Check order status
          </Link>
          <br />
          <Link href={'/'} className="mb-2 text-sm hover:underline">
            Shopping guide
          </Link>
        </article>
      </section>

      <article className="pb-3 text-center">
        <p className="text-sm">
          Copy right &#169; 2024 VNB Sports | All rights reserved
        </p>
        <p className="text-sm">
          Clone and design by{' '}
          <Link
            className="text-colorPrimary font-medium"
            href={'https://www.facebook.com/jungjung.2601/'}
            passHref
            target="_blank"
          >
            VNB Dev team
          </Link>
        </p>
      </article>
    </footer>
  )
}
