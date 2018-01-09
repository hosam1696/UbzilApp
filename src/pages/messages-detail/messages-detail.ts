import { AppUtilFunctions } from './../../app/appglobal/app.utilfuns';
import { AppAPi } from './../../providers/app.api';

// Main Components
import {Component,ViewChild,Inject} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ViewController, ActionSheetController,Content,Platform} from 'ionic-angular';
import {TranslateService} from 'ng2-translate';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
// Providers
import { MessagesProvider } from './../../providers/messages/messages';

// Req Pages
declare let cordova: any;

@IonicPage()
@Component({
    selector: 'page-messages-detail',
    templateUrl: 'messages-detail.html',
})
export class MessagesDetail extends AppAPi{
    @ViewChild(Content) content: Content;
    //@ViewChild('msgInput') msgInput: any;
    titletext: any;
    foldertext: any;
    cameratext: any;
    filetext: any;
    canceltext: any;
    pageParams: any;
    userLocal:any;
    // msgList
    msgList:any;
    editorMsg:any;
    conversation_id:any;
    lastMsgId:any;
    myInterval:any;
    // uploade file
    cameraError: any;
    lastImage: any;
    uploadLoader: boolean = false;
    

    
    constructor(
        //@Inject('API_URL') private API_URL,
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public translateService: TranslateService,
        public viewCtrl: ViewController,
        public modalCtrl: ModalController,
        public actionSheetCtrl: ActionSheetController,
        public appUtils: AppUtilFunctions,
        public messagesProvider: MessagesProvider,
        private camera: Camera,
        private platform: Platform,
        private file: File,
        private filePath: FilePath,
        private transfer: Transfer,

    ) {
        super();
        //@ViewChild('myInput') myInput: ElementRef;
        console.log('*************** MessagesDetail ******************');
        this.pageParams = this.navParams.get('pageData');
        
        console.log('pageParams >>> ', this.pageParams);

    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        
        this.myInterval = setInterval(() => { 
            console.log('interval lastMsgId seen', this.lastMsgId);
            this.getLiveMsg();
        }, 2000);
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.translateService.get('Upload-Image')
            .subscribe(lang => {
                this.titletext = lang;
            })
        this.translateService.get('From-file')
            .subscribe(lang => {
                this.foldertext = lang;
            })
        this.translateService.get('uploade-file')
            .subscribe(lang => {
                this.filetext = lang;
            })
        this.translateService.get('From-camera')
            .subscribe(lang => {
                this.cameratext = lang;
            })
        this.translateService.get('Cancel')
            .subscribe(lang => {
                this.canceltext = lang;
            })
        this.appUtils.storage.get('localUserInfo')
            .then(data=>{
                this.userLocal = data;
                console.log('localUserInfo in MessagesDetail',this.userLocal);
                if (this.pageParams.user2 && !this.pageParams.conversation_id) {
                    console.log('user2 come', this.pageParams.user2);
                    this.checkIfConversation();
                }else{
                    console.log('conversation_id come', this.pageParams.conversation_id);
                    this.getConversationMessages();
                }
                
            });
    }
    
