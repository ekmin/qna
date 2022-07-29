import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";

import ListMyQueItem from "./ListMyQueItem";

const MyQuestions = () => {
  const dispatch = useDispatch();

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      dispatch(feedbackActions.SET_LOADING());
      const res = await api.get("question/user");

      const responseData = await res.data;

      const loadedQuestions = [];

      for (const key in responseData) {
        loadedQuestions.push({
          id: key,
          que_id: responseData[key].que_id,
          que_name: responseData[key].que_name,
          description: responseData[key].description,
          creator_name: responseData[key].creator_name,
          date: responseData[key].date,
          edited: responseData[key].edited,
        });
      }

      setQuestions(loadedQuestions);
      dispatch(feedbackActions.REMOVE_LOADING());
    };
    getQuestions().catch((error) => {
      console.log(error);
    });
  }, []);

  const listMyQueItem = questions.map((question) => (
    <ListMyQueItem
      key={question.que_id}
      id={question.que_id}
      que_name={question.que_name}
      description={question.description}
      creator_name={question.creator_name}
      date={question.date}
      edited={question.edited}
    />
  ));

  return (
    <div className="container">
      <h1 className="text-dark display-5">Questions</h1>
      {listMyQueItem.length === 0 ? <h2 className="text-primary">No Questions Found...</h2> : listMyQueItem}
    </div>
  );
};

export default MyQuestions;
