// import React from 'react'
// import { Container, Spinner } from 'react-bootstrap'

// const Loading = ({show}) => {
//   return show && (
//     <Container className='text-center p-4'>
//        <Spinner size='lg' />
//        <p>loading</p>
//     </Container>
//   )
// }

// export default Loading;


import { Spinner } from 'react-bootstrap'

const Loading = ({ show }) => {
  return show && (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(3px)'
      }}
    >
      <Spinner 
        animation="border" 
        variant="light"
        style={{ width: '4rem', height: '4rem' }}
      />
      <p style={{ 
        color: 'white', 
        marginTop: '1rem', 
        fontSize: '1.2rem',
        fontWeight: '500'
      }}>
        Loading...
      </p>
    </div>
  )
}

export default Loading;