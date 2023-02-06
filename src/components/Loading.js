import React, { Component } from 'react'
import loading from './Loading_2.gif'
export class Loading extends Component {
  render() {
    return (
      <div className='text-center' >
        <img style = {{maxHeight:'5rem', marginTop:'5rem', marginBottom:'5rem'}}src={loading} alt="loading" />
      </div>
    )
  }
}

export default Loading