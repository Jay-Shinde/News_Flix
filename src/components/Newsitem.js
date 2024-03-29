
const Newsitem =(props)=> {
  
    let { title, description, imgUrl, url } = props;
    return (
      <div>
        <div className="card my-2">
          <img
            style={{ maxHeight: "18rem" }}
            className="card-img-top"
            src={
              imgUrl
                ? imgUrl
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcvAdPDpPYimHecAENI2QjNCVvbWdJ-66w3g&usqp=CAU"
            }
            alt=" somrthing here"
          />
          <div className="card-body">
            <h5 className="card-title">{title ? title.slice(0, 70) : ""}..</h5>
            <p className="card-text">
              {description ? description.slice(0, 85) : ""}..
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {!props.author ? "Unknown" : props.author} on{" "}
                {new Date(props.publishedAt).toGMTString().slice(0, 16)}
              </small>
            </p>
            <a href={url} className="btn btn-secondary">
              Read more
            </a>
            <div
              className="container"
              style={{
                position: "absolute",
                top: "0",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span className="badge rounded-pill bg-danger">
                {props.name}
                <span className="visually-hidden">unread messages</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
