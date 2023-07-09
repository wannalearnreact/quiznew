import BeatLoader from 'react-spinners/BeatLoader';

const Loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <BeatLoader size={50} color='black' />
        </div>
    );
};

export default Loading;
