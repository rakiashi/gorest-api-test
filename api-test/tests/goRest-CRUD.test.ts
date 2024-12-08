import { test, expect } from '@playwright/test';
import { generateRequestBody, validateSchema } from '../utils/reusableHelpers';
import { userService } from '../utils/services/user-services';
import { attachApiResponse } from '../utils/apiLogger';
import { StatusCodes } from 'http-status-codes';
import requestData from '../utils/test-data/user-request.json';
import schemas from '../schemas/responseSchemas/user-json-schema.json';

test.describe.serial(
  'CRUD Operations for GoRest API Users',
  { tag: ['@CRUD'] },
  async () => {
    let userId: number, emailId: string;

    test('Create a new user with valid data', async ({}, testInfo) => {
      const requestBody = generateRequestBody(requestData.userRequest);
      const newUserResponse = await userService.createNewUser(requestBody);
      const responseBody = await newUserResponse.json();
      const status = newUserResponse.status;
      userId = responseBody.id;
      emailId = responseBody.email;
      expect(status).toBe(StatusCodes.CREATED);
      attachApiResponse(testInfo, 'Create API Response', {
        status,
        responseBody,
      });

      // validate JSON reponse body with the expected responseSchema
      validateSchema(responseBody, schemas.userResponseSchema);
      expect.soft(responseBody.name).toBe(requestBody.name);
      expect.soft(responseBody.status).toBe(requestBody.status);
    });

    test('Get User details of the newly created user by ID', async ({}, testInfo) => {
      const response = await userService.getUserDetailsByUserId(userId);
      const responseBody = await response.json();
      const status = response.status;
      expect(status).toBe(StatusCodes.OK);
      attachApiResponse(testInfo, 'Get API Response', { status, responseBody });

      expect.soft(responseBody.id).toBe(userId);
      expect.soft(responseBody.name).toBe(requestData.userRequest.name);
      expect.soft(responseBody.status).toBe(requestData.userRequest.status);
    });

    test('Update the details of the existing user', async ({}, testInfo) => {
      const updateRequestBody = generateRequestBody(requestData.userRequest, {
        email: emailId,
        name: 'Updated Test Name',
        gender: 'female',
        status: 'inactive',
      });
      const response = await userService.updateUserDetailsByUserId(
        userId,
        updateRequestBody
      );
      const responseBody = await response.json();
      const status = response.status;
      expect.soft(status).toBe(StatusCodes.OK);
      attachApiResponse(testInfo, 'Update API Response', {
        status,
        responseBody,
      });

      expect.soft(responseBody.id).toBe(userId);
      expect.soft(responseBody.email).toBe(emailId);
      expect.soft(responseBody.name).toBe(updateRequestBody.name);
      expect.soft(responseBody.gender).toBe(updateRequestBody.gender);
      expect.soft(responseBody.status).toBe(updateRequestBody.status);
    });

    test('Delete the user by ID', async ({}, testInfo) => {
      const response = await userService.deleteUserByUserId(userId);
      const status = response.status;
      expect(status).toBe(StatusCodes.NO_CONTENT);
      attachApiResponse(testInfo, 'Delete API Response', { status });
    });

    test('Verify that fetching a deleted user returns a NOT_FOUND error', async ({}, testInfo) => {
      const response = await userService.getUserDetailsByUserId(userId);
      const responseBody = await response.json();
      const status = response.status;
      expect(status).toBe(StatusCodes.NOT_FOUND);
      attachApiResponse(testInfo, 'Get Deleted User API Response', {
        status,
        responseBody,
      });
    });
  }
);
