import * as THREE from "three";
import { FrameHandler } from "../../utils/FrameHandler";

const { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshPhongMaterial, Mesh } = THREE;

class CubeRenderer {
    private scene: THREE.Scene | null = null;

    private camera: THREE.PerspectiveCamera | null = null;

    private readonly renderer: THREE.WebGLRenderer = new WebGLRenderer();

    private cube: THREE.Mesh | null = null;

    private frameHandler: FrameHandler;

    public constructor(container: HTMLDivElement) {
        this.handleFrame = this.handleFrame.bind(this);
        this.frameHandler = new FrameHandler(this.handleFrame);
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.append(this.renderer.domElement);
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

    private handleFrame(delta: number) {
        if (this.scene && this.camera && this.cube) {
            this.cube.rotation.x += delta * 0.01;
            this.cube.rotation.y += delta * 0.01;
            this.renderer.render(this.scene, this.camera);
        }
    }

    public dispose() {
        this.frameHandler.stop();
    }
}

export default CubeRenderer;
