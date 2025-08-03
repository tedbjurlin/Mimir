import { Menu } from "@ark-ui/react";
import { LucideMenu } from "lucide-react";

const TitleBarMenu: React.FC = () => {
  return (
    <Menu.Root>
      <Menu.Trigger>
        <LucideMenu />
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content>
          <Menu.Item value="new-thought">New Thought Note</Menu.Item>
          <Menu.Item value="new-concept">New Concept Note</Menu.Item>
          <Menu.Item value="new-reference">New Reference Note</Menu.Item>
          <Menu.Item value="new-writing">New Writing</Menu.Item>
          <Menu.Separator />
          <Menu.Item value="settings">Settings</Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
};

export default TitleBarMenu;
