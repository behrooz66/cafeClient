import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit, ChangeDetectorRef, IterableDiffers , DoCheck} from '@angular/core';

@Component({
  selector: 'paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnChanges {

  @Input() pageSize: number;
  @Input() sizes: number[] = [3, 5, 10];
  @Input() source: any[];
  @Input() allowPageSizeChange: boolean = true;
  @Output('index-change') indexChange = new EventEmitter();
  @Output('size-change') SizeChange = new EventEmitter();

  differ: any;

  records: any[];
  index: number;
  totalPages: number;
  arr:any[];

  constructor(private _cdr:ChangeDetectorRef,
              private _differs: IterableDiffers) {
                this.differ = this._differs.find([]).create(null);
               }

  ngOnInit() {
    
  }

  ngOnChanges(change){
    //this.source = change.source.currentValue;
    
    console.log(change);
    this.setup();
    this.pageIndexChange(0);
  }

  // ngDoCheck(){
  //   let c = this.differ.diff(this.source);
  //   console.log(this.index);
  //   if (c)
  //     this.afterSourceChange();
  // }


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

  private afterSourceChange(){
      try {
        this.totalPages = Math.ceil(this.source.length / this.pageSize);
        this.arr = new Array(this.totalPages);
        this.pageIndexChange(this.index);
      }
      catch(x) {
        console.log("Exception: ",x);
      }
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
