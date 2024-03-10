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
