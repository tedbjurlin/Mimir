import { LuX } from "react-icons/lu";

type TabProps = {
  uuid: `${string}-${string}-${string}-${string}-${string}`;
  name: string;
  icon: React.ReactNode;
};

const Tab: React.FC<TabProps> = ({ uuid, name, icon }) => {
  return (
    <div>
      {icon}
      {name}
      <button>
        <LuX />
      </button>
    </div>
  );
};

export default Tab;
