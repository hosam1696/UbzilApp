import {Injectable} from "@angular/core";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {ICameraType} from "./app.enums";


@Injectable()

export class AppPlugins {


  constructor(
    public camera:Camera
  ){}

  async openCamera(cameraSource:ICameraType) {
      const cameraOptions: CameraOptions = {
        quality: 70,
        allowEdit: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType[cameraSource]
      };

      return await  this.camera.getPicture(cameraOptions);
  }

  async getCameraResult() {
      let x = await this.openCamera(ICameraType.CAMERA);

  }
}
