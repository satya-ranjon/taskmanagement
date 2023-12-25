import React from "react";
import Button, { ButtonSize } from "../../../components/common/Button";
import useDisplay from "../../../hooks/useDisplay";

const DashboardSectionTitle: React.FC = ({ setIsOpen }) => {
  const [windowWidth] = useDisplay();

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl lg:text-5xl font-bold">Tasks</h1>
      <Button
        onClick={() => setIsOpen(true)}
        size={windowWidth > 769 ? ButtonSize.LG : ButtonSize.SM}>
        Create Task
      </Button>
    </div>
  );
};

export default DashboardSectionTitle;
