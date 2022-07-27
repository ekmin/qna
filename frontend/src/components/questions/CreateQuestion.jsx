import React, {useState} from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import image from "../../assets/41Z_2106.w009.n001.5B.p8.5.jpg";
import { setAlert } from "../../store/actions/feedback.actions";
import { feedbackActions } from "../../store/reducers/feedback.reducers";
import api from "../../utils/api";

function CreateQuestion() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    que_name: "",
    description: "",
  });

  const { que_name, description } = formData;

  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  async function submitHandler(event) {
    event.preventDefault();

    try {
      dispatch(feedbackActions.SET_LOADING());
  
      await api.post("/question", formData);
  
      dispatch(feedbackActions.REMOVE_LOADING());
  
      dispatch(setAlert("success", "Question posted successfully"));
    } catch (err) {
      const errors = err.response.data.errors;
  
      if (errors) {
        dispatch(feedbackActions.REMOVE_LOADING());
        errors.forEach((error) => dispatch(setAlert("danger", error.msg)));
      }
    }

    setFormData({
      que_name: "",
      description: "",
    });
  }

  return (
    <div className="container mt-4">
      <div className="row align-items-center">
        <div className="col-md">
          <h1 className="h1 mb-3">Your Question</h1>
          <form onSubmit={submitHandler}>
            <div className="form-floating mb-3">
              <input
                name="que_name"
                value={que_name}
                onChange={onChange}
                type="text"
                className="form-control"
                id="floatingInput"
                placeholder="Heading"
              />
              <label htmlFor="floatingInput">Heading</label>
            </div>
            <div className="form-floating">
              <textarea
                name="description"
                value={description}
                onChange={onChange}
                className="form-control"
                placeholder="Enter you question"
                id="floatingTextarea"
                style={{ height: "200px" }}
              ></textarea>
              <label htmlFor="floatingTextarea">Question</label>
            </div>
            <button type="submit" className="btn btn-primary btn-lg mt-3">Submit</button>
          </form>
        </div>
        <div className="col-md">
          <img src={image} alt="Image" className="img-fluid" />
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
