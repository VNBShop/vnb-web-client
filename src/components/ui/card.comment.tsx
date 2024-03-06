'use client'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

import Spiner from '@/common/spiner'
import useDeteteComment from '@/hooks/forum/useDeleteComment'

import { Button } from './button'
import { Modal } from './modal'

import { Post } from '../../../types/forum'
import Avatar from '../avatar'

// eslint-disable-next-line import/order
import dayjs from 'dayjs'

// eslint-disable-next-line import/order
import { useState } from 'react'
import PostCommentForm from '../form/post-comment'

export type CommnentCardProps = {
  avatar?: string
  name: string
  comment: string
  createAt?: Date
  isSelf: boolean
  id: number
  postId: Post['postId']
}

export default function CommnentCard({
  avatar,
  name,
  comment,
  createAt,
  isSelf,
  id,
  postId,
}: CommnentCardProps) {
  const [modal, setModal] = useState(false)
  const [editM, setEditM] = useState(false)

  const onCloseModal = () => {
    setModal(false)
  }

  const onCloseEditM = () => {
    setEditM(false)
  }

  const { onDeleteComment, loading } = useDeteteComment({
    onClose: onCloseModal,
  })

  return (
    <>
      <article className="flex w-fit items-start gap-2">
        <Avatar src={avatar ?? ''} username={name} />
        <section className="flex-1">
          <div className="rounded-2xl bg-gray-100 p-2 px-4">
            <h3 className="text-sm font-medium">{name}</h3>
            <p className="text-sm">{comment}</p>
          </div>

          <section className="mt-1 flex items-center gap-3 px-4">
            <p className="text-xs text-gray-500">{dayjs(createAt).fromNow()}</p>
            {isSelf ? (
              <section className="flex items-center gap-3 text-xs font-medium text-gray-700">
                <div
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => setEditM(true)}
                >
                  Edit
                </div>
                <div
                  className="hover:cursor-pointer hover:underline"
                  onClick={() => setModal(true)}
                >
                  Delete
                </div>
              </section>
            ) : null}
          </section>
        </section>
      </article>

      <Modal
        header="Confirm delete comment"
        onCloseModal={onCloseModal}
        show={modal}
      >
        <p className="my-4">Are you sure you want to delete this comment?</p>
        <section className="flex items-center justify-end gap-2">
          <Button
            disabled={loading}
            onClick={onCloseModal}
            variant="ghost"
            className="hover:underline"
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="h-10 space-x-1"
            onClick={() =>
              onDeleteComment({
                commnentId: id,
              })
            }
          >
            {loading && <Spiner size={16} />}
            <span>Delete</span>
          </Button>
        </section>
      </Modal>

      <Modal
        show={editM}
        onCloseModal={onCloseEditM}
        header="Edit your comment"
      >
        <PostCommentForm
          commentId={id}
          commented={comment}
          onClose={onCloseEditM}
        />
      </Modal>
    </>
  )
}
