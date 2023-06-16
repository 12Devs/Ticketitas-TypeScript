import { CheckCepController } from './CheckCepController';
import { CheckCepUseCase } from './CheckCepUseCase';

describe('CheckCepController', () => {

    let checkCepController: CheckCepController;
    let checkCepUseCase: CheckCepUseCase;
    let mockRequest: any;
    let mockResponse: any;

    beforeEach(() => {
        checkCepUseCase = new CheckCepUseCase();
        checkCepController = new CheckCepController(checkCepUseCase);
        mockRequest = { params: { cep: '12345678' } };
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn(),
        };
    });

    it('should handle the request and send a JSON response with address information', async () => {
        const mockEnderecoViaCep = { city: 'Sao Paulo', state: 'SP', postalCode: '12345678' };
        jest.spyOn(checkCepUseCase, 'execute').mockResolvedValue(mockEnderecoViaCep);

        await checkCepController.handle(mockRequest, mockResponse);

        expect(checkCepUseCase.execute).toHaveBeenCalledWith('12345678');
        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith(mockEnderecoViaCep);
    });
});
