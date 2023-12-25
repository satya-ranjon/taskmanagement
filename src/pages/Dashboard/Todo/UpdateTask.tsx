import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import DatePicker from "react-datepicker";
import { CiTimer } from "react-icons/ci";
import { FaCircleChevronDown } from "react-icons/fa6";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Loader from "../../../components/common/Loader";

const options = [
  { value: "low", label: "Low", bg: "bg-green-100" },
  { value: "moderate", label: "Moderate", bg: "bg-orange-100" },
  { value: "high", label: "High", bg: "bg-red-100" },
];
const statusOption = [
  { value: "todo", label: "To Do" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];
const UpdateTask: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [priority, setPriority] = useState<object>({
    value: "low",
    label: "Low",
    bg: "bg-green-100",
  });
  const [status, setStatus] = useState<object>({
    value: "todo",
    label: "To Do",
  });

  const handleUpdateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateTask = {
      title,
      description,
      deadline,
      priority,
      status,
    };
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/task/${id}`, updateTask)
      .then(function (response) {
        if (response) {
          toast.success("Task Update Successfully !");
          console.log(response);
          //   setData((prev) => [...prev, response.data]);
          //   setIsOpen(false);
        }
      })
      .catch(function (error) {
        toast.error("Some error !");
      });
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/task/single/${id}`)
        .then((response) => {
          console.log(response);
          setStatus(response.data.status);
          setPriority(response.data.priority);
          setDescription(response.data.description);
          setTitle(response.data.title);
          setDeadline(new Date(response.data.deadline));
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }, [id]);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <form onSubmit={handleUpdateTask} className="p-2">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="title"
          placeholder="Title"
          value={title}
          className=" placeholder:text-xl placeholder:font-semibold text-xl font-semibold my-3  outline-none w-full px-2"
        />
        <div className="flex justify-start items-center gap-20">
          <div className="flex justify-start items-center gap-2">
            <CiTimer />
            Dateline
          </div>
          <DatePicker
            selected={deadline}
            onChange={(date) => setDeadline(date as Date)}
          />
        </div>
        <div className="flex justify-start items-center gap-20">
          <div className="flex justify-start items-center gap-2">
            <FaCircleChevronDown /> Priority
          </div>
          <div className="cursor-pointer w-full mt-2">
            <Select
              defaultValue={priority}
              onChange={setPriority}
              options={options}
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-[5.5rem]">
          <div className="flex justify-start items-center gap-2">
            <FaCircleChevronDown /> Status
          </div>
          <div className="cursor-pointer w-full mt-2">
            <Select
              defaultValue={status}
              onChange={setStatus}
              options={statusOption}
            />
          </div>
        </div>
        <div className=" mt-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className=" border-2 outline-none w-full"
            placeholder=" Description"
            name="description"
            id="description"
            rows="10"></textarea>
        </div>
        <Button>Update</Button>
      </form>
    </div>
  );
};

export default UpdateTask;
