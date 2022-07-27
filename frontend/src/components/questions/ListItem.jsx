import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  return (
    // <div className="profile bg-light">
    //   <div>
    //     <h2>{props.que_name}</h2>
    //     <p>{props.date} at</p>
    //     <Link to={`/question/${props.id}`} className="btn btn-primary">
    //       View Picnic
    //     </Link>
    //   </div>
    // </div>
<div class="card mb-3">
  <div class="card-body">
  <h5 class="card-title"><Link to={`/question/${props.id}`} className="text-decoration-none">{props.que_name}</Link></h5>
    <p>{props.creator_name}</p>
    <blockquote class="blockquote mb-0">
    <footer class="blockquote-footer">{props.edited ? `Last edited on ${props.date}` : `Created on ${props.date}`}</footer>
    </blockquote>
  </div>
</div>
  );
};

export default ListItem;