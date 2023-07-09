import { useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import Quizzes from '../components/Quizzes';
import { useNavigate } from 'react-router-dom';
import { useGetQuizzes } from '../hooks/useGetQuizzes';
import Error from '../components/Error';
import Loading from '../components/Loading';

const Home = () => {
    const navigate = useNavigate();

    const { quizzes, setQuizzes } = useContext(QuizContext);
    const { isLoading, error } = useGetQuizzes();

    return (
        <div className='max-w-screen-lg  w-2/3 my-0 mx-auto text-center mt-10'>
            <h2 className='text-5xl font-bold text-black font-Patrick'>
                Quiz Maker
            </h2>
            <div className='flex justify-end px-10 py-2 md:justify-center'>
                <button
                    onClick={() => navigate('/add')}
                    className='text-white bg-green-primary hover:bg-green-secondary focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-Roboto'
                >
                    Add Quiz
                </button>
            </div>
            {error ? (
                <Error errorText={error.message} />
            ) : isLoading ? (
                <Loading />
            ) : (
                <Quizzes quizzes={quizzes} setQuizzes={setQuizzes} />
            )}
        </div>
    );
};

export default Home;
