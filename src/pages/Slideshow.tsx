import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useGetQuizzes } from '../hooks/useGetQuizzes';
import { IQuiz } from '../types/types';

const Slideshow = () => {
    const { id } = useParams();
    const [currentQuiz, setCurrentQuiz] = useState<IQuiz | null>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [showAnswer, setShowAnswer] = useState<boolean>(false);

    const { quiz } = useGetQuizzes(Number(id));

    useEffect(() => {
        if (quiz) {
            setCurrentQuiz(quiz);
        }
    }, [quiz]);

    const prevIndex = () => {
        const isFirstSlide = currentIndex === 0;
        setCurrentIndex(
            isFirstSlide
                ? (currentQuiz?.questions?.length || 0) - 1
                : currentIndex - 1
        );
        setShowAnswer(false);
    };

    const nextIndex = () => {
        const isLastSlide =
            currentIndex === (currentQuiz?.questions?.length || 0) - 1;
        setCurrentIndex(isLastSlide ? 0 : currentIndex + 1);
        setShowAnswer(false);
    };

    const toggleShowAnswer = () => {
        setShowAnswer(!showAnswer);
    };
    const goToQuestion = (questionIndex: number) => {
        setCurrentIndex(questionIndex);
    };

    return (
        <div className='max-w-[1400] h-[780px] w-2/3 md:w-11/12 m-auto py-16 px-4 relative group'>
            <div className='w-full h-[500px] rounded-2xl bg-center bg-cover duration-500'>
                <div className='w-full h-full rounded-2xl bg-center bg-cover duration-500 '>
                    <div className='text-center'>
                        <h1 className='text-6xl mt-5 font-Patrick'>
                            {currentQuiz?.name}
                        </h1>
                        <div className='flex justify-center items-center mt-16'>
                            {currentQuiz?.questions && (
                                <div className='text-center'>
                                    <h2 className='text-2xl mt-5'>
                                        {
                                            currentQuiz.questions[currentIndex]
                                                .question
                                        }
                                    </h2>
                                    {showAnswer && (
                                        <p>
                                            {
                                                currentQuiz.questions[
                                                    currentIndex
                                                ].answer
                                            }
                                        </p>
                                    )}
                                    <button
                                        onClick={toggleShowAnswer}
                                        className='bg-blue-primary hover:bg-blue-secondary text-white font-bold py-2 px-4 rounded mt-4'
                                    >
                                        Show Answer
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {currentQuiz?.questions &&
                        currentQuiz.questions.map(
                            (_question, questionIndex) => (
                                <div
                                    key={questionIndex}
                                    onClick={() => goToQuestion(questionIndex)}
                                    className='text-2xl cursor-pointer '
                                >
                                    <RxDotFilled />
                                </div>
                            )
                        )}
                </div>
            </div>

            <div
                onClick={() => prevIndex()}
                className='hidden group-hover:block absolute top-[40%] md:top-[40%] -translate-x-0 translate-y-[-40%] md:translate-y-[40%] left-5 text-2xl rounded-full p-2 bg-gray-base text-black cursor-pointer'
            >
                <BsChevronCompactLeft size={20} />
            </div>

            <div
                onClick={() => nextIndex()}
                className='hidden group-hover:block absolute top-[40%] md:top-[40%] -translate-x-0 translate-y-[-40%] md:translate-y-[40%] right-5 text-2xl rounded-full p-2 bg-gray-base text-black cursor-pointer'
            >
                <BsChevronCompactRight size={20} />
            </div>

            <div className='flex justify-center mt-16'>
                <Link
                    to='/'
                    className='bg-gray-base hover:bg-gray-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                >
                    Home
                </Link>
            </div>
        </div>
    );
};

export default Slideshow;
