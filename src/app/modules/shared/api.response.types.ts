/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

export interface APIResponseSuccess {
  success: true;
  message?: string;
  data?: any;
  statusCode?: number;
}

export interface APIResponseError {
  success: false;
  message: string;
  errors?: any[];
  statusCode?: number;
}

export type APIResponse = APIResponseSuccess | APIResponseError;

function sendAPIResponse(res: Response, response: APIResponse) {
  res.status(response.statusCode || 200).json(response);
}

export function SUCCESS(res: Response, message: string, data?: any) {
  const apiResponse: APIResponseSuccess = {
    success: true,
    message,
    data,
  };
  sendAPIResponse(res, apiResponse);
}

export function ERROR(
  res: Response,
  message: string,
  errors?: any[],
  statusCode?: number,
) {
  const apiResponse: APIResponseError = {
    success: false,
    message,
    errors,
    statusCode,
  };
  sendAPIResponse(res, apiResponse);
}