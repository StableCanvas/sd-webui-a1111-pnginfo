export type ImageInput =
  | ArrayBuffer
  | SharedArrayBuffer
  | Buffer
  | Uint8Array
  | DataView
  | string
  | Blob
  | File
  | HTMLImageElement;
export type PngMateDataInfo = {
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
export type RawA1111Params = {
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
export type A1111Params = {
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
