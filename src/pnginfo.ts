import EXIF from "exifr";
import { parseGenerationParameters } from "./parser";
import {
  PngMateDataInfo,
  ImageInput,
  RawA1111Params,
  A1111Params,
} from "./types";

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
