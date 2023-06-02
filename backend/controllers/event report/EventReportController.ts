import { EventReportUseCase } from "./EventReportUseCase";
import { Request, Response } from "express";

class EventReportController {
  private eventReportUseCase: EventReportUseCase;

  constructor(eventReportUseCase: EventReportUseCase) {
    this.eventReportUseCase = eventReportUseCase;
  }

  public async handle(request: Request, response: Response) {
    try {
      const { eventId, promoterCpf } = request.params;

      const reportData = await this.eventReportUseCase.execute(eventId, promoterCpf);

      response.status(200).json(reportData);
    } catch (error) {
      response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EventReportController };