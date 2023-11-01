import PostComment from './post-comment'
import PostHeader from './post-header'
import PostInteraction from './post-interaction'
import PostMedia from './post-media'
import PostStatus from './post-status'

export default function PostItem() {
  return (
    <article className="mb-7 bg-white py-3 md:rounded-md md:shadow-box">
      <PostHeader />
      <PostStatus />
      <PostMedia />
      <PostInteraction />
      <PostComment />
    </article>
  )
}
