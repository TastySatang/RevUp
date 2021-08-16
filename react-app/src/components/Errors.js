import { useSelector } from 'react-redux'

const Errors = () => {

    const errors = useSelector((state) => state.errors);
    return (
        <div>
            {errors?.map((error, ind) => {
               return <div className='error' key={ind}>
                    {error}
                </div>
            })}
        </div>
    );
};

export default Errors
