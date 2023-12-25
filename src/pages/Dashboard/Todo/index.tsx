import React, { useEffect, useState } from "react";
import Modal from "../../../components/common/Modal";
import CreateTask from "./CreateTask";
import axios from "axios";
import useAuthentication from "../../../hooks/useAuthentication";
import TaskSkelton from "../../../components/skeleton/TaskSkelton";
import SingleTask from "./SingleTask";
import Section from "./Section";
import SectionTitle from "./SectionTitle";

const statusOption = [
  { value: "todo", label: "To Do" },
  { value: "ongoing", label: "Ongoing" },
  { value: "completed", label: "Completed" },
];

const Todo: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [openStatusModal, setOpenStatusModal] = useState<object>({
    taskId: "",
  });
  const [data, setData] = useState([]);

  const { user } = useAuthentication();

  useEffect(() => {
    if (user?.email) {
      setTaskLoading(true);
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/task/${user?.email}`)
        .then((response) => {
          setData(response.data);
          setTaskLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setTaskLoading(false);
        });
    }
  }, [user?.emai]);

  const handleStatusChange = (taskId, status) => {
    const findTask = data.find((item) => item._id === taskId);
    const filterTask = data.filter((item) => item._id !== taskId);
    const newTasks = [...filterTask, { ...findTask, status: status }];
    setData(newTasks);
    setOpenStatusModal({ taskId: "" });
    axios
      .put(`${import.meta.env.VITE_SERVER_URL}/task/status/${taskId}`, status)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SectionTitle setIsOpen={setIsOpen} />
      <div className="flex flex-col md:flex-row justify-between items-start gap-2 lg:gap-5 xl:gap-12 lg:pt-10">
        {statusOption.map((status, index) => {
          const tasks = data.filter(
            (task) => task.status.value === status.value
          );

          return !taskLoading ? (
            <div key={status?.value} className="w-full">
              <Section
                data={data}
                setData={setData}
                status={status}
                tasks={tasks}>
                {tasks?.length > 0 &&
                  tasks?.map((item) => {
                    const openStatus = openStatusModal?.taskId === item._id;
                    return (
                      <SingleTask
                        data={data}
                        setData={setData}
                        key={item?._id}
                        task={item}
                        openStatus={openStatus}
                        handleStatusChange={handleStatusChange}
                        setOpenStatusModal={setOpenStatusModal}
                      />
                    );
                  })}
              </Section>
            </div>
          ) : (
            <div className=" w-full" key={index}>
              <TaskSkelton />
            </div>
          );
        })}
      </div>

      {/* Modal  */}
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <CreateTask />
      </Modal>
    </div>
  );
};

export default Todo;
