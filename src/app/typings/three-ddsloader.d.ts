/// <reference path="./three.d.ts" />

declare namespace THREE {

    export interface Dds {
        mipmaps: ImageData[],
        width: number,
        height: number,
        format: CompressedPixelFormat,
        mipmapCount: number
    }

    export class DDSLoader extends CompressedTextureLoader {

        constructor();

        parse(buffer: string, loadMipmaps: boolean): Dds;

    }
}