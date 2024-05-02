import { parseGenerationParameters } from "../src/parser";
import dedent from "dedent";

describe("Params Parser", () => {
  test("should parse simple pnginfo: example1", () => {
    const pnginfo_data = dedent`
        girl with an artist's beret, determined, blue eyes, desert scene, computer monitors, heavy makeup, by Alphonse Mucha and Charlie Bowater, ((eyeshadow)), (coquettish), detailed, intricate
        Negative prompt: ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), messy drawing
        Steps: 20, Sampler: Euler a, CFG scale: 7, Seed: 965400086, Size: 512x512, Model hash: 45dee52b
        `;

    const info = parseGenerationParameters(pnginfo_data);

    expect(info).toEqual({
      "CFG scale": "7",
      "Clip skip": "1",
      "Hires checkpoint": "Use same checkpoint",
      "Hires negative prompt": "",
      "Hires prompt": "",
      "Hires resize-1": 0,
      "Hires resize-2": 0,
      "Hires sampler": "Use same sampler",
      "Model hash": "45dee52b",
      "Negative prompt":
        "ugly, fat, obese, chubby, (((deformed))), [blurry], bad anatomy, disfigured, poorly drawn face, mutation, mutated, (extra_limb), (ugly), (poorly drawn hands), messy drawing",
      Prompt:
        "girl with an artist's beret, determined, blue eyes, desert scene, computer monitors, heavy makeup, by Alphonse Mucha and Charlie Bowater, ((eyeshadow)), (coquettish), detailed, intricate",
      RNG: "GPU",
      Sampler: "Euler a",
      "Schedule max sigma": 0,
      "Schedule min sigma": 0,
      "Schedule rho": 0,
      "Schedule type": "Automatic",
      Seed: "965400086",
      "Size-1": "512",
      "Size-2": "512",
      "VAE Decoder": "Full",
      "VAE Encoder": "Full",
    });
  });

  test("should support parameter value in json format", () => {
    const pnginfo_data = dedent`
        high detailed professional upper body photo of a transparent porcelain android looking at viewer,with glowing backlit panels,anatomical plants,dark forest,night,darkness,grainy,shiny,intricate plant details,with vibrant colors,colorful plumage,bold colors,flora,contrasting shadows,realistic,photographic,fusion,Mars ,circuit ,stone,hologram,tattoo,dramatic,wind,woman,long hair,shimmer of hot air,atom,cosmic body,galaxy

        Negative prompt: anime,cartoon,(worst quality, low quality:1.4), EasyNegative, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, (monochrome:1.21), (grayscale:1.21)
        
        Steps: 21, Sampler: DPM++ 2M Karras, CFG scale: 4.5, Seed: 3628767367, Size: 512x936, Model hash: 4f3812a701, Model: 0cell_ci_rp5_gg, Denoising strength: 0.41, Hires upscale: 2, Hires steps: 16, Hires upscaler: 4x-UltraSharp, TI hashes: "EasyNegative: c74b4e810b03", Version: v1.5.1, Hashes: {"vae": "c6a580b13a", "embed:EasyNegative": "c74b4e810b"}
        `;

    const info = parseGenerationParameters(pnginfo_data);

    expect(info).toEqual({
      "CFG scale": "4.5",
      "Clip skip": "1",
      "Denoising strength": "0.41",
      Hashes: '{"vae": "c6a580b13a", "embed:EasyNegative": "c74b4e810b"}',
      "Hires checkpoint": "Use same checkpoint",
      "Hires negative prompt": "",
      "Hires prompt": "",
      "Hires resize-1": 0,
      "Hires resize-2": 0,
      "Hires sampler": "Use same sampler",
      "Hires steps": "16",
      "Hires upscale": "2",
      "Hires upscaler": "4x-UltraSharp",
      Model: "0cell_ci_rp5_gg",
      "Model hash": "4f3812a701",
      "Negative prompt":
        "anime,cartoon,(worst quality, low quality:1.4), EasyNegative, paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, (monochrome:1.21), (grayscale:1.21)\n",
      Prompt:
        "high detailed professional upper body photo of a transparent porcelain android looking at viewer,with glowing backlit panels,anatomical plants,dark forest,night,darkness,grainy,shiny,intricate plant details,with vibrant colors,colorful plumage,bold colors,flora,contrasting shadows,realistic,photographic,fusion,Mars ,circuit ,stone,hologram,tattoo,dramatic,wind,woman,long hair,shimmer of hot air,atom,cosmic body,galaxy\n",
      RNG: "GPU",
      Sampler: "DPM++ 2M Karras",
      "Schedule max sigma": 0,
      "Schedule min sigma": 0,
      "Schedule rho": 0,
      "Schedule type": "Automatic",
      Seed: "3628767367",
      "Size-1": "512",
      "Size-2": "936",
      "TI hashes": '"EasyNegative: c74b4e810b03"',
      "VAE Decoder": "Full",
      "VAE Encoder": "Full",
      Version: "v1.5.1",
    });
  });
});
