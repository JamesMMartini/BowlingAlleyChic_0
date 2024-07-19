import { vec4 } from "three/examples/jsm/nodes/Nodes.js";

const QuantizationShader = {

	name: 'QuantizationShader',

	uniforms: {
		'tDiffuse': { value: null },
	},

	vertexShader: /* glsl */`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,

	fragmentShader: /* glsl */`

		uniform sampler2D tDiffuse;

        varying vec2 vUv;

        const float a[5] = float[5](3.4, 4.2, 5.0, 5.2, 1.1);

        const vec4 allColors[8] = vec4[](
                vec4(0.0, 0.0, 0.0, 1.0),
                vec4(0.5, 0.5, 0.5, 1.0),
                vec4(0.68, 0.77, 0.875, 1.0),
                vec4(0.2, 0.19, 0.18, 1.0),
                vec4(0.07, 0.18, 0.07, 1.0),
                vec4(0.34, 0.46, 0.34, 1.0),
                vec4(0.25, 0.19, 0.13, 1.0),
                vec4(0.37, 0.33, 0.29, 1.0)
        );


        vec4 findNearestColor(vec4 col)
        {
            float minDistance = 10.0;
            vec4 nearestCol = vec4(1.0, 1.0, 1.0, 1.0);

            for (int i = 0; i < 8; i++)
            {
                float distance = (
                    abs(col.r - allColors[i].r) +
                    abs(col.g - allColors[i].g) +
                    abs(col.b - allColors[i].b)
                );

                if (distance < minDistance)
                {
                    minDistance = distance;
                    nearestCol = allColors[i];
                }
            }

            return nearestCol;
        }

        void main() {
            
            vec4 sceneCol = texture(tDiffuse, vUv);

            gl_FragColor = findNearestColor(sceneCol);
        }`

};

export { QuantizationShader };