import {AfterViewInit, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import Viewer from 'viewerjs';

@Component({
  selector: 'app-image-viewer-modal',
  templateUrl: './image-viewer-modal.component.html',
  styleUrls: ['./image-viewer-modal.component.css']
})
export class ImageViewerModalComponent implements AfterViewInit {

  // viewer: any;

  constructor(public dialogRef: MatDialogRef<ImageViewerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private renderer: Renderer2) {

  }

  ngAfterViewInit(): void {
    // const img = document.getElementById("img-elem");
    // if (img) {
    //   this.viewer = new Viewer(img, {
    //     inline: false,
    //     button: true,
    //     zoomRatio: 0.3,
    //   } as Viewer.Options);
    //   this.viewer.show();
    // }

  }

  close() {
    // this.viewer.destroy();
    this.dialogRef.close();
  }
}
