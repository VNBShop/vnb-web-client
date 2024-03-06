'use client'

import { useState } from 'react'

import dayjs from 'dayjs'

import relativeTime from 'dayjs/plugin/relativeTime'

import Spiner from '@/common/spiner'
import Avatar from '@/components/avatar'
import CommentCardSkeleton from '@/components/skeletons/comment-card'
import { Button } from '@/components/ui/button'
import { Modal } from '@/components/ui/modal'
import useDeleteProductCmt from '@/hooks/product/useDeleteComment'
import useFetchProductComments from '@/hooks/product/useFetchComments'

import { ProductComment, ProductDetail } from '../../../../types/products'
dayjs.extend(relativeTime)

type IProps = {
  productId: ProductDetail['productId']
}

export default function ProductComments({ productId }: IProps) {
  const [deleteM, setDeleteM] = useState({
    open: false,
    data: {} as ProductComment,
  })

  const onCloseM = () => {
    setDeleteM({
      data: {} as ProductComment,
      open: false,
    })
  }

  const {
    comments,
    hasNextPage,
    isError,
    isFetching,
    isLoading,
    onNextPage,
    page,
  } = useFetchProductComments({ productId })

  const { loading, onDeleteCmt } = useDeleteProductCmt({
    onSuccess: onCloseM,
    page,
  })

  return (
    <>
      <section>
        {!!comments?.length && !isError && (
          <ul className="space-y-4">
            {comments.map((cmt, index) => (
              <article
                key={cmt?.commentId ?? index}
                className="flex w-fit items-start gap-2"
              >
                <Avatar
                  src={cmt?.commentAuthorAvatar ?? ''}
                  username={cmt?.commentAuthor ?? 'Z'}
                />
                <section className="flex-1">
                  <div className="rounded-2xl bg-gray-100 p-2 px-4">
                    <h3 className="text-sm font-medium">
                      {cmt?.commentAuthor ?? ''}
                    </h3>
                    <p className="text-sm">{cmt?.commentContent}</p>
                  </div>

                  <section className="mt-1 flex items-center gap-3 px-4">
                    <p className="text-xs text-gray-500">
                      {cmt?.commentDate
                        ? dayjs(cmt?.commentDate).fromNow()
                        : ''}
                    </p>
                    {cmt?.yourComment ? (
                      <section className="flex items-center gap-3 text-xs font-medium text-gray-700">
                        <div
                          className="hover:cursor-pointer hover:underline"
                          onClick={() =>
                            setDeleteM({
                              data: cmt,
                              open: true,
                            })
                          }
                        >
                          Delete
                        </div>
                      </section>
                    ) : null}
                  </section>
                </section>
              </article>
            ))}
          </ul>
        )}

        {isLoading && !isError && <CommentCardSkeleton />}

        {(isError || !comments?.length) && !isLoading && (
          <p className="text-center text-sm text-gray-500">
            This product didnt have comment yet!
          </p>
        )}
      </section>

      <Modal
        header="Confirm delete comment"
        show={deleteM.open}
        onCloseModal={onCloseM}
      >
        <p className="my-4 text-sm">
          Are you sure you want to delete this comment?
        </p>

        <section className="flex items-center justify-end gap-2">
          <Button
            size="sm"
            disabled={loading}
            className="hover:underline"
            onClick={onCloseM}
            variant="ghost"
          >
            Cancel
          </Button>

          <Button
            disabled={loading}
            className=" space-x-1 bg-danger hover:bg-danger/70"
            size="sm"
            onClick={() =>
              onDeleteCmt({
                productId: deleteM.data?.commentId,
              })
            }
          >
            {loading && <Spiner size={14} />}
            <span>Delete</span>
          </Button>
        </section>
      </Modal>
    </>
  )
}
