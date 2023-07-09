import {
    createContext,
    useState,
    ReactNode,
    useEffect,
    Dispatch,
    SetStateAction,
} from 'react';
import Swal from 'sweetalert2';

import { IQuestion, IQuiz } from '../types/types';
import { useGetQuizzes } from '../hooks/useGetQuizzes';

interface QuizContextProps {
    reusableQuestions: IQuestion[];
    setReusableQuestions: (questions: IQuestion[]) => void;
    Swal: typeof Swal;
    quizzes: IQuiz[];
    setQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
}

export const QuizContext = createContext<QuizContextProps>(
    {} as QuizContextProps
);

interface QuizProviderProps {
    children: ReactNode;
}

export const QuizProvider = ({ children }: QuizProviderProps) => {
    const [reusableQuestions, setReusableQuestions] = useState<IQuestion[]>([]);
    const [quizzes, setQuizzes] = useState<IQuiz[]>([]);

    const { allQuizzes } = useGetQuizzes();

    useEffect(() => {
        const allQuestions = quizzes.reduce(
            (acc: IQuestion[], quiz) => [...acc, ...quiz.questions],
            []
        );

        const newQuestions = allQuestions.map(
            (question: IQuestion, index: number) => ({
                ...question,
                id: index + 1,
            })
        );
        setReusableQuestions(newQuestions);
    }, [quizzes]);

    useEffect(() => {
        setQuizzes(allQuizzes);
    }, [allQuizzes]);

    return (
        <QuizContext.Provider
            value={{
                reusableQuestions,
                setReusableQuestions,
                Swal,
                setQuizzes,
                quizzes,
            }}
        >
            {children}
        </QuizContext.Provider>
    );
};
