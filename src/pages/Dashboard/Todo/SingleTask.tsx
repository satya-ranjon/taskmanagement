import React from "react";
import useDisplay from "../../../hooks/useDisplay";
import { BsThreeDotsVertical } from "react-icons/bs";
import formatISODateToCustomFormat from "../../../utils/formatISODateToCustomFormat";
import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const statusOption = [
  { value: "todo", label: "To Do" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];
const SingleTask: React.FC = ({
  task,
  openStatus,
  handleStatusChange,
  setOpenStatusModal,
  data,
  setData,
}) => {
  const [windowWidth] = useDisplay();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleDelete = () => {
    const newTask = data?.filter((item) => item._id !== task._id);
    setData(newTask);

    axios
      .delete(`${import.meta.env.VITE_SERVER_URL}/task/${task._id}`)
      .then((response) => {
        toast.success("Delete Successfully");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      ref={drag}
      key={task._id}
      className={`p-3 hover:bg-[#fef2f25c] border-b-2 border-red-100 select-none cursor-grab duration-200 transition-colors ${
        isDragging && "opacity-30 bg-red-700 "
      }`}>
      <div className="flex justify-between items-start">
        <Link
          to={`/dashboard/todo/${task._id}`}
          className="cursor-pointer text-xl lg:text-2xl font-bold text-zinc-700 ">
          {task?.title?.slice(
            0,
            windowWidth > 1025 ? 37 : windowWidth > 769 ? 20 : 15
          )}
          {task?.title?.length >
            (windowWidth > 1025 ? 37 : windowWidth > 769 ? 20 : 15) && " ..."}
        </Link>
        <div className="relative">
          <button onClick={() => setOpenStatusModal({ taskId: task?._id })}>
            <BsThreeDotsVertical className="text-xl cursor-pointer lg:text-2xl xl:text-3xl text-zinc-600 mt-1" />
          </button>
          {openStatus && (
            <div className="absolute w-32 bg-white right-5 top-0 flex flex-col text-zinc-700 gap-1 text-xs shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
              {statusOption.map((status) => {
                const activeStatus = status?.value === task?.status?.value;
                return (
                  <span
                    key={status?.value}
                    onClick={() => handleStatusChange(task?._id, status)}
                    className={`p-1 cursor-pointer font-semibold hover:bg-red-100  ${
                      activeStatus && " text-primary bg-red-50"
                    }`}>
                    {status.label}
                  </span>
                );
              })}
              <div
                onClick={handleDelete}
                className="p-1 flex justify-start gap-1 items-center text-red-400 hover:bg-red-100 cursor-pointer font-semibold ">
                <MdDelete /> Delete
              </div>
            </div>
          )}
        </div>
      </div>
      <h5
        className={`text-sm px-2 py-0 ${task?.priority?.bg} font-semibold text-zinc-600 w-fit rounded-sm mt-1`}>
        {task?.priority?.value}
      </h5>
      <h3 className="font-semibold text-sm mt-1 text-zinc-600">
        {formatISODateToCustomFormat(task?.deadline)}
      </h3>
    </div>
  );
};

export default SingleTask;
