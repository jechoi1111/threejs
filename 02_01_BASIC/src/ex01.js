import * as THREE from 'three';

export default function example01() {
    // 동적으로 캔버스 조립하기
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement)

    const canvas = document.querySelector('#three-canvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();

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

// // 직교 카메라 (거리가 멀어도 크기가 똑같아 보임)
// const camera = new THREE.OrthographicCamera(
//     -(window.innerWidth / window.innerHeight),
//     (window.innerWidth / window.innerHeight),
//     1,
//     -1,
//     0.1,
//     1000
// )
// camera.position.x = 1;
// camera.position.y = 2;
// camera.position.z = 5;
// camera.lookAt(0,0,0);
// camera.zoom = 0.5; // 원근 카메라와 달리 zoom 은 z가 아니라 zoom으로 조절한다.
// camera.updateProjectionMatrix();

    scene.add(camera);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    renderer.render(scene, camera)
}