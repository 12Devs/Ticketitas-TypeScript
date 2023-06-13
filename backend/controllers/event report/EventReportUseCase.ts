import { EventRepository } from "../../db/EventRepository";

/**
 * Event report use case class
 * @date 6/6/2023 - 10:19:03 PM
 *
 * @class EventReportUseCase
 * @typedef {EventReportUseCase}
 */
class EventReportUseCase {
  
  /**
   * Create an instance of {@link EventReportUseCase}
   * @date 6/6/2023 - 10:19:12 PM
   *
   * @private
   * @type {EventRepository}
   */
  private eventRepository: EventRepository;
  
  /**
   * Creates an instance of EventReportUseCase.
   * @date 6/6/2023 - 10:19:17 PM
   *
   * @constructor
   * @param {EventRepository} eventRepository
   */
  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }
  
  /**
   * Method for make a report of a event
   * @date 6/6/2023 - 10:19:21 PM
   *
   * @public
   * @async
   * @param {string} eventId
   * @param {number} promoterCpf
   * @returns {Promise<any>}
   */
  public async execute(eventId: string, promoterCpf: number): Promise<any> {
    const belongsToPromoter = await this.eventRepository.findByIdAndCpfPromoter(eventId, promoterCpf);

    if (!belongsToPromoter) {
      throw new Error("Event not found or unauthorized access");
    }

    const eventData = await this.eventRepository.findOneEvent(eventId);

    if (!eventData) {
        throw new Error("Event not found");
      }

    const reportData = {
      quantPista: eventData.quantPista,
      quantStage: eventData.quantStage,
      quantVip: eventData.quantVip,
      valorPista: eventData.valorPista,
      valorStage: eventData.valorStage,
      valorVip: eventData.valorVip,
      porcentagemMeia: eventData.porcentagemMeia,
      porcentagemGratis: eventData.porcentagemGratis
    };

    return reportData;
  }
}

export { EventReportUseCase };