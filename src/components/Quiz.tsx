import axios from 'axios';
import { useContext, Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuizContext } from '../context/QuizContext';
import { IQuiz } from '../types/types';

interface QuizProps {
    quiz: IQuiz;
    setQuizzes: Dispatch<SetStateAction<IQuiz[]>>;
}

const Quiz = ({ quiz, setQuizzes }: QuizProps) => {
    const { Swal } = useContext(QuizContext);
    const navigate = useNavigate();
    /*  const { setQuizzes } = useContext(QuizContext); */
    const handleDeleteQuiz = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.stopPropagation();

        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(`http://localhost:3000/quizzes/${id}`)
                    .then((res) => {
                        console.log('Deleted successfully', res);
                        setQuizzes((prevQuizzes: IQuiz[]) =>
                            prevQuizzes.filter((quiz) => quiz.id !== id)
                        );
                        Swal.fire(
                            'Deleted!',
                            'Quiz has been deleted.',
                            'success'
                        );
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    const handleSlideshow = (
        e: React.MouseEvent<HTMLButtonElement>,
        id: number
    ) => {
        e.stopPropagation();
        navigate(`/slideshow/quizzes/${id}`);
    };

    return (
        <div
            onClick={() => navigate(`/quizzes/${quiz.id}`)}
            className='rounded-lg flex justify-between px-10 py-2 items-center border-b-4 border-black hover:cursor-pointer hover:shadow-[0px_20px_20px_10px_#00000024] my-4  md:flex-col'
        >
            <p className='text-3xl font-bold md:mb-2 font-Roboto text-black'>
                {quiz.name}
            </p>
            <div className='flex justify-center items-center'>
                <button
                    onClick={(e) => handleSlideshow(e, quiz.id)}
                    className='text-white bg-blue-primary hover:bg-blue-secondary focus:outline-none focus:ring-4 focus:ring-blue-primary font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-primary dark:hover:bg-blue-primary dark:focus:ring-blue-primary font-Roboto'
                >
                    Slideshow
                </button>
                <button
                    onClick={(e) => handleDeleteQuiz(e, quiz.id)}
                    className='text-white bg-red-primary hover:bg-red-secondary focus:outline-none focus:ring-4 focus:ring-red-primary font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-red-primary dark:hover:bg-red-primary dark:focus:ring-red-primary font-Roboto'
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Quiz;
