const Home = () => {
  return (
    <div className="flex items-end gap-2 rounded-md w-full h-full">
      <div className="relative flex flex-col border-10 border-white shadow-xl rounded-md w-3/4 h-[98%]">
        <div className="-top-1 left-4 absolute flex items-center rounded-md -translate-y-1/2">
          <img src='/name_2.png' className="w-68" />
        </div>
        <div className="-top-1 right-4 absolute flex items-center rounded-md -translate-y-1/2">
          <img src='/but_3.png' className="w-32" />
        </div>
        <div className="flex border-[1px] bg-[#fff8e2] border-black rounded-md w-full h-full">

        </div>
      </div>
      <div className="flex flex-col justify-end rounded-md w-1/4 h-full">
        <div className="relative flex border-10 border-white bg-[#fff8e2] shadow-xl rounded-md w-full h-[42%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_1.png' />
          </div>
          <div className="flex border-[1px] bg-[#fff8e2] border-black rounded-md w-full h-full">
          </div>
        </div>
        <div className="relative flex border-10 border-white bg-[#fff8e2] shadow-xl mt-11 rounded-md w-full h-[50%]">
          <div className="-top-1 left-1/2 absolute flex items-center rounded-md w-32 h-8 -translate-x-1/2 -translate-y-1/2">
            <img src='/but_2.png' />
          </div>
          <div className="flex border-[1px] bg-[#fff8e2] border-black rounded-md w-full h-full">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home