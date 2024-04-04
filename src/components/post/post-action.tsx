import { Fragment, useState } from 'react'

import { Menu, Transition } from '@headlessui/react'

import Icon from '@/common/icons'

import Spiner from '@/common/spiner'
import { usePostItemContext } from '@/context/post-item'
import useDetetePost from '@/hooks/forum/useDeletePost'

import useReportPost from '@/hooks/forum/useReportPost'
import useSavePost from '@/hooks/forum/useSavePost'
import useUnsavePost from '@/hooks/forum/useUnsavePost'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { Modal } from '../ui/modal'

export default function PostAction() {
  const [modalDeletePost, setModalDeletePost] = useState(false)

  const onCloseModalDeletePost = () => {
    setModalDeletePost(false)
  }

  const { post, isDetail, pageKey } = usePostItemContext()

  const { loading, onDeletePost } = useDetetePost({
    onClose: onCloseModalDeletePost,
  })

  const { loading: loadingSave, onSavePost } = useSavePost({
    onSuccess: () => {},
    isDetail,
  })

  const { loadingUnsave, onUnsavePost } = useUnsavePost({
    onSuccess: () => {},
  })

  const { loadingReport, onReportPost } = useReportPost({
    onSuccess: () => {},
  })

  return (
    <>
      <Menu as="div" className="relative flex items-center justify-center">
        <Menu.Button className="flex h-8 w-8 items-center justify-center rounded-full hover:cursor-pointer lg:hover:bg-gray-100">
          <Icon name="Ellipsis" size={20} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute -right-4 top-[120%] z-10 grid min-w-[270px]  gap-[6px] rounded-lg bg-white p-2 shadow-box">
            {!post?.yourPost && (
              <>
                <Menu.Item
                  disabled={loadingSave || loadingUnsave}
                  as="div"
                  onClick={() =>
                    post?.saved
                      ? onUnsavePost({
                          postId: post?.postId,
                        })
                      : onSavePost({
                          postId: post?.postId,
                        })
                  }
                  className={cn(
                    'flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100',
                    post?.saved ? 'text-success' : 'text-black'
                  )}
                >
                  <Icon name="Saved" size={18} />
                  {post?.saved ? 'Unsave' : 'Save'}
                </Menu.Item>

                <Menu.Item
                  as="div"
                  disabled={post?.reported || loadingReport}
                  onClick={() =>
                    onReportPost({
                      postId: post?.postId,
                    })
                  }
                  className={cn(
                    'flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100',
                    post?.reported ? 'text-success' : 'text-black'
                  )}
                >
                  <Icon name="Report" size={18} />
                  Report
                </Menu.Item>
              </>
            )}

            {post?.yourPost && (
              <Menu.Item
                as="div"
                onClick={() => setModalDeletePost(true)}
                className="flex items-center gap-2 rounded-md p-2 text-sm font-medium hover:cursor-pointer hover:bg-gray-100"
              >
                <Icon name="Trash" size={18} />
                Delete
              </Menu.Item>
            )}
          </Menu.Items>
        </Transition>
      </Menu>

      <Modal
        show={modalDeletePost}
        onCloseModal={onCloseModalDeletePost}
        header="Confirm delete post"
      >
        <p className="my-4 text-sm">
          Are you sure you want to delete this post?
        </p>

        <section className="flex items-center justify-end">
          <Button
            disabled={loading}
            onClick={onCloseModalDeletePost}
            className=" hover:underline"
            variant="ghost"
            size="sm"
          >
            Cancel
          </Button>

          <Button
            size="sm"
            disabled={loading}
            className=" space-x-1 bg-danger hover:bg-danger/75"
            onClick={() => onDeletePost()}
          >
            {loading && <Spiner size={16} />}
            <span>Delete</span>
          </Button>
        </section>
      </Modal>
    </>
  )
}
