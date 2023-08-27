import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState(null);
  const abortCont = new AbortController();
  useEffect(() => {
    fetch("http://localhost:4000/questions", { signal: abortCont.signal })
      .then((res) => res.json())
      .then(
        (data) => {
          setQuestions(data);
        },
        [questions]
      );
    return () => abortCont.abort();
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions &&
          questions.map((question) => {
            return <QuestionItem question={question} key={question.id} />;
          })}
      </ul>
    </section>
  );
}

export default QuestionList;
