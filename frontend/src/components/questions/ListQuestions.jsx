import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";

import ListItem from "./ListItem";

const ListQuestions = () => {
  const dispatch = useDispatch();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = async () => {
      dispatch(feedbackActions.SET_LOADING());
      const res = await api.get("/question/");

      const responseData = await res.data;

      const loadedQuestions = [];

      for (const key in responseData) {
        loadedQuestions.push({
          id: key,
          que_id: responseData[key].que_id,
          que_name: responseData[key].que_name,
          description: responseData[key].description,
          creator_id: responseData[key].creator_id,
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

  const listItem = questions.map((question) => (
    <ListItem
      key={question.que_id}
      id={question.que_id}
      que_name={question.que_name}
      description={question.description}
      creator_id={question.creator_id}
      creator_name={question.creator_name}
      date={question.date}
      edited={question.edited}
    />
  ));

  return (
    <div className="container">
      <h1 className="text-dark">Questions</h1>
      {listItem}
    </div>
  );
};

export default ListQuestions;
