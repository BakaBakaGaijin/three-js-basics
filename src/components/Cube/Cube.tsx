import { useRef } from "react";
import CubeRenderer from "./CubeRenderer";

const Cube = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    return (
        <div className="canvasWrapper" ref={containerRef}>
            <CubeRenderer containerRef={containerRef} />
        </div>
    );
};

export default Cube;
