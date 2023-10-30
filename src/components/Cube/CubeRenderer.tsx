import { Component, MutableRefObject } from "react";
import * as THREE from "three";
import { FrameHandler } from "../../utils/FrameHandler";

const { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshPhongMaterial, Mesh } = THREE;

interface CubeRendererProps {
    containerRef: MutableRefObject<HTMLDivElement | null>;
}

class CubeRenderer extends Component<CubeRendererProps> {
    private scene: THREE.Scene | null = null;

    private camera: THREE.PerspectiveCamera | null = null;

    private readonly renderer: THREE.WebGLRenderer = new WebGLRenderer();

    private cube: THREE.Mesh | null = null;

    private frameHandler: FrameHandler;

    constructor(props: CubeRendererProps) {
        super(props);

        this.handleFrame = this.handleFrame.bind(this);
        this.frameHandler = new FrameHandler(this.handleFrame);
    }

    componentDidMount() {
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.props.containerRef.current?.append(this.renderer.domElement);

        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshPhongMaterial({ color: 0x00ff00 });
        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(-1, 0, 1).normalize();

        this.cube = new Mesh(geometry, material);
        this.scene.add(this.cube);
        this.scene.add(directionalLight);
        this.camera.position.z = 5;

        this.frameHandler.start();
    }

    componentWillUnmount(): void {
        this.frameHandler.stop();
    }

    private handleFrame(delta: number) {
        if (this.scene && this.camera && this.cube) {
            this.cube.rotation.x += delta * 0.01;
            this.cube.rotation.y += delta * 0.01;
            this.renderer.render(this.scene, this.camera);
        }
    }

    render = () => null;
}

export default CubeRenderer;
