import {Component} from '@angular/core';
import {Config, Events, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TranslateService} from 'ng2-translate';
import { Storage } from '@ionic/storage';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    textDir: any;
    language: any;
    userLogin: any = false;
    loader: any;
    Token: any;

    constructor(
        public platform: Platform,
        public statusBar: StatusBar,
        public splashScreen: SplashScreen,
        public translate: TranslateService,
        public events: Events,
        public config: Config,
        public storage: Storage
    ) {
        this.storage.get('localUserInfo')
            .then((ud) => {
                (ud == null) ? (this.rootPage = 'Tabs') : (this.rootPage = 'Tabs')
                console.log(ud);
            })
            .catch(err => { console.warn('no user', err); this.rootPage = 'Tabs' });
        
        this.initializeApp()


    }

    initializeApp() {
        this.platform.ready().then(() => {

            this.statusBar.backgroundColorByHexString('#FFF');
            this.splashScreen.hide();


            this.translate.setDefaultLang('ar');
            this.translate.use('ar');
            this.platform.setDir('rtl', true);
            this.config.set('backButtonIcon', 'ios-arrow-forward') 
        });

        this.events.subscribe('lang:Changed', (lang) => {
            if (lang == 'ar') {
                this.textDir = 'rtl';
                this.language = 'arabic';
                this.platform.setDir('rtl', true);
                this.config.set('backButtonIcon', 'ios-arrow-forward');

                console.log('config change detector', this.config.get('backButtonIcon'))

            } else {
                this.textDir = 'ltr';
                this.language = 'english';
                this.platform.setDir('ltr', true);
                this.config.set('backButtonIcon', 'ios-arrow-back');
                console.log('config change detector', this.config.get('backButtonIcon'))
            }
            this.translate.use(lang);
        });


        this.events.subscribe('changeConfig', (key, value) => {
            this.config.set(key, value);
            console.log('config value \"' + key + '\" is ', this.config.get(key))
        });

        this.events.subscribe('changeRoot', (root) =>{ console.info('%c%s%c%s','color:#2196f3','changing root to > ','color:#f44336;font-weight:bold', root);this.rootPage = root});
    }

}
