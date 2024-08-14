"use server";
import type { HttpError } from "@choosetale/nestia-type";
import { API_URL } from "@/config/config";

export const deleteChoice = async (gameId: number, choiceId: number) => {
  try {
    await fetch(`${API_URL}/game/${gameId}/choice/${choiceId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, error: error as HttpError };
  }
};
