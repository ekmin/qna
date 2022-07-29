import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";
import { setAlert } from "../../store/actions/feedback.actions";

const EditQuestion = () => {
  const dispatch = useDispatch();

  const [submit, setSubmit] = useState(false);
  const [question, setQuestion] = useState({
    que_name: "",
    description: "",
  });

  const { que_name, description } = question;

  const id = useParams();

  useEffect(() => {
    const getQuestionById = async () => {
      try {
        dispatch(feedbackActions.SET_LOADING());

        const res = await api.get(`/question/one/${id.id}`);

        setQuestion(res.data);

        dispatch(feedbackActions.REMOVE_LOADING());
      } catch (err) {
        dispatch(feedbackActions.REMOVE_LOADING());
        console.log(err);
      }
    };
    getQuestionById();
  }, []);

  const onChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(feedbackActions.SET_LOADING());
      await api.put(`question/one/${id.id}`, question);

      setSubmit(true);
      dispatch(setAlert("success", "Question updated successfully"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        dispatch(feedbackActions.REMOVE_LOADING());
        errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
      }
    }
  };

  if(submit) {
    return <Navigate to="/my-questions" />
  }

  return (
    <div className="container">
      <h1 className="large text-primary">Question</h1>
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                name="que_name"
                value={que_name}
                onChange={onChange}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="question heading"
              />
              <label htmlFor="floatingInput">Heading</label>
            </div>
            <div className="form-floating">
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                className="form-control"
                placeholder="Enter you answer"
                id="floatingTextarea"
                style={{ height: "200px" }}
              ></textarea>
              <label htmlFor="floatingTextarea">Answer</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-3">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditQuestion;
