import { useContext } from "react";
import { CounterContext } from "../../context/CounterContext";

export default function Home() {
  const { counter, handleCounter } = useContext(CounterContext);
  console.log("🚀 ~ Home ~ counter:", counter);

  return (
    <div className="p-5 container mx-auto flex items-center justify-center flex-col">
      <h3 className="text-xl font-semibold mb-2">{counter}</h3>
      <button
        onClick={() => handleCounter(counter + 1)}
        className="bg-green-500  py-3 px-5 inline-block hover:text-white hover:bg-green-700 rounded-lg "
      >
        count up
      </button>
    </div>
  );
}
