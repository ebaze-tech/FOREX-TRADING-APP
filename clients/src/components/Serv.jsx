const Serv = () => {
  return (
    <>
      <div className="text-[#008000] md:grid md:grid-cols-2 mx-20 my-20" id="serv">
        <div className="col w-full text-center">
          <button className="btn bg-[#008000]">Our Focus</button>
          <ul className="text-xl md:text-3xl m-5">
            <li>Realtime Price and Time</li>
            <li>General Market Overview</li>
            <li>Comprehensive signals on these pairs: <br />
              XAU/USD GBP/USD EUR/USD USD/JPY and BTC/USD</li>
          </ul>
        </div>
        <div className="col w-full text-center mt-4">
          <button className="btn bg-[#fb0200]">Our Services</button>
          <ul className="text-xl md:text-3xl m-5">
            <li>Comprehensive Forex Trading
            </li>
            <li>Premium signals</li>
          </ul>
        </div>
      </div>
    </>
  )
}
export default Serv