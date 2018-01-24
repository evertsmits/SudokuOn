import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { RulesPage } from '../rules/rules';
import { PlayPage } from '../play/play';
import { ThemesPage } from '../themes/themes';
import { AdMobFree, AdMobFreeBannerConfig} from '@ionic-native/admob-free';
import { XpProvider } from '../../providers/xp/xp';
import { LevelProvider } from '../../providers/level/level';
import localStorage from 'localStorage';

var xp;
var level = 1;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public xpAI: XpProvider, public levelAI: LevelProvider, public admob: AdMobFree ) {}

  ionViewDidEnter(){
    xp = this.xpAI.getData();
    this.generateLevelAndXpBar(xp);
    this.showBanner();
  }

    showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
        isTesting: false, // Remove in production
        autoShow: true,
        id: 'ca-app-pub-8720125300347339/8520154596'
    };

    this.admob.banner.config(bannerConfig);

    this.admob.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));

}

  goToRulesPage(){
  	this.navCtrl.push(RulesPage);
  }

  goToThemesPage(){
    this.navCtrl.push(ThemesPage);
  }

  goToPlayPage(){
  	this.navCtrl.push(PlayPage);
  }

  //calculate the level
  generateLevelAndXpBar(xp){
    var levelcap = JSON.parse(localStorage.getItem('levelcap'));
    if(levelcap == null){
      levelcap = 1500;
      localStorage.setItem('levelcap', JSON.stringify(levelcap));
    }
    if(xp > levelcap){
      xp = xp - levelcap;
      levelcap = levelcap * 1.3;
      this.xpAI.setData(xp);
      level++;
      this.levelAI.setData(level);
      localStorage.setItem('levelcap', JSON.stringify(levelcap));
    }else{
      this.levelAI.setData(level);
    }
    var BarWidth = 24.6;
    var procentdata = levelcap/100;
    var data = xp/procentdata;
    var xp_procent = data/100;
    var width = BarWidth * xp_procent;
    document.getElementById('xpbar').style.width = width.toString() + "rem";
      let element = document.getElementById("level") as HTMLInputElement
      element.innerHTML = this.levelAI.getData();
  }

}
