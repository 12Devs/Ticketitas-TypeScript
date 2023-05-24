import { ListHighlightsUseCase } from "./ListHighlightsUseCase";
import { Request, Response } from "express";

class ListHighlightsController {

    private listHighlightsUseCase: ListHighlightsUseCase;

    constructor (listHighlightsUseCase: ListHighlightsUseCase) {
        this.listHighlightsUseCase = listHighlightsUseCase;
    }

    public async handle (request: Request, response: Response){
        console.log(">AQUII<");
        const allHighlights = await this.listHighlightsUseCase.execute();
        return response.status(200).json({allHighlights});
    }

}

export { ListHighlightsController };