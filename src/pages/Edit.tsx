import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { useGetQuizzes } from '../hooks/useGetQuizzes';
import { IQuiz } from '../types/types';

const Edit = () => {
    const { Swal } = useContext(QuizContext);
    const { id } = useParams<{ id: string }>();
    const [currentQuiz, setCurrentQuiz] = useState<IQuiz | null>(null);
    const navigate = useNavigate();
    const { quiz } = useGetQuizzes(Number(id));

    useEffect(() => {
        if (quiz) {
            setCurrentQuiz(quiz);
        }
    }, [quiz]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axios
            .put(`http://localhost:3000/quizzes/${id}`, currentQuiz)
            .then((res) => {
                console.log(res.data);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Quiz edited!',
                    showConfirmButton: false,
                    timer: 1300,
                });
                navigate('/');
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            <div className='mx-auto max-w-md w-11/12'>
                <h1 className='text-2xl font-bold mb-4 p-4'>Add a new quiz</h1>
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
                            value={currentQuiz?.name || ''}
                            onChange={(e) =>
                                setCurrentQuiz((prevQuiz) => ({
                                    ...(prevQuiz as IQuiz),
                                    name: e.target.value,
                                }))
                            }
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-Roboto'
                            /*  required */
                        />
                    </div>
                    {currentQuiz?.questions?.map((question, index) => {
                        return (
                            <div
                                key={question.id}
                                className='border-4 rounded-xl border-black p-4 mb-4 '
                            >
                                <div className='mb-4'>
                                    <label
                                        htmlFor='question'
                                        className='block text-black font-bold mb-2 font-Roboto'
                                    >
                                        Edit {index + 1}. question
                                    </label>
                                    <input
                                        type='text'
                                        id='question'
                                        value={question.question}
                                        onChange={(e) => {
                                            const updatedQuestions = [
                                                ...(currentQuiz?.questions ||
                                                    []),
                                            ];
                                            updatedQuestions[index] = {
                                                ...question,
                                                question: e.target.value,
                                            };
                                            setCurrentQuiz((prevQuiz) => ({
                                                ...(prevQuiz as IQuiz),
                                                questions: updatedQuestions,
                                            }));
                                        }}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-Roboto'
                                        /*  required */
                                    />
                                </div>
                                <div className='mb-4'>
                                    <label
                                        htmlFor='answer'
                                        className='block text-black font-bold mb-2 font-Roboto'
                                    >
                                        Edit {index + 1}. answer
                                    </label>
                                    <input
                                        type='text'
                                        id='answer'
                                        value={question.answer}
                                        onChange={(e) => {
                                            const updatedQuestions = [
                                                ...(currentQuiz?.questions ||
                                                    []),
                                            ];
                                            updatedQuestions[index] = {
                                                ...question,
                                                answer: e.target.value,
                                            };
                                            setCurrentQuiz((prevQuiz) => ({
                                                ...(prevQuiz as IQuiz),
                                                questions: updatedQuestions,
                                            }));
                                        }}
                                        className='shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline font-Roboto'
                                    />
                                </div>
                            </div>
                        );
                    })}
                    <button
                        type='submit'
                        className='bg-blue-primary hover:bg-blue-secondary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    >
                        Finish editing
                    </button>
                </form>
                <div className='flex justify-center'>
                    <Link
                        className='bg-gray-base hover:bg-gray-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                        to='/'
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Edit;
