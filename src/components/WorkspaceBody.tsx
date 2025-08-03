import { Tabs } from "@ark-ui/react";

const WorkspaceBody: React.FC = () => {
  return (
    <Tabs.Root>
      <Tabs.List>
        <Tabs.Trigger value="1">First Tab</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="1">First Content</Tabs.Content>
    </Tabs.Root>
  );
};

export default WorkspaceBody;
