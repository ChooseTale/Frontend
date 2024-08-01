"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/constant/config";
import type { ApiResponse, SuccessResponse } from "../action";

interface UploadThumbnailSuccessResponse extends SuccessResponse {
  uploadedThumbnail: {
    id: number;
    url: string;
    gameId: number;
    createdAt: string;
    updatedAt: string;
  }[];
}
export const uploadThumbnail = async (
  gameId: number
): Promise<ApiResponse<UploadThumbnailSuccessResponse>> => {
  const payload = {};
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/upload-thumbnail`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    const uploadedThumbnail = await response.json();
    return { success: true, uploadedThumbnail };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};

interface GenerateThumbnailSuccessResponse extends SuccessResponse {
  generatedThumbnail: string;
}
export const generateThumbnail = async (
  gameId: number
): Promise<ApiResponse<GenerateThumbnailSuccessResponse>> => {
  try {
    const response = await fetch(`${API_URL}/game/${gameId}/recommend-image`, {
      method: "POST",
      body: JSON.stringify({}),
    });
    const generatedThumbnail = await response.json();
    return { success: true, generatedThumbnail };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};

interface DeleteThumbnailSuccessResponse extends SuccessResponse {
  data: string;
}
export const deleteThumbnail = async (
  gameId: number,
  imageId: number
): Promise<ApiResponse<DeleteThumbnailSuccessResponse>> => {
  try {
    // 여기서 서버에서 썸네일을 삭제하는 로직을 구현합니다.
    const response = await fetch(
      `${API_URL}/game/${gameId}/thumbnail/${imageId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
