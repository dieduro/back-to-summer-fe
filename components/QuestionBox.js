export default function QuestionBox({data, onClickCb}) {
  return (
    <>
    {data.description ? ( 
      <div className="flex flex-col content-center justify-center bg-primary w-20 h-20 sm:w-40 sm:h-40 lg:w-48 lg:h-48 px-2 overflow-hidden" onClick={e => {onClickCb(data)}}>
          <h3 className="h-8 w-1/2 mx-auto text-center align-middle md:text-3xl text-white">{data.points}</h3>
      </div>)
    : (
      <div className="w-20 h-20 sm:w-40 sm:h-40 lg:w-48 lg:h-48 px-2 overflow-hidden border border-black border-dashed"></div>
    )}
    </>
  );
}
