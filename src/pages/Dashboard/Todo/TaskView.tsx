import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../../../components/common/Loader";
import formatISODateToCustomFormat from "../../../utils/formatISODateToCustomFormat";
import Button from "../../../components/common/Button";

const TaskView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<object>({});

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_SERVER_URL}/task/single/${id}`)
        .then((response) => {
          console.log(response);
          setData(response.data);
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
      <div className="">
        <h1 className="text-xl lg:text-2xl font-bold text-zinc-700 ">
          {data?.title}
        </h1>
        <h1 className=" text-xl font-bold text-zinc-500 ">
          Deadline : {formatISODateToCustomFormat(data?.deadline)}
        </h1>
        <h1 className=" text-xl font-bold text-zinc-500 ">
          Priority : {data?.priority?.label}
        </h1>
        <h1 className=" text-xl font-bold text-zinc-500 ">
          Status : {data?.status?.label}
        </h1>
        <Link to={`/dashboard/todo/edit/${id}`}>
          <Button>Edit</Button>
        </Link>
        <h4 className=" text-lg text-gray-600">{data?.description}</h4>
      </div>
    </div>
  );
};

export default TaskView;
