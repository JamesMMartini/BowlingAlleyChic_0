const e={name:"ToneMapShader",uniforms:{tDiffuse:{value:null}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

        varying vec2 vUv;

        float clampFloat(float num) {
            if (num == 1.0)
                return 1.0;
            else if (num > 0.9)
                return 0.9;
            else if (num > 0.8)
                return 0.8;
            else if (num > 0.7)
                return 0.7;
            else if (num > 0.7)
                return 0.7;
            else if (num > 0.6)
                return 0.6;
            else if (num > 0.5)
                return 0.5;
            else if (num > 0.4)
                return 0.4;
            else if (num > 0.3)
                return 0.3;
            else if (num > 0.2)
                return 0.2;
            else if (num > 0.1)
                return 0.1;
            else
                return 0.0;
        }

        float sharpClamp(float num) {
            if (num == 1.0)
                return 1.0;
            else if (num >= 0.75)
                return 0.75;
            else if (num >= 0.5)
                return 0.5;
            else if (num >= 0.25)
                return 0.25;
            else
                return 0.0;
        }

        vec4 clampedTex(vec4 col) {
            vec4 newCol = vec4(
                sharpClamp(col.x),
                sharpClamp(col.y),
                sharpClamp(col.z),
                sharpClamp(col.a)
            );

            return newCol;
        }

        void main() {
            vec4 texCol = texture(tDiffuse, vUv);

            vec4 newTextCol = clampedTex(texCol);

            gl_FragColor = newTextCol;
        }`};export{e as T};
