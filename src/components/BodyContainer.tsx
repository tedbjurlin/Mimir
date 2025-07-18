import { Allotment, AllotmentHandle, LayoutPriority } from "allotment";
import "allotment/dist/style.css";
import Editor from "./Editor";
import { useRef, useState } from "react";

const BodyContainer: React.FC = () => {
  const ref = useRef<AllotmentHandle | null>(null);

  const [leftVisible, setLeftVisible] = useState(true);
  const [rightVisible, setRightVisible] = useState(true);

  return (
    <Allotment
      defaultSizes={[100, 200]}
      minSize={0}
      proportionalLayout={false}
      ref={ref}
    >
      <Allotment.Pane
        snap
        maxSize={200}
        minSize={100}
        priority={LayoutPriority.Low}
      >
        <div>Left Leaf</div>
      </Allotment.Pane>
      <Allotment.Pane priority={LayoutPriority.Normal}>
        <Editor />
      </Allotment.Pane>
      <Allotment.Pane
        snap
        maxSize={200}
        minSize={100}
        priority={LayoutPriority.Low}
      >
        <div>Right Leaf</div>
      </Allotment.Pane>
    </Allotment>
  );
};

export default BodyContainer;
