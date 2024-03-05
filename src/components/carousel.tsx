'use client'

import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react'

import useEmblaCarousel, {
  EmblaCarouselType,
  type EmblaOptionsType,
} from 'embla-carousel-react'
import Image from 'next/image'

import Icon from '@/common/icons'
import { cn } from '@/lib/utils'

import { Button } from './ui/button'

export type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  images: string[]
  options?: EmblaOptionsType
  close: Dispatch<SetStateAction<any>>
}

export default function Carousel({
  images,
  className,
  options,
  close,
  ...props
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options)

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  )
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  )

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev()
      } else if (event.key === 'ArrowRight') {
        scrollNext()
      }
    },
    [scrollNext, scrollPrev]
  )

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect)
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (images?.length) {
      document.documentElement.style.overflow = 'hidden'
    }

    return () => {
      document.documentElement.style.overflow = 'unset'
    }
  }, [images])

  return (
    <>
      {images?.length ? (
        <section className="fixed inset-0 z-[11] flex h-screen w-full items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div
            aria-label="Product image carousel"
            className={cn('flex w-full flex-col gap-2', className)}
            {...props}
          >
            <div ref={emblaRef} className="mx-auto w-full overflow-hidden">
              <div
                className="flex w-full touch-pan-y lg:-ml-4"
                style={{
                  backfaceVisibility: 'hidden',
                }}
              >
                {images?.length
                  ? images.map((image, index) => (
                      <div
                        className="relative h-screen min-w-0 flex-full lg:pl-4"
                        key={index}
                      >
                        <Image
                          role="group"
                          key={index}
                          aria-roledescription="slide"
                          src={image}
                          alt={image}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-contain"
                          priority={index === 0}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>

            {/* Control */}
            {!prevBtnDisabled ? (
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-[50%] hidden h-12 w-12 items-center justify-center rounded-full hover:cursor-pointer lg:inline-flex"
                disabled={prevBtnDisabled}
                onClick={scrollPrev}
              >
                <Icon name="ChevronLeft" size={25} color="white" />
              </Button>
            ) : null}

            {!nextBtnDisabled ? (
              <Button
                variant="outline"
                size="icon"
                disabled={nextBtnDisabled}
                className="absolute right-4 top-[50%] hidden h-12 w-12 items-center justify-center rounded-full hover:cursor-pointer lg:inline-flex"
                onClick={scrollNext}
              >
                <Icon name="ChevronRight" size={25} color="white" />
              </Button>
            ) : null}

            <Button
              size="icon"
              variant="ghost"
              className="absolute right-2 top-2 inline-flex h-12 w-12 items-center justify-center rounded-full hover:cursor-pointer lg:right-4"
              onClick={close}
            >
              <Icon name="Xmark" size={25} color="white" />
            </Button>

            {/* {photos?.length && photos.length > 1 ? (
              <div className="flex w-full items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="mr-0.5 aspect-square h-7 w-7 rounded-none sm:mr-2 sm:h-8 sm:w-8"
                  disabled={prevBtnDisabled}
                  onClick={scrollPrev}
                >
                  <Icon name="ChevronLeft" width={16} height={16} />
                  <span className="sr-only">Previous slide</span>
                </Button>
                {photos.map((image, i) => (
                  <Button
                    key={i}
                    variant="outline"
                    size="icon"
                    className={cn(
                      'focus-visible:ring-foreground group relative aspect-square h-full w-full max-w-[100px] rounded-none shadow-sm hover:bg-transparent',
                      i === selectedIndex && 'ring-foreground ring-1'
                    )}
                    onClick={() => scrollTo(i)}
                    onKeyDown={handleKeyDown}
                  >
                    <div className="absolute inset-0 z-10 bg-zinc-950/20 group-hover:bg-zinc-950/40" />
                    <Image
                      src={image.url}
                      alt={image}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      fill
                    />
                    <span className="sr-only">
                      Slide {i + 1} of {photos.length}
                    </span>
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-0.5 aspect-square h-7 w-7 rounded-none sm:ml-2 sm:h-8 sm:w-8"
                  disabled={nextBtnDisabled}
                  onClick={scrollNext}
                >
                  <Icon name="ChevronRight" width={16} height={16} />
                  <span className="sr-only">Next slide</span>
                </Button>
              </div>
            ) : null} */}
          </div>
        </section>
      ) : null}
    </>
  )
}
