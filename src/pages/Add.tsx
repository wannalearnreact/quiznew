import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { IQuiz, IQuizForm } from '../types/types';

const Add = () => {
    const [lastId, setLastId] = useState<number>(0);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();
    const { reusableQuestions, setReusableQuestions, Swal } =
        useContext(QuizContext);

    const [quiz, setQuiz] = useState<IQuizForm>({
        id: 0,
        name: '',
        questions: [],
        questionText: '',
        answerText: '',
    });

    const newQuiz: IQuiz = {
        id: quiz.id,
        name: quiz.name,
        questions: quiz.questions,
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const hasEmptyFields = quiz.questions.some(
            (question) => question.answer.length < 1
        );
        if (
            quiz.questions.length < 1 ||
            hasEmptyFields ||
            quiz.name.trim() === ''
        ) {
            setError(true);
        } else {
            axios
                .post('http://localhost:3000/quizzes', newQuiz)
                .then(() => {
                    Swal.fire({
                        position: 'top',
                        icon: 'success',
                        title: 'Quiz added!',
                        showConfirmButton: false,
                        timer: 1300,
                    });
                    setQuiz({
                        id: lastId + 1,
                        name: '',
                        questions: [],
                        questionText: '',
                        answerText: '',
                    });
                    setLastId(lastId + 1);

                    navigate('/');
                    window.location.reload();
                })
                .catch((err) => console.log(err));
        }
    };

    const handleAddQuestion = (e: any) => {
        e.preventDefault();
        const question = {
            id: quiz.questions.length + 1,
            question: quiz.questionText,
            answer: quiz.answerText,
        };
        setQuiz({
            ...quiz,
            questions: [...quiz.questions, question],
            questionText: '',
            answerText: '',
        });
        setReusableQuestions([
            ...reusableQuestions,
            {
                id: reusableQuestions.length + 1,
                question: question.question,
                answer: question.answer,
            },
        ]);
    };

    useEffect(() => {
        if (error) {
            const timeout = setTimeout(() => {
                setError(false);
            }, 1000);

            return () => clearTimeout(timeout);
        }
    }, [error]);

    return (
        <div className='mx-auto max-w-md w-11/12'>
            <h1 className='text-2xl font-bold mb-4 p-4 font-Roboto'>
                Add a new quiz
            </h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4 p-4'>
                    <label
                        htmlFor='name'
                        className='block text-black font-bold mb-2 font-Roboto'
                    >
                        Quiz name
                    </label>
                    <input
                        type='text'
                        id='name'
                        value={quiz.name}
                        onChange={(e) =>
                            setQuiz({ ...quiz, name: e.target.value })
                        }
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-Roboto'
                    />
                </div>
                <div className='border-4 rounded-xl border-black p-4 mb-4 '>
                    <div className='mb-4'>
                        <label
                            htmlFor='question'
                            className='block text-black font-bold mb-2 font-Roboto'
                        >
                            Add a question
                        </label>
                        <input
                            type='text'
                            id='question'
                            list='questions'
                            value={quiz.questionText}
                            onChange={(e) => {
                                setQuiz({
                                    ...quiz,
                                    questionText: e.target.value,
                                });
                                setError(false);
                            }}
                            onBlur={(e) => {
                                const selectedQuestion = reusableQuestions.find(
                                    (question) =>
                                        question.question === e.target.value
                                );
                                if (selectedQuestion) {
                                    setQuiz({
                                        ...quiz,
                                        questionText: selectedQuestion.question,
                                        answerText: selectedQuestion.answer,
                                    });
                                }
                            }}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-Roboto'
                        />

                        <datalist id='questions'>
                            {reusableQuestions?.map((question) => (
                                <option
                                    className='p-2 font-xl'
                                    key={question.id}
                                    value={question.question}
                                />
                            ))}
                        </datalist>
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='answer'
                            className='block text-black font-bold mb-2 font-Roboto'
                        >
                            Answer
                        </label>
                        <input
                            type='text'
                            id='answer'
                            value={quiz.answerText}
                            onChange={(e) =>
                                setQuiz({ ...quiz, answerText: e.target.value })
                            }
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    {error && (
                        <p className='bg-red text-1xl pt-2 text-red-primary h-[30px]'>
                            Please fill in all required fields.
                        </p>
                    )}
                </div>
                <div className='flex justify-between  p-4'>
                    <button
                        type='button'
                        className='bg-blue-primary hover:bg-blue-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-Roboto'
                        onClick={handleAddQuestion}
                    >
                        Add question
                    </button>
                    <button
                        type='submit'
                        className='bg-green-primary hover:bg-green-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline font-Roboto'
                    >
                        Add quiz
                    </button>
                </div>
            </form>
            <div className='flex justify-center'>
                <Link
                    className='bg-gray-primary hover:bg-gray-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
'
                    to='/'
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Add;
