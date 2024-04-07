import React from 'react'
import Mylayout from '../mylayout'
import ChatgptAPI from '../components/ChatgptAPI'
import styles from './page.module.css'

export default function page() {
  return (
    <Mylayout>
        <ChatgptAPI/>
    </Mylayout>
  )
}
