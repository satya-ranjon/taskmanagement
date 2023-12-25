import React, { useState } from "react";
import Button from "../../../components/common/Button";
import DatePicker from "react-datepicker";
import { CiTimer } from "react-icons/ci";
import { FaCircleChevronDown } from "react-icons/fa6";
import Select from "react-select";

import "react-datepicker/dist/react-datepicker.css";
import useAuthentication from "../../../hooks/useAuthentication";
import axios from "axios";
import { toast } from "react-toastify";

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
const CreateTask: React.FC = () => {
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

  const { user } = useAuthentication();

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      user: user,
      title,
      description,
      deadline,
      priority,
      status,
    };
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/task`, newTask)
      .then(function (response) {
        if (response.data.acknowledged) {
          toast.success("Task Create Successfully !");
        }
      })
      .catch(function (error) {
        toast.error("Some error !");
      });
  };

  return (
    <form onSubmit={handleCreateTask} className="p-2">
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="title"
        placeholder="Title"
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
          onChange={(e) => setDescription(e.target.value)}
          className=" border-2 outline-none w-full"
          placeholder=" Description"
          name="description"
          id="description"
          rows="10"></textarea>
      </div>
      <Button>Create</Button>
    </form>
  );
};

export default CreateTask;
