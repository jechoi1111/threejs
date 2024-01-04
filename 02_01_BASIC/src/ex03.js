import * as THREE from 'three';

export default function example03() {
    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
    // renderer.setClearColor('#00ff00');
    // renderer.setClearAlpha(0.5);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue')
    // scene에 설정된 색상은 render의 설정에 영향을 받지 않는다

    // 원근 카메라 (거리에 따라서 크기가 달라짐)
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각
        window.innerWidth / window.innerHeight, // 종횡비
        0.1, // near
        1000 // far
    );
    camera.position.x = 1;
    camera.position.y = 2;
    camera.position.z  = 5; // 해당 값의 단위는 만드는 사람에게 달려있다
    scene.add(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera)

    function setSize () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
    }

    window.addEventListener('resize', setSize)
}