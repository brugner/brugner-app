import { ErrorHandler, Injectable } from "@angular/core";
import { MonitoringService } from "./monitoring.service";

@Injectable()
export class ErrorHandlerService extends ErrorHandler {

    constructor(private monitoringService: MonitoringService) {
        super();
    }

    override handleError(error: Error) {
        this.monitoringService.logException(error);
    }
}