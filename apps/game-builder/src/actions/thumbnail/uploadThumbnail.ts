"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface UploadThumbnail {
  id: number;
  url: string;
  gameId: number;
  createdAt: string;
  updatedAt: string;
}

interface UploadThumbnailSuccessResponse extends SuccessResponse {
  uploadedThumbnail: UploadThumbnail;
}
export const uploadThumbnail = async (
  gameId: number,
  images: FormData
): Promise<ApiResponse<UploadThumbnailSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/upload-thumbnail`, {
      method: "POST",
      body: images,
    });

    if (!response.ok) {
      const errorData = (await response.json()) as { message: string };
      throw new Error(errorData.message || "Failed to upload thumbnails");
    }

    const data = (await response.json()) as UploadThumbnail[];
    if (!data) {
      throw new Error("Failed to upload thumbnails");
    }

    return { success: true, uploadedThumbnail: data[0] };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
