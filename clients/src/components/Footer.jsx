const Footer = () => {
  return (
    <>
      <div className="bg-[#9f1239]  md:flex md:justify-around md:items-center text-white text-2xl ">
        <div className="flex flex-col items-center">
          <img src="/images/ufxlogo.png" alt="logo" className="h-40" />
          <div className="my-2 text-4xl">
            <a href="#"><ion-icon name="logo-facebook"></ion-icon></a>
            <a href="#"><ion-icon name="logo-instagram"></ion-icon></a>
            <a href="#"><ion-icon name="logo-twitter"></ion-icon></a>
            <a href="#"><ion-icon name="mail"></ion-icon></a>
          </div>
        </div>
        <ul className="flex flex-col items-center gap-5 text-2xl md:text-3xl uppercase">
          <li><a href="index.html">Home</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Services</a></li>
        </ul>
        <div className="flex flex-col items-center gap-5 py-10">
        <button className="btn bg-[#fb0200] text-white hover:bg-[#006b80] duration-500 md:ml-20 ">
            <a href="#">Get Started</a>
          </button>

          <div>© Ufx Trading Signals 2024</div>
        </div>
      </div>
    </>
  )
}
export default Footer