import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "../../utils/api";
import { feedbackActions } from "../../store/reducers/feedback.reducers";

import ListMyAnsItem from "./ListMyAnsItem";

const MyAnswers = () => {
  const dispatch = useDispatch();

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const getAnswers = async () => {
      dispatch(feedbackActions.SET_LOADING());
      const resAns = await api.get("/question/comment");
    //   const resQue = await api.get("question/one/");

      const responseAnsData = await resAns.data;

      const loadedAnswers = [];

      for (const key in responseAnsData) {
        loadedAnswers.push({
          id: key,
          com_id: responseAnsData[key].com_id,
          text: responseAnsData[key].text,
          que_id: responseAnsData[key].que_id,
          que_name: responseAnsData[key].que_name,
          creator_name: responseAnsData[key].creator_name,
          date: responseAnsData[key].date,
          edited: responseAnsData[key].edited,
        });
      }

      setAnswers(loadedAnswers);
      dispatch(feedbackActions.REMOVE_LOADING());
    };
    getAnswers().catch((error) => {
      console.log(error);
    });
  }, []);

  const listMyAnsItem = answers.map((answer) => (
    <ListMyAnsItem
      key={answer.com_id}
      id={answer.com_id}
      text={answer.text}
      que_id={answer.que_id}
      que_name={answer.que_name}
      creator_name={answer.creator_name}
      date={answer.date}
      edited={answer.edited}
    />
  ));

  return (
    <div className="container">
      <h1 className="text-dark display-5">Answers</h1>
      {listMyAnsItem.length === 0 ? <h2 className="text-primary">No Answers Found...</h2> : listMyAnsItem}
    </div>
  );
};

export default MyAnswers;
