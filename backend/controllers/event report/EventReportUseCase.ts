import { EventRepository } from "../../db/EventRepository";

class EventReportUseCase {
  private eventRepository: EventRepository;

  constructor(eventRepository: EventRepository) {
    this.eventRepository = eventRepository;
  }

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