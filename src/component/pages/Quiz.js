import { getDatabase, ref, set } from "firebase/database";
import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import useQuizList from "../../hooks/useQuiaList";
import Answers from "../Answers";
import MiniPlayer from "../MiniPlayer";
import ProgressBar from "../ProgressBar";

const initialState = null;
const reducer = (state, action) => {
  switch (action.type) {
    case "question":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function Quiz() {
  const { id } = useParams();
  const { loading, questions, error } = useQuizList(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const {state} = useLocation()
  const {videoTitle} = state

  useEffect(() => {
    dispatch({
      type: "question",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }
  // parcentage of progress bar
  const parcentage =
    currentQuestion > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  // Handle when user click the next button to get the next question
  function nextQuestion() {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
    }
  }

  // Handle when user click the prev button to back to the previous question
  function prevQuestion() {
    if (currentQuestion >= 1 && currentQuestion <= questions.length) {
      setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion - 1);
    }
  }

  // Handle when user gave user all the answer and save the  result in the db
  async function submit() {
    const { uid } = currentUser;
    const db = getDatabase();
    const resultRef = ref(db, `/result/${uid}`);
    try {
      await set(resultRef, {
        [id]: qna,
      });

      navigate(`/result/${id}`, {
        state: qna,
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {loading && <h2 className="center">Loading ...</h2>}
      {error && <div>There was an error!</div>}
      {!loading && !error && qna && qna.length > 0 && (
        <>
          <h1>{qna[currentQuestion].title}</h1>
          <h4>Question can have multiple answers</h4>
          <Answers
            input={true}
            options={qna[currentQuestion].options}
            handleChange={handleAnswerChange}
          />
          <ProgressBar
            next={nextQuestion}
            prev={prevQuestion}
            submit={submit}
            progress={parcentage}
          />
          <MiniPlayer id={id} title={videoTitle} />
        </>
      )}
    </>
  );
}
