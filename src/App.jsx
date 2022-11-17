import { useEffect, useState } from "react";
import "./App.css";
import { Card } from "./Card/Card";
import { useGetData } from "./Data/useGetData";

function App() {
  const [lessonsData, setLessonsData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState();
  const URL =
    "https://raw.githubusercontent.com/Drag13/react-learning-course-short/master/course.json";
  useGetData(URL, setLessonsData, setIsLoaded, setError);
  console.log(error);

  const [processedLessonsData, setProcessedLessonsData] = useState();
  useEffect(() => {
    setProcessedLessonsData(lessonsData?.lessons?.filter((lesson) => lesson.hidden !== true));
  }, [lessonsData]);

  useEffect(() => {
    if (processedLessonsData !== undefined) {
      addingInfo();
    }
  }, [lessonsData]);

  function addingInfo() {
    let addAdditionalVariables = processedLessonsData.map((item) => ({
      ...item,
      completed: false,
      notes: "",
    }));
    setProcessedLessonsData(addAdditionalVariables);
  }
  let tempNoteState;
  function addNote(e) {
    let id = e.target.id;
    let value = e.target.value;
    tempNoteState = [...processedLessonsData];

    tempNoteState[id].notes = value;
  }

  function saveNote() {
    let saveState;
    if (saveState !== tempNoteState) {
      setProcessedLessonsData(tempNoteState);
    }
    saveState = tempNoteState;
  }

  function lessonCompleted(e) {
    let id = e.target.id;
    let completedLesson = [...processedLessonsData];

    completedLesson[id].completed = !completedLesson[id].completed;
    setProcessedLessonsData(completedLesson);
  }

  return (
    <div className="App">
      <h1>{isLoaded ? lessonsData.title : ""}</h1>
      <ul className="lessonsList">
        {isLoaded ? (
          <Card
            processedLessonsData={processedLessonsData}
            addNote={addNote}
            lessonCompleted={lessonCompleted}
            saveNote={saveNote}
          />
        ) : (
          ""
        )}
      </ul>
    </div>
  );
}

export default App;
