import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private _messageService: MessageService) { }

  showSuccess(summary : string, detail: string) {
      this._messageService.add({ severity: 'success', summary: summary, detail: detail });
  }
  
  showInfo(summary : string, detail: string) {
      this._messageService.add({ severity: 'info', summary: summary, detail: detail });
  }
  showWarning(summary : string, detail: string) {
      this._messageService.add({ severity: 'warning', summary: summary, detail: detail });
  }
  showError(summary : string, detail: string) {
      this._messageService.add({ severity: 'danger', summary: summary, detail: detail });
  }

}
