import { AprovePromoterRegistrationController } from "./AprovePromoterRegistrationController";
import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";
import { Request, Response } from "express";

describe('AprovePromoterRegistrationController', () => {
    let aprovePromoterRegistrationController: AprovePromoterRegistrationController;
    let aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        aprovePromoterRegistrationUseCase = {
            execute: jest.fn(),
        } as unknown as AprovePromoterRegistrationUseCase;

        aprovePromoterRegistrationController = new AprovePromoterRegistrationController(
            aprovePromoterRegistrationUseCase
        );

        mockRequest = {
            params: {
                promoterCpf: '1234567890',
            },
        };

        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
    });

    it('should call execute method of AprovePromoterRegistrationUseCase and return status 204', async () => {
        const executeSpy = jest.spyOn(aprovePromoterRegistrationUseCase, 'execute');

        await aprovePromoterRegistrationController.handle(mockRequest as Request, mockResponse as Response);

        expect(executeSpy).toHaveBeenCalledWith('1234567890');
        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });
});
