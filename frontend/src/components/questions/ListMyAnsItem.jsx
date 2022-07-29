import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";
import { setAlert } from "../../store/actions/feedback.actions";

const ListMyQueItem = (props) => {
  const dispatch = useDispatch();
  const [deleted, setDeleted] = useState(false);
  const deleteHandler = async () => {
    try {
      dispatch(feedbackActions.SET_LOADING());
      await api.delete(`question/comment/one/${props.id}`);
      dispatch(feedbackActions.REMOVE_LOADING());
      setDeleted(true);
      dispatch(setAlert("success", "Answer deleted successfully"));
    } catch (error) {
      dispatch(feedbackActions.REMOVE_LOADING());
      console.log(error);
    }
  };

  if (deleted) {
    return <Navigate to="/" />;
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="container">
          <div className="row">
            <div className="col-10">
              <h5 className="card-title">
                <Link
                  to={`/question/${props.id}`}
                  className="text-decoration-none"
                >
                  {props.que_name}
                </Link>
              </h5>
              <p>{props.text}</p>
              <p>
                {props.edited
                  ? `Last edited on ${props.date}`
                  : `Created on ${props.date}`}
              </p>
            </div>
            <div className="col">
              <button
                type="button"
                onClick={deleteHandler}
                className="float-end btn btn-outline-danger btn-sm ms-2"
              >
                Delete
              </button>
              <button
                type="button"
                className="float-end btn btn-outline-primary btn-sm"
              >
                <Link
                  to={`/edit-answer/${props.id}`}
                  className="text-decoration-none"
                >
                  Edit
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMyQueItem;
