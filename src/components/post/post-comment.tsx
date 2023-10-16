import Avatar from '../avatar'
import PostCommentForm from '../form/post-comment'
import CommnentCard from '../ui/card.comment'

const comments = [
  {
    id: 1231,
    userId: '12das2',
    userName: 'Dzung',
    userAvatar: '/common/fake.webp',
    content:
      'Norman: Tao vừa mới bị thằng Nhọ chốt vỡ mồm xong phải đi loay hoay đi đào thằng Kraven lên thì giờ lại đến có đứa chốt vỡ mồm tao rồi đào con giai tao lên à ?? Thằng Nhọ gánh tội cho tao thì tao gánh nhọ cho nó hay gì đây ??',
  },
  {
    id: 2121,
    userId: 'csaa232',
    userName: 'Khang Leo',
    content: 'Ugly racket',
  },
]

export default function PostComment() {
  return (
    <section className="mt-4 px-4">
      <section className="flex items-start gap-2">
        <Avatar src="/common/avt.jpeg" username="D" />
        <PostCommentForm />
      </section>

      <ul className="mt-5 space-y-3">
        {comments.map((item) => (
          <li key={item.id}>
            <CommnentCard comment={item.content} name={item.userName} />
          </li>
        ))}
      </ul>
    </section>
  )
}
