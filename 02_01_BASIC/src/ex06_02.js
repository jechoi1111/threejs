import * as THREE from 'three';

export default function example04() {
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
    scene.background = new THREE.Color('black')
    // scene에 설정된 색상은 render의 설정에 영향을 받지 않는다

    // 원근 카메라 (거리에 따라서 크기가 달라짐)
    const camera = new THREE.PerspectiveCamera(
        75, // 시야각
        window.innerWidth / window.innerHeight, // 종횡비
        0.1, // near
        1000 // far
    );
    camera.position.z  = 5; // 해당 값의 단위는 만드는 사람에게 달려있다
    scene.add(camera);

    const light = new THREE.DirectionalLight('#fff', 0.8) // 숫자 1은 빛의 강도
    light.position.z = 2;
    scene.add(light);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
        color: '#ff0000'
    }); // 빛의 영향을 받지 않음
    const materialStandard = new THREE.MeshStandardMaterial({
        color: '#ff0000'
    }) // 태양 빛과 비슷
    const mesh = new THREE.Mesh(geometry, materialStandard);
    scene.add(mesh);

    // 그리기

    let oldTime = Date.now();

    function draw() {
        const newTime = Date.now();
        const deltaTime = newTime - oldTime;
        oldTime = newTime;
        // 각도는 Radian을 사용
        // 360도는 2 파이(=3.14...)
        mesh.rotation.y += deltaTime * 0.005;
        mesh.position.y += deltaTime * 0.001;

        mesh.position.y += delta;
        if (mesh.position.y > 3) {
            mesh.position.y = 0;
        }

        renderer.render(scene, camera)

        // window.requestAnimationFrame(draw)
        renderer.setAnimationLoop(draw) // three.js 에서 제공
    }


    function setSize () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera)
    }

    window.addEventListener('resize', setSize)

    draw()
}