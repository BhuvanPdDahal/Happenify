import React from 'react';

const SkeletonLoader: React.FC = () => {
    return (
        <div className='md:h-260px flex flex-col md:flex-row gap-3 py-3 mt-5 animate-pulse'>
            <div className='md:w-1/2 h-full'>
                <div className='h-200px sm:h-240px md:h-full w-full rounded-lg bg-lightgrey'></div>
            </div>
            <div className='md:w-1/2 mt-2'>
                <div className='h-4 bg-lightgrey rounded-lg'></div>
                <div className='mt-5'>
                    <div className='flex items-center gap-2'>
                        <div className='h-5 w-5 rounded-full bg-lightgrey'></div>
                        <div className='h-4 w-120px bg-lightgrey rounded-lg'></div>
                    </div>
                    <div className='flex items-center gap-2 mt-2'>
                        <div className='h-5 w-5 rounded-full bg-lightgrey'></div>
                        <div className='h-4 w-120px bg-lightgrey rounded-lg'></div>
                    </div>
                </div>
                <div className='mt-5'>
                    <div className='h-4 bg-lightgrey rounded-lg'></div>
                    <div className='h-4 bg-lightgrey rounded-lg mt-2'></div>
                    <div className='h-4 w-300px bg-lightgrey rounded-lg mt-2'></div>
                </div>
                <div className='h-6 rounded-sm bg-lightgrey mt-5'></div>
            </div>
        </div>
    )
};

export default SkeletonLoader;