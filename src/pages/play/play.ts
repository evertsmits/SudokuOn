import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Navbar } from 'ionic-angular';
import { XpProvider } from '../../providers/xp/xp';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';
import { ViewChild } from '@angular/core';
import localStorage from 'localStorage';
import sudoku from 'sudoku';
var interval;
var difficulty;
var puzzle = [];
var solution = [];
var notes = [];
var adcountdown = 0;
var time;
var playerwon = false;
var inputs = [];
var noteswitch = false;
var xp;
/**
 * Generated class for the PlayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-play',
  templateUrl: 'play.html',
})
export class PlayPage {
  @ViewChild(Navbar) navBar: Navbar;
  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public xpAI: XpProvider, public admob: AdMobFree) {
    document.addEventListener('pause', this.onPauseData, false);
    window.addEventListener('native.keyboardshow', this.hideOpts);
    window.addEventListener('native.keyboardhide', this.showOpts);
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

  launchInterstitial() {

      let interstitialConfig: AdMobFreeInterstitialConfig = {
          isTesting: false, // Remove in production
          autoShow: true,
          id: 'ca-app-pub-8720125300347339/1906644781'
      };

      this.admob.interstitial.config(interstitialConfig);

      this.admob.interstitial.prepare().then(() => {
          // success
      });

  }

  goAskNew(){
    this.presentAreYouSure();
  }

  hideOpts(){
    document.getElementById('optbox').style.display = "none";
  }

  showOpts(){
    document.getElementById('optbox').style.display = "inherit";
  }

  ionViewDidLoad() {
    this.showBanner();
    this.launchInterstitial();
    document.getElementById('puzzlegrid').style.zIndex = "10"
    var result = this.checklocalstorage();
    if(result){
    	this.cleartimer();
    	interval = setInterval(this.startTimer, 1000);
    	puzzle = sudoku.makepuzzle();
    	solution = sudoku.solvepuzzle(puzzle);
    	difficulty = sudoku.ratepuzzle(puzzle, 4);
    	this.pushPuzzle(puzzle, difficulty);
    }else{
      interval = setInterval(this.startTimer, 1000);
      puzzle = JSON.parse(localStorage.getItem('puzzle'));
      notes = JSON.parse(localStorage.getItem('notes'));
      solution = JSON.parse(localStorage.getItem('solution'));
      inputs = JSON.parse(localStorage.getItem('inputs'));
      time = JSON.parse(localStorage.getItem('time'));
      difficulty = JSON.parse(localStorage.getItem('difficulty'));
      this.pushPuzzle(puzzle, difficulty);
      this.pushNotesAndInputsAndInterval(notes, inputs, time);
    }
    document.getElementById('notegrid').style.display = "none";
  }

ionViewWillLeave() {
  if(playerwon == false){
  for (var i = 0; i < 81; i++) {
      var idnote = 'ncell-' + i.toString();
      var idinputs = 'cell-' + i.toString();
      var elementnote = <HTMLInputElement>document.getElementById(idnote);
      var elementinput = <HTMLInputElement>document.getElementById(idinputs);
      var notevalue = elementnote.value;
      var inputvalue = elementinput.value;
      notes[i] = notevalue;
      inputs[i] = inputvalue;
  }
  localStorage.setItem('puzzle', JSON.stringify(puzzle))
  localStorage.setItem('notes', JSON.stringify(notes))
  localStorage.setItem('solution', JSON.stringify(solution));
  localStorage.setItem('inputs', JSON.stringify(inputs))
  localStorage.setItem('difficulty', JSON.stringify(difficulty));
    var timer = document.getElementById('timer').innerHTML;
    var arr = timer.split(":");
    var hours = arr[0];
    var minutes = arr[1];
    var seconds = arr[2];
    var timeobject = {
      hours: hours,
      minutes: minutes,
      seconds: seconds
    }
    localStorage.setItem('time', JSON.stringify(timeobject));
  }
	clearInterval(interval)
  }
//deze functie wordt iedere nieuwe seconde aangeroepen
  startTimer(){
  	var timer = document.getElementById('timer').innerHTML;
  	var arr = timer.split(":");
  	var hours = parseInt(arr[0]);
  	var minutes = parseInt(arr[1]);
  	var seconds = parseInt(arr[2]);

  	if(seconds == 59){ //als de seconden gelijk zijn aan 59 en bij deze run door de functie een seconde erbij moet worden gezet dan...
  		if(minutes == 59){  //en het aantal minuten is ook 59
  			hours++; //een uurtje erbij
  			minutes = 0; //zet het aantal minuten op 0
  		}else{ //en het aantal minuten is kleiner dan 59
  			minutes++; //normale ophoging van het aantal minuten
  		}
  		seconds = 0; // seconden moeten natuurlijk worden gezet naar 0 nadat een minuut (en uur) zijn verhoogt
  	}else{ //het aantal seconden is geen 59 dan..
  		seconds++; //ophogen van aantal secondes
  	}

  	document.getElementById('timer').innerHTML = hours + ":" + minutes + ":" + seconds
	// interval = setInterval(this.startTimer, 1000); // iedere 1000ms => 1 sec doe je de functie startTimer
  	
  }

  onPauseData(){
   if(playerwon == false){
      for (var i = 0; i < 81; i++) {
          var idnote = 'ncell-' + i.toString();
          var idinputs = 'cell-' + i.toString();
          var elementnote = <HTMLInputElement>document.getElementById(idnote);
          var elementinput = <HTMLInputElement>document.getElementById(idinputs);
          var notevalue = elementnote.value;
          var inputvalue = elementinput.value;
          notes[i] = notevalue;
          inputs[i] = inputvalue;
      }
      localStorage.setItem('puzzle', JSON.stringify(puzzle))
      localStorage.setItem('notes', JSON.stringify(notes))
      localStorage.setItem('inputs', JSON.stringify(inputs))
      localStorage.setItem('solution', JSON.stringify(solution));
      localStorage.setItem('difficulty', JSON.stringify(difficulty));
        var timer = document.getElementById('timer').innerHTML;
        var arr = timer.split(":");
        var hours = arr[0];
        var minutes = arr[1];
        var seconds = arr[2];
        var timeobject = {
          hours: hours,
          minutes: minutes,
          seconds: seconds
        }
      localStorage.setItem('time', JSON.stringify(timeobject));
    }
  }

  presentAlertNotAllFields() {
	  let alert = this.alertCtrl.create({
	    title: 'Oh no..',
	    subTitle: 'please fill all the squares and try again',
	    buttons: ['will do'],
	    cssClass: 'popup-body'
	  });
	  alert.present();
  }

  presentAlertWinner(){
     this.xpAI.setData(xp);
     playerwon = true;
  	 let alert = this.alertCtrl.create({
	    title: 'Gongratiulations',
	    subTitle: 'You gained ' + xp + ' xp',
	    buttons: ['Awesome!'],
	    cssClass: 'alert-md'
	  });
	  alert.present();
  }

  presentAlertLoser(){
  	  let alert = this.alertCtrl.create({
	    title: 'Loser',
	    subTitle: 'Try again',
	    buttons: ['will do'],
      cssClass: 'alert-md'
	  });
	  alert.present();
  }

  presentAreYouSure(){
    let alert = this.alertCtrl.create({
      title: 'New puzzle',
      subTitle: 'Are you sure about this?',
      cssClass: 'alert-md',
      buttons: [{
        text: 'Yes',
        handler: () => {
          this.goGenerateNewPuzzle()
        }
      }, {
        text: 'No',
        role: 'cancel',
        handler: () =>{
        }
      }]
    });
    alert.present();
  }

  cleartimer(){
  	var timer = document.getElementById('timer').innerHTML;
  	var arr = timer.split(":");
  	var hours = arr[0];
  	var minutes = arr[1];
  	var seconds = arr[2];

  	hours = "0" + hours;
  	minutes = "0" + minutes;
  	seconds = "0" + seconds;

  	document.getElementById('timer').innerHTML = hours + ":" + minutes + ":" + seconds

  }

  pushPuzzle(puzzle, difficulty){
  	for (var i = 0; i < puzzle.length; i++) {
  		var value = puzzle[i];
  		var idcell = 'cell-' + i.toString();
  	  var iddifficulty = 'difficulty';
  		var item = document.getElementById(idcell).getAttribute('value')
  		if(puzzle[i] != null){
  			item = value;
  			document.getElementById(idcell).setAttribute('readonly', 'true');
        document.getElementById(idcell).style.color = "#313131";
  		}else{
  			item = "";
  		}
  		 var field = document.getElementById(idcell) as HTMLInputElement
       field.value = item;
  	}
  		if(difficulty <= 1){
  		  document.getElementById(iddifficulty).innerHTML = 'easy';
        xp = 250;
        document.getElementById('xp').innerHTML = '250';
  		}else if(difficulty > 1 && difficulty < 3){
        document.getElementById(iddifficulty).innerHTML = 'medium';
        xp = 500;
        document.getElementById('xp').innerHTML = '500';
      }else{
        document.getElementById(iddifficulty).innerHTML = 'hard';
        xp = 1000;
        document.getElementById('xp').innerHTML = '1000';
      }

  }

  pushNotesAndInputsAndInterval(notes, inputs, time){
    for (var i = 0; i < 81; ++i) {
      var idcellnote = 'ncell-' + i.toString();
      var idcell = 'cell-' + i.toString();
      var notevalue = notes[i];
      var inputvalue = inputs[i];
      var iddifficulty = 'difficulty';
      var noteitem = document.getElementById(idcellnote).getAttribute('value')
      if(notes[i] != null){
        noteitem = notevalue;
      }else{
        noteitem = "";
      }
      var notefield = document.getElementById(idcellnote) as HTMLInputElement
      notefield.value = noteitem;

      var inputitem = document.getElementById(idcell).getAttribute('value');
      if(inputs[i] != null){
        inputitem = inputvalue;
      }else{
        inputitem = "";
      }
       var inputfield = document.getElementById(idcell) as HTMLInputElement
       inputfield.value = inputitem;

      if(difficulty <= 1){
        document.getElementById(iddifficulty).innerHTML = 'easy';
      }else if(difficulty > 1 && difficulty < 3){
        document.getElementById(iddifficulty).innerHTML = 'medium';
      }else{
        document.getElementById(iddifficulty).innerHTML = 'hard';
      }

    }
    //timer set
    var h = time.hours;
    var m = time.minutes;
    var s = time.seconds;
    document.getElementById('timer').innerHTML = h + ":" + m + ":" + s;
  }

  goCheckPuzzle(){
    this.launchInterstitial();
  	for (var i = 0; i < 81; i++){
  		var id = 'cell-' + i.toString();
  		var element = <HTMLInputElement>document.getElementById(id)
  		var value = element.value;
  		if(element.value == ""){
  			this.presentAlertNotAllFields();
  			var emptyfields = true;
  			break;
  		}else{
  			inputs[i] = value;
  		}
  	}
  	if(emptyfields == true){
  		//empty fields
  	}else{
  		this.solvePuzzle(inputs, solution);
  	}
  }

  goGenerateNewPuzzle(){
    this.clearPuzzle();
    //TODO: change this shit to nitpick
    localStorage.removeItem('puzzle');
    localStorage.removeItem('solution');
    localStorage.removeItem('notes');
    localStorage.removeItem('inputs');
    localStorage.removeItem('time');
    localStorage.removeItem('difficulty');
    puzzle = sudoku.makepuzzle();
    solution = sudoku.solvepuzzle(puzzle);
    difficulty = sudoku.ratepuzzle(puzzle, 4);
    document.getElementById('timer').innerHTML = 0 + ":" + 0 + ":" + 0
    clearInterval(interval)
    interval = setInterval(this.startTimer, 1000)
    this.pushPuzzle(puzzle, difficulty);
  }

  solvePuzzle(filledpuzzle, solution){
	  	for (var i = 0; i < filledpuzzle.length ; i++) {
	  		filledpuzzle[i] = parseInt(filledpuzzle[i]);
	  	}
	  	if(this.equals(filledpuzzle, solution)){
	  		this.presentAlertWinner();
	  	}else{
	  		this.presentAlertLoser()
	  	}
  	}

  goToNoteMode(){
    if(noteswitch){
      document.getElementById('notegrid').style.display = "none";
      document.getElementById('note_button').style.backgroundColor = "#33085a";
      document.getElementById('puzzlegrid').style.zIndex = "10";
      document.getElementById('note_button').style.color = "white";
      noteswitch = false;
    }else{
      if(adcountdown == 5){
        this.launchInterstitial();
        adcountdown = 0;
      }
      adcountdown++;
      document.getElementById("note_button").style.backgroundColor = "rgba(216, 225, 255, 0.5)"
      document.getElementById('puzzlegrid').style.zIndex = "0";
      document.getElementById('notegrid').style.display = "table";
      noteswitch = true;
    }
  }

  clearPuzzle(){
    for (var i = 0; i < 81; i++) {
       var id = 'cell-' + i.toString()
       var id_note = 'ncell-' + i.toString()
       var field = document.getElementById(id) as HTMLInputElement
       var notefield = document.getElementById(id_note) as HTMLInputElement
       notefield.value ='';
       field.value = '';
       document.getElementById(id).removeAttribute('readonly');
    }
  }

  checklocalstorage(){
    var localpuzzle = JSON.parse(localStorage.getItem('puzzle'));
    if(localpuzzle == null){
      return true;
    }else{
      return false;
    }
  }

 equals(a, a2) {
 		for (var i = 0; i < a.length; i++) {
 			if(a[i] != a2[i]){
 				return false;
 			}
 		}
 		return true;
	}
}

