import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from './firebase'

interface MessageData {
  name: string
  email: string
  message: string
}

export async function sendMessage(data: MessageData): Promise<void> {
  try {
    await addDoc(collection(db, 'contacts'), {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: serverTimestamp(),
      status: 'unread'
    })
  } catch (error) {
    console.error('Error sending message:', error)
    throw new Error('Failed to send message')
  }
}
