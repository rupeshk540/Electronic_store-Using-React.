import React from 'react'
import { Container, Spinner } from 'react-bootstrap'

const Loading = ({show}) => {
  return show && (
    <Container className='text-center p-4'>
       <Spinner size='lg' />
       <p>loading</p>
    </Container>
  )
}

export default Loading