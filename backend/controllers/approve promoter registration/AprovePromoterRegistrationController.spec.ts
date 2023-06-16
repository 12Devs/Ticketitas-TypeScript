import { AprovePromoterRegistrationUseCase } from "./AprovePromoterRegistrationUseCase";
import { AprovePromoterRegistrationController } from "./AprovePromoterRegistrationController";
import { Request, Response } from "express";

describe('AprovePromoterRegistrationController', () => {
    let aprovePromoterRegistrationUseCase: AprovePromoterRegistrationUseCase;
    let aprovePromoterRegistrationController: AprovePromoterRegistrationController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        const mockPromoterCpf = "123456789"; // Define um valor mock para promoterCpf
        mockRequest = {
            params: {
                promoterCpf: mockPromoterCpf,
            },
        };

        aprovePromoterRegistrationUseCase = {
            execute: jest.fn()
        } as unknown as AprovePromoterRegistrationUseCase;

        aprovePromoterRegistrationController = new AprovePromoterRegistrationController(aprovePromoterRegistrationUseCase);

        // Criação do objeto mock para a classe Response
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        // Adiciona o método `send()` ao objeto mock da classe Response
        mockResponse.send = jest.fn();
    });

    it("deve chamar AprovePromoterRegistrationUseCase.execute com o promoterCpf correto", async () => {
        const promoterCpf = "123456789";
        mockRequest.params = { promoterCpf };
        const executeSpy = jest.spyOn(aprovePromoterRegistrationUseCase, "execute");

        await aprovePromoterRegistrationController.handle(mockRequest as Request, mockResponse as Response);

        expect(executeSpy).toHaveBeenCalledWith(promoterCpf);
    });

    it("deve retornar uma resposta com o status 204", async () => {
        await aprovePromoterRegistrationController.handle(mockRequest as Request, mockResponse as Response);

        expect(mockResponse.status).toHaveBeenCalledWith(204);
        expect(mockResponse.send).toHaveBeenCalled();
    });
});
