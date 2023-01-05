import gsap from "gsap";

declare global {
    interface Window {
        mainCanvas: HTMLCanvasElement;
        mainAudio: HTMLAudioElement;
    }
}
