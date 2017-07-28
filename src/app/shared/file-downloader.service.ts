import { Injectable } from '@angular/core';
import * as html2canvas from 'html2canvas';

@Injectable()
export class FileDownloaderService {

  constructor() { }

  savePng(htmlElement, filename: string)
  {
      return html2canvas(htmlElement)
        .then(
            canvas => {
                let url = canvas.toDataURL("image/png");

                canvas.setAttribute('left', '-100px;');

                let a = document.createElement("a");
                a.setAttribute('style', 'display:none');
                document.body.appendChild(a);
                a.href = url;
                a.download = filename + '.png';
                a.click();
                document.body.removeChild(a);
            }
        );
  }

  saveCsv(content: string, filename: string)
  {
      let a = document.createElement("a");
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      let blob = new Blob([content], {type: 'text/csv'});
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename + '.csv';
      a.click();
      document.body.removeChild(a);
  }


}
