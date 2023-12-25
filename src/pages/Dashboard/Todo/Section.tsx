import axios from "axios";
import React from "react";
import { useDrop } from "react-dnd";

const Section: React.FC = ({ status, tasks, children, data, setData }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item) => addItemToSection(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = ({ id }) => {
    const findTask = data.find((item) => item._id === id);
    const filterTask = data.filter((item) => item._id !== id);
    const newTasks = [...filterTask, { ...findTask, status: status }];
    setData(newTasks);
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/task/status/${id}`, status)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div ref={drop} key={status.value} className={`w-full `}>
      <div className="border-b-2 border-b-red-300 pb-2 p-3">
        <h1 className="text-2xl lg:text-3xl font-bold">{status.label}</h1>
        <h5 className="text-sm text-zinc-400">{tasks?.length} Tasks</h5>
      </div>

      <div
        className={`w-full min-h-[500px] max-h-[690px] overflow-y-scroll overflow-hidden ${
          isOver && "bg-red-100"
        }`}>
        {children}
      </div>
    </div>
  );
};

export default Section;
