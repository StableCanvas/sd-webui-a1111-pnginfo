import EXIF from "exifr";
import { parseGenerationParameters } from "./parser";

type ImageInput =
  | ArrayBuffer
  | SharedArrayBuffer
  | Buffer
  | Uint8Array
  | DataView
  | string
  | Blob
  | File
  | HTMLImageElement;

type PngMateDataInfo = {
  ImageWidth: number;
  ImageHeight: number;
  BitDepth: number;
  ColorType: string;
  Compression: string;
  Filter: string;
  Interlace: string;
  parameters?: string;
  userComment?: string;
};

type RawA1111Params = {
  "Clip skip": string;
  "Hires resize-1": number;
  "Hires resize-2": number;
  "Hires sampler": string;
  "Hires checkpoint": string;
  "Hires prompt": string;
  "Hires negative prompt": string;
  RNG: string;
  "Schedule type": string;
  "Schedule max sigma": number;
  "Schedule min sigma": number;
  "Schedule rho": number;
  "VAE Encoder": string;
  "VAE Decoder": string;
  Prompt: string;
  "Negative prompt": string;
  Sampler: string;
  "CFG scale": string;
  Seed: string;
  "Size-1": string;
  "Size-2": string;
  "Model hash": string;
  "TI hashes": string;
  Version: string;
} & Record<string, string | number | string[]>;

type A1111Params = {
  clip_skip: string;
  hires_resize_1: number;
  hires_resize_2: number;
  hires_sampler: string;
  hires_checkpoint: string;
  hires_prompt: string;
  hires_negative_prompt: string;
  rng: string;
  schedule_type: string;
  schedule_max_sigma: number;
  schedule_min_sigma: number;
  schedule_rho: number;
  vae_encoder: string;
  vae_decoder: string;
  prompt: string;
  negative_prompt: string;
  sampler: string;
  cfg_scale: string;
  seed: string;
  size_1: string;
  size_2: string;
  model_hash: string;
  ti_hashes: string;
  version: string;
} & Record<string, string | number | string[]>;

export class PNGInfo {
  raw_data: Promise<PngMateDataInfo>;

  /**
   * Initializes a new instance of the class.
   *
   * @param {ImageInput} image_source - The source of the image.
   */
  constructor(readonly image_source: ImageInput) {
    this.raw_data = EXIF.parse(image_source, {
      userComment: true,
    });
  }
  /**
   * Retrieves the raw parameters from the raw data asynchronously.
   *
   * @return {Promise<RawA1111Params | null>} The raw parameters or null if parameters are not present.
   */
  async getRawParams() {
    const { parameters } = await this.raw_data;
    if (!parameters) return null;
    const params = parseGenerationParameters(parameters);
    return params as RawA1111Params;
  }

  /**
   * Get the parameters asynchronously.
   *
   * @return {Promise<A1111Params | null>} The parameters object
   */
  async getParams() {
    const params = await this.getRawParams();
    if (!params) return null;
    return Object.fromEntries(
      Object.entries(params).map(([k, v]) => [
        k.toLowerCase().replace(/[ -]/g, "_"),
        v,
      ])
    ) as A1111Params;
  }
}