    checkIfConversation(){
        let sentData ={
            "user_id": this.userLocal.id, 
            "user2": this.pageParams.user2,
            "order_id": this.pageParams.order_id,
            "lang_code":this.appUtils.CurrentLang,
            "verifycode":this.userLocal.verifycode,
        }
        this.messagesProvider.checkIfConversation(sentData).subscribe((data) => {
            console.log('checkIfConversation data From server', data); 
            if (data) {
                this.msgList = data;
                //console.log('this.conversation_id',  data[0].conversation_id);
                this.conversation_id = data[0].conversation_id;
                console.log('messages in this conversation From server', this.msgList); 
                console.log('this.conversation_id', this.conversation_id);

            }else{
                this.msgList = [];
                this.conversation_id  = 0;
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            //this.showLoader = false;
            //this.priceList  = this.userData.priceList;
            //console.log('price list from user id', this.priceList  )
        })
    }

    getConversationMessages(){
        let sentData ={
            "user_id": this.userLocal.id, 
            "conversation_id": this.pageParams.conversation_id,
            "lang_code":this.appUtils.CurrentLang,
            "verifycode":this.userLocal.verifycode,
            "lastMsgId":this.lastMsgId,
        }
        this.messagesProvider.getConversationMessages(sentData).subscribe((data) => {
            if (data) {
                this.msgList = data;
                console.log('messages in this conversation From server', this.msgList);
                /* for (let i = 0; i < this.msgList.length; i++) {
                    
                    if (this.msgList[i]['seen_it'] == 0) {
                        this.lastMsgId = this.msgList[i]['id'];
                        return true;
                    }else{
                        this.lastMsgId = this.msgList[i]['id'];
                    }
                } */
                //return false;
                //console.log('getConversationMessages last seen id ', this.lastMsgId)
                this.lastMsgId = this.msgList[this.msgList.length-1]['id'];                
            }else{
                this.msgList = [];
                //this.lastMsgId = 0;
            }
            
            //console.log('getConversationMessages last seen id ', this.lastMsgId)
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            //console.log('getConversationMessages last seen id ', this.lastMsgId)
            this.conversation_id  = this.pageParams.conversation_id;
            this.scrollToBottom();

        })
    }
    
    getLiveMsg(){
        console.log('conversation id in live msg', this.conversation_id);
        let sentData ={
            "user_id": this.userLocal.id, 
            "conversation_id": this.pageParams.conversation_id,
            "lang_code":this.appUtils.CurrentLang,
            "verifycode":this.userLocal.verifycode,
            "lastMsgId":this.lastMsgId,
            "from":this.pageParams.user2,
        }
        this.messagesProvider.getLiveMessages(sentData).subscribe((data) => {
            console.log('live msg return data', data);
            if (data) {
                /* let index = this.getMsgIndexById(this.lastMsgId);
                this.msgList.splice(index); */
                this.msgList = [...this.msgList, ...data];
                console.log('messages in this conversation From server', this.msgList);
                //this.lastMsgId = this.msgList[this.msgList.length-1]['id'];
                this.conversation_id  = data[0].conversation_id;
                this.lastMsgId = this.msgList[this.msgList.length-1]['id'];
                /* for (let i = 0; i < this.msgList.length; i++) {
                    
                    if (this.msgList[i]['seen_it'] == 0) {
                        this.lastMsgId = this.msgList[i]['id'];
                        return true;
                    }else{
                        this.lastMsgId = this.msgList[i]['id'];
                    }
                } */
                /* for (let i = 0;i < this.msgList.length;i++) {
                    console.log('here in for');
                    if(this.msgList[i].seen_it != '1'){
                        this.msgList[i].seen_it == '1';
                    }
                } */
                                
                //this.scrollToBottom();
            }else{

                //console.log('live msg return no data');
                //this.msgList = this.msgList;
                //this.lastMsgId = 0;
            }

            //this.conversation_id  = this.pageParams.conversation_id;
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
            console.log('conversation id in live msg', this.conversation_id);
            this.scrollToBottom();
        })
    }

    pushNewMsg() {
        if (!this.editorMsg.trim()) return;
        console.log('conversation_id', this.conversation_id);
        let body = {
            "conversation_id":this.conversation_id,
            "from":this.userLocal.id,
            "to":this.pageParams.user2,
            "message":this.editorMsg,
            "type":'text',
            "seen_it":'0',
            'date_added': Date.now()
        };
        this.msgList.push(body);
        this.scrollToBottom();
        this.editorMsg = '';
        console.log('msgList after pushed', this.msgList);
        this.sendMsgToDB(body);
        // Mock message
        /* const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        }; */

        //this.pushNewMsg(newMsg);
        

        /* this.chatService.sendMsg(newMsg)
        .then(() => {
            let index = this.getMsgIndexById(id);
            if (index !== -1) {
                this.msgList[index].status = 'success';
            }
        }) */
    }

    sendMsgToDB(data){

        let sentData ={ ... data,
            "user_id": this.userLocal.id, 
            "order_id": this.pageParams.order_id,
            "lang_code":this.appUtils.CurrentLang,
            "verifycode":this.userLocal.verifycode,
        }
        this.messagesProvider.addConversation(sentData).subscribe((data) => {
            console.log('sendMsgToDB data from server', data);
            
            if (data) {
                this.conversation_id = data;
            }else{
                
            }
            
        }, err => {
            if (err.error instanceof Error) {
                console.warn('client side errror', err)
            } else {
                console.warn('server side error', err)
            }
        }, () => {
        })
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 500)
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.id === id)
    }
    dismiss() {
        this.viewCtrl.dismiss(this.msgList[this.msgList.length-1]);
        // stop setinternal()     
        clearInterval(this.myInterval);
    }
    
    protected navigateTo(page: string, isModal: boolean = false, pageData?: any): void {
        if (isModal) {
          let modal = this.modalCtrl.create(page, {pageData});
          modal.present();
          modal.onDidDismiss(dismissData => {
            // Saving this info to local storage after updating user profile info
    
            if (page === '') {
              // Do some interesting stuff here
    
            } 
    
          })
        } else {
          console.log('in navigate to ', pageData)
          this.navCtrl.push(page,{pageData})
        }
    }

    loadImage() {

        let actionSheet = this.actionSheetCtrl.create({
            title: this.titletext,
            buttons: [
                {
                    icon: 'folder',
                    text: this.foldertext,
                    handler: () => {
                        console.log('PHOTOLIBRARY clicked');
                        //this.takePicture2('PHOTOLIBRARY','chatImages');
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }, {
                    icon: 'camera',
                    text: this.cameratext,
                    handler: () => {
                        console.log('CAMERA clicked');
                        //this.takePicture2('CAMERA','chatImages');
                        this.takePicture(this.camera.PictureSourceType.CAMERA);
                    }
                }, {
                    icon: 'document',
                    text: this.filetext,
                    handler: () => {
                        console.log('file clicked');
                        //this.takePicture2('FILELIBRARY','chatFiles');
                        this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }, {
                    text: this.canceltext,
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        });

        actionSheet.present();
    }

    takePicture(sourceType, toFolder: string = 'chatImages') {

        // Create options for the Camera Dialog
        let cameraOptions = {
            quality: 100,
            sourceType: sourceType,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };
    
        // Get the data of an image
        this.camera.getPicture(cameraOptions)
            .then((imagePath) => {
                // Special handling for Android library
                if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                    this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                    });
                } else {
                    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                }

                this.uploadImage()

            }, (err) => {
                //this.presentToast('Error while selecting image.');
                console.error('getPicture Error ', err);
        });
    }

    // Always get the accurate path to your apps folder
    public pathForImage(img) {
        if (img === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + img;
        }
    }
    // Create a new name for the image
    private createFileName() {
        let d = new Date(),
        n = d.getTime(),
        newFileName =  n + ".jpg";
        return newFileName;
    }
    // Copy the image to a local folder
    private copyFileToLocalDir(namePath, currentName, newFileName) {
        this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
          this.lastImage = newFileName;
        }, error => {
          //this.presentToast('Error while storing file.');
        });
    }

    public uploadImage() {
        // folder to uploade 
        let uploadFolder = 'templates/default/uploads';
        // File for Upload
        let targetPath = this.pathForImage(this.lastImage);
        // File name only
        let filename = this.lastImage;
        // Destination URL
        //let url = "http://yoururl/upload.php";
        let urlServerFile = super.API_URL() + "uploadImage.php?action=chatUplodes&uploadFolder=" + uploadFolder + '&type=chat_images&userId=' + this.userLocal.id;

        let options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params : {'fileName': filename}
        };
       
        const fileTransfer: TransferObject = this.transfer.create();

        this.uploadLoader =true;

        this.translateService.get('being_uploaded')
        .subscribe( value => {this.appUtils.AppToast(value)})
        // Use the FileTransfer to upload the image
        fileTransfer.upload(targetPath, urlServerFile, options).then(data => {
            this.translateService.get('uploaded_successfully')
            .subscribe( value => {this.appUtils.AppToast(value)})
            this.uploadLoader = false;
        }, err => {
            this.translateService.get('uploaded_failed')
            .subscribe( value => {this.appUtils.AppToast(value)})
            this.uploadLoader = false;
        });
    }
    
    takePicture2(type, toFolder: string = 'chatImages') {

        const cameraOptions: CameraOptions = {
          quality: (type=='CAMERA')?70:40,
          destinationType: this.camera.DestinationType.FILE_URI,
          mediaType: this.camera.MediaType.PICTURE,
          correctOrientation: true,
          allowEdit: true,
          sourceType: this.camera.PictureSourceType[type]
        }; 
        // returned File URI => file:///storage/emulated/0/Android/data/co.itplus.rf/cache/.Pic.jpg?1498042093580
    
        /* response
        {"bytesSent":176215,"responseCode":200,"response":"/home/httpprim/rfapp.net<br>/api/uploadImage.
          php<pre>Array\n(\n
          [0] => \n [1] => api\n [2] => uploadImage.php\n)\n/home/httpprim/rfapp.net<br>/api","objectId":""} */
    
        this.camera.getPicture(cameraOptions).then(imageData => {
    
            //If data
            //let base64Image = 'data:image/jpeg;base64,' + imageData;
            //let compressed = LZString.compressToUTF16(base64Image);
            //console.log(compressed);
            console.log('line 417 on promise resolve function', imageData);
            // Special handling for Android library
            if (this.platform.is('android') || type == 'PHOTOLIBRARY'|| type == 'FILELIBRARY') {
                this.filePath.resolveNativePath(imageData)
                .then(filePath => {
                console.log('file path from resolve native path', filePath);
                let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                let currentName = imageData.substring(imageData.lastIndexOf('/') + 1, imageData.lastIndexOf('?'));
                console.log('correctPath', correctPath, 'currentName', currentName);
                //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
                });
            } else {
                console.log('line 197 image file path', imageData);
                let currentName = imageData.substr(imageData.lastIndexOf('/') + 1);
                let correctPath = imageData.substr(0, imageData.lastIndexOf('/') + 1);
                console.log('correctPath', correctPath, 'currentName', currentName);
                //this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
            }
            // detect image extension
            let extension: string = imageData.substring(imageData.lastIndexOf('.') + 1, imageData.lastIndexOf('?') != -1 ? imageData.lastIndexOf('?') : imageData.length);
            console.log('file extension', extension);
            // window.alert(imageData + "  && " + extension);
            return Promise.resolve([imageData, extension])
    
        }).then(data => {
    
            this.uploadImage2(data[0], data[1],toFolder);
    
        }).catch(err => {
    
          console.error('getPicture Error ', err);
          this.cameraError = err;
        })
    }

    uploadImage2(file, type, toFolder) {
        file = (file.indexOf('?') != -1)?file.split('?')[0]:file;
    
        const fto: TransferObject = this.transfer.create();
    
        let uploadFolder = 'templates/default/uploads';
    
        let targetPath = this.pathForImage(this.lastImage);
    
        let fileName = file.substr(file.lastIndexOf('/') + 1);
        
        let uploadOptions: FileUploadOptions = {
          fileKey: 'file',
          fileName: fileName,
          chunkedMode: false,
          mimeType: "image/" + type,
          params: {
            ImgName: fileName,
            uploadFolder: uploadFolder,
            userId: this.userLocal.id,
            type: (toFolder == 'chatImages') ? 'chat_images' : 'chat_files'
          }
        };
    
        //let serverFile = super.API_URL() + "uploadImage.php?action=chatUplodes&uploadFolder=" + uploadFolder + '&type=' + ((toFolder == 'chatImages') ? 'chat_images' : 'chat_files') + '&userId=' + this.userLocal.id + '&ImgName=' + this.userLocal[cameraImage];

        let serverFile = super.API_URL() + "uploadImage.php?action=chatUplodes&uploadFolder=" + uploadFolder + '&type=' + ((toFolder == 'chatImages') ? 'chat_images' : 'chat_files') + '&userId=' + this.userLocal.id;
        
    
        this.uploadLoader =true;
        console.log('file uri', file, 'target Path', targetPath, 'server file & path', serverFile, 'file name', fileName);
    
        fto.upload(encodeURI(file), encodeURI(serverFile), uploadOptions, true)
          .then((res) => {
            //this.loadImage = true;
            this.translateService.get('being_uploaded')
            .subscribe( value => {this.appUtils.AppToast(value)})
            //this.showToast('جارى رفع الصورة');
            console.log('uploaded', JSON.stringify(res));
            this.uploadLoader = false;
          }, err => {
            //this.uploadErr = JSON.stringify(err);
            //this.showToast('upload' + JSON.stringify(err));
            console.log(err);
            this.uploadLoader = false;
            if (err.body) {
                //this.showToast('image name ' + err.body);
                console.log('%c%s', 'font-size:20px','Body message from the server', err.body);
                console.log(JSON.parse(err.body),JSON.parse(err.body).name);
    
    
                //this.showToast(err.json().errorInfo());
                //this.showToast(JSON.parse(err.body).success)
                this.appUtils.AppToast(JSON.parse(err.body).success)
                if (JSON.parse(err.body).name) {
                    //this.userLocal[cameraImage] = JSON.parse(err.body).name;
                
                    //localStorage.setItem('userLocalData', JSON.stringify(this.userLocal));
                }else {
                    //this.showToast(JSON.parse(err.body).errorInfo)
                    this.appUtils.AppToast(JSON.parse(err.body).errorInfo)

                }
              
            }
          });
    
    }


    /* onFocus() {
        //this.content.resize();
        //this.scrollToBottom();
        console.log('on focus')
    }
 */
    /* watchHeight(event) {
        console.log(this.msgInput);
        const textArea = this.msgInput.nativeElement;
        console.log(textArea);
        //console.log(textArea.scrollHeight, textArea.scrollHeight);
    
        textArea.style.height = '12 px';
    
        textArea.style.height  = textArea.scrollHeight + 'px';
    
    } */
    /* private getMsg() {
        // Get mock message list
        return this.chatService
        .getMsgList()
        .subscribe(res => {
            this.msgList = res;
            this.scrollToBottom();
        });
    }*/
    /* resize() {
        this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';
    } */
    
    //setInterval(() => console.log('ali'), 500);
    

    /*pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
              toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.msgList.push(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.msgList.push(msg);
        }
        this.scrollToBottom();
    }
    */
}



