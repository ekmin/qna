import React from "react";
import { Link } from "react-router-dom";

const ListItem = (props) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/question/${props.id}`} className="text-decoration-none">
            {props.que_name}
          </Link>
        </h5>
        <div class="row">
          <div class="col-sm">
            <p>
              {props.edited
                ? `Last edited on ${props.date}`
                : `Created on ${props.date}`}
            </p>
          </div>
          <div class="col">
            <footer className="blockquote-footer">{props.creator_name}</footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListItem;
