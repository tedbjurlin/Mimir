type TabBarProps = {
  children?: React.ReactNode;
};

const TabBar: React.FC<TabBarProps> = ({ children }) => {
  return <div className="tab-bar">{children}</div>;
};
