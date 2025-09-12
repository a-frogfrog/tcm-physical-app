const Upload = () => {
  return (
    <div className='mx-auto max-w-md overflow-hidden rounded-lg md:max-w-xl'>
      <div className='md:flex'>
        <div className='w-full p-3'>
          <div className='relative flex h-48 items-center justify-center rounded-lg border-2 border-blue-500 bg-gray-50 shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl'>
            <div className='absolute flex flex-col items-center'>
              <img
                alt='File Icon'
                className='mb-3'
                src='https://img.icons8.com/dusk/64/000000/file.png'
              />
              <span className='block font-semibold text-gray-500'>
                Drag &amp; drop your files here
              </span>
              <span className='mt-1 block font-normal text-gray-400'>
                or click to upload
              </span>
            </div>
            <input
              className='h-full w-full cursor-pointer opacity-0'
              type='file'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
