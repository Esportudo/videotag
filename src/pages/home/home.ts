import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var VisSense: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public videos = [];
  constructor(public navCtrl: NavController) {

  }

  play(id) {

    let video: HTMLVideoElement = <HTMLVideoElement>document.getElementById(id);
    
    if (this.videos.indexOf(video) == -1) {
      this.videos.unshift(video);

      console.log('video', this.videos[0]);
      //videos[1].pause();

      console.log('video', this.videos[0]);
      let myVideo = this.videos[0];
      VisSense.VisMon.Builder(VisSense(myVideo, { fullyvisible: 0.5 }))
        .on('fullyvisible', function (monitor) {
          myVideo.muted = false;
          myVideo.play();
        })
        .on('hidden', function (monitor) {
          myVideo.pause();
        })
        .build()
        .start();
    } else {
      this.videos[this.videos.indexOf(video)].muted = !this.videos[this.videos.indexOf(video)].muted;
      this.videos[this.videos.indexOf(video)].play();
      console.log('muted', this.videos[this.videos.indexOf(video)].muted);
    }

    for (let i = 0; i < this.videos.length; i++) {
      if (this.videos[i] != this.videos[this.videos.indexOf(video)]) {
        this.videos[i].muted = true;
      }
    }

    console.log(this.videos);
  }

}
