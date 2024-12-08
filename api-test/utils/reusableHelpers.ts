/* eslint-disable @typescript-eslint/no-explicit-any */
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { userService } from './services/user-services';
import { StatusCodes } from 'http-status-codes';
import { expect } from '@playwright/test';

/**
 * This Method validateSchema validates response json for data structure
 * to ensure expected response is obtained
 */

export function validateSchema(data: any, schema: any): void {
  const ajv = new Ajv();
  addFormats(ajv);
  const validate = ajv.compile(schema);

  if (!validate(data)) {
    console.error('Validation Errors:', validate.errors);
    throw new Error(
      `Schema validation failed: ${JSON.stringify(validate.errors, null, 2)}`
    );
  }
}

/**
 * This Method generateRequestBody accepts base template request , any dynamic fields to be updated before passing
 * into api request
 *
 */

export const generateRequestBody = (
  baseRequest: Record<string, any>,
  dynamicFields: Record<string, any> = {}
): Record<string, any> => {
  const randomNumber = Math.floor(Math.random() * 90) + 1000;
  const dynamicEmail = `goRestTestEmail${randomNumber}@outlook.com`;
  return {
    ...baseRequest,
    email: dynamicEmail,
    ...dynamicFields,
  };
};

/**
 * This Method generateNewUserId : this method is to generate a new user id using base template as parameter
 * returns to userId
 *
 */
export const generateNewUserId = async (userRequest: any): Promise<string> => {
  try {
    const response = await userService.createNewUser(userRequest);
    const userResponseBody = await response.json();
    expect(response.status).toBe(StatusCodes.CREATED);
    if (!userResponseBody.id) {
      throw new Error('Response does not contain a user ID.');
    }
    return userResponseBody.id;
  } catch (error) {
    console.error('Error in getNewUserId:', error);
    throw error;
  }
};
