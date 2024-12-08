import { generateRequestBody } from '../utils/reusableHelpers';
import { userService } from '../utils/services/user-services';
import { test, expect } from '@playwright/test';
import { attachApiResponse } from '../utils/apiLogger';
import { StatusCodes } from 'http-status-codes';
import testData from '../utils/test-data/test-data.json';

test.describe(
  'GoRest api test scenarios',
  { tag: ['@Regression'] },
  async () => {
    test('Should fail to create a user when invalid data is provided for all fields.', async () => {
      const requestBody = {
        ...testData.invalidData,
      };
      const response = await userService.createNewUser(requestBody);
      const responseBody = await response.json();
      const status = response.status;

      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      attachApiResponse(test.info(), 'api response', { status, responseBody });

      expect.soft(responseBody[0].field).toBe('gender');
      expect
        .soft(responseBody[0].message)
        .toBe("can't be blank, can be male of female");
      expect.soft(responseBody[1].field).toBe('status');
      expect.soft(responseBody[1].message).toBe("can't be blank");
      expect.soft(responseBody[2].field).toBe('email');
      expect.soft(responseBody[2].message).toBe('is invalid');
    });

    test('Should fail to create a user when the name field is missing.', async () => {
      const requestBody = generateRequestBody(testData.nameRequiredData);
      const response = await userService.createNewUser(requestBody);
      const responseBody = await response.json();
      const status = response.status;
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      attachApiResponse(test.info(), 'api response', { status, responseBody });
      expect.soft(responseBody[0].field).toBe('name');
      expect.soft(responseBody[0].message).toBe("can't be blank");
    });

    test('Should fail to create a user when the provided email address already exists in the system.', async () => {
      const requestBody = {
        ...testData.emailExistData,
      };
      const response = await userService.createNewUser(requestBody);
      const responseBody = await response.json();
      const status = response.status;
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      attachApiResponse(test.info(), 'api response', { status, responseBody });
      expect.soft(responseBody[0].field).toBe('email');
      expect.soft(responseBody[0].message).toBe('has already been taken');
    });

    test('Should fail to create a user when the gender field is missing.', async () => {
      const requestBody = generateRequestBody(testData.genderRequiredData);
      const response = await userService.createNewUser(requestBody);
      const responseBody = await response.json();
      const status = response.status;
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      attachApiResponse(test.info(), 'api response', { status, responseBody });
      expect.soft(responseBody[0].field).toBe('gender');
      expect
        .soft(responseBody[0].message)
        .toBe("can't be blank, can be male of female");
    });

    test('Should fail to create a user when the email field is missing.', async () => {
      const requestBody = {
        ...testData.emailRequiredData,
      };
      const response = await userService.createNewUser(requestBody);
      const responseBody = await response.json();
      const status = response.status;
      expect(response.status).toBe(StatusCodes.UNPROCESSABLE_ENTITY);
      attachApiResponse(test.info(), 'api response', { status, responseBody });
      expect.soft(responseBody[0].field).toBe('email');
      expect.soft(responseBody[0].message).toBe("can't be blank");
    });

    test('Invalid token should return 401 Unauthorized', async ({
      request,
    }) => {
      const baseUrl = process.env.BASE_URL;
      const response = await request.get(`${baseUrl}/users`, {
        headers: { Authorization: 'Bearer invalid-token' },
      });
      expect(response.status()).toBe(StatusCodes.UNAUTHORIZED);
    });

    test('Should fail to get user details when ID is invalid', async () => {
      const response = await userService.getUserDetailsByUserId(123);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });

    test('Should fail to delete an user details when ID is invalid', async () => {
      const response = await userService.deleteUserByUserId(345);
      expect(response.status).toBe(StatusCodes.NOT_FOUND);
    });
  }
);
