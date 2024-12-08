/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestInfo } from '@playwright/test';

/**
 * This Method attachApiResponse accepts parameters testInfo , title , api status and it's response body
 * This will attach the relavent information to the playwright report for ease debugging
 */
export function attachApiResponse(
  testInfo: TestInfo,
  title: string,
  response: { status: number; responseBody?: any }
) {
  testInfo.attach(title, {
    contentType: 'application/json',
    body: JSON.stringify(response, null, 2),
  });
}
