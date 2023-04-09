import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

export default function Loader() {
  return (
   <div className='d-flex justify-content-center'>
     <MDBSpinner role='status'  className='ms-2 m-5' color='dark' style={{ width: '3rem', height: '3rem' }}>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
   </div>
  );
}