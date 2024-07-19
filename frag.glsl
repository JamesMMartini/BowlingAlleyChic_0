uniform sampler2D texture1;

varying vec2 vUv;

void main() {
    gl_FragColor = texture(texture1, vUv);
}