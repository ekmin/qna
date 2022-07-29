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
      await api.delete(`question/one/${props.id}`);
      dispatch(feedbackActions.REMOVE_LOADING());
      setDeleted(true);
      dispatch(setAlert("success", "Question deleted successfully"));
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
          <div className="row align-items-start">
            <div className="col-md">
              <h5 className="card-title">
                <Link
                  to={`/question/${props.id}`}
                  className="text-decoration-none"
                >
                  {props.que_name}
                </Link>
              </h5>
              <p>
                {props.edited
                  ? `Last edited on ${props.date}`
                  : `Created on ${props.date}`}
              </p>
            </div>
            <div className="col-md">
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
                  to={`/edit-question/${props.id}`}
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
