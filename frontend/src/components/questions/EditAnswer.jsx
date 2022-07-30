import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";
import { setAlert } from "../../store/actions/feedback.actions";

function EditAnswer() {
    const dispatch = useDispatch();

  const [submit, setSubmit] = useState(false);
  const [text, setText] = useState("");

  const id = useParams();

  useEffect(() => {
    const getQuestionById = async () => {
      try {
        dispatch(feedbackActions.SET_LOADING());

        const res = await api.get(`/question/comment/one/${id.id}`);

        setText(res.data.text);

        dispatch(feedbackActions.REMOVE_LOADING());
      } catch (err) {
        dispatch(feedbackActions.REMOVE_LOADING());
        console.log(err);
      }
    };
    getQuestionById();
  }, []);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(feedbackActions.SET_LOADING());
      await api.put(`/question/comment/one/${id.id}`, {text});

      setSubmit(true);
      dispatch(setAlert("success", "Answer updated successfully"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        dispatch(feedbackActions.REMOVE_LOADING());
        errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
      }
    }
  };

  if(submit) {
    return <Navigate to="/my-answers" />
  }

  return (
    <div className="container">
      <h1 className="large text-primary">Question</h1>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <textarea
                name="text"
                value={text}
                onChange={onChange}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="question heading"
                style={{ height: "200px" }}
              />
              <label htmlFor="floatingInput">Answer</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditAnswer