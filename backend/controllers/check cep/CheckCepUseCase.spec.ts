import { CheckCepUseCase } from "./CheckCepUseCase";
import fetch from "cross-fetch";

jest.mock("cross-fetch", () =>
  jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue({ /* mock address data */ }),
  })
);

describe("CheckCepUseCase", () => {
  describe("execute", () => {
    it("should fetch and return address information for a given CEP", async () => {
      // Arrange
      const mockCep = 12345678;
      const mockUrl = `https://viacep.com.br/ws/${mockCep}/json/`;
      const mockEndereco = { /* mock address data */ };

      const useCase = new CheckCepUseCase();

      // Act
      const enderecoViaCep = await useCase.execute(mockCep);

      // Assert
      expect(fetch).toHaveBeenCalledWith(mockUrl);
      expect(enderecoViaCep).toEqual(mockEndereco);
    });
  });
});
