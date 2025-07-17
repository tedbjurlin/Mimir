import { PropsWithChildren } from "react";

type ResizableProps = {}

const Resizable: React.FC<PropsWithChildren<ResizableProps>> = (props) => {

    return (
        <div className="w-screen h-screen flex">
            {props.children}
        </div>
    );
}

export default Resizable;