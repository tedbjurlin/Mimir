import { Box, Icon, Tabs, VStack } from "@chakra-ui/react";
import { LuAtom, LuBook, LuBookMarked, LuLightbulb, LuNotebookPen, LuSearch } from "react-icons/lu";

const Sidebar: React.FC = () => {
  return (
    <Box h="100%">
        <Tabs.Root orientation="vertical" deselectable activationMode="manual" h="100%">
            <Tabs.List>
                <Tabs.Trigger value="Writings">
                    <LuNotebookPen size="24px" strokeWidth="1.5"/>
                </Tabs.Trigger>
                <Tabs.Trigger value="Thoughts">
                    <LuLightbulb size="24px" strokeWidth="1.5"/>
                </Tabs.Trigger>
                <Tabs.Trigger value="Concepts">
                    <LuAtom size="24px" strokeWidth="1.5"/>
                </Tabs.Trigger>
                <Tabs.Trigger value="Reference">
                    <LuBookMarked size="24px" strokeWidth="1.5"/>
                </Tabs.Trigger>
                <Tabs.Trigger value="Search">
                    <LuSearch size="24px" strokeWidth="1.5"/>
                </Tabs.Trigger>
                <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="Writings">
                Writings
            </Tabs.Content>
            <Tabs.Content value="Thoughts">
                Thoughts
            </Tabs.Content>
            <Tabs.Content value="Concepts">
                Concepts
            </Tabs.Content>
            <Tabs.Content value="Reference">
                Reference
            </Tabs.Content>
            <Tabs.Content value="Search">
                Search
            </Tabs.Content>
        </Tabs.Root>
    </Box>
  );
}

export default Sidebar;
