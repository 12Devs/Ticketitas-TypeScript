import { EventReportUseCase } from "./EventReportUseCase";
import { Request, Response } from "express";

/**
 * Event report controller class
 * @date 6/6/2023 - 10:18:32 PM
 *
 * @class EventReportController
 * @typedef {EventReportController}
 */
class EventReportController {
  
  /**
   * Creates an instance of {@link EventReportController}.
   * @date 6/6/2023 - 10:18:40 PM
   *
   * @private
   * @type {EventReportUseCase}
   */
  private eventReportUseCase: EventReportUseCase;
  
  /**
   * Creates an instance of EventReportController.
   * @date 6/6/2023 - 10:18:50 PM
   *
   * @constructor
   * @param {EventReportUseCase} eventReportUseCase
   */
  constructor(eventReportUseCase: EventReportUseCase) {
    this.eventReportUseCase = eventReportUseCase;
  }
  
  /**
   * Manipulate method for make a report of a event
   * @date 6/6/2023 - 10:18:53 PM
   *
   * @public
   * @async
   * @param {Request} request
   * @param {Response} response
   * @returns {*}
   */
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