import classnames from "classnames";

const ProgressBar = ({ time, onFinish, onStart }) => {
  return (
    <div className="bg-white h-4 relative shadow overflow-hidden">
      <div
        className={classnames(`absolute bg-red-500 left-0 bottom-0 top-0 w-full h-full animate-timebar`)}
        onAnimationEnd={onFinish}
      ></div>
    </div>
  )
}

export default ProgressBar
