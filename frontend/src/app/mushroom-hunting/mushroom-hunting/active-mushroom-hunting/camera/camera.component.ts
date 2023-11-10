import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {WebcamImage} from "ngx-webcam";

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements AfterViewInit {
  private trigger: Subject<any> = new Subject();
  public webcamImage!: WebcamImage;
  private nextWebcam: Subject<any> = new Subject();
  sysImage = '';

  width!: number;
  height!: number;
  isLoading = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit(): void {
    this.width = parent.innerWidth;
    this.height = parent.innerHeight;
    this.isLoading = false;
    this.cdr.detectChanges();
  }

  public getSnapshot(): void {
    this.trigger.next(void 0);
  }

  public captureImg(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.sysImage = webcamImage!.imageAsDataUrl;
    console.info('got webcam image', this.sysImage);
  }

  public get invokeObservable(): Observable<any> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<any> {
    return this.nextWebcam.asObservable();
  }

  protected readonly parent = parent;


}
