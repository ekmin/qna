import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";
import { setAlert } from "../../store/actions/feedback.actions"

const Question = () => {
  const dispatch = useDispatch();

  const isAuth = useSelector(state => state.auth.isAuthenticated);

  const [submit, setSubmit] = useState("");
  const [question, setQuestion] = useState({
    que_name: "",
    description: "",
    creator_name: "",
    date: "",
    edited: "",
  });
  const [answers, setAnswers] = useState({
      ans_text: "",
      ans_creator_name: "",
      ans_date: "",
      ans_edited: ""
  });

  const [text, setText] = useState("");

  const {
    que_name,
    description,
    creator_name,
    date,
    edited,
  } = question;

  const {
    ans_text,
    ans_creator_name,
    ans_date,
    ans_edited
  } = answers;

  const id = useParams();

  useEffect(() => {
    const getQuestionById = async () => {
      try {
        dispatch(feedbackActions.SET_LOADING());

        const que_res = await api.get(`/question/one/${id.id}`);
        const ans_res = await api.get(`/question/comment/que/${id.id}`);

        setQuestion(que_res.data);
        setAnswers(ans_res.data);

        dispatch(feedbackActions.REMOVE_LOADING());
      } catch (err) {
        dispatch(feedbackActions.REMOVE_LOADING());
        console.log(err);
      }
    };
    getQuestionById();
  }, [submit]);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(feedbackActions.SET_LOADING());
      await api.post(`question/comment/one/${id.id}`, {text});

      setSubmit("posted");
      dispatch(setAlert("success", "Answer posted successfully"));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        dispatch(feedbackActions.REMOVE_LOADING());
        errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
      }
    }
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Question</h1>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{que_name}</h5>
          <p>{description}</p>
            <p className="blockquote-footer">
            {creator_name}
            </p>
            <p className="blockquote-footer">{edited
                ? `Last edited on ${date}`
                : `Created on ${date}`}</p>
          </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Answers</h5>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">Comment</h5>
          {isAuth ? <form onSubmit={submitHandler}>
            <div className="form-floating">
              <textarea
                name="text"
                value={text}
                onChange={onChange}
                className="form-control"
                placeholder="Enter you answer"
                id="floatingTextarea"
                style={{ height: "200px" }}
              ></textarea>
              <label htmlFor="floatingTextarea">Answer</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-3">Submit</button>
          </form> : <p>You should <Link to="login">login</Link> before answering</p>}
        </div>
      </div>
    </div>
  );
};

export default Question;
