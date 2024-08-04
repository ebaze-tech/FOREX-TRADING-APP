
const HeroSection = () => {
  return (
    <>
      <div>
        <div className="mt-[4rem] pt-40 text-[#008000] md:grid md:grid-cols-3 place-items-center gap-5  text-center md:text-start mx-20  my-35">
          <div className="col-span-1 w-full">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  ">Welcome to UFX Signals Community</h1>
            <p className="text-2xl mt-5"> Where we offer our services based on years of experience in the forex market.</p>
          </div>
          <div className="col-span-2 w-full">
            <img src="/images/heroimg.png" alt="heroimg" className="w-full h-full md:h-[300px]" />
          </div>
        </div>
        <div className="flex justify-center md:justify-start pb-[5rem]">
          <button className="btn bg-[#fb0200] text-white hover:bg-[#006b80] duration-500 md:ml-20 ">
            <a href="#">Get Started</a>
          </button>
        </div>

      </div>
    </>
  )
}
export default HeroSection;