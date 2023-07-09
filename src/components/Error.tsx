interface ErrorProps {
    errorText: string;
}

const Error = ({ errorText }: ErrorProps) => {
    return (
        <div className='flex justify-center items-center'>
            <div className='bg-red-500 text-white p-4 rounded-lg  max-w-600'>
                <div className='text-center'>{errorText}</div>
            </div>
        </div>
    );
};

export default Error;
