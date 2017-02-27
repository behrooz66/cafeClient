import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit {

  @Input() pageSize: number;
  @Input() sizes: number[] = [3, 5, 10];
  @Input() source: any[];
  @Input() allowPageSizeChange: boolean = true;
  @Output('index-change') indexChange = new EventEmitter();
  @Output('size-change') SizeChange = new EventEmitter();

  records: any[];
  index: number;
  totalPages: number;
  arr:any[];

  constructor() { }

  ngOnInit() {
    
  }

  ngOnChanges(change){
    //this.source = change.source.currentValue;
    this.setup();
    this.pageIndexChange(0);
  }

  pageSizeChange(){
    this.setup();
    let si = this.index * this.pageSize;
    let ei = si + +this.pageSize;
    this.indexChange.emit( {
      startIndex: si,
      endIndex: ei
    });
  }

  pageIndexChange(i:number){
    this.index = i;
    let si = this.index * this.pageSize;
    let ei = si + +this.pageSize;
    this.indexChange.emit( {
      startIndex: si,
      endIndex: ei
    });
  }

  private setup(){
    try {
      this.totalPages = Math.ceil(this.source.length / this.pageSize);
      this.arr = new Array(this.totalPages);
      this.index = 0;
    }
    catch(x) {
      console.log("Exception: ",x);
    }
  }

  private nextPage(){
    if (this.index < this.totalPages-1){
      this.index++;
      this.pageIndexChange(this.index)
    }
  }

  private prevPage(){
    if (this.index > 0){
      this.index--;
      this.pageIndexChange(this.index);
    }
  }

  private firstPage(){
    this.pageIndexChange(0);
  }

  private lastPage(){
    this.pageIndexChange(this.totalPages - 1);
  }
}
