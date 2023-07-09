export interface IQuestion {
    id: number;
    question: string;
    answer: string;
}

export interface IQuiz {
    id: number;
    name: string;
    questions: IQuestion[];
}
export interface IQuizForm extends IQuiz {
    questionText: string;
    answerText: string;
}
