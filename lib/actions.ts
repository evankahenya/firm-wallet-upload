"use server"

import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: "red-used-swift-248.mypinata.cloud-gateway.mypinata.cloud",
});

export async function deleteImage(fileId: string) {
  try {
    await pinata.files.public.delete([fileId]);
    return {
      success: true,
      message: "file has been deleted",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "failed to delete file",
    };
  }
}