import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';

export default function UseQuestion(videoID) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState([]);
  useEffect(() => {
    async function fatchQuestion() {
      const db = getDatabase();
      const quizRef = ref(db, 'quiz/' + videoID + '/questions');
      const quizQuery = query(quizRef, orderByKey());
      try {
        setError(false);
        setLoading(true);
        // request firebase database
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestion((prevQuiz) => {
            return [...prevQuiz, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(true);
      }
    }

    fatchQuestion();
  }, [videoID]);
  return {
    question,
    loading,
    error,
  };
}