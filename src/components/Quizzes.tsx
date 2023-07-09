import Quiz from './Quiz';
import { IQuiz } from '../types/types';
import { Dispatch, SetStateAction } from 'react';

interface QuizzesProps {
    quizzes: IQuiz[];
    setQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
}

const Quizzes = ({ quizzes, setQuizzes }: QuizzesProps) => {
    return (
        <div>
            {quizzes?.map((quiz: IQuiz) => (
                <Quiz key={quiz.id} quiz={quiz} setQuizzes={setQuizzes} />
            ))}
        </div>
    );
};

export default Quizzes;
