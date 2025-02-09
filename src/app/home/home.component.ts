import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import '@google/model-viewer';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [],
  schemas:[CUSTOM_ELEMENTS_SCHEMA ]
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.loadExternalJavaScript();
  }

  private loadExternalJavaScript(): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      // Select the class bubble
time = document.getElementsByClassName('bubbles')[0];

// padding values for desktop
var fish2move = 100;
var fish3move = 900;
var fish4move = 1200;

if (screen.width < 400) {

    //Change transformation duration and translatey for mobile view
    time.style.setProperty('--transform-duration', '15s')
    time.style.setProperty('--transform-y', '-700vh')

    // padding values for mobile
    fish2move = 1680;
    fish3move = 3000;
    fish4move = 4300;
}



window.addEventListener('scroll', function () {

    let value = window.scrollY;   //Get Scroll Value (Mobile - High)

    text.style.top = 50 + value * -0.2 + '%';
    cloud.style.left = value * 2 + 'px';

    bird1.style.top = value * 0.1 + 'px';
    bird1.style.left = value * 1 + 'px';

    bird2.style.top = value * -0.1 + 'px';
    bird2.style.left = value * -2 + 'px';

    explore.style.marginTop = value * 1.5 + 'px';

    rocks.style.top = value * -0.14 + 'px';

    forest.style.top = value * 0.4 + 'px';
    sky.style.top = value * 0.25 + 'px';
    mountains.style.top = value * 0.25 + 'px';

    header.style.top = value * 0.7 + 'px';

    //To prevent splash to move above sea water
    if (value < 380) {
        splash.style.top = 20 + value * -0.3 + 'px';
    }


})


function openlink(x) {
    if (x == 1) {
        window.open("https://www.instagram.com/_.vini._02_/", "_blank");
    }
    if (x == 2) {
        window.open("https://www.linkedin.com/in/vineet-kumar-gupta-2833ab196/", "_blank");
    }
    if (x == 3) {
        window.open("https://github.com/VineetKumar02", "_blank");
    }
    if (x == 4) {
        window.open("https://vineet-portfolio-site.netlify.app/", "_blank");
    }
}
    `;
    document.body.appendChild(script);
  }
}
