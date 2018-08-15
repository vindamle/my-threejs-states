/// <reference path="./three.d.ts" />
/// <reference path="./three-effectcomposer.d.ts" />

declare namespace THREE {

    export class ShaderPass extends Pass {
        constructor(shader: Shader, textureID?: string);

        textureID: string;
        uniforms: { [uniform: string]: IUniform };
        material: ShaderMaterial;
        camera: OrthographicCamera;
        scene: Scene;
        quad: Mesh;
    }

}