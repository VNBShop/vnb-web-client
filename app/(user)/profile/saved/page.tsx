'use client'

import { useEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'

import Empty from '@/common/empty'
import Spiner from '@/common/spiner'
import { Button } from '@/components/ui/button'
import useFetchPostSaved from '@/hooks/forum/useFetchPostSaved'

import useUnsavePost from '@/hooks/forum/useUnsavePost'

import { errorFallback } from '../../../../public/common'

export default function PostSaved() {
  const {
    fetchNextPage,
    hasNextPage,
    isError,
    isFetchingNextPage,
    isPending,
    postsSaved,
  } = useFetchPostSaved()

  const { loadingUnsave, onUnsavePost } = useUnsavePost({
    onSuccess() {},
    pageKey: ['get-posts-saved'],
  })

  const { ref, inView } = useInView({
    delay: 1000,
  })

  useEffect(() => {
    if (hasNextPage && inView) {
      fetchNextPage()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView])

  return (
    <section className=" mx-auto mt-10 max-w-[700px] bg-white p-4 py-3 shadow-sm md:rounded-md">
      <h3>Posts saved</h3>

      {!!postsSaved?.length && !isError && (
        <section className="mt-7 space-y-7 px-4">
          {postsSaved.map((post) => (
            <article key={post?.postId} className="flex gap-4">
              <Link href={`/forum/${post?.postId}`} passHref>
                <figure className="relative h-[80px] w-[110px] rounded-md">
                  <Image
                    src={
                      (post?.postImages[0]?.includes('/')
                        ? post?.postImages[0]
                        : post?.postAuthorAvatar) ?? errorFallback
                    }
                    alt="Post save"
                    fill
                    sizes="100vw"
                    className="rounded-md object-cover"
                  />
                </figure>
              </Link>

              <div className="flex-1 space-y-1">
                <Link href={`/forum/${post?.postId}`} passHref>
                  <p className=" line-clamp-2 text-lg hover:cursor-pointer hover:underline">
                    {post?.postContent}
                  </p>
                </Link>
                <p className="text-sm text-gray-500">{post?.postAuthorName}</p>

                <Button
                  disabled={loadingUnsave}
                  variant="ghost"
                  onClick={() =>
                    onUnsavePost({
                      postId: post?.postId,
                    })
                  }
                  className="h-8 space-x-1 p-0 text-sm text-danger hover:underline"
                >
                  {loadingUnsave && <Spiner size={16} />}
                  <span>Unsave</span>
                </Button>
              </div>
            </article>
          ))}
        </section>
      )}

      {(isPending || isFetchingNextPage) && !isError && (
        <section className="mt-7 animate-pulse space-y-4 px-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <article key={index} className="flex gap-4">
              <div className="h-[90px] w-[120px] rounded-md bg-gray-200"></div>

              <div className="flex-1 space-y-1">
                <div className="h-8 w-[60%] rounded-lg bg-gray-200"></div>
                <div className="h-4 w-[100px] rounded-lg bg-gray-200"></div>
                <div className="h-8 w-8 rounded-lg bg-gray-200"></div>
              </div>
            </article>
          ))}
        </section>
      )}

      {(isError || !postsSaved?.length) &&
        !isPending &&
        !isFetchingNextPage && (
          <Empty className="mx-auto grid w-[100px]" message="No posts saved" />
        )}

      {hasNextPage && !isError && !isPending && !isFetchingNextPage && (
        <div ref={ref}></div>
      )}
    </section>
  )
}
