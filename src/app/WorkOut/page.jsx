import Banner from '../component/Banner';
import ExerciseCard from '../component/ExercieseCard';

const exercises = async () =>{
        const res = await fetch('https://api.api-store.workers.dev/api/fitlog',{next: {revalidate:10},});
        if(!res.ok){
            throw new Error('Failed to fetch data');
        }else{
            return res.json();
        }
    }
const WorkOut = async() => {
    const data = await exercises();
    return (
        
        <div>
            <Banner></Banner>
            
            <div className=" mx-auto mt-10 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <h1 className='text-5xl font-bold mt-10'>THE LIBRARY</h1>
                <h2 className='text-gray-500'>Twelve lifts covering every major muscle group</h2>
                <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5'>
                {
                    data.map(exercise => <ExerciseCard key={exercise.id} exercise={exercise}></ExerciseCard>)
                }
            </div>
            </div>
           
            <footer></footer>
        </div>
        
    );
};

export default WorkOut;