import { useEffect, useState } from "react";
import "./card.css";

export function Card({ processedLessonsData, addNote, lessonCompleted, saveNote }) {
  return (
    <>
      {processedLessonsData?.map((lesson, i) => {
        return (
          <li
            key={i}
            className={lesson.completed === true ? "lessonCard lessonCardCompleted" : "lessonCard"}
          >
            <p>{lesson?.type}</p>
            <h4>{lesson?.title}</h4>
            <details>
              <summary>Details:</summary>
              <details>
                <summary>Key Points:</summary>
                <ul>
                  {lesson?.keyPoints.map((point, k) => {
                    return <li key={i + k}>{point}</li>;
                  })}
                </ul>
              </details>

              <details>
                <summary>Useful links:</summary>
                <ul className="lessonLinks">
                  {lesson.links.map((link, k) => {
                    return (
                      <li key={i + k}>
                        <a href={link[1]} target="_blank">
                          {link[0]}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </details>

              <a href={lesson?.youtube} target="_blank">
                {"YouTube lesson"}
              </a>
            </details>

            <details>
              <summary>Notes:</summary>
              <p className="note">{lesson?.notes}</p>

              <form>
                <textarea
                  name="notes"
                  id={i}
                  cols="30"
                  rows="3"
                  placeholder="For notes..."
                  onChange={(e) => {
                    addNote(e);
                  }}
                ></textarea>
                <button
                  type="button"
                  onClick={() => {
                    saveNote();
                  }}
                >
                  Save note
                </button>
              </form>
            </details>

            <button
              type="button"
              id={i}
              onClick={(e) => {
                lessonCompleted(e);
              }}
            >
              {lesson.completed === true ? "Read lesson once more?" : "Lesson completed"}
            </button>
          </li>
        );
      })}
    </>
  );
}
