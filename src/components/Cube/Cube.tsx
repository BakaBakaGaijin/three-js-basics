import { useEffect, useRef } from "react";
import CubeRenderer from "./CubeRenderer";

const Cube = () => {
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;

        if (container) {
            const handler = new CubeRenderer(container);

            return () => {
                handler.dispose();
            };
        }
    }, []);

    return <div className="canvasWrapper" ref={containerRef}></div>;
};

export default Cube;
