export * from './packing.error';
import { pack } from './pack';


export class Packer {
  static async pack(filePath: string): Promise<string> {
    return await pack(filePath);
  }
}