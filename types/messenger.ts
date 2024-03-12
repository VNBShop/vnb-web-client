export type ChatResponse = {
  room: string
  messages: Chat[]
}

export type Chat = {
  messageId: number
  senderId: number
  recipientId: number
  content: string
  isImage: boolean
}

export type ChatCommunicate = {
  room: string
  senderId: number
  senderName: string
  receiverId: number
  receiverName: string
  content: string
}
