import React from 'react'

const Repo = (props) => {
  return (
    
        <div className="card mx-2 col-md-4 my-2" style={{width: "18rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.name}</h5>
    <h6 className="card-subtitle mb-2 text-body-secondary">{props.fname}</h6>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
    {!props.priv?<p>Public</p>:<p>Public</p>}
  </div>
</div> 
    
  )
}

export default Repo