import loading from './Loading_2.gif'
const Loading = ()=> {
  
    return (
      <div className='text-center' >
        <img style = {{maxHeight:'5rem', marginTop:'5rem', marginBottom:'5rem'}}src={loading} alt="loading" />
      </div>
    )
  
}

export default Loading